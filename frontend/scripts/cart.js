window.onload = (e) => {
    e.preventDefault;
    console.log("hi")
    fetch("http://localhost:4500/cart/",{
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            console.log(data)
        })
        .catch(err => console.log(err));

};