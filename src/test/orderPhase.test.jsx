import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from '../App';

test("Order phase for happy path", async () => {
  //render the app
  render(<App />);

  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: 'Vanilla'
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", {name: 'Chocolate'});
  userEvent.clear(chocolateInput);
  userEvent.click(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: 'Cherries'
  })
  
  userEvent.click(cherriesCheckbox);

  //find and click the order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });

  userEvent.click(orderSummaryButton);
  
  //check the summary information based on order
  const summaryHeading = screen.getByRole("heading", {name: 'Order Summary'});
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"});
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {name: "Toppings: $1.50"});
  expect(toppingsHeading).toBeInTheDocument();

  //check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  /**
   * Alternatively...
   * const optionItems = screen.getAllByRole("listItem");
   * const optionItemsText = optionItems.map((item) => item.textContent);
   * expect(optionItemText).toEqual(['1 Vanilla', '2 Chocolare', 'Cherries']);
   */

  //accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })

  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  })

  userEvent.click(confirmOrderButton);

  //confirm order number on confirmation page
    //this one is async because there is a POST request to server in between and confirmation pages
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  })

  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument(); 

  //click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', {name: /new order/i});
  userEvent.click(newOrderButton);

  // check that scoops and toppings have been reset
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  //do we need to await anything to avaid test errors ?
  //wait for items to appear to make the tests pass
  await screen.findByRole("spinbutton", {name: "Vanilla"});
  await screen.findByRole("checkbox", {name: "Cherries"});
  
  
})