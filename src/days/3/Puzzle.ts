const first = (input: string) => {
  const lines = input.split('\n');

  let isOpenDigit = false;
  let isValidNumber = false;
  let tempDigits = [];
  let tempValidNumber = 0;
  const allDigits = [];
  let lineIndex = 0;
  for (const line of lines) {
    let charIndex = 0;
    for (const char of line) {
      const n = Number(char);
      isValidNumber = false;
      if (!isNaN(n)) {
        const firstRow = lineIndex === 0;
        const lastRow = lineIndex === lines.length - 1;
        const firstChar = charIndex === 0;
        const lastChar = charIndex === line.length - 1;

        // Controlliamo le verticali

        if (!firstRow) {
          const nCheck = lines[lineIndex - 1][charIndex];
          isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
        }

        if (!isValidNumber && !lastRow) {
          const nCheck = lines[lineIndex + 1][charIndex];
          isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
        }

        // Controlliamo le orizzontali

        if (!isValidNumber && !firstChar) {
          const nCheck = lines[lineIndex][charIndex - 1];
          isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
        }

        if (!isValidNumber && !lastChar) {
          const nCheck = lines[lineIndex][charIndex + 1];
          isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
        }

        // Controlliamo le diagonali

        if (!isValidNumber && !firstRow) {
          if (!firstChar) {
            const nCheck = lines[lineIndex - 1][charIndex - 1];
            isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
          }
          if (!isValidNumber && !lastChar) {
            const nCheck = lines[lineIndex - 1][charIndex + 1];
            isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
          }
        }

        if (!isValidNumber && !lastRow) {
          if (!firstChar) {
            const nCheck = lines[lineIndex + 1][charIndex - 1];
            isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
          }
          if (!isValidNumber && !lastChar) {
            const nCheck = lines[lineIndex + 1][charIndex + 1];
            isValidNumber = isNaN(Number(nCheck)) && nCheck !== '.';
          }
        }

        if (isValidNumber) {
          tempValidNumber++;
        }

        if (!isOpenDigit) {
          isOpenDigit = !isOpenDigit;
        }
        tempDigits.push(n);

        if (lastChar) {
          isOpenDigit = !isOpenDigit;
          if (tempValidNumber > 0) {
            allDigits.push(tempDigits.reduce((acc, num) => acc + num, ''));
          }
          tempDigits = [];
          tempValidNumber = 0;
        }
      } else if (isOpenDigit) {
        isOpenDigit = !isOpenDigit;
        if (tempValidNumber > 0) {
          allDigits.push(tempDigits.reduce((acc, num) => acc + num, ''));
        }
        tempDigits = [];
        tempValidNumber = 0;
      }

      charIndex++;
    }

    lineIndex++;
  }

  return allDigits.reduce((acc, num) => acc + Number(num), 0);
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const lines = input.split('\n');

  let isOpenDigit = false;
  let isValidNumber = false;
  let gearPositionX = 0;
  let gearPositionY = 0;
  let tempDigits = [];
  let tempValidNumber = 0;
  const allDigits = [];
  let lineIndex = 0;
  for (const line of lines) {
    let charIndex = 0;
    for (const char of line) {
      const n = Number(char);
      isValidNumber = false;
      if (!isNaN(n)) {
        const firstRow = lineIndex === 0;
        const lastRow = lineIndex === lines.length - 1;
        const firstChar = charIndex === 0;
        const lastChar = charIndex === line.length - 1;

        // Controlliamo le verticali

        if (!firstRow) {
          const nCheck = lines[lineIndex - 1][charIndex];
          isValidNumber = nCheck === '*';
          if (isValidNumber) {
            gearPositionX = charIndex;
            gearPositionY = lineIndex - 1;
          }
        }

        if (!isValidNumber && !lastRow) {
          const nCheck = lines[lineIndex + 1][charIndex];
          isValidNumber = nCheck === '*';

          if (isValidNumber) {
            gearPositionX = charIndex;
            gearPositionY = lineIndex + 1;
          }
        }

        // Controlliamo le orizzontali

        if (!isValidNumber && !firstChar) {
          const nCheck = lines[lineIndex][charIndex - 1];
          isValidNumber = nCheck === '*';

          if (isValidNumber) {
            gearPositionX = charIndex - 1;
            gearPositionY = lineIndex;
          }
        }

        if (!isValidNumber && !lastChar) {
          const nCheck = lines[lineIndex][charIndex + 1];
          isValidNumber = nCheck === '*';

          if (isValidNumber) {
            gearPositionX = charIndex + 1;
            gearPositionY = lineIndex;
          }
        }

        // Controlliamo le diagonali

        if (!isValidNumber && !firstRow) {
          if (!firstChar) {
            const nCheck = lines[lineIndex - 1][charIndex - 1];
            isValidNumber = nCheck === '*';

            if (isValidNumber) {
              gearPositionX = charIndex - 1;
              gearPositionY = lineIndex - 1;
            }
          }
          if (!isValidNumber && !lastChar) {
            const nCheck = lines[lineIndex - 1][charIndex + 1];
            isValidNumber = nCheck === '*';

            if (isValidNumber) {
              gearPositionX = charIndex + 1;
              gearPositionY = lineIndex - 1;
            }
          }
        }

        if (!isValidNumber && !lastRow) {
          if (!firstChar) {
            const nCheck = lines[lineIndex + 1][charIndex - 1];
            isValidNumber = nCheck === '*';

            if (isValidNumber) {
              gearPositionX = charIndex - 1;
              gearPositionY = lineIndex + 1;
            }
          }
          if (!isValidNumber && !lastChar) {
            const nCheck = lines[lineIndex + 1][charIndex + 1];
            isValidNumber = nCheck === '*';

            if (isValidNumber) {
              gearPositionX = charIndex + 1;
              gearPositionY = lineIndex + 1;
            }
          }
        }

        if (isValidNumber) {
          tempValidNumber++;
        }

        if (!isOpenDigit) {
          isOpenDigit = !isOpenDigit;
        }
        tempDigits.push(n);

        if (lastChar) {
          isOpenDigit = !isOpenDigit;
          if (tempValidNumber > 0) {
            allDigits.push({
              d: tempDigits.reduce((acc, num) => acc + num, ''),
              gearPosition: { x: gearPositionX, y: gearPositionY },
            });
          }
          tempDigits = [];
          tempValidNumber = 0;
        }
      } else if (isOpenDigit) {
        isOpenDigit = !isOpenDigit;
        if (tempValidNumber > 0) {
          allDigits.push({
            d: tempDigits.reduce((acc, num) => acc + num, ''),
            gearPosition: { x: gearPositionX, y: gearPositionY },
          });
        }
        tempDigits = [];
        tempValidNumber = 0;
      }

      charIndex++;
    }

    lineIndex++;
  }

  return allDigits
    .reduce((group, digit) => {
      const key = `[${digit.gearPosition.x}][${digit.gearPosition.y}]`;
      const index = group.findIndex((g) => g.key === key);
      if (index > -1) {
        group[index].digits.push(digit.d);
      } else {
        group.push({ key, digits: [digit.d] });
      }
      return group;
    }, [])
    .filter((d) => d.digits.length === 2)
    .map((d) => d.digits.reduce((qz, d) => qz * d, 1))
    .reduce((sum, d) => sum + d, 0);
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
