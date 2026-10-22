   const navbar = document.querySelector(".navbar");

        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", function (event) {
                const href = this.getAttribute("href");
                const target = href ? document.querySelector(href) : null;

                if (!target) return;

                event.preventDefault();

                const navbarHeight = navbar && getComputedStyle(navbar).position === "sticky"
                    ? navbar.getBoundingClientRect().height
                    : 0;

                const isMobile = window.matchMedia("(max-width: 650px)").matches;
                const extraSpace = isMobile ? 18 : 24;
                const targetTop = target.getBoundingClientRect().top + window.scrollY;
                const scrollTop = Math.max(0, targetTop - navbarHeight - extraSpace);

                window.scrollTo({
                    top: scrollTop,
                    behavior: "smooth"
                });
            });
        });

        // Scroll reveal animation
        const revealElements = document.querySelectorAll(
            "#about .about-box, #skills .skill-card, #projects .project-card, #contact .contact-box, .section-label, .section-title, .section-subtitle"
        );

        revealElements.forEach((element, index) => {
            element.classList.add("reveal");
            if (element.classList.contains("skill-card") ||
                element.classList.contains("project-card")) {
                element.style.transitionDelay = `${(index % 6) * 80}ms`;
            }
        });

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            }, { threshold: 0.12 });

            revealElements.forEach((element) => revealObserver.observe(element));
        } else {
            revealElements.forEach((element) => element.classList.add("show"));
        }

        // Home heading typing animation
        const homeText = document.querySelector(".hero-text h2");
        const words = [
            "Frontend Developer",
            "Web Developer",
            "JavaScript Learner",
            "React Developer"
        ];

        if (homeText) {
            let wordIndex = 0;
            let charIndex = words[0].length;
            let deleting = true;

            function autoType() {
                const word = words[wordIndex];

                if (deleting) {
                    charIndex--;
                    homeText.textContent = word.substring(0, Math.max(0, charIndex));

                    if (charIndex <= 0) {
                        deleting = false;
                        wordIndex = (wordIndex + 1) % words.length;
                        setTimeout(autoType, 250);
                        return;
                    }
                } else {
                    const nextWord = words[wordIndex];
                    charIndex++;
                    homeText.textContent = nextWord.substring(0, charIndex);

                    if (charIndex >= nextWord.length) {
                        deleting = true;
                        setTimeout(autoType, 1300);
                        return;
                    }
                }

                setTimeout(autoType, deleting ? 55 : 95);
            }

            setTimeout(autoType, 1300);
        }


        // EMAILJS CONTACT FORM
        const EMAILJS_PUBLIC_KEY = "KtVMycgCf3mI4oCub";
        const EMAILJS_SERVICE_ID = "service_drsa9z9";
        const OWNER_TEMPLATE_ID = "template_dzi9gxk";
        const THANK_YOU_TEMPLATE_ID = "template_53gd49p";
        const OWNER_EMAIL = "rehanlohar54@gmail.com";

        const contactForm = document.getElementById("contactForm");
        const formStatus = document.getElementById("formStatus");

        if (window.emailjs && contactForm && formStatus) {
            emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

            contactForm.addEventListener("submit", async function (event) {
                event.preventDefault();

                const submitButton = contactForm.querySelector('button[type="submit"]');
                const clientName = document.getElementById("name").value.trim();
                const clientEmail = document.getElementById("email").value.trim();
                const subject = document.getElementById("subject").value.trim();
                const message = document.getElementById("message").value.trim();

                if (!clientName || !clientEmail || !subject || !message) {
                    formStatus.textContent = "Please fill in all fields.";
                    formStatus.style.color = "#ff7777";
                    return;
                }

                const templateParams = {
                    client_name: clientName,
                    client_email: clientEmail,
                    name: clientName,
                    email: clientEmail,
                    from_name: clientName,
                    from_email: clientEmail,
                    user_name: clientName,
                    user_email: clientEmail,
                    subject: subject,
                    title: subject,
                    message: message,
                    reply_to: clientEmail,
                    to_email: OWNER_EMAIL
                };

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.style.opacity = "0.7";
                }
                formStatus.textContent = "Sending your message...";
                formStatus.style.color = "#a995ff";

                try {
                    // Send the visitor's message to the portfolio owner.
                    await emailjs.send(EMAILJS_SERVICE_ID, OWNER_TEMPLATE_ID, {
                        ...templateParams,
                        to_email: OWNER_EMAIL
                    });
                } catch (error) {
                    console.error("Owner email failed:", error);
                    formStatus.textContent = "Message could not be sent: " + (error?.text || error?.message || "Please check EmailJS Service ID and owner template settings.");
                    formStatus.style.color = "#ff7777";
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.style.opacity = "1";
                    }
                    return;
                }

                try {
                    // Send a thank-you email to the visitor.
                    await emailjs.send(EMAILJS_SERVICE_ID, THANK_YOU_TEMPLATE_ID, {
                        ...templateParams,
                        to_email: clientEmail
                    });
                    formStatus.textContent = "Message sent successfully! A confirmation email has been sent to you.";
                    formStatus.style.color = "#7ee7a1";
                    contactForm.reset();
                } catch (error) {
                    console.error("Thank-you email failed:", error);
                    formStatus.textContent = "Your message reached Rehan, but the thank-you email failed: " + (error?.text || error?.message || "Check the thank-you template settings.");
                    formStatus.style.color = "#ffcc80";
                    contactForm.reset();
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.style.opacity = "1";
                    }
                }
            });
        } else {
            console.error("EmailJS SDK or contact form not found. Check the EmailJS script tag and form IDs.");
        }

   
/* MOBILE NAVBAR TOGGLE */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".navbar")) {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
}




/* MOBILE + DESKTOP SCROLL REVEAL */
const animatedItems = document.querySelectorAll(
    ".skill-card, .project-card, .about-content, .contact-form, .contact-info"
);

animatedItems.forEach((item) => {
    item.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

animatedItems.forEach((item) => {
    revealObserver.observe(item);
});
