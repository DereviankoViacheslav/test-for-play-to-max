// const suitsOfCards = [Diamonds, Hearts, Spades, Clubs];
const field = [
  ['S', 'S', 'C', 'D', 'C', 'C'],
  ['S', 'S', 'C', 'D', 'D', 'D'],
  ['S', 'C', 'C', 'D', 'D', 'D'],
  ['S', 'C', 'C', 'C', 'C', 'D'],
  ['H', 'C', 'C', 'C', 'H', 'H'],
  ['H', 'H', 'C', 'C', 'D', 'C'],
  ['H', 'H', 'H', 'S', 'S', 'C'],
];

function generateField(height, width) {
  // рандомные значения <<== +
  const gameField = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let value = field[y][x];
      // рандомные значения <<== +
      const item = { value, y, x, isMarked: false };
      gameField.push(item);
    }
  }
  return gameField;
}

function step(field, coordinateY, coordinateX) {
  const selectedItem = field.find(({ y, x }) => coordinateY === y && coordinateX === x);
  selectedItem.isMarked = true;
  const siblingItems = findNeighbors(field, selectedItem)
  .map((item) => {
    item.isMarked = true
    return item;
  });
  const resultArray = [selectedItem, ...siblingItems]
  let isLastItems = false;
  while (!isLastItems) {
    const nextItems = [];
    resultArray.forEach((item) => {
      const items = findNeighbors(field, item)
      .filter(({ isMarked }) => !isMarked)
      .map((item) => {
        item.isMarked = true
        return item;
      });
      nextItems.push(...items);
    });
    if (nextItems.length > 0) {
      resultArray.push(...nextItems);
    } else {
      isLastItems = true;
    }
  }
  return resultArray;
}

function findNeighbors(field, selectedItem) {
  const topItem = getTopItem(field, selectedItem);
  const bottomItem = getBottomItem(field, selectedItem);
  const rightItem = getRightItem(field, selectedItem);
  const leftItem = getLeftItem(field, selectedItem);
  
  const tempArray = [topItem, rightItem, bottomItem, leftItem]
  .reduce((acc, item) => {
    if (!item) return acc;
    return [...acc, item];
  }, []);
  
  return tempArray;
}

function getTopItem(field, item) {
  const topItem = field.find(({ y, x }) => item.y - 1 === y && item.x === x);
  return topItem && topItem.value === item.value ? topItem : null;
}

function getBottomItem(field, item) {
  const bottomItem = field.find(({ y, x }) => item.y + 1 === y && item.x === x);
  return bottomItem && bottomItem.value === item.value ? bottomItem : null;
}

function getRightItem(field, item) {
  const rightItem = field.find(({ y, x }) => item.y === y && item.x + 1 === x);
  return rightItem && rightItem.value === item.value ? rightItem : null;
}

function getLeftItem(field, item) {
  const leftItem = field.find(({ y, x }) => item.y === y && item.x - 1 === x);
  return leftItem && leftItem.value === item.value ? leftItem : null;
}

const gameField = generateField(7, 6);
console.log(step(gameField, 2, 3));