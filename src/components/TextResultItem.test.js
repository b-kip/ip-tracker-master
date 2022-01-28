import React from 'react';
import renderer from 'react-test-renderer';

import TextResultItem from "./TextResultItem";
import Skeleton from "react-loading-skeleton";

// UNIT TESTING
//input
  // title
  // value
  // isLoading
describe("TextResultItem", () => {
  let component;
  let textResult = {
    title: 'location',
    value: 'California, Los Angeles',
    isLoading: false
  };
  beforeEach(() => {
    component = renderer.create(<TextResultItem {...textResult}/>);
  });

  it("renders result's title and value", () => {
    expect(component.root.findByProps({className: 'results__item__title'})
    .children).toEqual(['location']);
    // I don't want to be including all class names.
    expect(component.root.findByType('p')
    .children).toEqual(['California, Los Angeles']);
  });

  it('renders loading skeleton if isLoading is false', () => {
    component.update(<TextResultItem {...textResult} isLoading={true} />);
    expect(component.root.findAllByType(Skeleton).length).toEqual(1);
  });
});