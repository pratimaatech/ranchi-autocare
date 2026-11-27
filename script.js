/* Ranchi AutoCare — interactions and GSAP animations */

"use strict";

// IMPORTANT: Replace this demo number with the real business WhatsApp number.
// Format: country code + mobile number, no +, spaces or hyphens.
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const progress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const bookingForm = document.getElementById("bookingForm");
  const formError = document.getElementById("formError");

  // Current year in footer.
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Mobile navigation open / close.
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("open", !isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  });

  // Close mobile menu after selecting a section.
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  // Header, scroll progress and back-to-top button.
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
    progress.style.width = `${percentage}%`;
    header.classList.toggle("scrolled", scrollTop > 30);
    backToTop.classList.toggle("visible", scrollTop > 500);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Highlight navigation link for the visible section.
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Service category filter.
  const filterButtons = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      serviceCards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  // Clicking a service or package enquiry preselects it in the form.
  document.querySelectorAll("[data-service], [data-package]").forEach((link) => {
    link.addEventListener("click", () => {
      const selected = link.dataset.service || link.dataset.package;
      const select = document.getElementById("serviceSelect");
      const matchingOption = [...select.options].find((option) => option.text.toLowerCase() === selected.toLowerCase());
      if (matchingOption) select.value = matchingOption.value;
    });
  });

  // Validate the form and open WhatsApp with the enquiry details.
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formError.textContent = "";

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const service = document.getElementById("serviceSelect").value;
    const message = document.getElementById("customerMessage").value.trim();

    const digitsOnly = phone.replace(/\D/g, "");
    if (name.length < 2) {
      formError.textContent = "Please enter your name (at least 2 characters).";
      document.getElementById("customerName").focus();
      return;
    }
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      formError.textContent = "Please enter a valid phone number.";
      document.getElementById("customerPhone").focus();
      return;
    }
    if (!service) {
      formError.textContent = "Please select the service you need.";
      document.getElementById("serviceSelect").focus();
      return;
    }
    if (!/^\d{10,13}$/.test(WHATSAPP_NUMBER)) {
      formError.textContent = "Demo setup: add the business WhatsApp number in script.js before testing the enquiry.";
      return;
    }

    const enquiry = [
      "Hello, I would like to enquire about your car care services.",
      "",
      `Name: ${name}`,
      `Customer phone: ${phone}`,
      `Service: ${service}`,
      `Message: ${message || "No additional message"}`
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry)}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });

  // Floating WhatsApp button.
  document.getElementById("whatsappFloat").addEventListener("click", (event) => {
    event.preventDefault();
    if (!/^\d{10,13}$/.test(WHATSAPP_NUMBER)) {
      alert("Please add the business WhatsApp number in script.js first.");
      return;
    }
    const message = "Hello, I want to know more about your car wash and detailing services.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  // GSAP animations. The website still works if GSAP/CDN is unavailable.
  if (window.gsap) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      gsap.from(".hero .eyebrow", { y: 22, opacity: 0, duration: 0.7, delay: 0.15, ease: "power3.out" });
      gsap.from(".hero h1", { y: 45, opacity: 0, duration: 1, delay: 0.28, ease: "power3.out" });
      gsap.from(".hero-copy, .hero-actions, .hero-meta", {
        y: 25, opacity: 0, duration: 0.75, delay: 0.55, stagger: 0.13, ease: "power3.out"
      });
      gsap.to(".hero-bg", { scale: 1, duration: 1.8, ease: "power2.out" });

      if (window.ScrollTrigger) {
        gsap.utils.toArray(".service-card, .feature, .package-card, .contact-detail").forEach((element) => {
          gsap.from(element, {
            y: 35, opacity: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true }
          });
        });
        gsap.utils.toArray(".reveal").forEach((element) => {
          gsap.from(element, {
            y: 35, opacity: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 85%", once: true }
          });
        });
      }
    }
  }
});
