const Login_btn = document.getElementById("login_btn");
const logout_btn = document.getElementById("menu-btn");
const drop_logout = document.getElementById("logout-btn");
let User = localStorage.getItem("user")
if (User) {
    Login_btn.innerHTML = null;
    let user_heading = document.createElement("h4");
    user_heading.setAttribute("id", "user")
    user_heading.innerText = User + "😍";
    user_heading.style.fontSize = "16px";
    user_heading.style.color = "#464646";
    user_heading.style.fontWeight = "normal";
    logout_btn.style.display = "block";
    drop_logout.style.display = "block";
    logout_btn.append(user_heading);
}


let Logout_btn = document.getElementById("logout-btn")
Logout_btn.addEventListener("click", () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.href = "index.html"
})


let mainSection = document.getElementById("main")
let orderId= localStorage.getItem("orderId")
async function fetch_orders() {
    await fetch(`http://localhost:4500/order/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token")

        }
    })
        .then(res => res.json())
        .then(res => {
            let data=res[0]
            display(data)
        })
        .catch(error => {
            console.error(error);
        });

}
fetch_orders()


function display(data){
    let products=data.products
    let content= products.map((product)=>{
        return getCard(product)
    })
    mainSection.innerHTML=`
    <div id="main_section1">
       <p id="order_heading">Order Details: </p>
       <p>Order Placed On: ${data.Date.substring(0,15)}</p>
       <p>Total Price: <span>&#8377;</span>${data.Total_price}</p>
       <p>Items Bought: ${data.products.length}</p>
    </div>
    <div id="main_section2">
            ${content.join("")}
    </div>
    `
}

function getCard(product){
    return `
    <div id="product_div">
         <div id="img_div"><img src="${product[0].image1}"><p id="price"><span>&#8377</span>${product[0].price}</p></div>
         <h4>${product[0].name}</h4>
         <p>${product[0].description.substring(0,60)}...</p>
    <div>     
         
    `
}