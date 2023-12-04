const first = (input: string) => {
  const lines = input.split('\n');
  let sum = 0;
  for (const line of lines) {
    let first, last;
    for (const char of line) {
      const n = Number(char);
      if (n) {
        first = first ?? n;
        last = n;
      }
    }
    sum = sum + Number(`${first}${last}`);
  }

  return sum;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const lines = input.split('\n');
  let sum = 0;
  const mapperDigits: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const reverse = (s: string) => {
    return s.split('').reverse().join('');
  };

  const firstLetterDigitMatcher =
    /(\d|one|two|three|four|five|six|seven|eight|nine)/;
  const lastLetterDigitMatcher =
    /(\d|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno)/;

  for (const line of lines) {
    const firstDigitMatch: string | number = line.match(
      firstLetterDigitMatcher
    )[1];
    const lastDigitMatch: string | number = reverse(
      reverse(line).match(lastLetterDigitMatcher)[1]
    );

    const first: string | number = Number(firstDigitMatch)
      ? firstDigitMatch
      : mapperDigits[firstDigitMatch];
    const last: string | number = Number(lastDigitMatch)
      ? lastDigitMatch
      : mapperDigits[lastDigitMatch];

    sum = sum + Number(`${first}${last}`);
  }

  return sum;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
