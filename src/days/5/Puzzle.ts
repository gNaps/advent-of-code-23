const buildMap = (inputString) => {
  return inputString.map((map) => {
    const [mapping, rangesStr] = map.split(' map:\n');
    const [from, to] = mapping.split('-to-');
    const ranges = rangesStr
      .split('\n')
      .map((range) => {
        const [to, from, len] = range
          .trim()
          .split(' ')
          .map((n) => parseInt(n));
        return { rangeStart: from, rangeEnd: from + len - 1, delta: to - from };
      })
      .sort((a, b) => a.rangeStart - b.rangeStart);
    return { from, to, ranges };
  });
};

const mapRangeToLocation = (from, [start, end], maps) => {
  if (from === 'location') {
    return [start, end];
  }
  // Se non stiamo cercando la location dobbiamo eseguire l'algortimo

  // targetMap sono i range di partenza
  const targetMap = maps.filter((m) => m.from === from)[0];

  // targetRanges è il target map in cui ci troviamo
  const targetRanges = targetMap.ranges.filter(
    (r) => r.rangeStart <= end && r.rangeEnd >= start
  );
  const nextRanges = [];

  // Cicliamo l'intervallo del valore
  for (let i = start; i <= end; ) {
    if (targetRanges.length === 0) {
      // Non abbiamo più target ranges da controllare, ci salviamo l'intervallo rimasto
      nextRanges.push([i, end]);
      break;
    }
    const match = targetRanges.find(
      (r) => r.rangeStart <= i && r.rangeEnd >= i
    );
    if (match) {
      // Troviamo un match nei target ranges
      const { rangeEnd, delta } = targetRanges.shift();
      const matchEnd = Math.min(end, rangeEnd);
      const nextRange = [i + delta, matchEnd + delta];
      nextRanges.push(nextRange);
      i = matchEnd + 1;
    } else {
      const { rangeStart } = targetRanges[0];
      const matchEnd = Math.min(end, rangeStart);
      const nextRange = [i, matchEnd];
      nextRanges.push(nextRange);
      i = matchEnd + 1;
    }
  }
  return nextRanges.flatMap(([start, end]) => {
    return mapRangeToLocation(targetMap.to, [start, end], maps);
  });
};

const first = (input: string) => {
  const lines = input.split('\n\n');
  const seeds = lines
    .shift()
    .split(':')[1]
    .trim()
    .split(' ')
    .map((n) => parseInt(n));
  const maps = buildMap(lines);

  return seeds
    .map((seed) => {
      const locationsForSeed = mapRangeToLocation('seed', [seed, seed], maps);
      return locationsForSeed.reduce(
        (a, b) => Math.min(a, b),
        Number.MAX_SAFE_INTEGER
      );
    })
    .reduce((a, b) => Math.min(a, b), Number.MAX_SAFE_INTEGER);
};

const second = (input: string) => {
  const lines = input.split('\n\n');
  const seeds = lines
    .shift()
    .split(':')[1]
    .trim()
    .split(' ')
    .map((n) => parseInt(n));
  const maps = buildMap(lines);

  const res = [];
  for (let i = 0; i < seeds.length; i += 2) {
    const seedRange = [seeds[i], seeds[i] + seeds[i + 1] - 1];
    const locations = mapRangeToLocation('seed', seedRange, maps);
    const minLocation = locations.reduce(
      (a, b) => Math.min(a, b),
      Number.MAX_SAFE_INTEGER
    );
    res.push(minLocation);
  }
  return res.reduce((a, b) => Math.min(a, b), Number.MAX_SAFE_INTEGER);
};

export { first, second };
