import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SummaryForm = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{color: 'blue'}}>Terms and Conditions</span>
    </span>
  )

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isEnabled}
          id="I-agree-to-Terms-and-Conditions"
          aria-checked={isEnabled}
          onChange={e => setIsEnabled(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!isEnabled}
      >
        Confirm order
      </Button>
    </Form>
  )
}

export default SummaryForm;