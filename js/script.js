/**
 * ASHISH - DATA & INCENTIVE COMPENSATION ANALYST PORTFOLIO
 * High-performance interactive engine for modern portfolio experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initCounters();
  initCaseStudyModal();
  initAnalyticsPlayground();
  initSkillInspector();
  initPortfolioAssistant();
});

/* ==========================================================================
   1. NAVIGATION & SCROLLSPY
   ========================================================================== */

function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('main section[id]');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when clicking any link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section scrollspy
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach((item) => {
            const href = item.getAttribute('href');
            if (href === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }
}

/* ==========================================================================
   2. SCROLL REVEAL ANIMATIONS
   ========================================================================== */

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));
}

/* ==========================================================================
   3. ANIMATED METRIC COUNTERS
   ========================================================================== */

function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));
  } else {
    counterElements.forEach(animateCounter);
  }
}

/* ==========================================================================
   4. FEATURED PROJECTS CASE STUDY MODAL
   ========================================================================== */

const CASE_STUDIES = {
  'ic-automation': {
    title: 'Incentive Compensation Automation',
    category: 'Incentive Compensation · Commercial Operations',
    content: [
      {
        step: '01 — Business Problem',
        text: 'Automated and streamlined complex incentive compensation workflows involving sales data, targets, attainment, calculations, validation, and reporting.'
      },
      {
        step: '02 — Data',
        text: 'Sales transactions, monthly targets, territory hierarchies, and crediting rules across commercial teams.'
      },
      {
        step: '03 — Approach',
        text: 'Engineered an automated data preparation and validation pipeline in Python and SQL with structured exception reporting.',
        diagram: ['Sales & Target Data', 'SQL / Python Pipeline', 'Validation Checks', 'Executive Reporting']
      },
      {
        step: '04 — Technology',
        text: 'Python · Excel · Power BI · SQL'
      },
      {
        step: '05 — Result',
        text: 'Reduced repetitive manual work and improved validation consistency with error-free payroll handoffs.'
      },
      {
        step: '06 — What I Learned',
        text: 'Exception-first design and automated controls protect credibility and speed up incentive operations.'
      }
    ]
  },
  'goal-validation': {
    title: 'Sales & Goal Validation Tool',
    category: 'Data Validation · Quality Engineering',
    content: [
      {
        step: '01 — Business Problem',
        text: 'Built a Python-based validation workflow to compare sales, goals, territories, and compensation-related datasets and identify inconsistencies.'
      },
      {
        step: '02 — Data',
        text: 'Cross-source records representing field sales, CRM goal tracking, and commercial target alignments.'
      },
      {
        step: '03 — Approach',
        text: 'Implemented a 4-stage validation flow: Source Data → Python Validation → Exceptions → Final Output.',
        diagram: ['Source Data', 'Python Validation', 'Exceptions', 'Final Output']
      },
      {
        step: '04 — Technology',
        text: 'Python · Pandas · Excel'
      },
      {
        step: '05 — Result',
        text: 'Faster exception detection and cleaner downstream reporting across commercial teams.'
      },
      {
        step: '06 — What I Learned',
        text: 'Automating cross-source reconciliation prevents discrepancies before bonus calculations are finalized.'
      }
    ]
  },
  'kpi-analytics': {
    title: 'Pharma KPI & Incentive Analytics',
    category: 'Commercial BI · Executive Reporting',
    content: [
      {
        step: '01 — Business Problem',
        text: 'Developed analytics solutions for pharmaceutical commercial teams to analyze KPIs, targets, product performance, and incentive-related metrics.'
      },
      {
        step: '02 — Data',
        text: 'Product prescription volumes (TRx, NRx), dollar sales, targets, and incentive payout distributions.'
      },
      {
        step: '03 — Approach',
        text: 'Built unified star-schema Power BI models with dynamic DAX calculations for trends, attainment, and variance summaries.',
        diagram: ['Commercial Data Views', 'Power BI Data Model', 'DAX Measures', 'Executive Dashboards']
      },
      {
        step: '04 — Technology',
        text: 'Excel · Power BI · SQL'
      },
      {
        step: '05 — Result',
        text: 'Improved decision-readiness and provided brand leadership with real-time performance tracking.'
      },
      {
        step: '06 — What I Learned',
        text: 'Intuitive visual hierarchy and clear context-rich storytelling maximize executive adoption.'
      }
    ]
  },
  'hcp-territory': {
    title: 'HCP Segmentation & Territory Alignment',
    category: 'Commercial Operations · Field Strategy',
    content: [
      {
        step: '01 — Business Problem',
        text: 'Supported healthcare commercial analytics through HCP segmentation, territory alignment, and structured data analysis.'
      },
      {
        step: '02 — Data',
        text: 'Healthcare Provider (HCP) prescribing history, specialty profiles, and territory mapping codes.'
      },
      {
        step: '03 — Approach',
        text: 'Segmented entities by deciles and analyzed alignment fit to balance rep workloads and coverage.',
        diagram: ['HCP Prescriber Data', 'Deciling & Segmentation', 'Territory Alignment', 'Balanced Field Plan']
      },
      {
        step: '04 — Technology',
        text: 'Python · Excel · Analytics'
      },
      {
        step: '05 — Result',
        text: 'Stronger targeting context and data-backed planning discussions for commercial operations.'
      },
      {
        step: '06 — What I Learned',
        text: 'Data quality in segmentation directly impacts field-force execution confidence.'
      }
    ]
  },
  'data-matching': {
    title: 'Automated Data Matching',
    category: 'Data Engineering · Fuzzy Reconciliation',
    content: [
      {
        step: '01 — Business Problem',
        text: 'Developed fuzzy matching and similarity-based approaches to improve data reconciliation across inconsistent datasets.'
      },
      {
        step: '02 — Data',
        text: 'Records with near-duplicate names, typographical variations, and missing identifier keys.'
      },
      {
        step: '03 — Approach',
        text: 'Implemented token sort ratio and cosine similarity scoring with an automated review queue for edge cases.',
        diagram: ['Inconsistent Feeds', 'Normalization', 'Fuzzy & Cosine Matching', 'Reconciled Master Output']
      },
      {
        step: '04 — Technology',
        text: 'Python · Pandas · Fuzzy Matching · Cosine Similarity'
      },
      {
        step: '05 — Result',
        text: 'Better reconciliation quality and substantially reduced manual review effort.'
      },
      {
        step: '06 — What I Learned',
        text: 'Calibrating confidence thresholds with human review hooks delivers the most reliable matching.'
      }
    ]
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDiscussBtn = document.getElementById('modal-discuss-btn');

  if (!modal || !modalContent) return;

  const openModal = (projectId) => {
    const study = CASE_STUDIES[projectId];
    if (!study) return;

    modalTitle.textContent = study.title;
    if (modalTag) modalTag.textContent = study.category;

    modalContent.innerHTML = study.content
      .map((item) => {
        let diagramHtml = '';
        if (item.diagram && item.diagram.length) {
          diagramHtml = `
            <div class="modal-architecture-diagram">
              ${item.diagram
                .map((step, idx) => `
                  <div class="diag-node">${step}</div>
                  ${idx < item.diagram.length - 1 ? '<span class="diag-arrow">→</span>' : ''}
                `)
                .join('')}
            </div>
          `;
        }

        return `
          <div class="modal-section">
            <h4 class="modal-section-title">${item.step}</h4>
            <p>${item.text}</p>
            ${diagramHtml}
          </div>
        `;
      })
      .join('');

    if (typeof modal.showModal === 'function') {
      modal.showModal();
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (typeof modal.close === 'function') {
      modal.close();
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDiscussBtn) {
    modalDiscussBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isClickInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!isClickInside) {
      closeModal();
    }
  });

  // Close on Escape
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. INTERACTIVE ANALYTICS PLAYGROUND
   ========================================================================== */

function initAnalyticsPlayground() {
  const salesInput = document.getElementById('sales');
  const targetInput = document.getElementById('target');
  const productSelect = document.getElementById('product');
  const regionSelect = document.getElementById('region');

  const salesValDisplay = document.getElementById('sales-val');
  const targetValDisplay = document.getElementById('target-val');

  const attainmentEl = document.getElementById('attainment');
  const attainmentBar = document.getElementById('attainment-bar');
  const performanceEl = document.getElementById('performance');
  const perfSubEl = document.getElementById('perf-sub');
  const bandEl = document.getElementById('band');
  const bandSubEl = document.getElementById('band-sub');
  const explainerEl = document.getElementById('calculation-explainer');

  if (!salesInput || !targetInput) return;

  const computeIncentive = () => {
    const sales = parseFloat(salesInput.value) || 0;
    const target = parseFloat(targetInput.value) || 1;
    const product = productSelect ? productSelect.value : 'Product';
    const region = regionSelect ? regionSelect.value : 'Region';

    // Update range labels
    if (salesValDisplay) salesValDisplay.textContent = `${sales}`;
    if (targetValDisplay) targetValDisplay.textContent = `${target}`;

    // Attainment Rate %
    const attainment = (sales / target) * 100;
    const attainmentFormatted = attainment.toFixed(1) + '%';
    if (attainmentEl) attainmentEl.textContent = attainmentFormatted;

    // Progress bar fill (scale 0% to 150%)
    if (attainmentBar) {
      const barPercent = Math.min(Math.max((attainment / 150) * 100, 5), 100);
      attainmentBar.style.width = `${barPercent}%`;
    }

    // Performance
    let perfStatus = 'On Target';
    if (attainment >= 110) {
      perfStatus = 'Above Target';
    } else if (attainment >= 95) {
      perfStatus = 'On Target';
    } else if (attainment >= 85) {
      perfStatus = 'Near Target';
    } else {
      perfStatus = 'Needs Attention';
    }

    if (performanceEl) performanceEl.textContent = perfStatus;
    if (perfSubEl) perfSubEl.textContent = `${product} / ${region}`;

    // Achievement Band
    let band = 'Moderate';
    let bandSub = 'Standard Plan Tier';
    if (attainment >= 120) {
      band = 'High';
      bandSub = 'Top Attainment Tier';
    } else if (attainment >= 100) {
      band = 'Strong';
      bandSub = 'Target Achieved';
    } else if (attainment >= 85) {
      band = 'Moderate';
      bandSub = 'Within Remediation Band';
    } else {
      band = 'Low';
      bandSub = 'Below Threshold';
    }

    if (bandEl) bandEl.textContent = band;
    if (bandSubEl) bandSubEl.textContent = bandSub;

    // Explainer
    if (explainerEl) {
      explainerEl.innerHTML = `
        Attainment is <strong>${attainmentFormatted}</strong> for <strong>${product}</strong> in <strong>${region}</strong> region.
        Performance is classified as <strong>${perfStatus}</strong> within the <strong>${band}</strong> achievement band.
      `;
    }
  };

  // Event Listeners for inputs
  [salesInput, targetInput, productSelect, regionSelect].forEach((el) => {
    if (el) {
      el.addEventListener('input', computeIncentive);
      el.addEventListener('change', computeIncentive);
    }
  });

  // Preset Buttons
  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const s = btn.getAttribute('data-s');
      const t = btn.getAttribute('data-t');
      if (s) salesInput.value = s;
      if (t) targetInput.value = t;
      computeIncentive();
    });
  });

  // Initial Calculation
  computeIncentive();
}

