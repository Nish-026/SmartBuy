let mainSection = document.getElementById("main")
const query = localStorage.getItem("clicked");
let sortvalue;
window.onload = (e) => {
    e.preventDefault;
    console.log("hi")
    console.log(query);
    fetch(`http://localhost:4500/product?${query}`)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            console.log(data.brands);
            display_brands(data.brands);
            display(data.products);
        })
        .catch(err => console.log(err));

};


let mainf_div = document.getElementById("brand_filter")
let filterdiv = document.createElement("div");
function display(data) {
    mainSection.innerHTML = null;
    data.forEach((ele) => {
        const card = document.createElement("div");
        const image = document.createElement("img");
        image.setAttribute("src", ele.image1)
        const title = document.createElement("h6");
        title.innerHTML = ele.name
        const price = document.createElement("p");
        price.innerHTML = `<span>&#8377;</span>${ele.price}`
        const addtoCart = document.createElement("button");
        addtoCart.innerHTML = "Add to Cart 🛒";
        addtoCart.addEventListener("click", () => {
            console.log(ele["_id"])
            console.log(ele["price"])
            const data = {
                quantity: 1,
                product_Id: ele["_id"],
                price: ele["price"]
            };
            fetch('http://localhost:4500/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token")

                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.error(error);
                });
            Swal.fire('Added to cart 🤩')
        })
        card.append(image, title, price, addtoCart)
        mainSection.append(card);
    })
}

function display_brands(data) {
    // data={}; { Fig: 1, 'H&M': 1, Levis: 1 }
    let brand_div= document.getElementById("brand_filter")

    for(let key in data){
        const card = document.createElement("div");

        card.innerHTML = `  <div class="form-check" data_id="min=0&max=100">
                         <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1">
                         <label class="form-check-label" for="flexRadioDefault1">
                           ${key}
                         </label>
                      </div>`
                      brand_div.append(card);
    }



}

const sort = document.getElementById("form-select")
console.log(sort)

sort.addEventListener("change", () => {
    sortvalue = sort.value
    fetch(`http://localhost:4500/product?${query}&${sortvalue}&${filtervalue}`)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            display(data)
        })
        .catch(err => console.log(err));
})
let filtervalue;
const filter = document.getElementsByClassName("form-check");
for (let j = 0; j < filter.length; j++) {
    filter[j].addEventListener("click", () => {
        filtervalue = filter[j].getAttribute("data_id");
        fetch(`http://localhost:4500/product?${query}&${sortvalue}&${filtervalue}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                const data = res;
                display(data)
            })
            .catch(err => console.log(err));
    })
}


let Logout_btn = document.getElementById("logout-btn")
Logout_btn.addEventListener("click", () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.href = "index.html"
})

const Login_btn = document.getElementById("login_btn");
const logout_btn = document.getElementById("menu-btn");
const drop_logout = document.getElementById("logout-btn");
let User = localStorage.getItem("user")
if (User) {
    Login_btn.innerHTML = null;
    let user_heading = document.createElement("h4");
    console.log(user_heading);
    user_heading.innerText = User + "😍";
    user_heading.style.fontSize = "16px";
    user_heading.style.color = "#464646";
    user_heading.style.fontWeight = "normal";
    logout_btn.style.display = "block";
    drop_logout.style.display = "block";
    logout_btn.append(user_heading);
}

const pleaselogin = () => {
    let User = localStorage.getItem("user")
    if (User) {
        window.location.href = order.html
    } else {
        Swal.fire('Please Login first')
    }

}

const pleaselogin_cart = () => {
    let User = localStorage.getItem("user")
    if (User) {
        window.location.href ="cart.html"
    } else {
        Swal.fire('Please Login first')
    }

}

const get = (e) => {

    const query_value = e.getAttribute("data_id")
    console.log(query_value);
    localStorage.setItem("clicked", query_value)
}

const get1 = (e) => {

    const query_value = e.getAttribute("data_id")
    console.log(query_value);
    localStorage.setItem("clicked", query_value)

}