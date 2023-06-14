// Lấy phần tử form và table
let form = document.querySelector(".form");
let tableBody = document.querySelector("tbody");
let btnUpdate = document.getElementById("btn-update");
let btnSubmit = document.getElementById("btn-submit");
let editingIndex = -1;

let data = [];

// Lấy tất cả các giá trị trong form
let productId = document.getElementById("productId");
let productName = document.getElementById("productName");
let price = document.getElementById("price");
let exportPrice = document.getElementById("export-price");
let date = document.getElementById("date");
let types = document.querySelectorAll('input[name="gender"]:checked');
let sizes = [];
let type = [];
let description = document.getElementById("description");

// Số lượng sản phẩm
let productCount = 0;

/**
 * Định dạng ngày/tháng/năm
 * @param {*} date
 * @returns
 */
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

/**
 * Kiểm tra các trường để trống
 * @param {*} fieldName
 * @returns True: nếu trường đó để trống và false nếu trường không để trống
 * Author: NVQUY(13/06/2023)
 */
let checkIsEmpty = function (fieldName) {
  if (fieldName === "" || fieldName === null || fieldName === undefined) {
    return true;
  } else {
    return false;
  }
};

/**
 * Hàm kiểm tra dữ liệu đầu vào
 * @returns true: nếu dữ liệu không hợp lệ, false: nếu dữ liệu không hợp lệ
 * Author: NVQUY(13/06/2023)
 */
function validateData() {
  let error = [];
  // Validate dữ liệu liệu đầu vào
  if (checkIsEmpty(productId.value)) {
    alert("Mã sản phẩm không được để trống");
    error.push("Mã sản phẩm không được để trống");
    return;
  }

  if (checkIsEmpty(productName.value)) {
    alert("Tên sản phẩm không được để trống");
    error.push("Tên sản phẩm không được để trống");
    return;
  }
  //  kiểm tra lỗi
  if (error.length > 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * Render lại dữ liệu trên bảng
 * Author: NVQUY(13/06/2023)
 */
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let record = data[i];
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${record[0]}</td>
      <td>${record[1]}</td>
      <td>${record[2]}</td>
      <td>${record[3]}</td>
      <td>${record[4]}</td>
      <td>${record[5]}</td>
      <td>${record[6]}</td>
      <td>${record[7]}</td>
      <td>
        <button onclick="editRecord(${i})">Sửa</button>
      </td>
      <td>
        <button onclick="deleteRecord(${i})">Xóa</button>
      </td>
    `;
    tableBody.appendChild(row);
  }
}

let typeValues = [];
function addData() {
  for (let i = 0; i < types.length; i++) {
    typeValues.push(types[i].value);
  }

  // Lấy giá trị từ các ô input checkbox cho trường "Size"
  let sizeCheckboxes = document.querySelectorAll(".size");
  let sizeValues = [];

  for (let i = 0; i < sizeCheckboxes.length; i++) {
    if (sizeCheckboxes[i].checked) {
      sizeValues.push(sizeCheckboxes[i].value);
    }
  }

  let productIdValue = productId.value;
  let productNameValue = productName.value;
  let priceValue = price.value;
  let exportValue = exportPrice.value;
  let dateValue = date.value;
  let descriptionValue = description.value;

  let record = [
    productIdValue,
    productNameValue,
    priceValue,
    exportValue,
    dateValue,
    sizeValues.join(", "),
    typeValues,
    descriptionValue,
  ];

  data.push(record);
}

/**
 * Reset các giá trị trong các ô input về rỗng
 * Author: NVQUy(13/06/2023)
 */
function resetData() {
  productId.value = "";
  productName.value = "";
  price.value = "";
  exportPrice.value = "";
  date.value = "";
  let listSize = document.querySelectorAll(".size");
  listSize[1].checked = false;
  listSize[2].checked = false;
  type.forEach((radio) => (radio.checked = true));
  description.value = "";
}

// Thêm mới dữ liệu
btnSubmit.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let valid = validateData();
  if (valid) {
    addData();
    renderTable();
    resetData();
  }
}

/**
 * Lấy thông tin bản ghi cần cập nhật lên form
 * @param {*} index
 * Author: NVQUY(13/04/2023)
 */
let sizeValues = [];
function editRecord(index) {
  let typeValues = [];
  for (let i = 0; i < types.length; i++) {
    typeValues.push(types[i].value);
  }
  // Lấy giá trị từ các ô input checkbox cho trường "Size"
  let sizeCheckboxes = document.querySelectorAll(".size");
  let sizeValues = [];
  for (let i = 0; i < sizeCheckboxes.length; i++) {
    if (sizeCheckboxes[i].checked) {
      sizeValues.push(sizeCheckboxes[i].value);
    }
  }
  let record = data[index];
  productId.value = record[0];
  productName.value = record[1];
  price.value = record[2];
  exportPrice.value = record[3];
  date.value = record[4];
  sizeValues = record[5].split(", ");
  // typeValues = record[6].split(", "); ????????????
  description.value = record[7];
  console.log("123");
  // Đổi nút Submit thành Update
  btnSubmit.textContent = "Update";
  btnSubmit.removeEventListener("click", handleSubmit);
  btnSubmit.addEventListener("click", updateRecord);
  editingIndex = index;
}

/**
 * Gán lại giá trị nhập vào từ form để cập nhật lại dữ liệu
 * Author: NVQUY(13/06/2023)
 */
function updateRecord(e) {
  e.preventDefault();
  console.log("1234");
  let productIdValue = productId.value;
  let productNameValue = productName.value;
  let priceValue = price.value;
  let exportValue = exportPrice.value;
  let dateValue = date.value;
  let descriptionValue = description.value;

  let record = data[editingIndex];
  record[0] = productIdValue;
  record[1] = productNameValue;
  record[2] = priceValue;
  record[3] = exportValue;
  record[4] = dateValue;
  record[5] = sizeValues.join(", ");
  record[6] = typeValues.join(", ");
  record[7] = descriptionValue;
  console.log(editingIndex);
  renderTable();
  resetData();
}

/**
 * Xóa thông tin một sản phẩm theo index
 * @param {*} index Vị trí cần xóa
 * Author: NVQUY(14/06/2023)
 */
function deleteRecord(index) {
  data.splice(index, 1);
  renderTable();
}
