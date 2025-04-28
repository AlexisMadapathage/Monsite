// SCROLL EN DOUCEUR SUR LES ANCRES
// Gère les clics sur les liens internes pour scroller doucement jusqu'à la section ciblée
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// EFFET D’APPARITION DES BLOCS AU SCROLL
// Récupère tous les éléments avec la classe .reveal
const revealElements = document.querySelectorAll('.reveal');

// Fonction qui ajoute la classe 'visible' quand l’élément entre dans la vue
const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
};

// Lancement de la détection au scroll
window.addEventListener('scroll', revealOnScroll);

// Appel initial pour les éléments visibles dès le chargement
revealOnScroll();

// HOVER SUR LES PROJETS
// Récupère les cartes projet (si présentes dès le départ dans le HTML)
const projectCards = document.querySelectorAll('.project');

// Ajoute une animation lors du survol des cartes
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('hovered');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('hovered');
  });
});

// CHARGEMENT DES PROJETS VIA JS
// Récupère le conteneur où injecter les projets
const projectContainer = document.getElementById("project-container");

// Vérifie que le tableau 'projects' existe et contient des données
if (typeof projects !== "undefined" && Array.isArray(projects)) {
  projects.forEach(project => {
    const article = document.createElement("article");
    article.classList.add("project");

    // Génère la carte projet avec les données
    article.innerHTML = `
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="used-tools">Outils utilisés : ${project.tools}</p>
        <a href="${project.github}" target="_blank" class="project-link">Voir le code</a>
      </div>
      <div class="project-image-container">
        <img src="${project.image}" alt="${project.title} Screenshot">
      </div>
    `;

    // Ajoute la carte au DOM
    projectContainer.appendChild(article);
  });
} else {
  console.warn("Les projets ne sont pas chargés correctement.");
}

// FORMULAIRE DE CONTACT
// Gère l'envoi du formulaire de contact
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupère les valeurs des champs
  const email = document.getElementById("email").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const firstname = document.getElementById("firstname").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("form-status");

  // VALIDATION DES CHAMPS

  // Vérifie si l’email a un format valide
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.classList.remove("error");
    status.textContent = "Adresse email invalide.";
    status.classList.add("error");
    return;
  }

  // Vérifie la longueur des champs nom/prénom
  if (lastname.length > 50 || firstname.length > 50) {
    status.classList.remove("error");
    status.textContent = "Le nom ou prénom est trop long.";
    status.classList.add("error");
    return;
  }

  // Vérifie la longueur minimale du message
  if (message.length < 10) {
    status.classList.remove("error");
    status.textContent = "Le message est trop court.";
    status.classList.add("error");
    return;
  }

  fetch("https://monsite-production.up.railway.app/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lastname,
      firstname,
      email,
      message
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Enregistré côté backend :", data);
      // Affiche le message de confirmation
      status.classList.remove("error");
      status.textContent = "Message envoyé avec succès !";
      document.getElementById("contact-form").reset();
      setTimeout(() => (status.textContent = ""), 5000);
    })
    .catch(err => {
      console.error("Erreur frontend :", err);
      status.classList.add("error");
      status.textContent = "Erreur lors de l'envoi.";
    });

    const socialNavLeft = document.querySelector(".social-nav-left");

    const toggleSocialNav = () => {
      const contactsSection = document.getElementById("contacts");
      const rect = contactsSection.getBoundingClientRect();
    
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        socialNavLeft.style.display = "flex";
      } else {
        socialNavLeft.style.display = "none";
      }
    };
    
    window.addEventListener("scroll", toggleSocialNav);
    window.addEventListener("load", toggleSocialNav);    
});

// Gestion des cookies
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  if (banner && acceptBtn) {
    if (!localStorage.getItem("cookiesAccepted")) {
      banner.style.display = "block";
    } else {
      banner.style.display = "none";
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.style.display = "none";
    });
  }
});