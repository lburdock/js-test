const timer = (callback) => {
  setTimeout(() => {
    if (callback) callback();
  }, 1000);
};

export default timer;
