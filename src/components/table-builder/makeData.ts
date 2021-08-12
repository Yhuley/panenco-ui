import * as namor from 'namor';

function range(length) {
  return Array.from({ length }, (_, index) => index + 1);
}

const newPerson = () => {
  return {
    countryTo: namor.generate({ words: 1, numbers: 0 }),
    totalWeight: Math.floor(Math.random() * 30),
    trucksAmount: Math.floor(Math.random() * 30),
    attachment: namor.generate({ words: 1, numbers: 0 }),
    description: namor.generate({ words: 1, numbers: 0 }),
    toll: Math.floor(Math.random() * 100),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
