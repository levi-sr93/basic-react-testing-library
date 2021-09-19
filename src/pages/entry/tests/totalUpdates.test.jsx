import {findByRole, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

test("update scoopt subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  //make sure total starts out $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", {exact: false});

  expect(scoopSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(scoopSubtotal).toHaveTextContent("2.00");

  //update chocolate to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {name: "Chocolate"});
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  expect(scoopSubtotal).toHaveTextContent("6.00");
})

test("update toppings subtotal when selecting toppings", async () => {
  render(<Options optionType="toppings" />, {wrapper: OrderDetailsProvider});

  //check the default toppings subtotal starts with $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", {exact: false});

  expect(toppingsTotal).toHaveTextContent("0.00");

  //tick the input checkbox and check the updated value
  const cherriesToppingCheckbox = await screen.findByRole("checkbox", {name: 'Cherries'});
  
  expect(cherriesToppingCheckbox).not.toBeChecked();

  userEvent.click(cherriesToppingCheckbox);
  expect(cherriesToppingCheckbox).toBeChecked();
  
  expect(toppingsTotal).toHaveTextContent("1.50");

  //tick the input in other checkbox and test the updated value
  const mAndMToppingCheckbox = await screen.findByRole("checkbox", {name: 'M&Ms'});

  expect(mAndMToppingCheckbox).not.toBeChecked();
  userEvent.click(mAndMToppingCheckbox);
  expect(mAndMToppingCheckbox).toBeChecked();

  expect(toppingsTotal).toHaveTextContent("3.00");

  //reverting when unclick one of the options
  userEvent.click(mAndMToppingCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
})