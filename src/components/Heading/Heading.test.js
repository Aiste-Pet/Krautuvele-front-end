/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import React from 'react';

import Heading from './Heading';

describe('Heading', () => {
  it('renders with the correct class name when type is light', () => {
    const { getByText } = render(<Heading text="Hello" type="light" />);
    const headingElement = getByText(/Hello/);
    expect(headingElement.className).toBe('heading-light');
  });

  it('renders with the correct class name when type is dark', () => {
    const { getByText } = render(<Heading text="World" type="dark" />);
    const headingElement = getByText(/World/);
    expect(headingElement.className).toBe('heading-dark');
  });
});
