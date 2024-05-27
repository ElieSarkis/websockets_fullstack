const isDateInCurrentMonth = (date) => {
  const now = new Date();
  const givenDate = new Date(date);
  return (
    givenDate.getFullYear() === now.getFullYear() &&
    givenDate.getMonth() === now.getMonth()
  );
};

module.exports = { isDateInCurrentMonth };
