(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    const header = document.querySelector(".header");
    const ratings = document.querySelectorAll(".rating");
    const links = document.querySelectorAll("a");
    function mobileMenu() {
        const headerBc = document.querySelector(".header__bc");
        const headerHeight = header.offsetHeight;
        document.addEventListener("click", openMenu);
        function openMenu(e) {
            if (!e.target.closest(".header")) document.body.classList.remove("lock");
            if (e.target.closest(".icon-menu")) {
                header.classList.toggle("_menu-open");
                document.body.classList.toggle("lock");
            }
        }
        document.addEventListener("scroll", menuScrollBackground);
        function menuScrollBackground() {
            let scrollTop = window.pageYOffset;
            let clientHeight = document.documentElement.clientHeight;
            if (headerHeight && headerBc) if (scrollTop < clientHeight) if (scrollTop > 2 * headerHeight) {
                let opacity = Math.min(scrollTop / 2 / headerHeight, .8);
                headerBc.style.opacity = `${opacity}`;
            } else {
                let opacity = Math.min(scrollTop / 2 / headerHeight, .8);
                headerBc.style.opacity = `${opacity}`;
            } else headerBc.style.opacity = `0.8`;
        }
    }
    function initRatings() {
        let ratingActive, ratingValue;
        for (let i = 0; i < ratings.length; i++) {
            const rating = ratings[i];
            initRating(rating);
        }
        function initRating(rating) {
            initRatingVars(rating);
            setRatingActiveWidth();
            if (rating.classList.contains("editable")) setRating();
        }
        function initRatingVars(rating) {
            ratingActive = rating.querySelector(".rating__active");
            ratingValue = rating.querySelector(".rating__value");
        }
        function setRatingActiveWidth(value = ratingValue.innerHTML) {
            let ratingActiveValue;
            if (value >= 4.8) ratingActiveValue = 5; else if (value < 0) ratingActiveValue = 0; else ratingActiveValue = Math.floor(2 * value) / 2;
            const setRatingActiveWidth = ratingActiveValue / .05;
            ratingActive.style.width = `${setRatingActiveWidth}%`;
        }
        function setRating() {
            document.addEventListener("mouseover", (function(e) {
                if (e.target.closest(".rating")) {
                    let rating = e.target.closest(".rating");
                    const ratingItems = rating.querySelectorAll(".rating__item");
                    const ratingItemsActive = rating.querySelectorAll(".rating__item_active");
                    for (let i = 0; i < ratingItems.length; i++) {
                        const ratingItem = ratingItems[i];
                        ratingItemsActive[i];
                        ratingItem.addEventListener("mouseenter", (function(e) {
                            initRatingVars(rating);
                            setRatingActiveWidth(ratingItem.value);
                        }));
                        ratingItem.addEventListener("click", (function(e) {
                            initRatingVars(rating);
                            ratingValue.innerHTML = i + 1;
                            setRatingActiveWidth();
                        }));
                    }
                } else setRatingActiveWidth();
            }));
        }
    }
    if (header) mobileMenu();
    if (ratings.length > 0) initRatings();
    if (links) {
        initRatings();
        document.addEventListener("click", preventDefaultLinks);
        function preventDefaultLinks(e) {
            if (!e.target.closest(".header")) e.preventDefault();
        }
    }
    new Swiper(".swiper", {
        direction: "horizontal",
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            767: {
                slidesPerView: 2,
                spaceBetween: 34
            }
        }
    });
    AOS.init();
    window["FLS"] = true;
    isWebp();
})();