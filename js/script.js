const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const navAnchors = navLinks ? [...navLinks.querySelectorAll('a[href^="#"]')] : [];
const sections = [...document.querySelectorAll('main section[id]')];

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((section) => sectionObserver.observe(section));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navAnchors.forEach((anchor) => {
        anchor.classList.toggle('active', anchor.getAttribute('href') === `#${id}`);
      });
    });
  },
  { rootMargin: '-45% 0px -45% 0px' }
);
sections.forEach((section) => activeObserver.observe(section));

const counters = document.querySelectorAll('[data-counter]');
const animateCounter = (element) => {
  const target = Number(element.dataset.counter) || 0;
  let current = 0;
  const step = () => {
    current += 1;
    element.textContent = `${current}+`;
    if (current < target) requestAnimationFrame(step);
  };
  step();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const projectData = {
  'ic-automation': {
    title: 'Incentive Compensation Automation',
    content: [
      ['01 — Business Problem', 'Compensation calculations and validations were spread across repetitive manual steps.'],
      ['02 — Data', 'Sales, goals, attainment, and compensation-linked outputs with reconciliation checks.'],
      ['03 — Approach', 'Structured repeatable pipelines for data prep, checks, and exception views.'],
      ['04 — Technology', 'Python, Excel, SQL, Power BI.'],
      ['05 — Result', 'Reduced repetitive work and strengthened validation consistency.'],
      ['06 — What I Learned', 'Reliable controls are as important as speed in incentive operations.']
    ]
  },
  'goal-validation': {
    title: 'Sales & Goal Validation Tool',
    content: [
      ['01 — Business Problem', 'Discrepancies across sales, goals, and territory data delayed decisions.'],
      ['02 — Data', 'Synthetic cross-source records representing sales and target alignment checks.'],
      ['03 — Approach', 'Python validation sequence: Source Data → Python Validation → Exceptions → Final Output.'],
      ['04 — Technology', 'Python, Pandas, Excel.'],
      ['05 — Result', 'Faster inconsistency detection and cleaner downstream reporting.'],
      ['06 — What I Learned', 'Exception-first design improves trust and review speed.']
    ]
  },
  'kpi-analytics': {
    title: 'Pharma KPI & Incentive Analytics',
    content: [
      ['01 — Business Problem', 'Commercial teams needed integrated KPI and incentive visibility.'],
      ['02 — Data', 'Anonymized KPI, targets, and product-level performance samples.'],
      ['03 — Approach', 'Unified reporting model for trends, attainment, and variance summaries.'],
      ['04 — Technology', 'Excel, Power BI, SQL.'],
      ['05 — Result', 'Improved decision readiness with cleaner KPI interpretation.'],
      ['06 — What I Learned', 'Context-rich KPI storytelling drives adoption.']
    ]
  },
  'hcp-territory': {
    title: 'HCP Segmentation & Territory Alignment',
    content: [
      ['01 — Business Problem', 'Coverage strategy needed structured segmentation inputs.'],
      ['02 — Data', 'Synthetic HCP profile slices and territory grouping examples.'],
      ['03 — Approach', 'Segmented entities and assessed alignment fit across territories.'],
      ['04 — Technology', 'Python, Excel, analytics methods.'],
      ['05 — Result', 'More structured planning discussions for commercial teams.'],
      ['06 — What I Learned', 'Segmentation quality directly impacts execution confidence.']
    ]
  },
  'data-matching': {
    title: 'Automated Data Matching',
    content: [
      ['01 — Business Problem', 'Inconsistent identifiers reduced reconciliation quality.'],
      ['02 — Data', 'Synthetic records with near-duplicate and missing-value patterns.'],
      ['03 — Approach', 'Fuzzy and similarity-based matching with exception review output.'],
      ['04 — Technology', 'Python, Pandas, fuzzy matching, cosine similarity.'],
      ['05 — Result', 'Better match confidence and less manual reconciliation effort.'],
      ['06 — What I Learned', 'Human review hooks remain essential in automated matching.']
    ]
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('close-modal');

const renderCaseStudy = (projectKey) => {
  const data = projectData[projectKey];
  if (!data || !modal || !modalContent || !modalTitle) return;
  modalTitle.textContent = data.title;
  modalContent.innerHTML = data.content
    .map(
      ([heading, text]) =>
        `<section class="modal-section"><h4>${heading}</h4><p>${text}</p></section>`
    )
    .join('');
  modal.showModal();
};

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => renderCaseStudy(card.dataset.project));
});