/* ==========================================================================
   6. SKILLS & TECH STACK INSPECTOR
   ========================================================================== */

function initSkillInspector() {
  const inspectorName = document.getElementById('inspector-name');
  const inspectorText = document.getElementById('inspector-text');
  const pills = document.querySelectorAll('.skill-pill');

  if (!inspectorName || !inspectorText) return;

  pills.forEach((pill) => {
    const updateInspector = () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const name = pill.getAttribute('data-name') || pill.textContent;
      const skillDesc = pill.getAttribute('data-skill') || '';

      inspectorName.textContent = name;
      inspectorText.textContent = skillDesc;
    };

    pill.addEventListener('mouseenter', updateInspector);
    pill.addEventListener('click', updateInspector);
    pill.addEventListener('focus', updateInspector);
  });
}

/* ==========================================================================
   7. AI ANALYTICS ASSISTANT ("ASK MY PORTFOLIO")
   ========================================================================== */

function initPortfolioAssistant() {
  const input = document.getElementById('assistant-input');
  const askBtn = document.getElementById('assistant-ask');
  const responseBox = document.getElementById('assistant-response');
  const chips = document.querySelectorAll('.chip-btn');

  if (!input || !askBtn || !responseBox) return;

  const KNOWLEDGE_BASE = [
    {
      keywords: ['what does ashish work on', 'who is ashish', 'role', 'summary', 'about', 'overview'],
      answer: "Ashish is a Data & Incentive Compensation Analyst working across sales compensation, commercial analytics, business intelligence, process automation, and data quality. He uses SQL, Python, Excel, Power BI, and AI to transform complex business processes into reliable, scalable solutions."
    },
    {
      keywords: ['tool', 'tech', 'stack', 'languages', 'skills', 'software'],
      answer: "Core tools include Excel, SQL, Python, Pandas, Power BI, Tableau, Snowflake, SAP, and BigQuery. He also leverages AI-assisted workflows (Claude, GitHub Copilot) for accelerated data processing and script optimization."
    },
    {
      keywords: ['incentive', 'compensation', 'ic', 'crediting', 'attainment', 'sales comp'],
      answer: "At Sanofi, Ashish specializes in incentive compensation analytics, sales crediting, attainment analysis, compensation validation, and automated reconciliation frameworks that ensure consistency and eliminate manual errors."
    },
    {
      keywords: ['project', 'work', 'case study', 'portfolio', 'built', 'developed'],
      answer: "Featured projects include: (1) Incentive Compensation Automation cutting manual effort by 98%; (2) Sales & Goal Validation Tool for cross-source reconciliation; (3) Pharma KPI & Incentive Analytics dashboards; (4) HCP Segmentation & Territory Alignment; and (5) Automated Data Matching using fuzzy and cosine similarity."
    },
    {
      keywords: ['commercial', 'why commercial', 'pharma', 'revenue', 'sales ops', 'value'],
      answer: "His experience combines business understanding with technical problem solving — analyzing KPIs, sales/product mix, territory alignments, and sales compensation to directly support commercial operations and revenue strategy."
    },
    {
      keywords: ['sanofi', 'current role', 'indegene', 'highradius', 'experience', 'career'],
      answer: "Ashish is Analyst – Incentive Compensation at Sanofi (2025–Present). Previously, he was Data Analyst at Indegene (2022–2025) delivering commercial analytics for pharma clients, and Finance Analytics Intern at HighRadius (2022)."
    },
    {
      keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'phone', 'hire'],
      answer: "You can reach Ashish via email at ashishkumar15183@gmail.com, on LinkedIn at linkedin.com/in/ashishk123, or on GitHub at github.com/ashsuper18."
    }
  ];

  const answerQuestion = (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return;

    let bestMatch = null;
    let highestScore = 0;

    KNOWLEDGE_BASE.forEach((item) => {
      let score = 0;
      item.keywords.forEach((keyword) => {
        if (q.includes(keyword)) {
          score += keyword.split(' ').length * 2;
        } else {
          const words = keyword.split(' ');
          words.forEach((w) => {
            if (q.includes(w) && w.length > 3) score += 1;
          });
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item.answer;
      }
    });

    const responseText = bestMatch || 
      "Ashish is a Data & Incentive Compensation Analyst specializing in commercial analytics, sales compensation, and process automation. Feel free to explore his projects and connect via the Contact section!";

    typewriterResponse(responseText);
  };

  const typewriterResponse = (text) => {
    responseBox.textContent = '';
    let i = 0;
    const speed = 12;

    const typeChar = () => {
      if (i < text.length) {
        responseBox.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      }
    };

    typeChar();
  };

  askBtn.addEventListener('click', () => {
    const query = input.value;
    if (query) answerQuestion(query);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = input.value;
      if (query) answerQuestion(query);
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q') || chip.textContent;
      input.value = q;
      answerQuestion(q);
    });
  });
}
