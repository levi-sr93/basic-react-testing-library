import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import ScoopOptions from './ScoopOptions';
import ToppingsOptions from './ToppingsOptions';
import AlertBanner from '../common/AlertBanner';

export default function Options({optionType}){
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data) )
      .catch(error => {
        setError(true);
      })
  }, [optionType])

  if(error) {
    return <AlertBanner />
  }
  //replace with ToppingOptions when available
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingsOptions;

  const optionItems = items.map((item) => (
    <ItemComponent
       key={item.name}
       name={item.name}
       imagePath={item.imagePath}
     />
  ))

  return <Row>{optionItems}</Row>
}