if (closeModalButton && modal) {
  closeModalButton.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) modal.close();
  });
}

const salesInput = document.getElementById('sales');
const targetInput = document.getElementById('target');
const productInput = document.getElementById('product');
const regionInput = document.getElementById('region');
const attainmentEl = document.getElementById('attainment');
const performanceEl = document.getElementById('performance');
const bandEl = document.getElementById('band');

const updatePlayground = () => {
  if (!salesInput || !targetInput || !attainmentEl || !performanceEl || !bandEl) return;
  const sales = Number(salesInput.value) || 0;
  const target = Math.max(Number(targetInput.value) || 1, 1);
  const product = productInput ? productInput.value : 'Product';
  const region = regionInput ? regionInput.value : 'Region';
  const attainment = (sales / target) * 100;
  attainmentEl.textContent = `${attainment.toFixed(1)}%`;
  const status = attainment >= 100 ? 'Above Target' : attainment >= 90 ? 'Near Target' : 'Needs Attention';
  performanceEl.textContent = `${status} · ${product} / ${region}`;
  bandEl.textContent = attainment >= 120 ? 'High' : attainment >= 100 ? 'Strong' : attainment >= 85 ? 'Moderate' : 'Low';
};

[salesInput, targetInput, productInput, regionInput].forEach((input) => {
  if (input) input.addEventListener('input', updatePlayground);
  if (input) input.addEventListener('change', updatePlayground);
});
updatePlayground();

const skillDescription = document.getElementById('skill-description');
document.querySelectorAll('.skill-pill').forEach((pill) => {
  const updateDescription = () => {
    if (skillDescription) skillDescription.textContent = pill.dataset.skill || '';
  };
  pill.addEventListener('mouseenter', updateDescription);
  pill.addEventListener('focus', updateDescription);
});

const assistantInput = document.getElementById('assistant-input');
const assistantAsk = document.getElementById('assistant-ask');
const assistantResponse = document.getElementById('assistant-response');

const answerFromFacts = (question) => {
  const q = question.toLowerCase();
  if (q.includes('work on') || q.includes('what does ashish')) {
    return 'Ashish works across analytics, incentive compensation, commercial operations, and automation.';
  }
  if (q.includes('tools') || q.includes('tech')) {
    return 'Core tools include SQL, Python, Excel, Power BI, Pandas, SAP, Snowflake, and BigQuery.';
  }
  if (q.includes('incentive')) {
    return 'At Sanofi, Ashish supports incentive compensation analytics, attainment, validation, and compensation process quality.';
  }
  if (q.includes('project')) {
    return 'Featured work includes incentive automation, sales/goal validation, pharma KPI analytics, territory alignment, and automated data matching.';
  }
  if (q.includes('commercial')) {
    return 'His experience is relevant to commercial analytics through KPI reporting, sales compensation analysis, territory insights, and automation.';
  }
  return 'I can answer portfolio-specific questions about Ashish’s role scope, tools, experience, and featured projects.';
};

const askAssistant = () => {
  if (!assistantInput || !assistantResponse) return;
  assistantResponse.textContent = answerFromFacts(assistantInput.value.trim());
};

if (assistantAsk) assistantAsk.addEventListener('click', askAssistant);
if (assistantInput) {
  assistantInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      askAssistant();
    }
  });
}

document.querySelectorAll('.example-q').forEach((button) => {
  button.addEventListener('click', () => {
    if (assistantInput) assistantInput.value = button.textContent || '';
    askAssistant();
  });
});
