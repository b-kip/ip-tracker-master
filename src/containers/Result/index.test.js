import * as React from 'react';
import {render, screen} from '@testing-library/react';

import Results from './index';

// child components for this component are presentational component.
// props have been funnelled to them.
// I've tested them therefore testing that they sho props would be repetition
// in my opinion.

// the error path is untested.
const ipInfo = {
  data: {
    textInfo: {},
    coordinates: {}
  },
  error: {
    isError: false,
    message: ''
  },
  isLoading: true
};

test('show error message for bad requests', () => {
  const {rerender}=render(<Results ipInfo={ipInfo}/>)
  // screen.debug()

  let updatedIpInfo = {
    ...ipInfo,
    error: {
      isError: true,
      message: 'Failed to fetch. Enter a valid IP address or domain.'
    }
  }

  rerender(<Results ipInfo={updatedIpInfo} />)
  // screen.debug()
  expect(screen.getByRole('alert')).toHaveTextContent(
    updatedIpInfo.error.message
  )
})