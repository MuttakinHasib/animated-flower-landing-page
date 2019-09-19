function init() {
    const slides = document.querySelectorAll(".slide");
    const pages = document.querySelectorAll(".page");
    console.log(pages);

    const bg = [
        `radial-gradient(#2b3760,#0b1023)`,
        `radial-gradient(#4e3022,#161616)`,
        `radial-gradient(#4e4342,#161616)`
    ];

    let current = 0;
    let scrollSide = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener("click", function() {
            changeDots(this);
            nextSlide(index);
            scrollSide = index;
        });
    });

    function changeDots(dot) {
        slides.forEach(slide => {
            slide.classList.remove("dot-active");
        });
        dot.classList.add("dot-active");
    }
    function nextSlide(pageNumber) {
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector(".hero .hero-left");
        const nextRight = nextPage.querySelector(".hero .hero-right");
        const currentLeft = currentPage.querySelector(".hero .hero-left");
        const currentRight = currentPage.querySelector(".hero .hero-right");
        const nextText = nextPage.querySelector(".details");
        const portfolio = document.querySelector(".portfolio");
        const tl = new TimelineMax({
            onStart: function() {
                slides.forEach(slide => {
                    slide.style.pointerEvents = "all";
                });
            }
        });
        tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
            .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.02")
            .to(portfolio, 0.3, { backgroundImage: bg[pageNumber] })
            .fromTo(
                currentPage,
                0.3,
                { opacity: 1, pointerEvents: "all" },
                { opacity: 0, pointerEvents: "none" }
            )

            .fromTo(
                nextPage,
                0.3,
                { opacity: 0, pointerEvents: "none" },
                { opacity: 1, pointerEvents: "all" },
                "-=0.6"
            )
            .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.6")
            .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.8")
            .fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
            .set(nextLeft, { clearProps: "all" })
            .set(nextRight, { clearProps: "all" });
        current = pageNumber;
        // optional
        // document.addEventListener("wheel", throttle(scrollChange, 1500));
        // function switchDots(dotNumber) {
        //     const activeDot = document.querySelectorAll(".slide")[dotNumber];
        //     slides.forEach(slide => {
        //         slide.classList.remove("dot-active");
        //     });
        //     activeDot.classList.add("dot-active");
        // }
        // function scrollChange(e) {
        //     if (e.deltaY > 0) {
        //         scrollSide += 1;
        //     } else {
        //         scrollSide -= 1;
        //     }
        //     if (scrollSide > 2) {
        //         scrollSide = 0;
        //     }
        //     if (scrollSide > 0) {
        //         scrollSide = 2;
        //     }
        //     switchDots(scrollSide);
        //     nextSlide(scrollSide);
        // }
    }

    // function throttle(func, limit) {
    //     let inTrottle;
    //     return function() {
    //         const args = arguments;
    //         const context = this;
    //         if (!inTrottle) {
    //             func.apply(context, args);
    //             inTrottle = true;
    //             setTimeout(() => (inTrottle = false), limit);
    //         }
    //     };
    // }

    // hamburger

    const hamburger = document.querySelector(".hamburger");
    const hamburgerLine = document.querySelectorAll(".hamburger .cls-1");
    const navOpen = document.querySelector(".nav-open");
    const contact = document.querySelector(".contact");
    const social = document.querySelector(".social");
    const logo = document.querySelector(".logo");

    const tl = new TimelineMax({ paused: true, reversed: true });
    tl.to(navOpen, 0.5, {
        y: 0,
        height:"50vh"
    })
        .fromTo(
            contact,
            0.5,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0 },
            "-=0.1"
        )
        .fromTo(
            social,
            0.5,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0 },
            "-=0.2"
        )
        .fromTo(logo, 0.5, { color: "#fff" }, { color: "#000" }, "-=1")
        .fromTo(
            hamburgerLine,
            0.3,
            {
                fill: "#fff"
            },
            { fill: "black" },
            "-=.8"
        );

    hamburger.addEventListener("click", () => {
        tl.reversed() ? tl.play() : tl.reverse();
    });
}
init();
