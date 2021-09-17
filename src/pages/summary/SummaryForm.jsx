import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
const SummaryForm = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        No ice cream will actuallly be delivered
      </Popover.Content>
    </Popover>
  );
  
  const checkboxLabel = (
    <span>
      I agree to 
      <OverlayTrigger placement="right" overlay={popover}>
         <span style={{color: 'blue'}}>Terms and Conditions</span>
      </OverlayTrigger>
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