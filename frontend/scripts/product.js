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
            display(data)
        })
        .catch(err => console.log(err));

};

let mainf_div=document.getElementById("brand_filter")
let filterdiv=document.createElement("div");
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
        addtoCart.innerHTML = "Add to Cart";
        addtoCart.addEventListener("click",()=>{
            console.log(ele["_id"])
            console.log(ele["price"])
            const data = {
                quantity: 1,
                product_Id:ele["_id"],
                price:ele["price"]
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
              
        })
        card.append(image, title, price, addtoCart)
        mainSection.append(card);
    })
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