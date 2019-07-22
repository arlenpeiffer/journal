export const loadState = () => {
  const reduxState = localStorage.getItem('reduxState');
  return reduxState ? JSON.parse(reduxState) : undefined;
};

export const saveState = state => {
  localStorage.setItem('reduxState', JSON.stringify(state));
};
