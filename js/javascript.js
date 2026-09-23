// ==========================================
// PORTFOLIO JAVASCRIPT
// ==========================================


// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

if (menuBtn && navLinks) {

    // Open / Close mobile menu
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("show-menu");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a navigation link is clicked
    navigationLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show-menu");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}


// ==========================================
// 2. PROJECT FILTERING
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const filterProjectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Add active class to clicked button

        button.classList.add("active");


        // Get selected category

        const filter =
            button.getAttribute("data-filter");


        // Show / hide projects

        filterProjectCards.forEach(card => {

            const categories =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                categories.includes(filter)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// ==========================================
// 3. SCROLL REVEAL
// ==========================================

const revealElements = document.querySelectorAll(
    ".section-heading, .skill-card, .project-card, .timeline-item, .about-container"
);


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal-visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// ==========================================
// 4. ACTIVE NAVIGATION
// ==========================================

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >=
            sectionTop - 200
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ==========================================
// 5. SCROLL TO TOP BUTTON
// ==========================================

const scrollTopBtn =
    document.createElement("button");


scrollTopBtn.className =
    "scroll-top";


scrollTopBtn.innerHTML = "↑";


scrollTopBtn.setAttribute(
    "aria-label",
    "Scroll to top"
);


document.body.appendChild(scrollTopBtn);


// Show button after scrolling

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});


// Scroll to top

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
window.addEventListener("load", () => {

    const loader =
        document.getElementById("page-loader");

    if (loader) {

        loader.classList.add("hidden");

    }

});
// ==========================================
// 3D HERO PARTICLE BACKGROUND
// ==========================================

const canvas = document.getElementById("hero-3d");

if (canvas && typeof THREE !== "undefined") {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);

    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        size: 0.025,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0002;
        particles.rotation.y += mouseX * 0.001;
        particles.rotation.x += mouseY * 0.001;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    });
}
// ==========================================
// 3D PROJECT CARD TILT
// ==========================================

const tiltProjectCards =
    document.querySelectorAll(".project-card");


tiltProjectCards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();


        const cardCenterX =
            rect.left + rect.width / 2;

        const cardCenterY =
            rect.top + rect.height / 2;


        const mouseX =
            event.clientX - cardCenterX;

        const mouseY =
            event.clientY - cardCenterY;


        const rotateY =
            (mouseX / (rect.width / 2)) * 8;

        const rotateX =
            -(mouseY / (rect.height / 2)) * 8;


        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});
// ==========================================
// 3D SKILL CARD TILT
// ==========================================

const tiltSkillCards =
    document.querySelectorAll(".skill-card");


tiltSkillCards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();


        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -6;


        const rotateY =
            ((x - centerX) / centerX) * 6;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});
