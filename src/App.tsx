import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";

const strengths = [
  {
    number: "01",
    title: "Software development",
    skills: ["JavaScript", "React Native", "HTML", "CSS", "PHP", "Laravel", "SQL"],
    description: "Clean backend architecture and intuitive user-facing experiences.",
  },
  {
    number: "02",
    title: "UI/UX & prototyping",
    skills: ["Figma", "Canva", "Prototyping", "User-centered design"],
    description: "Thoughtful interfaces that bring technical ideas closer to people.",
  },
  {
    number: "03",
    title: "Systems & workflow",
    skills: ["Hardware & network troubleshooting", "TESDA NC II", "CSS"],
    description: "Command Code (AI-assisted development), Git and version control.",
  },
  {
    number: "04",
    title: "Technical/Content Writer",
    skills: ["Technical Writing", "Creative Writing", "Content Strategy", "Documentation"],
    description:
      "Concise narrative pieces, organizational documentation, and structured writing that bridge technical concepts with audiences.",
  },
  {
    number: "05",
    title: "Social Media Management",
    skills: [
      "Caption Writing",
      "Canva",
      "Marketing Strategy",
      "Content Scheduling",
      "Engagement",
    ],
    description:
      "Strategic campaigns, engaging captions, and visual community management that grow online presence and audience connection.",
  },
];

const beyondSkills = [
  "Project management & coordination",
  "Public relations",
  "Digital marketing",
  "MS Office",
  "Google Workspace",
  "Command Prompt (AI-Assisted Development)",
];

const marqueeItems = [
  "SOFTWARE DEVELOPMENT",
  "UI/UX & PROTOTYPING",
  "SYSTEMS & INFRASTRUCTURE",
  "AI-ASSISTED WORKFLOW",
  "TECHNICAL WRITING",
  "STUDENT LEADERSHIP",
];

const leadership = [
  {
    title: "4th Year Representative",
    group: "Alliance of Coders · CTU Danao Campus",
    years: "2026 – 2027",
    description:
      "Coordinated departmental events and technical workshops, managed documentation and proposals, and served as the liaison between senior IT students and faculty.",
  },
  {
    title: "Vice President of Internal Affairs",
    group: "Arts Master's Club · CTU Danao Campus",
    years: "2026 – 2027",
    description:
      "Facilitated internal communication, helped organize campus events and creative workshops, and supported departmental projects and organizational workflow.",
  },
  {
    title: "Public Information Director",
    group: "Arts Master's Club · CTU Danao Campus",
    years: "2025 – 2026",
    description:
      "Planned, created, and scheduled social content. Coordinated timely updates with officers and maintained consistent messaging aligned with club objectives.",
  },
  {
    title: "Social Media Manager",
    group: "TechnoGadget Organization · CTU Danao Campus",
    years: "2025 – 2026",
    description:
      "Prepared announcements and communication materials, managed posting schedules and engagement metrics, and coordinated accurate, timely content delivery.",
  },
];

const navLinks = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
];

