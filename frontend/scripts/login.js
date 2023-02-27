const onLogin=()=>{
    const payload={
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
    fetch("http://localhost:4500/users/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
      console.log(res)
      localStorage.setItem("token",res.token)
      window.location.assign("index.html")
      
    })
    .catch(err=>console.log(err))
}