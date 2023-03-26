import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import AddressTable from './AddressTable';

const mockAddresses = [
  {
    id: 1,
    address_line: '123 Main St',
    city: 'Anytown',
    country: 'USA',
    postal_code: '12345',
  },
];

describe('AddressTable', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    localStorage.setItem(
      'REACT_TOKEN_AUTH_KEY',
      JSON.stringify({ accessToken: '1234567890' })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('renders a table with address data', () => {
    render(<AddressTable addresses={mockAddresses} />);
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Anytown')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  it('displays error message when delete request fails', async () => {
    const mockResponse = { statusText: 'Unauthorized' };
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: mockResponse.statusText,
      })
    );

    render(<AddressTable addresses={mockAddresses} />);
    const deleteButton = screen.getByText('Trinti');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText('Įvyko klaida: Unauthorized')
      ).toBeInTheDocument();
    });
  });

  it('shows a success message if address deletion succeeds', async () => {
    global.fetch.mockImplementationOnce(() => ({ ok: true }));
    const { container } = render(<AddressTable addresses={mockAddresses} />);
    const deleteButton = screen.getByText('Trinti');
    fireEvent.click(deleteButton);
    expect(
      await screen.findByText('Adresas ištrintas sėkmingai')
    ).toBeInTheDocument();
    expect(container.querySelector('.errors')).toBeNull();
  });

  it('opens the add address form when "Pridėti naują adresą" is clicked', () => {
    render(<AddressTable addresses={mockAddresses} />);
    const addButton = screen.getByText('Pridėti naują adresą');
    fireEvent.click(addButton);
    expect(screen.getByText('Išsaugoti')).toBeInTheDocument();
  });
});
