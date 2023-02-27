

let payment = document.querySelector("form");
payment.addEventListener("submit", function (event) {
  event.preventDefault();
  let obj = {
    email: payment.Email.value,
    mobile: payment.mobile.value
  };
  if (obj.email == "" || obj.mobile == "") {
    alert(" please  fill correct card  details");
  } else {
    localStorage.setItem("pay", "paid");
    window.location.href = "index.html";
  }
});