const field = [
  ['♠', '♠', '♣', '♢', '♣', '♣'],
  ['♠', '♠', '♣', '♢', '♢', '♢'],
  ['♠', '♣', '♣', '♢', '♢', '♢'],
  ['♠', '♣', '♣', '♣', '♣', '♢'],
  ['♡', '♣', '♣', '♣', '♡', '♡'],
  ['♡', '♡', '♣', '♣', '♢', '♣'],
  ['♡', '♡', '♡', '♠', '♠', '♣'],
];

function generateFieldData() {
  const gameField = [];
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      let value = field[y][x];
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
  return resultArray.map(({ y, x }) => ([y, x]));
}

function findNeighbors(field, selectedItem) {
  const { value, y: cY, x: cX } = selectedItem;
  const topItem = field.find(({ y, x }) => cY - 1 === y && cX === x);
  const bottomItem = field.find(({ y, x }) => cY + 1 === y && cX === x);
  const rightItem = field.find(({ y, x }) => cY === y && cX + 1 === x);
  const leftItem = field.find(({ y, x }) => cY === y && cX - 1 === x);

  const tempArray = [topItem, rightItem, bottomItem, leftItem]
    .reduce((acc, item) => {
      if (!item || item.value !== value) return acc;
      return [...acc, item];
    }, []);

  return tempArray;
}

function showField(selectedItems) {
  let str = '';
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      let value = field[y][x];
      if (selectedItems && selectedItems.length > 0) {
        value = selectedItems.find(([cY, cX]) => cY === y && cX === x) ? ' ' : value;
      }
      str = `${str} ${value}`
    }
    str += '\n';
  }
  console.log(str);
}

const gameFieldData = generateFieldData();
showField();
showField(step(gameFieldData, 3, 2));