import * as React from 'react';
import {render, screen} from '@testing-library/react';

import Map from './index.js';

// dev input: coordinates, isLoading, isError
// user output: map, loader or an empty box.
const data = {
  coordinates: {lat: null, lng: null},
  isError: false,
  isLoading: true
}
let rerender;

beforeEach(() => {
  ({rerender} = render(<Map {...data}/>));
})

test('shows map after loading is complete', () => {
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  
  let updatedData = {
    ...data,
    isLoading: false,
    coordinates: {lat:37.38605, lng: -122.08385}
    // coordinates: {lat:38.38605, lng: -121.08385}
  };

  rerender(<Map {...updatedData}/>);
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByRole(/presentation/i)).toBeInTheDocument();
})

test('does not shows map for bad requests', () => {
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  
  let updatedData = {
    ...data,
    isLoading: false,
    isError: true
  };

  rerender(<Map {...updatedData}/>);
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.queryByRole(/presentation/i)).not.toBeInTheDocument();
})