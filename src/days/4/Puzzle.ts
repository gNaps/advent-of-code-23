const first = (input: string) => {
  const lines = input.split('\n');
  const points = [];
  for (const line of lines) {
    const lineSplitted = line.split('|');
    const [_, winningNumbersNotFormatted] = lineSplitted[0]
      .replace('Card ', '')
      .split(': ');
    const winningNumbers = winningNumbersNotFormatted.trim().split(' ');

    const cardNumbers = lineSplitted[1]
      .trim()
      .split(' ')
      .filter((n) => n);

    let power = 0;
    for (const n of cardNumbers) {
      if (winningNumbers.includes(n)) {
        power++;
      }
    }

    points.push(power - 1);
  }

  return points.reduce(
    (acc, num) => acc + (num > -1 ? Math.pow(2, num) : 0),
    0
  );
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const lines = input.split('\n');
  const counterCards = {};
  for (const line of lines) {
    const lineSplitted = line.split('|');
    const [cardId, winningNumbersNotFormatted] = lineSplitted[0]
      .replace('Card ', '')
      .split(': ');
    const winningNumbers = winningNumbersNotFormatted.trim().split(' ');

    if (!counterCards[Number(cardId)]) {
      counterCards[Number(cardId)] = 0;
    }
    counterCards[Number(cardId)]++;

    const cardNumbers = lineSplitted[1]
      .trim()
      .split(' ')
      .filter((n) => n);

    let power = 0;
    for (const n of cardNumbers) {
      if (winningNumbers.includes(n)) {
        power++;
      }
    }

    for (let j = 0; j < counterCards[Number(cardId)]; j++) {
      for (let i = 0; i < power; i++) {
        if (!counterCards[Number(cardId) + i + 1]) {
          counterCards[Number(cardId) + i + 1] = 0;
        }
        counterCards[Number(cardId) + i + 1]++;
      }
    }
  }

  const sum = Object.values(counterCards).reduce(
    (acc: number, value: number) => acc + value,
    0
  );

  return sum;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
