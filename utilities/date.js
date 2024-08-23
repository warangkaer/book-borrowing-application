module.exports.sumDate = (date, addDay) => {
  let newDate = new Date(date);
  newDate.setDate(date.getDate() + addDay);

  return newDate;
};
