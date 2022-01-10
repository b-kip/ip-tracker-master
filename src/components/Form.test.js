import React from 'react';
import renderer from 'react-test-renderer';

import Form from './Form';
import { ReactComponent as ArrowIcon} from '../assets/images/icon-arrow.svg';

// UNIT TESTING
// input: none. No props to be rendered.
// output: form submission handler.
  // called once for happy path
  // not called for happy path
  // called with the same value provided to the input.

// happy path
  // right ip-address
  // valid domain name

// unhappy path
  // doesn't submit empty value
  // doesn't submit invalid ip-address
  // doestn't submit invalid domain

// INTEGRATION TESTING
// Rendered Arrow Icon.

describe('Form', () => {
  const onSubmit = jest.fn();

  let component;

  function updateFormValue(value) {
    renderer.act(() => {
      component.root.findByType('input').props.onChange(
        { target: { value }}
      );
    });
    renderer.act(() => {
      component.root.findByType('form').props.onSubmit(
        { preventDefault: jest.fn() }
      );
    });
  }

  beforeEach(async () => {
    component = renderer.create(<Form onSubmit={onSubmit}/>);
    // google ip address
    
  });

  // HAPPY PATHS
  it('calls onSubmit on form submission with valid ip address', async() => {
    updateFormValue('4.4.4.4');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('4.4.4.4');
  });
  
  it('calls onSubmit on form submission with valid domain', async () => {
    updateFormValue('google.com');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('google.com');
  });

  // UNHAPPY PATHS
  it('fails to call onSubmit with empty input', async () => {
    updateFormValue('');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
  
  it('fails to call onSubmit with invalid ip address', async () => {
    updateFormValue('255.255.255.256');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
  
  it('fails to call onSubmit with invalid domain', async () => {
    updateFormValue('google.c');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  // INTEGRATION TESTING
  // renders ArrowIcon
  it('renders an arrow icon', () => {
    expect(component.root.findAllByType(ArrowIcon).length).toEqual(1);
  })
});