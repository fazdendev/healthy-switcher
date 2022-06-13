var burger = document.querySelector(".burger");
var header = document.querySelector(".header");

// toggle class on click
burger.addEventListener("click", function () {
  header.classList.toggle("header_mobile");
  
});
