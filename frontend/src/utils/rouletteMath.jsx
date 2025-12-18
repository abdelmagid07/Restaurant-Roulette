export function getWinner(items, rotation) {
  const slice = 360 / items.length;
  const index = Math.floor((rotation % 360) / slice);
  return items[items.length - 1 - index];
}


