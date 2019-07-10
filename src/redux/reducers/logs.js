const defaultState = {
  supplements: [
    'Cod Liver Oil',
    'Magnesium',
    'MSM',
    'Vitamin D3',
    "Lion's Mane",
    'Cordyceps'
  ]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
