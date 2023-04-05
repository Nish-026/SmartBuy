let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let all_tag = document.querySelectorAll("form input");
  let signinObj = {};
  for (let i = 0; i < all_tag.length - 1; i++) {
    signinObj[all_tag[i].id] = all_tag[i].value;
  }
  signinFun(signinObj);
});

async function signinFun(signinObj) {
  let data = await fetch(
    "http://localhost:4500/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signinObj),
    }
  )

  console.log(data);

  if (data.status == 200) {
    console.log(data);
    let token = await data.json();
    localStorage.setItem("token", token.token);
    localStorage.setItem("user", token.username);
    history.back();
  } else {
    console.log("wrong");
    Swal.fire('Wrong Credentials ❌')
  }
}