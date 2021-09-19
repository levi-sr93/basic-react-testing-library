import {render, screen} from '@testing-library/react';
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