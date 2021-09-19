import {render, screen} from '../../../test-utils/testing-library-utils';

import Options from '../Options';
test("displays image for each scoop from server(mockserver)", async () => {
  render(<Options optionType="scoops" />);

  //find the images
  const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i});

  //check if we have the right number
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
})

test("Displays image for each toppings options from server", async () => {
  render(<Options optionType="toppings" />)
  //find scoop images
  const toppingsImages = await screen.findAllByRole("img", {name: /toppings$/i});

  //check if we have the right amount of toppings returned
  expect(toppingsImages).toHaveLength(3);

  //confirm alt text of images
  const toppingsAltText = toppingsImages.map(img => img.alt);
  expect(toppingsAltText).toEqual(['Cherries toppings', 'M&Ms toppings', 'Hot fudge toppings']);
})