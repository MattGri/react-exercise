import React from 'react';
import { render, screen } from '@testing-library/react';
// import Home from './pages/Home';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// describe('Home', () => {
//   test('renders title', () => {
//     render(<Home />);
//     const title = screen.getByText(/Recruitment Task/i);
//     expect(title).toBeInTheDocument();
//   } );
// });
