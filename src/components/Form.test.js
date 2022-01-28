import React from "react";
// import renderer from 'react-test-renderer';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";

import Form from "./Form";


const NEGATIVE_PATH_DATA = {
  ip_address: [
    "256.125.89.255", "255.125..255", "256.125.89.", "255.125.089.255",
    "255189255", "255..125.89.255", "255.125.8a.255", "255.125.9%.255"
  ],
  domain:[
    "twitter.c", "t.c", "tsc_d.com", "facebo ok.com", "dev - c.org",
    "-youtube.com", "red@rt.net", "fb's.com", "dev", "devs,challenge.to",
    "m&m.com", "mail..mybusiness.com"
  ],
}

function getInvalidIp() {
  return NEGATIVE_PATH_DATA.ip_address[
    Math.floor(Math.random() * NEGATIVE_PATH_DATA.ip_address.length)
  ]
}

function getInvalidDomain() {
  return NEGATIVE_PATH_DATA.domain[
    Math.floor(Math.random() * NEGATIVE_PATH_DATA.domain.length)
  ]
}
// tests you UI in a similar manner to how it would be used
describe("Form", () => {
  let userInput, handleSubmit;

  beforeEach(() => {
    userInput = faker.internet.ip();
    console.log(userInput);
    handleSubmit = jest.fn(); // jest shouws args
    render(<Form onSubmit={handleSubmit} />);
  });

  // HAPPY PATH
  test("submission of valid ip address", () => {
    userEvent.type(
      screen.getByPlaceholderText(/search for any ip address or domain/i),
      userInput
    );
    userEvent.click(screen.getByRole("button", { type: "submit" }));

    expect(handleSubmit).toBeCalledTimes(1);
    expect(handleSubmit).toBeCalledWith(userInput);
  });

  test("submission of valid domain", () => {
    userInput = faker.internet.domainName();
    userEvent.type(
      screen.getByPlaceholderText(/search for any ip address or domain/i),
      userInput
    );
    userEvent.click(screen.getByRole("button", { type: "submit" }));

    expect(handleSubmit).toBeCalledTimes(1);
    expect(handleSubmit).toBeCalledWith(userInput);
  });

  // UNHAPPY PATH
  test("fails to submit empty input", () => {
    userInput = "";
    console.log("Interaction initiated");
    userEvent.type(
      screen.getByPlaceholderText(/search for any ip address or domain/i),
      userInput
    );
    userEvent.click(screen.getByRole("button", { type: "submit" }));

    expect(handleSubmit).toBeCalledTimes(0);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Input a valid IP Address or domain"`
    );
    // expect(
    //   screen.getByText(/input a valid ip address or domain/i)
    // ).toBeInTheDocument();
  });

  test("fails to submit invalid ip address", () => {
    userInput = getInvalidIp();
    console.log(userInput);
    userEvent.type(
      screen.getByPlaceholderText(/search for any ip address or domain/i),
      userInput
    );
    userEvent.click(screen.getByRole("button", { type: "submit" }));

    expect(handleSubmit).toBeCalledTimes(0);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Input a valid IP Address or domain"`
    );
  });

  test("fails to submit invalid domain", () => {
    userInput = getInvalidDomain();
    console.log(userInput);
    userEvent.type(
      screen.getByPlaceholderText(/search for any ip address or domain/i),
      userInput
    );
    userEvent.click(screen.getByRole("button", { type: "submit" }));

    expect(handleSubmit).toBeCalledTimes(0);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Input a valid IP Address or domain"`
    );
  });
});

// UNIT TESTING
// input: none. No props to be rendered.
// output: form submission handler.
// called once for happy path
// not called for happy path
// called with the same value provided to the input.
