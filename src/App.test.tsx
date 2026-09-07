import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-ga', () => ({
  initialize: jest.fn(),
  pageview: jest.fn(),
}));

afterEach(() => {
  window.history.pushState({}, '', '/');
});

test('renders the portfolio homepage', () => {
  render(<App />);
  expect(screen.getByText(/Hey there, I'm Apoorva Rajan/i)).toBeInTheDocument();
});

test('renders recruiter mode at its dedicated route', () => {
  window.history.pushState({}, '', '/recruiter');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Apoorva Rajan' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /back to portfolio/i })).toBeInTheDocument();
});
