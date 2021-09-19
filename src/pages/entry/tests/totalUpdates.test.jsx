import {render, screen} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

test("update scoopt subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);


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
  render(<Options optionType="toppings" />);


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

describe("Grand Total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i})

    expect(grandTotal).toHaveTextContent('0.00');
  })

  test("grand total updates properly if scoops is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/i});
    expect(grandTotal).toHaveTextContent('0.00');

    //update vanilla scoop to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {name: 'Vanilla'});
    
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    //add cherries and check the grand total
    const cherriesToppings = await screen.findByRole("checkbox", {name: "Cherries"});
    expect(cherriesToppings).not.toBeChecked();
    
    userEvent.click(cherriesToppings);
    expect(grandTotal).toHaveTextContent('5.50');

  })

  test("grand total updates properly if toppings is added first", async () => {
    render(<OrderEntry />);

    //add cherries and check grandTotal
    const cherriesCheckbox = await screen.findByRole("checkbox", {name: 'Cherries'});

    expect(cherriesCheckbox).not.toBeChecked();

    const grandTotal = screen.getByRole("heading",  {name: /grand total: \$/i});
    expect(grandTotal).toHaveTextContent('0.00');

    userEvent.click(cherriesCheckbox);
    expect(cherriesCheckbox).toBeChecked();

    expect(grandTotal).toHaveTextContent("1.50");

    const chocolateTopping = await screen.findByRole("spinbutton", {name: "Chocolate"});
    userEvent.clear(chocolateTopping);
    userEvent.type(chocolateTopping, "2");

    expect(grandTotal).toHaveTextContent("5.50");
  })
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    //add cherries
    const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});

    userEvent.click(cherriesCheckbox);
    // grand total should be $1.50

    //updating vanilla scoops to 2; grand total should be $5.50;
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla"
    })

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    //remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i});
    expect(grandTotal).toHaveTextContent("3.50");

    //remove cherries and check grand total
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  })

})