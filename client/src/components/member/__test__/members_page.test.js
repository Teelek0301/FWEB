import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Members from '../members_page';
import React from 'react';

jest.mock('react-router-dom', () => ({
  NavLink: 'div',
}));

jest.mock('../members_page.css', () => ({}));

describe('Members', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders Members component without crashing', () => {
    render(<Members />);
    const elements = screen.getAllByRole('heading', { name: /Members/i });
    elements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});