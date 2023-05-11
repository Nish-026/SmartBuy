
let mainsection=document.getElementById("mainsection1");
let cart_data= document.getElementById("mainsection2");
let cart_details_div=document.getElementById("cart_details")
let cart_items=0;
let flag="no"
const getData = () => {
    fetch("http://localhost:4500/cart/",{
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then((res) => {
            const data = res;
            let products=res.products;
            let cart= res.cart
            cart_items=products.length;
            // console.log(data)
            display(products,cart)
            displaycartdata(cart)
        })
        .catch(err => console.log(err));
}
getData()


function display(products,cart) {
    mainsection.innerHTML = null;
    products.forEach((ele) => {
        const card = document.createElement("div");
        card.setAttribute("id", "card")
        const img_div=document.createElement("div");
        const data_div=document.createElement("div");
        const image = document.createElement("img");
        image.setAttribute("src", ele.image1)
        const title = document.createElement("h6");
        title.innerHTML = ele.name
        const price = document.createElement("p");
        price.innerHTML = `<span>&#8377;</span>${ele.price}`
        let select_qty=document.createElement("div")
        select_qty.setAttribute("id", "select_qty_div")
        let plus=document.createElement("p");
        plus.setAttribute("id", "plus")
        plus.innerHTML="+"
        let minus=document.createElement("p");
        minus.innerHTML="-";
        minus.setAttribute("id", "minus")
        let qty_div= document.createElement("div");
        qty_div.setAttribute("id", "qty_div");
        let qty=document.createElement("p");
        let qty_value;
        cart[0].items.forEach((element)=>{
            if(element.product_id==ele._id){
                qty_value=element.quantity
            }
        })
        qty.innerHTML=qty_value
        qty_div.append(qty)
        select_qty.append(plus,qty_div,minus)
        const remove = document.createElement("button");
        remove.setAttribute("id", "remove_btn")
        remove.innerHTML = "Remove❌";
        remove.addEventListener("click",()=>{
            let Id=ele["_id"]
            console.log(Id)
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
              })
              .catch(error => {
                console.error(error);
              });
              
        })
        img_div.append(image);
        data_div.append(title, price, select_qty,remove)
        card.append(img_div,data_div)
        mainsection.append(card);
        plus.addEventListener("click",(e)=>{
            let Id=ele["_id"]
            console.log(ele.quantity)
            const payload={
                quantity:ele.quantity
            }
            fetch(`http://localhost:4500/cart/increment/${Id}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":localStorage.getItem("token")
                },
            }).then(res=>res.json())
            .then(res=>{
                getData();
            })
            .catch(err=>console.log(err))
        })

        minus.addEventListener("click",(e)=>{
            let Id=ele["_id"]
            console.log(ele.quantity)
            const payload={
                quantity:ele.quantity
            }
            fetch(`http://localhost:4500/cart/decrement/${Id}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":localStorage.getItem("token")
                },
            }).then(res=>res.json())
            .then(res=>{
                getData();
            })
            .catch(err=>console.log(err))
        })
    })
}





function displaycartdata(data){
    cart_details_div.innerHTML=null;
    let cartprice=document.createElement("p");
    let items=document.createElement("p");
    items.innerText=`Price Details:(${data[0].items.length})`;
    let price=0
    let con_fee=document.createElement("p");
    cartprice.innerHTML=`Total MRP:                 ₹${data[0].total_price}`;
    if(data[0].total_price>600){
        con_fee.innerText="Convenience Fee: FREE"
    }else{
        con_fee.innerText= "Convenience Fee: ₹99"
    }
    let placeorder=document.createElement("button")
    placeorder.innerText="Place Order"
    placeorder.setAttribute("id","place_order")
    placeorder.addEventListener("click",()=>{
        window.location.assign("payment.html")
    })
    cart_details_div.append(items,cartprice,con_fee,placeorder)

}

const get=(e)=>{

    const query_value=e.getAttribute("data_id")
    console.log(query_value);
    localStorage.setItem("clicked",query_value)
}

const get1=(e)=>{

    const query_value=e.getAttribute("data_id")
    console.log(query_value);
    localStorage.setItem("clicked",query_value)

}

const pleaselogin=()=>{
    let User= localStorage.getItem("user")
if(User){
    window.location.href=order.html
}else{
    Swal.fire('Please Login first')
}

}

const pleaselogin_cart=()=>{
    console.log("hi")
    let User= localStorage.getItem("user")
if(User){
    window.location.href="cart.html"
}else{
    Swal.fire('Please Login first')
}

}

const Login_btn= document.getElementById("login_btn");
const logout_btn=document.getElementById("menu-btn");
const drop_logout=document.getElementById("logout-btn");
let User= localStorage.getItem("user")
if(User){
    Login_btn.innerHTML=null;
    let user_heading= document.createElement("h4");
    console.log(user_heading);
    user_heading.innerText=User+"😍";
    user_heading.style.fontSize="16px";
    user_heading.style.color="#464646";
    user_heading.style.fontWeight="normal";
    logout_btn.style.display="block";
    drop_logout.style.display="block";
    logout_btn.append(user_heading);
}

// $(window).on("load",function(){
//     $("#loader_wrapper").fadeOut(3000)
// })

let Logout_btn=document.getElementById("logout-btn")
Logout_btn.addEventListener("click",()=>{
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.href="index.html"
})


// const getcouponData = () => {
//     fetch("http://localhost:4500/orders/",{
//         headers: {
//             Authorization: localStorage.getItem("token")
//         }
//     })
//         .then(res => res.json())
//         .then((res) => {
//             // console.log(res);
//             const data = res;
//             // console.log(data)
//             display_coupon(data)
//         })
//         .catch(err => console.log(err));
// }
// getcouponData()

// function display_coupon(data){
//     console.log("hi")
//     if(data.length){
//         let coupon_div=document.createElement("div");
//         coupon_div.setAttribute("id", "coupon_Div");
//         let coupon= document.createElement("p");
//         coupon.innerHTML= "Loyalty Discount 🤗";
//         let coupon_btn= document.createElement("button");
//         coupon_btn.innerHTML= "Apply Coupon"
//         coupon_btn.addEventListener("click",()=>{
//             if(flag=="no"){
//                 price=price-(price*0.1)
//                 cartprice.innerHTML=`Cart Total:Rs.${price}`;
//                 flag="yes"
//             }else{
//                 Swal.fire("Already Applied !")
//             }

//         })
//         coupon_div.append(coupon,coupon_btn)
//         cartdata.append(coupon_div)
//     }else{
//         let coupon= document.createElement("p");
//         coupon.innerHTML= "Welcome Discount 🤑"
//         cartdata.append(coupon)

//     }
// }
