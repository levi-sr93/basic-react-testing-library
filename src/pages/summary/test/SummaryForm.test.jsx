import {queryByText, render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm';

describe("Summary Form tests", () => {
  test("check the initial form state", () => {
    render(<SummaryForm />);

    const confirmButton = screen.getByRole('button', {name: /confirm order/i});
    const checkbox = screen.getByRole('checkbox', {name: /Terms and Conditions/i});

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  })

  test("Click checkbox enable button click and disable the button when clicked again", () => {
    render(<SummaryForm />);

    const confirmButton = screen.getByRole('button',  {name: /confirm order/i});
    const checkbox = screen.getByRole('checkbox', {name: /Terms and Conditions/i});

    userEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
    
  })

  test("Popover responds to hover", async () => {
    render(<SummaryForm />);
    // popover starts hidden
    const nullPopover = screen.queryByText(/no ice cream will actuallly be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    //popover appears when mouseover in label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popOver = screen.getByText(/no ice cream will actuallly be delivered/i);
    expect(popOver).toBeInTheDocument();

    //popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actuallly be delivered/i));
  })
})