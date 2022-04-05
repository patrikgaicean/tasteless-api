import { createCanvas } from "canvas";

export const createImage = () => {
  // Dimensions for the image
  const width = 970;
  const height = 970;

  // Instantiate the canvas object
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Fill the rectangle with purple
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  context.fillStyle = `#${randomColor}`;
  context.fillRect(0, 0, width, height);

  // Write the image to file
  return canvas.toBuffer("image/png");
}
