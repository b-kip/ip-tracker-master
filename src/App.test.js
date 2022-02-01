import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import createHandlers from './mswMocks/handlers';
import {IPINFO, DOMAININFO} from './test/testData';
import { createTestDataManager } from "./test/testDataManager";
import App from "./App";

const {testDataManager, getData} = createTestDataManager(
  { IPINFO, DOMAININFO },
  IPINFO[0]
);

const server = setupServer(...createHandlers(getData));

// app loads with loader then getInitialData
// makes request if valid ip or domain is submitted to the dom.
// show error for bad requests.
// request failures from server failure.

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Makes initial request on first render to fetch users ip info", async () => {
  const ipInfo = getData()
  render(<App />);

  expect(
    screen.getByPlaceholderText(/search for any ip address or domain/i)
  ).toBeInTheDocument();
  expect(screen.queryByRole(/presentation/i)).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));
  // screen.debug();

  // check that the map and results are visible
  expect(screen.getByRole(/presentation/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(ipInfo.ip, "i"))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(ipInfo.isp, "i"))).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(ipInfo.location.region, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(ipInfo.location.city, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      new RegExp("UTC" + ipInfo.location.timezone.replace(/\+/i, "\\+"), "i")
    )
  ).toBeInTheDocument();
});

test("Fetches information on a valid ip address input", async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));
  const ipInfo = testDataManager.updateData('IPINFO');

  userEvent.type(
    screen.getByPlaceholderText(/search for any ip address or domain/i),
    ipInfo.ip
  );
  userEvent.click(screen.getByLabelText("Submit"));

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

  // check that the map and results are visible
  expect(screen.getByRole(/presentation/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(ipInfo.ip, "i"))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(ipInfo.isp, "i"))).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(ipInfo.location.region, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(ipInfo.location.city, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      new RegExp(
        "UTC" + ipInfo.location.timezone.replace(/\+/i, "\\+"),
        "i"
      )
    )
  ).toBeInTheDocument();
});

test("Fetches information on a valid domain input", async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));
  const domainInfo = testDataManager.updateData('DOMAININFO');

  userEvent.type(
    screen.getByPlaceholderText(/search for any ip address or domain/i),
    domainInfo.domain
  );
  userEvent.click(screen.getByLabelText("Submit"));
  
  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

  // check that the map and results are visible
  expect(screen.getByRole(/presentation/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(domainInfo.ip, "i"))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(domainInfo.isp, "i"))).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(domainInfo.location.region, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(domainInfo.location.city, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      new RegExp(
        "UTC" + domainInfo.location.timezone.replace(/\+/i, "\\+"),
        "i"
      )
    )
  ).toBeInTheDocument();
});

test("shows error message when a requests contain non-existent domain", async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

  server.use(
    rest.get("https://geo.ipify.org/api/v1", (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(400, "Bad Request"),
        ctx.json({})
      );
    })
  );

  userEvent.type(
    screen.getByPlaceholderText(/search for any ip address or domain/i),
    "twitter.comd"
  );
  userEvent.click(screen.getByLabelText("Submit"));
  // screen.debug();

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

  // check that the map and results are visible
  expect(screen.queryByRole(/presentation/i)).not.toBeInTheDocument();
  expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
    `"Bad Request. Enter a valid IP address or domain."`
  );
});
