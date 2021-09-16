import {render, screen, fireEvent} from '@testing-library/react'

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

    fireEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    fireEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
    
  })
})