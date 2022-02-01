import React from "react";
// import renderer from 'react-test-renderer';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import {NEGATIVE_PATH_INPUT_DATA} from '../test/testData';

import Form from "./Form";


function getInvalidIp() {
  return NEGATIVE_PATH_INPUT_DATA.ip_address[
    Math.floor(Math.random() * NEGATIVE_PATH_INPUT_DATA.ip_address.length)
  ]
}

function getInvalidDomain() {
  return NEGATIVE_PATH_INPUT_DATA.domain[
    Math.floor(Math.random() * NEGATIVE_PATH_INPUT_DATA.domain.length)
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
  test("fails to submit empty input and displays error message", () => {
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
  });

  test("fails to submit invalid ip address and displays error message", () => {
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

  test("fails to submit invalid domain and displays error message", () => {
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
  
  test('removes error message resulting from invalid ip when updates input field', () => {
    // type and submit an invalid ip.
    userInput = getInvalidIp();
    userEvent.type(
      screen.getByPlaceholderText(/search for any ip address or domain/i),
      userInput
    );
    userEvent.click(screen.getByRole("button", { type: "submit" }));
  
    expect(handleSubmit).toBeCalledTimes(0);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Input a valid IP Address or domain"`
    );

    // clear error message when user clears invalid input
    // userEvent only allows to clear and type, no replace.
    // so this could do. No need to type new value.
    userEvent.clear(
      screen.getByPlaceholderText(/search for any ip address or domain/i)
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
  
  test('removes error message resulting from invalid domain when user updates input field', () => {
    // type and submit an invalid ip.
    userInput = getInvalidDomain();
    userEvent.type(
      screen.getByPlaceholderText(/search for any ip address or domain/i),
      userInput
    );
    userEvent.click(screen.getByRole("button", { type: "submit" }));
  
    expect(handleSubmit).toBeCalledTimes(0);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Input a valid IP Address or domain"`
    );

    // clear error message when user clears invalid input
    // userEvent only allows to clear and type, no replace.
    // so this could do. No need to type new value.
    userEvent.clear(
      screen.getByPlaceholderText(/search for any ip address or domain/i)
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});


// UNIT TESTING
// input: none. No props to be rendered.
// output: form submission handler.
// called once for happy path
// not called for happy path
// called with the same value provided to the input.
