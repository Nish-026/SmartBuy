let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let all_tag = document.querySelectorAll("form input");
  let signupObj = {};
  for (let i = 0; i < all_tag.length - 1; i++) {
    signupObj[all_tag[i].id] = all_tag[i].value;
  }
  console.log(signupObj);
  signupFun(signupObj);
});

async function signupFun(signupObj) {
  let data = await fetch(
    "http://localhost:4500/users/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupObj),
    }
  );
  if (data.status == 200) {
    alert("User Registered");
    window.location.href= "index.html"
  } else {
    alert(await data.text());
  }
}

