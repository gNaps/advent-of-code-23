const first = (input: string) => {
  const lines = input.split('\n');
  const times = lines[0]
    .split('Time:')[1]
    .split(' ')
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => Number(s));
  console.log(times);

  const distances = lines[1]
    .split('Distance:')[1]
    .split(' ')
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => Number(s));

  console.log('distances', distances);

  const totalWins = [];
  for (let j = 0; j < times.length; j++) {
    let winConditions = 0;
    for (let i = 1; i <= times[j]; i++) {
      const finalDistance = i * (times[j] - i);
      if (finalDistance > distances[j]) {
        winConditions++;
      }
    }
    if (winConditions) {
      totalWins.push(winConditions);
    }
  }
  const total = totalWins.reduce((acc, n) => acc * n, 1);
  return total;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const lines = input.split('\n');
  const times = [
    Number(
      lines[0]
        .split('Time:')[1]
        .split(' ')
        .filter((s) => s)
        .join('')
    ),
  ];

  const distances = [
    Number(
      lines[1]
        .split('Distance:')[1]
        .split(' ')
        .filter((s) => s)
        .join('')
    ),
  ];

  console.log('times', times);
  console.log('distances', distances);

  const totalWins = [];
  for (let j = 0; j < times.length; j++) {
    let winConditions = 0;
    for (let i = 1; i <= times[j]; i++) {
      const finalDistance = i * (times[j] - i);
      if (finalDistance > distances[j]) {
        winConditions++;
      }
    }
    if (winConditions) {
      totalWins.push(winConditions);
    }
  }
  const total = totalWins.reduce((acc, n) => acc * n, 1);
  return total;

  return 'ciao';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
