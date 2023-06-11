const Login_btn = document.getElementById("login_btn");
const logout_btn = document.getElementById("menu-btn");
const drop_logout = document.getElementById("logout-btn");
let User = localStorage.getItem("user")
if (User) {
    Login_btn.innerHTML = null;
    let user_heading = document.createElement("h4");
    user_heading.setAttribute("id", "user")
    console.log(user_heading);
    user_heading.innerText = User + "😍";
    user_heading.style.fontSize = "16px";
    user_heading.style.color = "#464646";
    user_heading.style.fontWeight = "normal";
    logout_btn.style.display = "block";
    drop_logout.style.display = "block";
    logout_btn.append(user_heading);
}

// $(window).on("load",function(){
//     $("#loader_wrapper").fadeOut(3000)
// })

let Logout_btn = document.getElementById("logout-btn")
Logout_btn.addEventListener("click", () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.href = "index.html"
})

let mainsection = document.getElementById("mainsection")
async function fetch_orders() {
    await fetch(`http://localhost:4500/order/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token")

        }
    })
        .then(res => res.json())
        .then(res => {
            let data = res
            if (res.length) {
                display(data)
            } else {
                display_empty()
            }
        })
        .catch(error => {
            console.error(error);
        });

}
fetch_orders()

function display(data) {

    let rows = data.map((order) => {
        return getRow(order)
    })
    mainsection.innerHTML = `
    <h2 id="Orders_heading">All Your Past Orders</h2>
    <table id="Table">
            <thead>
            <tr>
              <th>Order Id</th>
              <th>Date of Purchase</th>
              <th>Order Price</th>
              <th>Products</th>
            </tr>
            </thead>
            <tbody>
             ${rows.join("")}
            </tbody>
    </table>
    
    `;
    let view_buttons= document.getElementsByClassName("view_button")
    for( const button of view_buttons){
        button.addEventListener("click",()=>{
            data.map((order)=>{
                if(order.id==button.getAttribute("id")){
                    localStorage.setItem("orderId",order.id)
                    window.location.href="order.html"
                }
            })
        })
    }

}
function getRow(order) {
    return `
    <tr>
          <td>${order.id}</td>
          <td>Placed on: ${order.Date.substring(0, 15)}</td>
          <td><span>&#8377</span>${order.Total_price}</td>
          <td id="view_td">
          <button class="view_button" id=${order.id}>View Details👀</button>
          </td>
    </tr>
    `
}
function display_empty() {
    const empty_data = `
    <h2 id="empty_headline"> Your Cart is Empty ☹, Please Add Products :)</h2>
    `
    mainsection.innerHTML = empty_data
}