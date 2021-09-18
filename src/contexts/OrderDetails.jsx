import {createContext, useContext, useState, useMemo, useEffect} from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext();

//Create custom hook check we're inside a provider
export function useOrderDetails(){
  const context = useContext(OrderDetails);

  if(!context) {
    throw new Error("useOrderDetails must be used within an OrderDetailsProvider");
  }
  
  return context;
}

function calculateSubtotal(optiontype, optionCounts) {
  let optionCount = 0;
  for(const count of optionCounts[optiontype].values()){
    optionCount += count;
  }

  return optionCount * pricePerItem[optiontype];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, seOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);

    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal
    })
  }, [optionCounts])

  const value = useMemo(() => {

    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = {...optionCounts }

      //update options count for this item with new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      seOptionCounts(newOptionCounts)
    }

    // array returns the getter and setter
    // getter: object containing options counts for scoops and toppings, subtotal and totals
    // setter: updateOptionsCount
    return [{ ...optionCounts, totals }, updateItemCount]
  }, [optionCounts, totals])
  return (
    <OrderDetails.Provider value={value} {...props} />
  )
}