function Arrow() {
  return (
    <span className="inline-arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "-45px 0px -45px 0px" },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const trackedIds = ["top", "about", "expertise", "leadership", "education", "contact"];
    const sectionElements = trackedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sectionElements.forEach((section) => spyObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      spyObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCopyEmail = async () => {
    const email = "jessnilanthony@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleCardMouseMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  const handleProfileMouseMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
  };

  const handleProfileMouseLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <main>
      <section className="landing" id="landing" aria-labelledby="landing-title">
        <div className="landing-orbit landing-orbit-one" aria-hidden="true" />
        <div className="landing-orbit landing-orbit-two" aria-hidden="true" />
        <div className="landing-glow" aria-hidden="true" />
        <div className="shell landing-inner">
          <div className="landing-meta landing-animate">
            <span>PORTFOLIO / 2026</span>
            <span>COMPOSTELA · CEBU · PH</span>
          </div>

          <div className="landing-title-wrap">
            <p className="landing-kicker landing-animate">
              TECHNOLOGIST · DESIGNER · STUDENT LEADER
            </p>
            <h1 id="landing-title">
              <span className="landing-name landing-name-solid">JESSNIL</span>
              <span className="landing-name landing-name-outline">PARADIANG</span>
            </h1>
          </div>

          <div className="landing-bottom landing-animate">
            <p>
              Building thoughtful digital systems
              <br />
              for people and communities.
            </p>
            <a className="enter-link" href="#top">
              <span>VIEW PORTFOLIO</span>
              <span className="enter-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </section>

      <header className="site-header">
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
        <div className="shell nav-wrap">
          <a
            className="brand"
            href="#landing"
            aria-label="Back to landing page"
            onClick={closeMobileMenu}
          >
            JESSNIL ANTHONY S. PARADIANG
          </a>

          <button
            type="button"
            className={`menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
          </button>

          <nav
            id="primary-navigation"
            className={mobileMenuOpen ? "is-open" : ""}
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={activeSection === link.id ? "is-active" : ""}
                aria-current={activeSection === link.id ? "location" : undefined}
                onClick={closeMobileMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              className={`nav-cta ${activeSection === "contact" ? "is-active" : ""}`}
              href="#contact"
              onClick={closeMobileMenu}
            >
              Let’s talk <Arrow />
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-heading">
        <div className="shell hero-grid">
          <div className="hero-copy" data-reveal="left">
            <div className="status-badge">
              <span className="status-dot" aria-hidden="true" />
              <span>AVAILABLE FOR PROJECTS &amp; COLLABORATION</span>
            </div>
            <p className="eyebrow">
              TECHNOLOGIST&nbsp;&nbsp;/&nbsp;&nbsp;DESIGNER&nbsp;&nbsp;/&nbsp;&nbsp;STUDENT LEADER
            </p>
            <h2 id="hero-heading" className="hero-heading">
              Jessnil Anthony
              <br />
              Paradiang
            </h2>
            <p className="hero-line">
              Clean systems. Thoughtful interfaces.
              <br />
              Stronger communities.
            </p>
            <p className="hero-intro">
              I bring software development, UI/UX design, and team coordination together to turn
              complex challenges into practical solutions.
            </p>
            <div className="hero-actions">
              <a className="button button-primary button-shimmer" href="#contact">
                Get in touch <Arrow />
              </a>
              <a className="button button-outline" href="#expertise">
                Explore my experience <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="location">BASED IN COMPOSTELA, CEBU, PHILIPPINES</p>
          </div>

          <figure
            className="profile-card"
            data-reveal="scale"
            onMouseMove={handleProfileMouseMove}
            onMouseLeave={handleProfileMouseLeave}
          >
            <div className="profile-image-wrap">
              <img
                src={`${import.meta.env.BASE_URL}assets/jessnil-portrait.png`}
                alt="Jessnil Anthony Paradiang in formal attire"
                width={405}
                height={448}
                decoding="async"
              />
            </div>
            <figcaption>
              <span>DEVELOPMENT • DESIGN • PEOPLE</span>
              <strong>A proactive technologist.</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((groupIndex) => (
            <div key={groupIndex} className="marquee-group">
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <span key={`${groupIndex}-${item}-${idx}`} className="marquee-item">
                  <span>{item}</span>
                  <span className="marquee-sep">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="about" id="about" aria-labelledby="about-heading">
        <div className="shell split-section">
          <div data-reveal="left">
            <p className="section-label">01 / ABOUT ME</p>
            <h2 id="about-heading" className="side-title">
              Technical thinking.
              <br />
              Human
              <br />
              perspective.
            </h2>
          </div>
          <div data-reveal="right" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            <h3 className="section-title">From backend architecture to intuitive experiences.</h3>
            <p className="about-copy">
              I’m an Information Technology student at Cebu Technological University with a
              foundation in software development and infrastructure, complemented by training in
              Computer Systems Servicing. I use AI-assisted development to streamline my process,
              and bring an adaptable, collaborative approach to both technical work and student
              leadership.
            </p>

            <div className="works-wip-card" data-reveal="up" style={{ "--reveal-delay": "220ms" } as CSSProperties}>
              <div className="works-wip-header">
                <h4>Sample Works &amp; Case Studies</h4>
                <span className="wip-badge">
                  Status: Work in Progress! <span aria-hidden="true">🚧</span>
                </span>
              </div>
              <p className="works-wip-copy">
                I’m currently putting together my project gallery. Because I take data privacy
                seriously, I’m taking the time to make sure all sensitive information is safely
                redacted before publishing. Want to see what I've been working on right now?{" "}
                <a className="wip-chat-link" href="#contact">
                  Send me a message and let's chat! <Arrow />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise" id="expertise" aria-labelledby="expertise-heading">
        <div className="shell">
          <div className="section-heading" data-reveal="up">
            <p className="section-label">02 / WHAT I BRING</p>
            <h2 id="expertise-heading" className="section-title">
              A toolkit built to connect the dots.
            </h2>
          </div>
          <div className="strength-grid">
            {strengths.map((item) => (
              <article
                className="strength-card"
                key={item.number}
                tabIndex={0}
                data-reveal="up"
                onMouseMove={handleCardMouseMove}
                style={{ "--reveal-delay": `${Number(item.number) * 85}ms` } as CSSProperties}
              >
                <div className="card-top">
                  <span className="card-number">{item.number}</span>
                  <span className="card-dot" aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <ul className="skill-list" aria-label={`${item.title} skills`}>
                  {item.skills.map((skill) => (
                    <li key={skill} className="skill-pill">
                      {skill}
                    </li>
                  ))}
                </ul>
                <p className="card-description">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="beyond" data-reveal="up">
            <h3>BEYOND THE TECH</h3>
            <ul className="beyond-list" aria-label="Additional professional skills">
              {beyondSkills.map((skill, idx) => (
                <li
                  key={skill}
                  className="beyond-pill"
                  style={{ "--pill-delay": `${idx * 60}ms` } as CSSProperties}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="leadership" id="leadership" aria-labelledby="leadership-heading">
        <div className="shell leadership-grid">
          <div className="leadership-intro" data-reveal="left">
            <p className="section-label">03 / LEADERSHIP</p>
            <h2 id="leadership-heading" className="side-title">
              Good work starts
              <br />
              with good people.
            </h2>
            <p>
              Putting collaboration, clear communication, and community at the heart of every
              initiative.
            </p>
          </div>
          <div className="roles">
            {leadership.map((role, index) => (
              <article
                className="role"
                key={`${role.title}-${role.years}`}
                tabIndex={0}
                data-reveal="right"
                style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
              >
                <span className="role-node" aria-hidden="true" />
                <div className="role-heading">
                  <div>
                    <h3>{role.title}</h3>
                    <p className="role-group">{role.group}</p>
                  </div>
                  <span className="role-years" aria-label={`Years active: ${role.years}`}>
                    {role.years}
                  </span>
                </div>
                <p className="role-description">{role.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="education" id="education" aria-labelledby="education-heading">
        <div className="shell education-grid">
          <p className="section-label" data-reveal="left">
            04 / EDUCATION
          </p>
          <div
            className="education-details"
            data-reveal="right"
            style={{ "--reveal-delay": "90ms" } as CSSProperties}
          >
            <h2 id="education-heading">BS in Information Technology</h2>
            <p>Cebu Technological University · Danao Campus</p>
          </div>
        </div>
      </section>

      <footer className="contact" id="contact" aria-labelledby="contact-heading">
        <div className="shell">
          <div className="contact-grid">
            <div data-reveal="left">
              <p className="section-label">
                05 / LET’S
                <br />
                CONNECT
              </p>
              <h2 id="contact-heading">
                Have something
                <br />
                in mind? Let’s talk.
              </h2>
            </div>
            <address data-reveal="right" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              <div className="email-row">
                <a className="contact-email" href="mailto:jessnilanthony@gmail.com">
                  jessnilanthony@gmail.com <Arrow />
                </a>
                <button
                  type="button"
                  className="copy-button"
                  onClick={handleCopyEmail}
                  aria-live="polite"
                >
                  {copiedEmail ? "Copied!" : "Copy"}
                </button>
              </div>
              <a className="contact-phone" href="tel:+639297704837">
                +63-929-770-4837
              </a>
              <span className="contact-address">Poblacion, Compostela, Cebu</span>
              <div className="social-links" aria-label="Social media profiles and resume">
                <a
                  className="social-link"
                  href="https://www.facebook.com/jessnil.anthony/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Facebook</span>
                  <Arrow />
                </a>
                <a
                  className="social-link"
                  href="https://www.linkedin.com/in/jessnil-anthony-paradiang/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                  <Arrow />
                </a>
                <a
                  className="social-link social-link-resume"
                  href={`${import.meta.env.BASE_URL}assets/Jessnil-Anthony-Paradiang-Resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Resume</span>
                  <Arrow />
                </a>
                <a
                  className="social-link social-link-download"
                  href={`${import.meta.env.BASE_URL}assets/Jessnil-Anthony-Paradiang-Resume.pdf`}
                  download="Jessnil-Anthony-Paradiang-Resume.pdf"
                >
                  <span>Download CV</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </address>
          </div>
          <div className="footer-line">
            <span>JESSNIL ANTHONY S. PARADIANG</span>
            <div className="footer-right">
              <span>Development · Design · Community</span>
              <a className="back-to-top" href="#landing" aria-label="Back to top">
                TOP ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
