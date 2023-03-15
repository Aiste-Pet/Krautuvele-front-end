/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Button from './Button';

describe('Button', () => {
  it('renders a button with default props', () => {
    const { getByRole } = render(<Button>Hello</Button>);
    const button = getByRole('button');
    expect(button).toHaveTextContent('Hello');
    expect(button).toHaveClass('btn');
    expect(button).not.toHaveClass('btn--secondary');
  });

  it('renders a button with celled class', () => {
    const { getByRole } = render(<Button class="celled">Hello</Button>);
    const button = getByRole('button');
    expect(button).toHaveClass('btn--celled');
  });

  it('renders a button with secondary class', () => {
    const { getByRole } = render(<Button class="secondary">Hello</Button>);
    const button = getByRole('button');
    expect(button).toHaveClass('btn--secondary');
  });

  it('renders a link with default props', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Button to="/foo">Hello</Button>
      </MemoryRouter>
    );
    const link = getByRole('link');
    expect(link).toHaveTextContent('Hello');
    expect(link).toHaveClass('btn');
    expect(link).not.toHaveClass('btn--secondary');
  });

  it('calls onClick callback when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Hello</Button>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
