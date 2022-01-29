import React from 'react';
import { render, screen } from "@testing-library/react";

import TextResultItem from "./TextResultItem";


describe("TextResultItem", () => {
  let rerender;
  let textResult = {
    title: 'Location',
    value: '',
    isLoading: true
  };

  beforeEach(() => {
    rerender = render(<TextResultItem {...textResult} />).rerender;
  });

  it("renders result's title and value", () => {
    expect(screen.getByRole('heading', {
      name: /location/i
    }))
    .toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

    let updatedResults = {
      ...textResult,
      value: 'California, Los Angeles',
      isLoading: false
    };

    rerender(<TextResultItem {...updatedResults} />);

    // there's no delay in replacing loader with value
    // expect(screen.getByLabelText(/loading/i)).not.toBeInTheDocument()

    expect(screen.getByText(new RegExp(updatedResults.value, 'i')))
    .toBeInTheDocument();
  });
});