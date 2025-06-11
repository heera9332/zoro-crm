// Initialize Lucide icons
lucide.createIcons();

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("bg-white", "shadow-md", "py-2");
    navbar.classList.remove("py-4");
  } else {
    navbar.classList.remove("bg-white", "shadow-md", "py-2");
    navbar.classList.add("py-4");
  }
});

// Mobile menu toggle
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = menuButton.querySelector('[data-lucide="menu"]');

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("hidden");

  if (isOpen) {
    mobileMenu.classList.remove("hidden");
    menuIcon.setAttribute("data-lucide", "x");
  } else {
    mobileMenu.classList.add("hidden");
    menuIcon.setAttribute("data-lucide", "menu");
  }

  // Re-initialize icons to update the menu icon
  lucide.createIcons();
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.setAttribute("data-lucide", "menu");
    lucide.createIcons();
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Testimonials carousel
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Sales Director",
    company: "TechGrowth Inc.",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Zoro CRM has transformed our sales process. Our team is more organized, and we've seen a 40% increase in closed deals since implementation.",
    stars: 5,
  },
  {
    name: "Michael Chen",
    role: "Customer Success Manager",
    company: "InnovateX",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "The customer management features are intuitive and powerful. We're able to provide better support and track customer satisfaction more effectively.",
    stars: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Director",
    company: "GrowthMasters",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Zoro CRM's integration capabilities have allowed us to create seamless marketing campaigns that directly connect to our sales pipeline.",
    stars: 4,
  },
];

let currentTestimonialIndex = 0;

function updateTestimonial() {
  const testimonial = testimonials[currentTestimonialIndex];

  // Update image and text content
  document.querySelector("#testimonials img").src = testimonial.image;
  document.querySelector("#testimonials img").alt = testimonial.name;
  document.querySelector("#testimonials blockquote p").textContent =
    `"${testimonial.quote}"`;
  document.querySelector("#testimonials h3").textContent = testimonial.name;
  document.querySelector("#testimonials p.text-gray-600").textContent =
    testimonial.role;
  document.querySelector("#testimonials p.text-orange-500").textContent =
    testimonial.company;

  // Update dots
  const dots = document.querySelectorAll("#testimonials .flex.space-x-2 span");
  dots.forEach((dot, index) => {
    if (index === currentTestimonialIndex) {
      dot.classList.remove("bg-orange-200");
      dot.classList.add("bg-orange-500");
    } else {
      dot.classList.remove("bg-orange-500");
      dot.classList.add("bg-orange-200");
    }
  });
}

document.querySelector("#prevTestimonial").addEventListener("click", () => {
  currentTestimonialIndex =
    (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial();
});

document.querySelector("#nextTestimonial").addEventListener("click", () => {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
  updateTestimonial();
});

// FAQ accordion
document.querySelectorAll(".faq-button").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector("[data-lucide]");

    // Toggle current FAQ
    answer.style.maxHeight = answer.style.maxHeight
      ? null
      : `${answer.scrollHeight}px`;
    icon.setAttribute(
      "data-lucide",
      answer.style.maxHeight ? "chevron-up" : "chevron-down"
    );

    // Re-initialize icons
    lucide.createIcons();
  });
});

// Pricing toggle
const annualPricing = document.getElementById("annualPricing");
const monthlyPricing = document.getElementById("monthlyPricing");
const prices = {
  starter: { annual: 12, monthly: 15 },
  professional: { annual: 39, monthly: 49 },
  enterprise: { annual: 79, monthly: 99 },
};

function updatePrices(isAnnual) {
  const priceElements = document.querySelectorAll("#pricing .text-4xl");
  const billingTexts = document.querySelectorAll(
    "#pricing .text-xl.font-medium"
  );

  priceElements[0].textContent = `$${prices.starter[isAnnual ? "annual" : "monthly"]}`;
  priceElements[1].textContent = `$${prices.professional[isAnnual ? "annual" : "monthly"]}`;
  priceElements[2].textContent = `$${prices.enterprise[isAnnual ? "annual" : "monthly"]}`;

  billingTexts.forEach((text) => {
    text.textContent = `/mo ${isAnnual ? "billed annually" : ""}`;
  });

  annualPricing.classList.toggle("bg-orange-500", isAnnual);
  annualPricing.classList.toggle("text-white", isAnnual);
  annualPricing.classList.toggle("text-gray-700", !isAnnual);

  monthlyPricing.classList.toggle("bg-orange-500", !isAnnual);
  monthlyPricing.classList.toggle("text-white", !isAnnual);
  monthlyPricing.classList.toggle("text-gray-700", isAnnual);
}

annualPricing.addEventListener("click", () => updatePrices(true));
monthlyPricing.addEventListener("click", () => updatePrices(false));

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message. We will get back to you shortly!");
  e.target.reset();
});

// Update copyright year
document.getElementById("currentYear").textContent = new Date().getFullYear();
