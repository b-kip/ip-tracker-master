import React from 'react';
import { render, screen } from "@testing-library/react";

import TextResults from './TextResults'


describe("TextResults", () => {
  let rerender;
  let results = {
    textInfo: {
      ip: '',
      location: '',
      timezone: '',
      isp: ''
    },
    isLoading: true
  };

  beforeEach(() => {
    rerender = render(<TextResults {...results} />).rerender;
  });

  it("renders results title and value", () => {
    expect(screen.getByRole('heading', { name: /ip address/i }))
    .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /location/i }))
    .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /timezone/i }))
    .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /isp/i }))
    .toBeInTheDocument();
    
    expect(screen.getAllByLabelText(/loading/i)).toHaveLength(4);

    let updatedResults = {
      ...results,
      isLoading: false,
      textInfo: {
        ip: '192.212.174.101',
        location: 'California, South San Gabriel',
        timezone: 'UTC-08:00',
        isp: 'Southern California Edison'
      }
    };

    rerender(<TextResults {...updatedResults} />);

    // there's no delay in replacing loader with value
    // expect(screen.getByLabelText(/loading/i)).not.toBeInTheDocument()

    expect(screen.getByText(new RegExp(updatedResults.textInfo.ip, 'i')))
    .toBeInTheDocument();
    expect(screen.getByText(new RegExp(updatedResults.textInfo.location, 'i')))
    .toBeInTheDocument();
    expect(screen.getByText(new RegExp(updatedResults.textInfo.timezone, 'i')))
    .toBeInTheDocument();
    expect(screen.getByText(new RegExp(updatedResults.textInfo.isp, 'i')))
    .toBeInTheDocument();
  });
});