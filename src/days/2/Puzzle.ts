const first = (input: string) => {
  const lines = input.split('\n');
  const oracle: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sum = 0;
  for (const line of lines) {
    const splitted = line.split(':');
    const gameId = Number(splitted[0].replaceAll('Game ', ''));
    const games = splitted[1].split(';');

    let isGamePossible = false;
    for (const game of games) {
      const gameTry = game.split(',').map((s) => {
        const cubesData = s.trimStart().split(' ');
        return Number(cubesData[0]) <= oracle[cubesData[1]];
      });

      isGamePossible = !gameTry.some((gt: boolean) => !gt);
      if (!isGamePossible) {
        break;
      }
    }

    if (isGamePossible) {
      sum = sum + gameId;
    }
  }

  return sum;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const lines = input.split('\n');
  const minimumCubes: any = {};
  for (const line of lines) {
    const splitted = line.split(':');
    const gameId = Number(splitted[0].replaceAll('Game ', ''));
    const games = splitted[1].split(';');

    if (!minimumCubes[gameId]) {
      minimumCubes[gameId] = {
        blue: 0,
        red: 0,
        green: 0,
      };
    }

    for (const game of games) {
      const gameTry = game.split(',').map((s) => s.trimStart().split(' '));

      for (const gt of gameTry) {
        const n = Number(gt[0]);
        const color = gt[1];
        if (minimumCubes[gameId][color] < n) {
          minimumCubes[gameId][color] = n;
        }
      }
    }
  }

  const sumPowers = Object.values(minimumCubes).reduce(
    (acc: any, cube: any) => {
      acc += cube.blue * cube.red * cube.green;
      return acc;
    },
    0
  );

  return sumPowers;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
