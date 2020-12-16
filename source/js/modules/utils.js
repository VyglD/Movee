const getNextArrayIndex = (currentIndex, arr) => {
  return (currentIndex + 1) % arr.length;
};

const getPreviousArrayIndex = (currentIndex, arr) => {
  return (currentIndex + (arr.length - 1)) % arr.length;
};

export {
  getNextArrayIndex,
  getPreviousArrayIndex,
};
