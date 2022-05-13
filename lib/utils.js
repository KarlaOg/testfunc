exports.prettifyErrors = (e) =>
  e.errors.reduce((acc, err) => {
    acc[err.path] = err.message;
    return acc;
  }, {});
