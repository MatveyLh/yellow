import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Jogs from "./components/Jogs/Jogs";
import Header from "./components/Header/Header";

test('button let me in', () => {
 render(<App />);
 expect(screen.getByRole('button')).toBeInTheDocument()
});
test('check empty list', () => {
  render(<Jogs/>);
  expect(screen.getByText(/nothing is there/i)).toBeInTheDocument()
})
