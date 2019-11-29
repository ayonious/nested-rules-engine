export const functions = {
  you_are_a_human: ({ type }) => {
    return type === 'human';
  },
  buy_alcohol: () => {
    return {
      productBought: 'alcohol',
    };
  },
};
