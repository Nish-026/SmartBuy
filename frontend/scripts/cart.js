

const getData = () => {
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
            display(data)
        })
        .catch(err => console.log(err));
}
getData()

let mainsection=document.getElementById("mainsection1")


function display(data) {
    mainsection.innerHTML = null;
    data.forEach((ele) => {
        const card = document.createElement("div");
        const image = document.createElement("img");
        image.setAttribute("src", ele.image1)
        const title = document.createElement("h6");
        title.innerHTML = ele.name
        const price = document.createElement("p");
        price.innerHTML = `<span>&#8377;</span>${ele.price}`
        let dropdown_div=document.createElement("div")
        let dropdown= document.createElement("select")
        let option1=document.createElement("option");
        option1.setAttribute("value","1")
        let option2=document.createElement("option");
        option1.innerHTML="1"
        option2.setAttribute("value","2")
        let option3=document.createElement("option");
        option2.innerHTML="2"
        option3.setAttribute("value","3")
        option3.innerHTML="3"
        let option4=document.createElement("option");
        option4.setAttribute("value","4")
        option4.innerHTML="4"
        dropdown.append(option1,option2,option3,option4)
        const remove = document.createElement("button");
        remove.innerHTML = "Remove";
        remove.addEventListener("click",()=>{
            let Id=ele["_id"]
              fetch(`http://localhost:4500/cart/delete/${Id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                   Authorization: localStorage.getItem("token")

                }
              })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                getData();
                getData2();
              })
              .catch(error => {
                console.error(error);
              });
              
        })
        card.append(image, title, price, dropdown,remove)
        mainsection.append(card);
        dropdown.addEventListener("change",(e)=>{
            console.log(dropdown.value)
            let Id=ele["_id"]
            console.log(Id)
            const payload={
                quantity:dropdown.value
            }
            fetch(`http://localhost:4500/cart/update/${Id}`,{
                method:"PATCH",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":localStorage.getItem("token")
                },
                body: JSON.stringify(payload)
            }).then(res=>res.json())
            .then(res=>{
                console.log(res)
                getData2();
            })
            .catch(err=>console.log(err))
        })
    })
}

let cartdata=document.getElementById("mainsection2")

const getData2 = () => {
    fetch("http://localhost:4500/cart/cartdata/",{
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            console.log(data)
            displaycartdata(data)
        })
        .catch(err => console.log(err));
}
getData2()
function displaycartdata(data){
    mainsection2.innerHTML = null;
    let price=0
    data.forEach((ele)=>{
        price+=(ele.price*ele.quantity)
    })
    let cartprice=document.createElement("p")
    cartprice.innerHTML=`Cart Total:Rs.${price}`;
    let placeorder=document.createElement("button")
    placeorder.innerText="Place Order"
    placeorder.addEventListener("click",()=>{
        mainsection.innerHTML=null;
        mainsection2.innerHTML=null;
        let cartempty=document.createElement("p")
        cartempty.innerText="YOUR CART IS EMPTY"
        window.location.assign("payment.html")
    })
    mainsection2.append(cartprice,placeorder)

}
