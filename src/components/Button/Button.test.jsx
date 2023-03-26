import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import Button from './Button';

describe('Button', () => {
  it('renders a button with default props', () => {
    const { getByRole } = render(<Button>Hello</Button>);
    const button = getByRole('button');
    expect(button).toHaveTextContent('Hello');
    expect(button.className).toContain('btn');
    expect(button.className).not.toContain('btn--secondary');
  });

  it('renders a button with celled class', () => {
    const { getByRole } = render(<Button class="celled">Hello</Button>);
    const button = getByRole('button');
    expect(button.className).toContain('btn--celled');
  });

  it('renders a button with secondary class', () => {
    const { getByRole } = render(<Button class="secondary">Hello</Button>);
    const button = getByRole('button');
    expect(button.className).toContain('btn--secondary');
  });

  it('renders a link with default props', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Button to="/foo">Hello</Button>
      </MemoryRouter>
    );
    const link = getByRole('link');
    expect(link).toHaveTextContent('Hello');
    expect(link.className).toContain('btn');
    expect(link.className).not.toContain('btn--secondary');
  });

  it('calls onClick callback when button is clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Hello</Button>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
