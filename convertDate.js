let formatDate = (date) => {
  // Lấy ra thời gian hiện tại
  let dateTime = new Date(date);
  let day = dateTime.getDay();
  if (day > 0 && day < 10) {
    day = `0${day}`;
  }
  let month = dateTime.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }
  let year = dateTime.getFullYear();
  return `${day}-${month}-${year}`;
};

let date = new Date();
console.log(date);

console.log(formatDate(new Date()));

let size = document.querySelectorAll(".size");
console.log("size", size);
