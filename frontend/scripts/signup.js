const bars = document.querySelector("#bars"),
  strengthDiv = document.querySelector("#strength"),
  passwordInput = document.querySelector("#password");

const strength = {
  1: "weak",
  2: "medium",
  3: "strong",
};

const getIndicator = (password, strengthValue) => {
  for (let index = 0; index < password.length; index++) {
    let char = password.charCodeAt(index);
    if (!strengthValue.upper && char >= 65 && char <= 90) {
      strengthValue.upper = true;
    } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
      strengthValue.numbers = true;
    } else if (!strengthValue.lower && char >= 97 && char <= 122) {
      strengthValue.lower = true;
    }
  }

  let strengthIndicator = 0;

  for (let metric in strengthValue) {
    if (strengthValue[metric] === true) {
      strengthIndicator++;
    }
  }

  return strength[strengthIndicator] ?? "";
};

const getStrength = (password) => {
  let strengthValue = {
    upper: false,
    numbers: false,
    lower: false,
  };

  return getIndicator(password, strengthValue);
};

const handleChange = () => {
  let { value: password } = passwordInput;

  console.log(password);

  const strengthText = getStrength(password);

  bars.classList = "";

  if (strengthText) {
    strengthDiv.innerText = `${strengthText} Password`;
    bars.classList.add(strengthText);
  } else {
    strengthDiv.innerText = "";
  }
};


const signup=()=>{
  const payload={
      name:document.getElementById("name").value,
      email:document.getElementById("email").value,
      password:document.getElementById("password").value,
      mobile:document.getElementById("mobile").value
  }
  fetch("http://localhost:4500/users/register",{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify(payload)
  }).then(res=>res.json())
  .then(res=>{
    if(res.msg=="success"){
      window.location.assign("index.html")
    }else{
      strengthDiv.innerText="Your're already Registered, Please Log in"
      setTimeout(()=>{
        window.location.assign("login.html")
      },"2000")
    }
  })
  .catch(err=>console.log(err))
}

