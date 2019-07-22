export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
