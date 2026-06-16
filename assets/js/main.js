const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const nav = qs(".nav-links");
const menuToggle = qs(".menu-toggle");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const currentPage = location.pathname.split("/").pop() || "index.html";
qsa("[data-nav]").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

qsa(".reveal").forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.4 });

qsa("[data-count]").forEach((el) => countObserver.observe(el));

const filterButtons = qsa("[data-filter]");
const projectCards = qsa("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

const modal = qs("[data-modal]");
const modalTitle = qs("[data-modal-title]");
const modalBody = qs("[data-modal-body]");
const closeModal = qs("[data-close-modal]");

const previewImages = {
  sage: {
    title: "Sage Mental Health Preview",
    image: "assets/images/projects/jpg/sage.jpg",
    alt: "Large private preview image for Sage Mental Health"
  },
  oak: {
    title: "Oak River Living Preview",
    image: "assets/images/projects/jpg/oak.jpg",
    alt: "Large private preview image for Oak River Living"
  },
  bioxgen: {
    title: "Bio X Gen Preview",
    image: "assets/images/projects/jpg/bioxgen.jpg",
    alt: "Large private preview image for Bio X Gen"
  },
  ashlee: {
    title: "Ashlee Lewis OT Preview",
    image: "assets/images/projects/jpg/ashlee.jpg",
    alt: "Large private preview image for Ashlee Lewis Occupational Therapy"
  },
  chisel: {
    title: "Chisel & Groove Preview",
    image: "assets/images/projects/jpg/chisel.jpg",
    alt: "Large private preview image for Chisel and Groove"
  },
  villa: {
    title: "The Villa - Middleton Preview",
    image: "assets/images/projects/jpg/villa.jpg",
    alt: "Large private preview image for The Villa - Middleton"
  }
};

const caseStudies = {
  sage: {
    title: "Sage Mental Health",
    sections: {
      "Project Brief": "A mental health practice website focused on clarity, trust, and a calm path from service discovery to inquiry. The experience needed to feel warm and credible while still making services, support areas, and next steps easy to understand.",
      "My Role": "CMS build support, responsive page polish, content structure, form flow review, and QA checks across key pages. I helped keep the page sections consistent so the site could be maintained without breaking the visual rhythm.",
      "Tools Used": "WordPress, responsive CSS, contact forms, SEO basics.",
      "Challenges": "The content needed to feel supportive without becoming text-heavy, especially on mobile. Healthcare visitors also need clear signals of professionalism before they are ready to reach out.",
      "Responsive QA": "Checked spacing, heading hierarchy, calls to action, and form access across smaller layouts so the page did not feel crowded on mobile.",
      "Outcome": "A cleaner service-led site structure that helps visitors understand the practice and move toward contact without friction."
    }
  },
  oak: {
    title: "Oak River Living",
    sections: {
      "Project Brief": "A residential living website built around lifestyle presentation, easy scanning, and clear content sections. The site needed to communicate comfort, environment, and trust in a way that felt polished without becoming overly decorative.",
      "My Role": "WordPress page build support, responsive layout checks, visual section consistency, and launch QA. I focused on making repeated sections feel aligned and easy for the client side to update.",
      "Tools Used": "WordPress, page builder workflow, responsive QA.",
      "Challenges": "The site needed to feel polished and warm while keeping practical details easy to find. Lifestyle pages can become vague quickly, so the page flow had to keep purpose behind each section.",
      "Responsive QA": "Reviewed mobile stacking, image balance, readable content blocks, and navigation behavior.",
      "Outcome": "A composed CMS site with stronger first-impression value and a maintainable page structure."
    }
  },
  bioxgen: {
    title: "Bio X Gen",
    sections: {
      "Project Brief": "A healthcare technology website presenting a specialized cardiac surgery outcomes concept with a credibility-first tone. The content needed enough structure to support a technical message without overwhelming first-time visitors.",
      "My Role": "CMS page implementation, responsive polish, content hierarchy support, and QA review. I helped shape technical sections into clearer visual blocks for scanning.",
      "Tools Used": "WordPress, structured content sections, responsive QA.",
      "Challenges": "Technical healthcare messaging had to stay understandable while still feeling authoritative. The page structure needed to carry credibility through spacing, hierarchy, and restraint.",
      "Responsive QA": "Checked long headings, technical copy blocks, card spacing, and mobile flow so the page stayed readable.",
      "Outcome": "A focused web presence that gives complex subject matter a clearer visual and content path."
    }
  },
  ashlee: {
    title: "Ashlee Lewis Occupational Therapy",
    sections: {
      "Project Brief": "A Wix website for independent school-based occupational therapy evaluations for children and young adults. The site needed to clearly explain who the service is for, what the evaluation covers, and how families or educators can start a conversation.",
      "My Role": "Wix page structure, responsive review, service-content organization, and contact flow support. I worked within Wix constraints while keeping the content approachable and practical.",
      "Tools Used": "Wix, forms, mobile layout review, SEO metadata.",
      "Challenges": "The site needed to communicate professional expertise while staying approachable for families and educators. Long service explanations had to be broken into digestible sections.",
      "Responsive QA": "Reviewed mobile readability, form access, section order, and spacing around important service explanations.",
      "Outcome": "A clear service website that explains evaluation focus areas and supports direct inquiry."
    }
  },
  chisel: {
    title: "Chisel & Groove",
    sections: {
      "Project Brief": "A custom furniture website showcasing designed and built pieces including tables, desks, signs, and boards. The work needed to foreground craftsmanship while still giving visitors a practical sense of the available product range.",
      "My Role": "Squarespace customization support, product/content layout polish, responsive QA, and visual consistency checks. I helped keep the catalog-style presentation clean and easy to browse.",
      "Tools Used": "Squarespace, custom CSS, gallery/catalog sections.",
      "Challenges": "The craftsmanship needed to be the focus while keeping the browsing experience simple. Product-led pages need strong images, but the surrounding layout has to stay quiet enough not to compete.",
      "Responsive QA": "Checked product/card stacking, image crops, title wrapping, and tap-friendly interaction spacing.",
      "Outcome": "A product-led site presentation that gives visitors a quick sense of range, quality, and inquiry options."
    }
  },
  villa: {
    title: "The Villa - Middleton",
    sections: {
      "Project Brief": "A hospitality website presenting The Villa - Middleton with guest-facing content and a refined venue feel. The site needed to make the property feel inviting while keeping the route to practical details clear.",
      "My Role": "Squarespace layout support, page polish, mobile review, and booking-oriented content organization. I focused on page rhythm, responsive presentation, and a smooth browse-to-contact path.",
      "Tools Used": "Squarespace, custom styling, responsive QA.",
      "Challenges": "Hospitality pages need emotional appeal, but the path to useful details still has to stay direct. The design had to balance atmosphere with usefulness.",
      "Responsive QA": "Reviewed hero framing, content stacking, button visibility, and mobile section spacing.",
      "Outcome": "A polished hospitality site structure that supports browsing, venue confidence, and next-step interest."
    }
  }
};

function openCaseStudy(key) {
  const study = caseStudies[key];
  if (!study || !modal || !modalTitle || !modalBody) return;
  modal.querySelector(".modal-card")?.classList.remove("preview-modal");
  modalTitle.textContent = study.title;
  modalBody.innerHTML = Object.entries(study.sections)
    .map(([heading, text]) => `<section><h3>${heading}</h3><p>${text}</p></section>`)
    .join("");
  modal.classList.add("open");
  document.body.classList.add("locked");
  closeModal?.focus();
}

function openPreview(key) {
  const preview = previewImages[key];
  if (!preview || !modal || !modalTitle || !modalBody) return;
  modal.querySelector(".modal-card")?.classList.add("preview-modal");
  modalTitle.textContent = preview.title;
  modalBody.innerHTML = `
    <img class="preview-image" src="${preview.image}" alt="${preview.alt}">
    <p class="modal-note">Static private preview only. Live client links are not published here because some work is covered by agency or client confidentiality boundaries.</p>
  `;
  modal.classList.add("open");
  document.body.classList.add("locked");
  closeModal?.focus();
}

function hideModal() {
  modal?.classList.remove("open");
  modal?.querySelector(".modal-card")?.classList.remove("preview-modal");
  document.body.classList.remove("locked");
}

qsa("[data-case]").forEach((button) => {
  button.addEventListener("click", () => openCaseStudy(button.dataset.case));
});

qsa("[data-preview]").forEach((button) => {
  button.addEventListener("click", () => openPreview(button.dataset.preview));
});

closeModal?.addEventListener("click", hideModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) hideModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideModal();
});

const contactForm = qs("[data-contact-form]");
const formMessage = qs("[data-form-message]");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formMessage.textContent = "Sending...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form submission failed");
      contactForm.reset();
      formMessage.textContent = "Message sent. I will get back to you soon.";
    } catch (error) {
      formMessage.textContent = "Could not send right now. Please email or WhatsApp me directly.";
    }
  });
}
