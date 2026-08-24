const translations = {
  en: {
    navProjects: "Projects",
    navAbout: "About",
    eyebrow: "Independent build lab · 2026",
    heroTitle: 'Somewhere between<br /><span class="accent">code</span> and <span class="accent alt">chaos.</span>',
    heroCopy: "Building products, systems and questionable ideas.<br />Klørtek is where the ideas escape.",
    explore: "Explore projects",
    openGithub: "Open GitHub ↗",
    signal: "BUILDING / BREAKING / REBUILDING",
    selectedWork: "01 / SELECTED WORK",
    thingsOut: "Things that made it out.",
    projectsIntro: "Different products. Same obsession: remove friction, keep control, make it feel finished.",
    activeDev: "Active development",
    building: "Building",
    nireaTitle: "Human performance,<br />understood.",
    nireaCopy: "A science-first performance platform that connects training, recovery, health and athlete data into one coherent system.",
    nireaTags: "Training · Recovery · Health · Intelligence",
    veloraTitle: "Your media.<br />Your server.",
    veloraCopy: "A modern open-source Jellyfin experience across mobile, TV and the web, built around direct playback, speed and a clean cinematic interface.",
    veloraTags: "Jellyfin · Mobile · TV · Open source",
    kudoriTitle: "Your work.<br />Their support.</h3>",
    kudoriCopy: "A simpler creator-support platform for tips, memberships and community.",
    kudoriTags: "Creators · Payments · Memberships",
    tidakoTitle: "Your game library.<br />Press play.",
    tidakoCopy: "A RomM-first open-source gaming client built around managed cache, integrated emulation and seamless saves.",
    tidakoTags: "RomM · Emulation · Open source",
    operatingSystem: "02 / OPERATING SYSTEM",
    manifesto: 'Build it.<br />Break it.<br /><span>Make it better.</span>',
    principle1: "Useful before impressive.",
    principle2: "Control over dependency.",
    principle3: "Open where it makes sense.",
    principle4: "Polish is part of the product.",
    aboutKicker: "03 / ABOUT",
    aboutTitle: "Klørtek is where<br />the ideas escape.",
    aboutCopy1: "Not a corporation. Not a pitch deck. A place for products, experiments, code and systems that were interesting enough to build for real.",
    aboutCopy2: "Some become open-source projects. Some become products. Some probably should have stayed as ideas.",
    terminalWho: "builder / creator / problem-maker",
    terminalStatus: "still building_"
  },
  es: {
    navProjects: "Proyectos",
    navAbout: "Sobre Klørtek",
    eyebrow: "Laboratorio independiente · 2026",
    heroTitle: 'En algún punto entre<br /><span class="accent">código</span> y <span class="accent alt">caos.</span>',
    heroCopy: "Construyendo productos, sistemas e ideas discutibles.<br />Klørtek es donde las ideas se escapan.",
    explore: "Ver proyectos",
    openGithub: "Abrir GitHub ↗",
    signal: "CONSTRUIR / ROMPER / RECONSTRUIR",
    selectedWork: "01 / PROYECTOS",
    thingsOut: "Cosas que lograron salir.",
    projectsIntro: "Productos distintos. La misma obsesión: quitar fricción, mantener el control y hacer que todo se sienta terminado.",
    activeDev: "Desarrollo activo",
    building: "En construcción",
    nireaTitle: "Rendimiento humano,<br />entendido.",
    nireaCopy: "Una plataforma de rendimiento basada en ciencia que conecta entrenamiento, recuperación, salud y datos del atleta en un único sistema coherente.",
    nireaTags: "Entrenamiento · Recuperación · Salud · Inteligencia",
    veloraTitle: "Tus medios.<br />Tu servidor.",
    veloraCopy: "Una experiencia Jellyfin moderna y open source para móvil, TV y web, centrada en reproducción directa, velocidad y una interfaz cinematográfica limpia.",
    veloraTags: "Jellyfin · Móvil · TV · Open source",
    kudoriTitle: "Tu trabajo.<br />Su apoyo.",
    kudoriCopy: "Una plataforma más simple para que creadores reciban aportaciones, membresías y construyan comunidad.",
    kudoriTags: "Creadores · Pagos · Membresías",
    tidakoTitle: "Tu biblioteca de juegos.<br />Pulsa jugar.",
    tidakoCopy: "Un cliente gaming open source centrado en RomM, con caché gestionada, emulación integrada y partidas sincronizadas.",
    tidakoTags: "RomM · Emulación · Open source",
    operatingSystem: "02 / FORMA DE TRABAJAR",
    manifesto: 'Constrúyelo.<br />Rómpelo.<br /><span>Hazlo mejor.</span>',
    principle1: "Útil antes que impresionante.",
    principle2: "Control antes que dependencia.",
    principle3: "Abierto cuando tiene sentido.",
    principle4: "El acabado también es producto.",
    aboutKicker: "03 / SOBRE KLØRTEK",
    aboutTitle: "Klørtek es donde<br />las ideas se escapan.",
    aboutCopy1: "No es una corporación. No es un pitch deck. Es un lugar para productos, experimentos, código y sistemas lo bastante interesantes como para construirlos de verdad.",
    aboutCopy2: "Algunos terminan como proyectos open source. Otros se convierten en productos. Algunos probablemente deberían haberse quedado como ideas.",
    terminalWho: "constructor / creador / generador-de-problemas",
    terminalStatus: "todavía construyendo_"
  }
};

function applyLanguage(lang, persist = false) {
  const selected = translations[lang] ? lang : "en";
  const dict = translations[selected];

  document.documentElement.lang = selected;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === selected;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (persist) {
    try {
      localStorage.setItem("klortek-lang", selected);
    } catch (_) {}
  }
}

function detectDefaultLanguage() {
  const spanishRegions = new Set([
    "ES", "MX", "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV",
    "GQ", "GT", "HN", "NI", "PA", "PY", "PE", "PR", "UY", "VE"
  ]);

  const locales = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().locale
  ].filter(Boolean);

  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).region;
      if (region && spanishRegions.has(region.toUpperCase())) return "es";
      if (region) return "en";
    } catch (_) {
      const match = String(locale).match(/[-_]([A-Za-z]{2})\b/);
      if (match && spanishRegions.has(match[1].toUpperCase())) return "es";
      if (match) return "en";
    }
  }

  return locales.some((locale) => String(locale).toLowerCase().startsWith("es")) ? "es" : "en";
}

const observer = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal-card").forEach(el => observer.observe(el));

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
});

let savedLanguage = null;
try {
  savedLanguage = localStorage.getItem("klortek-lang");
} catch (_) {}

applyLanguage(savedLanguage || detectDefaultLanguage());
