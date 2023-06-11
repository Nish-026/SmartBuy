let mainSection = document.getElementById("main")
const query = localStorage.getItem("clicked");
let sortvalue;
let brand_value;
window.onload = (e) => {
    e.preventDefault;
    fetch(`http://localhost:4500/product?${query}`)
        .then(res => res.json())
        .then((res) => {
            // console.log(res);
            const data = res;
            // console.log(data.brands);
            display_brands(data.brands);
            display(data.products);
        })
        .catch(err => console.log(err));

};


let brand_div = document.getElementById("brand_filter")
let filterdiv = document.createElement("div");
function display(data) {
    mainSection.innerHTML = null;
    data.forEach((ele) => {
        const card = document.createElement("div");
        const image = document.createElement("img");
        image.setAttribute("src", ele.image1)
        const title = document.createElement("h6");
        title.innerHTML = ele.name.substring(0,20)+".."
        const price = document.createElement("p");
        price.innerHTML = `<span>&#8377;</span>${ele.price}`
        const addtoCart = document.createElement("button");
        addtoCart.setAttribute("class", "addtoCart")
        addtoCart.innerHTML = "Add to Cart🛒";
        addtoCart.addEventListener("click", () => {
            const data = {
                quantity: 1,
                product_id: ele["_id"],
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
    let brand_div= document.getElementById("brand_filter")

    for(let key in data){
        const card = document.createElement("div");

        card.innerHTML = `<div class="form-check-brand" data_id=${key}>
                         <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value=${key}>
                         <label class="form-check-label" for="flexRadioDefault1">
                           ${key}
                         </label>
                      </div>`
                      brand_div.append(card);
    }
    // ----------------------------------------------- Filtering by brands  ---------------------------------------------------------//
const brands = document.getElementsByClassName("form-check-brand");
for (let j = 0; j < brands.length; j++) {
    brands[j].addEventListener("click", () => {
        console.log(brands[j])
        brand_value = brands[j].getAttribute("data_id");
        console.log(brand_value);
        fetch(`http://localhost:4500/product?${query}&${sortvalue}&${filtervalue}&brand=${brand_value}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                const data = res;
                display(data.products)
            })
            .catch(err => console.log(err));
    })
}



}

//---------------------------------------- For Sorting -----------------------------------------------// 

const sort = document.getElementById("form-select")
sort.addEventListener("change", () => {
    sortvalue = sort.value
    console.log(sort.value)
    fetch(`http://localhost:4500/product?${query}&${sortvalue}&${filtervalue}&${brand_value}`)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const data = res;
            display(data.products)
        })
        .catch(err => console.log(err));
})

//-------------------------------- Filtering by price ----------------------------------------------//
let filtervalue;
const filter = document.getElementsByClassName("form-check");
for (let j = 0; j < filter.length; j++) {
    filter[j].addEventListener("click", () => {
        filtervalue = filter[j].getAttribute("data_id");
        fetch(`http://localhost:4500/product?${query}&${sortvalue}&${filtervalue}&${brand_value}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                const data = res;
                display(data.products)
            })
            .catch(err => console.log(err));
    })
}







// --------------------------------------------------- Logout ------------------------------------------------------------------//
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
        window.location.href = "orders.html"
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