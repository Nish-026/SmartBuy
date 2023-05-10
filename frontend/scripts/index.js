
var swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 6.1,
    spaceBetween: 10,
    freeMode: true,
    autoplay:{
        delay:1000,
    },
});
var swiper2 = new Swiper(".mySwiperr", {
    cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    autoplay:{
        delay:1000,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    mousewheel: true,
    keyboard: true,
});


const carousel = document.querySelector(".slider2"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll("#up_third_row i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

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

$(window).on("load",function(){
    $("#loader_wrapper").fadeOut(3000)
})

let Logout_btn=document.getElementById("logout-btn")
Logout_btn.addEventListener("click",()=>{
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.href="index.html"
})