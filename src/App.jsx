import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import AccessibilityWidget from './components/AccessibilityWidget';

const LANGUAGES = [
  { code: 'amharic', label: 'አማርኛ', english: 'Amharic', tag: 'ET-AM' },
  { code: 'oromo', label: 'Afaan Oromoo', english: 'Oromo', tag: 'ET-OM' },
  { code: 'tigrinya', label: 'ትግርኛ', english: 'Tigrinya', tag: 'ET-TI' },
  { code: 'afar', label: 'Qafaraf', english: 'Afar', tag: 'ET-AA' },
  { code: 'somali', label: 'Soomaali', english: 'Somali', tag: 'ET-SO' },
  { code: 'english', label: 'English', english: 'Global / Other', tag: 'GLOBAL' },
];

const ACCESSIBILITY_OPTIONS = [
  { key: 'fontSize', title: 'Font Size', icon: 'format_size', detail: 'Adjust typographic scale and reading line-height across forms.', active: false },
  { key: 'screenReading', title: 'Screen Reading', icon: 'hearing', detail: 'Synthesized voice cues, ARIA telemetry, and live announcements.', active: true },
  { key: 'colorContrast', title: 'Color Contrast', icon: 'contrast', detail: 'Elevate WCAG AAA ratio boundaries with stark botanical tonality.', active: false },
  { key: 'magnification', title: 'Magnification', icon: 'zoom_in', detail: 'Persistent viewport zoom lens and expanded touch-target footprints.', active: false },
  { key: 'audioGuidance', title: 'Audio Guidance', icon: 'record_voice_over', detail: 'Conversational audio prompts coupled with distraction-free layout strips.', active: false },
  { key: 'keyboard', title: 'Keyboard & Switch', icon: 'keyboard_tab', detail: 'Sequential logical tabbing, bypass skiplinks, and hardware binding.', active: true },
];



const HEADER_TITLES = [
  'Language Selection',
  'Account & Personal Information',
  'Special Status & Support',
  'Education & Skills',
  'Work Experience',
  'Documents & Portfolio',
  'Onboarding Complete',
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepMotion, setStepMotion] = useState('in');
  const [frameHeight, setFrameHeight] = useState(null);
  const stepLock = useRef(false);
  const contentRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState('amharic');
  const [accessibility, setAccessibility] = useState({
    fontSize: false,
    screenReading: true,
    colorContrast: false,
    magnification: false,
    audioGuidance: false,
    keyboard: true,
  });
  const [account, setAccount] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    nationalId: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('disability');
  const [disabilityType, setDisabilityType] = useState('');
  const [useCaseNotes, setUseCaseNotes] = useState('');
  const [personal, setPersonal] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    familyStatus: '',
    emergencyName: '',
    emergencyPhone: '',
    contactRelationship: '',
    primaryInterest: '',
    leisureActivity: '',
    bio: '',
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [addingHobby, setAddingHobby] = useState(false);
  const [hobbyInput, setHobbyInput] = useState('');
  const [blindMode, setBlindMode] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const [studyMode, setStudyMode] = useState('no');
  const [experienceWorked, setExperienceWorked] = useState(true);
  const [experience, setExperience] = useState({
    jobTitle: 'Senior Systems Architect',
    company: 'Arbor Logistics Global',
    employmentType: 'full-time',
    startDate: '2021-03',
    endDate: '',
    current: true,
    duties: 'Orchestrated the migration of legacy compliance pipelines into unified institutional micro-frameworks. Directed an operational squad of 14 engineers maintaining 99.99% uptime across Tier-3 data nodes.',
  });
  const [uploadedFiles, setUploadedFiles] = useState({ cv: null, cert: null });
  const [completeCode] = useState('KELAL-2025-88492');

  const progress = ((currentStep + 1) / HEADER_TITLES.length) * 100;

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return undefined;

    const measure = () => {
      const next = Math.ceil(node.getBoundingClientRect().height);
      setFrameHeight((prev) => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [currentStep, stepMotion]);

  const selectedLanguageLabel = useMemo(
    () => LANGUAGES.find((item) => item.code === selectedLanguage),
    [selectedLanguage]
  );

  const toggleAccess = (key) => {
    setAccessibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('a11y-font-large', Boolean(accessibility.fontSize));
    root.classList.toggle('a11y-screen-reading', Boolean(accessibility.screenReading));
    root.classList.toggle('a11y-high-contrast', Boolean(accessibility.colorContrast));
    root.classList.toggle('a11y-magnification', Boolean(accessibility.magnification));
    root.classList.toggle('a11y-audio-guidance', Boolean(accessibility.audioGuidance));
    root.classList.toggle('a11y-keyboard-focus', Boolean(accessibility.keyboard));
    root.classList.toggle('a11y-blind-mode', Boolean(blindMode));
  }, [accessibility, blindMode]);

  useEffect(() => {
    if (!langMenuOpen) return undefined;
    const handleOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [langMenuOpen]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoFill = () => {
    setPersonal((prev) => ({
      ...prev,
      firstName: 'Selam',
      middleName: 'Tadesse',
      lastName: 'Bekele',
    }));
    setAccount({
      email: 'selam.bekele@institution.org',
      phone: '+251 911 000 000',
      password: 'SecurePass!2025',
      confirmPassword: 'SecurePass!2025',
      nationalId: 'ID-9482-TX-291',
    });
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
    setModalOpen(false);
  };

  const changeStep = (delta) => {
    const next = currentStep + delta;
    if (stepLock.current || next < 0 || next > HEADER_TITLES.length - 1) return;
    stepLock.current = true;
    setStepMotion('out');
    window.setTimeout(() => {
      setCurrentStep(next);
      setStepMotion('in');
      stepLock.current = false;
    }, 450);
  };

  const nextStep = () => changeStep(1);

  const previousStep = () => changeStep(-1);

  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (!trimmed) {
      setAddingHobby(false);
      return;
    }
    setSelectedTags((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setHobbyInput('');
    setAddingHobby(false);
  };

  const removeHobby = (tag) => {
    setSelectedTags((prev) => prev.filter((item) => item !== tag));
  };

  const toggleBlindMode = () => {
    setBlindMode((prev) => {
      const next = !prev;
      setAccessibility((a11y) => ({
        ...a11y,
        screenReading: next ? true : a11y.screenReading,
        audioGuidance: next ? true : a11y.audioGuidance,
        keyboard: next ? true : a11y.keyboard,
      }));
      return next;
    });
  };

  const handleFileUpload = (event, key) => {
    const file = event.target.files?.[0] || null;
    setUploadedFiles((prev) => ({ ...prev, [key]: file }));
  };

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(completeCode);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 1600);
    } catch (error) {
      console.error('Clipboard copy failed', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <section className="step-shell language-step">
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                <span className="step-indicator">01 / 09</span>
              </div>
            </header>

            <main className="content-wrap center-stage">
              <div className="card card-centered language-card">
                <div className="section-head text-center">
                  <h1>Language Selection</h1>
                  <p>Choose your preferred language (can be changed anytime)</p>
                </div>

                <div className="language-grid">
                  {LANGUAGES.map((lang) => (
                    <label
                      key={lang.code}
                      className={`language-option ${selectedLanguage === lang.code ? 'selected' : ''}`}
                    >
                      <input
                        checked={selectedLanguage === lang.code}
                        name="language"
                        type="radio"
                        value={lang.code}
                        onChange={() => setSelectedLanguage(lang.code)}
                      />
                      <div className="lang-topline">
                        <span>{lang.tag}</span>
                        <span className="radio-mark">{selectedLanguage === lang.code ? '✓' : ''}</span>
                      </div>
                      <div className="lang-center">
                        <div className="lang-title">{lang.label}</div>
                        <div className="lang-sub">{lang.english}</div>
                      </div>
                      <div className="lang-bar" />
                    </label>
                  ))}
                </div>

                <div className="dot-pagination">
                  <span className="active" />
                  <span />
                  <span />
                </div>
              </div>
            </main>

            <footer className="bottom-nav">
              <button type="button" className="nav-btn ghost" disabled>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
              <button type="button" className="nav-btn primary" onClick={nextStep}>
                <span>Next</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </footer>
          </section>
        );

      case 1:
        return (
          <section className="step-shell account-step">
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                <span className="step-indicator">02 / 07</span>
              </div>
            </header>

            <main className="content-wrap center-stage">
              <div className="card card-centered account-card personal-scroll-box">

                <div className="section-head with-action">
                  <h1>Account & Personal Information</h1>
                  <p>Enter your personal details and credentials in order to set up your profile.</p>
                  <button type="button" className="inline-pill" onClick={() => setModalOpen(true)}>
                    <span className="material-symbols-outlined">document_scanner</span>
                    Scan ID
                  </button>
                </div>

                <form className="form-stack" onSubmit={(e) => e.preventDefault()}>
                  {/* 1. Full Name */}
                  <div className="three-col">
                    <div className="field-group">
                      <label>First Name <span>*</span></label>
                      <input value={personal.firstName} onChange={(e) => setPersonal({ ...personal, firstName: e.target.value })} placeholder="First name" />
                    </div>
                    <div className="field-group">
                      <label>Middle Name</label>
                      <input value={personal.middleName} onChange={(e) => setPersonal({ ...personal, middleName: e.target.value })} placeholder="Middle name" />
                    </div>
                    <div className="field-group">
                      <label>Last Name <span>*</span></label>
                      <input value={personal.lastName} onChange={(e) => setPersonal({ ...personal, lastName: e.target.value })} placeholder="Last name" />
                    </div>
                  </div>

                  {/* 2. Contact & National ID */}
                  <div className="three-col">
                    <div className="field-group">
                      <label>Official Email Address <span>*</span></label>
                      <div className="input-with-icon">
                        <span className="material-symbols-outlined">mail</span>
                        <input name="email" type="email" value={account.email} onChange={updateField} placeholder="name@organization.org" />
                      </div>
                    </div>

                    <div className="field-group">
                      <label>Phone Number <span>*</span></label>
                      <div className="input-with-icon">
                        <span className="material-symbols-outlined">call</span>
                        <input name="phone" type="tel" value={account.phone} onChange={updateField} placeholder="+251 911 000 000" />
                      </div>
                    </div>

                    <div className="field-group">
                      <label>National ID Number <span>*</span></label>
                      <div className="input-with-icon">
                        <span className="material-symbols-outlined">badge</span>
                        <input name="nationalId" type="text" value={account.nationalId} onChange={updateField} placeholder="e.g. ID-9482-TX-291" className="mono-input" />
                      </div>
                    </div>
                  </div>

                  {/* 3. Account Security */}
                  <div className="two-col">
                    <div className="field-group">
                      <label>Password <span>*</span></label>
                      <div className="input-with-icon">
                        <span className="material-symbols-outlined">lock</span>
                        <input name="password" type="password" value={account.password} onChange={updateField} placeholder="••••••••••••" />
                      </div>
                    </div>
                    <div className="field-group">
                      <label>Confirm Password <span>*</span></label>
                      <div className="input-with-icon">
                        <span className="material-symbols-outlined">check_circle</span>
                        <input name="confirmPassword" type="password" value={account.confirmPassword} onChange={updateField} placeholder="••••••••••••" />
                      </div>
                    </div>
                  </div>

                  {/* 4. Family & Emergency Contact */}
                  <div className="three-col">
                    <div className="field-group">
                      <label>Family Status</label>
                      <select value={personal.familyStatus} onChange={(e) => setPersonal({ ...personal, familyStatus: e.target.value })}>
                        <option value="">Select status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="relationship">In a relationship</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label>Emergency Contact Name</label>
                      <input value={personal.emergencyName} onChange={(e) => setPersonal({ ...personal, emergencyName: e.target.value })} placeholder="Full name" />
                    </div>
                    <div className="field-group">
                      <label>Emergency Contact Phone</label>
                      <input value={personal.emergencyPhone} onChange={(e) => setPersonal({ ...personal, emergencyPhone: e.target.value })} placeholder="(555) 019-2834" />
                    </div>
                  </div>

                  {/* 5. Relationship & Lifestyle Preferences */}
                  <div className="three-col">
                    <div className="field-group">
                      <label>Relationship to Contact</label>
                      <select value={personal.contactRelationship} onChange={(e) => setPersonal({ ...personal, contactRelationship: e.target.value })}>
                        <option value="">Select relationship</option>
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="sibling">Sibling</option>
                        <option value="partner">Partner</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label>Primary Interest</label>
                      <select value={personal.primaryInterest} onChange={(e) => setPersonal({ ...personal, primaryInterest: e.target.value })}>
                        <option value="">Choose focus area</option>
                        <option value="tech">Technology & Design</option>
                        <option value="arts">Arts & Culture</option>
                        <option value="outdoors">Athletics & Outdoors</option>
                        <option value="literature">Literature & Science</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label>Preferred Leisure / Activity</label>
                      <input value={personal.leisureActivity} onChange={(e) => setPersonal({ ...personal, leisureActivity: e.target.value })} placeholder="e.g. Trail running, Ceramics" />
                    </div>
                  </div>

                  <div className="notice-panel">
                    <span className="material-symbols-outlined">verified_user</span>
                    <p>Inputs are cryptographically secured under sovereign data isolation standards. You may verify identity via scanner at any point.</p>
                  </div>

                  {/* 6. Hobbies */}
                  <div className="tag-wrap">
                    <label>Hobbies &amp; Personal Interests</label>
                    <div className="chip-row">
                      {selectedTags.map((tag) => (
                        <span key={tag} className="chip chip-active">
                          <span>{tag}</span>
                          <button
                            type="button"
                            className="chip-remove-btn"
                            aria-label={`Remove ${tag}`}
                            onClick={() => removeHobby(tag)}
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </span>
                      ))}

                      {addingHobby ? (
                        <div className="hobby-inline-editor">
                          <input
                            type="text"
                            autoFocus
                            value={hobbyInput}
                            onChange={(e) => setHobbyInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addHobby();
                              } else if (e.key === 'Escape') {
                                setHobbyInput('');
                                setAddingHobby(false);
                              }
                            }}
                            placeholder="Type a hobby..."
                          />
                          <button
                            type="button"
                            className="hobby-confirm-btn"
                            aria-label="Confirm hobby"
                            onClick={addHobby}
                          >
                            <span className="material-symbols-outlined">check</span>
                          </button>
                          <button
                            type="button"
                            className="hobby-cancel-btn"
                            aria-label="Cancel adding hobby"
                            onClick={() => {
                              setHobbyInput('');
                              setAddingHobby(false);
                            }}
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="hobby-add-plus-btn"
                          aria-label="Add hobby"
                          title="Add a hobby"
                          onClick={() => setAddingHobby(true)}
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 7. Short Biography */}
                  <div className="field-group">
                    <div className="field-header">
                      <label>Short Personal Biography</label>
                      <span className="muted-tag">{personal.bio.length} / 280</span>
                    </div>
                    <textarea rows="3" maxLength="280" value={personal.bio} onChange={(e) => setPersonal({ ...personal, bio: e.target.value })} placeholder="Write a brief summary about yourself and what you enjoy..." />
                  </div>
                </form>
              </div>
            </main>

            <footer className="bottom-nav">
              <button type="button" className="nav-btn ghost" onClick={previousStep}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
              <button type="button" className="nav-btn primary" onClick={nextStep}>
                <span>Next</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </footer>
          </section>
        );

      case 2:
        return (
          <section className="step-shell support-step">
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                <span className="step-indicator">03 / 07</span>
              </div>
            </header>

            <main className="content-wrap center-stage">
              <div className="card card-centered status-card">
                <div className="section-head text-center">
                  <h1>Special Status & Support</h1>
                  <p>Please indicate any recognized circumstances or accommodation requirements so we can tailor resources and support appropriately.</p>
                </div>

                <div className="status-grid">
                  {[
                    { key: 'disability', title: 'Person with Disability', icon: 'accessible_forward', text: 'Accommodations, accessibility aids, physical or sensory support.' },
                    { key: 'refugee', title: 'Refugee or Displaced', icon: 'flight_land', text: 'Asylum seekers, temporary protection, or humanitarian visas.' },
                    { key: 'none', title: 'None / Other Status', icon: 'check_circle', text: 'Standard profile with no immediate institutional accommodation required.' },
                  ].map((option) => (
                    <div
                      key={option.key}
                      className={`status-option ${selectedStatus === option.key ? 'selected' : ''}`}
                      onClick={() => setSelectedStatus(option.key)}
                    >
                      <div className="status-top">
                        <div className="icon-wrap"><span className="material-symbols-outlined">{option.icon}</span></div>
                        <div className="radio-out"><span className={selectedStatus === option.key ? 'inner active' : 'inner'} /></div>
                      </div>
                      <h3>{option.title}</h3>
                      <p>{option.text}</p>

                      {option.key === 'disability' && (
                        <div
                          className="field-group disability-select-wrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <label htmlFor="disability-type-select">Disability Category</label>
                          <select
                            id="disability-type-select"
                            value={disabilityType}
                            onChange={(e) => {
                              setSelectedStatus('disability');
                              setDisabilityType(e.target.value);
                            }}
                          >
                            <option value="">Select disability type...</option>
                            <option value="visual">Visual Impairment / Blindness</option>
                            <option value="hearing">Hearing Impairment / Deafness</option>
                            <option value="mobility">Physical / Mobility Disability</option>
                            <option value="speech">Speech & Communication</option>
                            <option value="cognitive">Cognitive / Learning / Neurodivergent</option>
                            <option value="chronic">Chronic Health Condition</option>
                            <option value="multiple">Multiple / Other</option>
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="field-group text-area-wrap">
                  <div className="field-header">
                    <label>Accommodation & Support Notes</label>
                    <span className="muted-tag">Optional</span>
                  </div>
                  <textarea rows="3" value={useCaseNotes} onChange={(e) => setUseCaseNotes(e.target.value)} placeholder="e.g., Screen-magnifier software, adjustable standing workstation, quiet focus room..." />
                </div>

                <div className="privacy-pill">
                  <span>🔒</span>
                  <span>All declarations remain strictly confidential under institutional health privacy protections.</span>
                </div>
              </div>
            </main>

            <footer className="bottom-nav">
              <button type="button" className="nav-btn ghost" onClick={previousStep}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
              <button type="button" className="nav-btn primary" onClick={nextStep}>
                <span>Next</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </footer>
          </section>
        );

      case 3:
        return (
          <section className="step-shell education-step">
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                <span className="step-indicator">05 / 08</span>
              </div>
            </header>

            <main className="content-wrap center-stage">
              <div className="card card-centered education-card">
                <div className="section-head text-center">
                  <h1>Education & Skills</h1>
                  <p>Please share your academic credentials and core competencies.</p>
                </div>

                <form className="form-stack" onSubmit={(e) => e.preventDefault()}>
                  <div className="three-col">
                    <div className="field-group">
                      <label>Highest Education Level <span>*</span></label>
                      <select defaultValue="bachelor">
                        <option value="highschool">High School Diploma</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="doctorate">Doctorate / Ph.D.</option>
                        <option value="other">Specialized Diploma / Other</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label>School / University <span>*</span></label>
                      <input defaultValue="Addis Ababa Institute of Technology" />
                    </div>
                    <div className="field-group">
                      <label>Field of Study <span>*</span></label>
                      <input defaultValue="Computer Science & Engineering" />
                    </div>
                  </div>

                  <div className="three-col">
                    <div className="field-group">
                      <label>Degree / Qualification <span>*</span></label>
                      <input defaultValue="B.Sc. in Software Engineering" />
                    </div>
                    <div className="field-group">
                      <label>Graduation Year <span>*</span></label>
                      <select defaultValue="2023">
                        <option value="2026">2026 (Expected)</option>
                        <option value="2025">2025 (Expected)</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="prior">2019 or earlier</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label>Currently Studying?</label>
                      <div className="segmented-toggle">
                        <button type="button" className={studyMode === 'no' ? 'active' : ''} onClick={() => setStudyMode('no')}>No</button>
                        <button type="button" className={studyMode === 'yes' ? 'active' : ''} onClick={() => setStudyMode('yes')}>Yes</button>
                      </div>
                    </div>
                  </div>

                  <div className="two-col">
                    <div className="field-group">
                      <label>Skills & Tools</label>
                      <div className="input-badges">
                        {['Python', 'UI/UX Design', 'PostgreSQL'].map((skill) => (
                          <span key={skill} className="badge-item">{skill}<button type="button">×</button></span>
                        ))}
                        <input placeholder="+ Add skill" />
                      </div>
                    </div>

                    <div className="field-group">
                      <label>Languages Spoken</label>
                      <div className="language-badges">
                        <button type="button" className="badge-primary">Amharic <span className="material-symbols-outlined">check</span></button>
                        <button type="button" className="badge-primary">English <span className="material-symbols-outlined">check</span></button>
                        <button type="button" className="badge-light">Afaan Oromo</button>
                        <button type="button" className="badge-light">Tigrinya</button>
                        <button type="button" className="badge-link"><span className="material-symbols-outlined">add</span> Add</button>
                      </div>
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Portfolio / Key Project Link <span className="muted-optional">(Optional)</span></label>
                    <div className="input-with-icon">
                      <span className="material-symbols-outlined">link</span>
                      <input defaultValue="https://github.com/developer/portfolio" />
                    </div>
                  </div>
                </form>
              </div>
            </main>

            <footer className="bottom-nav">
              <button type="button" className="nav-btn ghost" onClick={previousStep}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
              <button type="button" className="nav-btn primary" onClick={nextStep}>
                <span>Next</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </footer>
          </section>
        );

      case 4:
        return (
          <section className="step-shell work-step">
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                <span className="step-indicator">07 / 08</span>
              </div>
            </header>

            <main className="content-wrap center-stage">
              <div className="card card-centered work-card">
                <div className="section-head text-center">
                  <h1>Work Experience</h1>
                </div>

                <div className="toggle-row">
                  <div>
                    <strong>Have you worked before?</strong>
                    <span>Include relevant full-time, contractual, or academic positions.</span>
                  </div>
                  <div className="segmented-toggle compact">
                    <button type="button" className={experienceWorked ? 'active' : ''} onClick={() => setExperienceWorked(true)}>Yes</button>
                    <button type="button" className={!experienceWorked ? 'active' : ''} onClick={() => setExperienceWorked(false)}>No</button>
                  </div>
                </div>

                {experienceWorked ? (
                  <div className="experience-panel">
                    <div className="three-col">
                      <div className="field-group">
                        <label>Job Title</label>
                        <input value={experience.jobTitle} onChange={(e) => setExperience({ ...experience, jobTitle: e.target.value })} />
                      </div>
                      <div className="field-group">
                        <label>Company / Organization</label>
                        <input value={experience.company} onChange={(e) => setExperience({ ...experience, company: e.target.value })} />
                      </div>
                      <div className="field-group">
                        <label>Employment Type</label>
                        <select value={experience.employmentType} onChange={(e) => setExperience({ ...experience, employmentType: e.target.value })}>
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="contract">Contract</option>
                          <option value="internship">Internship</option>
                          <option value="freelance">Freelance</option>
                        </select>
                      </div>
                    </div>

                    <div className="three-col">
                      <div className="field-group">
                        <label>Start Date</label>
                        <input type="month" value={experience.startDate} onChange={(e) => setExperience({ ...experience, startDate: e.target.value })} />
                      </div>
                      <div className="field-group">
                        <label>End Date</label>
                        <input type="month" value={experience.endDate} onChange={(e) => setExperience({ ...experience, endDate: e.target.value })} disabled={experience.current} />
                      </div>
                      <div className="field-group checkbox-field">
                        <label className="checkable">
                          <input type="checkbox" checked={experience.current} onChange={(e) => setExperience({ ...experience, current: e.target.checked, endDate: '' })} />
                          <span>Currently working here</span>
                        </label>
                      </div>
                    </div>

                    <div className="field-group">
                      <label>Responsibilities / Description</label>
                      <textarea rows="3" value={experience.duties} onChange={(e) => setExperience({ ...experience, duties: e.target.value })} />
                    </div>
                  </div>
                ) : (
                  <div className="empty-panel">
                    <span className="material-symbols-outlined">school</span>
                    <strong>No Prior Occupational History</strong>
                    <p>No work experience record needed. You will proceed to foundational academic and onboarding attestations.</p>
                  </div>
                )}
              </div>
            </main>

            <footer className="bottom-nav">
              <button type="button" className="nav-btn ghost" onClick={previousStep}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
              <button type="button" className="nav-btn primary" onClick={nextStep}>
                <span>Next</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </footer>
          </section>
        );

      case 5:
        return (
          <section className="step-shell docs-step">
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                <span className="step-indicator">07 / 08</span>
              </div>
            </header>

            <main className="content-wrap center-stage">
              <div className="card card-centered docs-card">
                <div className="section-head text-center max-width">
                  <h1>Documents &amp; Portfolio</h1>
                  <p>Upload your credentials and share your professional links to complete onboarding.</p>
                </div>

                <div className="upload-grid">
                  <label className="upload-box">
                    <input type="file" accept=".pdf,.docx" onChange={(e) => handleFileUpload(e, 'cv')} />
                    <div className="upload-icon"><span className="material-symbols-outlined">description</span></div>
                    <strong>Curriculum Vitae / Resume</strong>
                    <p>Drag and drop your file here, or <span>browse</span></p>
                    <div className="file-types">
                      <span>PDF</span>
                      <span>DOCX</span>
                      <span>≤ 10MB</span>
                    </div>
                    {uploadedFiles.cv && <div className="attached-pill"><span className="material-symbols-outlined">check</span> Attached</div>}
                  </label>

                  <label className="upload-box">
                    <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileUpload(e, 'cert')} />
                    <div className="upload-icon"><span className="material-symbols-outlined">badge</span></div>
                    <strong>Certificates &amp; Accreditations</strong>
                    <p>Upload verified licenses, or <span>browse</span></p>
                    <div className="file-types">
                      <span>PDF</span>
                      <span>PNG</span>
                      <span>≤ 15MB</span>
                    </div>
                    {uploadedFiles.cert && <div className="attached-pill"><span className="material-symbols-outlined">check</span> Attached</div>}
                  </label>
                </div>

                <div className="three-col links-row">
                  <div className="field-group">
                    <label>Portfolio Link</label>
                    <div className="input-with-icon"><span className="material-symbols-outlined">link</span><input defaultValue="https://alex-morales.design" /></div>
                  </div>
                  <div className="field-group">
                    <label>LinkedIn Profile</label>
                    <div className="input-with-icon"><span className="material-symbols-outlined">public</span><input defaultValue="https://linkedin.com/in/alex-morales" /></div>
                  </div>
                  <div className="field-group">
                    <div className="field-header">
                      <label>GitHub Profile</label>
                      <span className="muted-tag">optional</span>
                    </div>
                    <div className="input-with-icon"><span className="material-symbols-outlined">code</span><input defaultValue="https://github.com/alexmorales-dev" /></div>
                  </div>
                </div>
              </div>
            </main>

            <footer className="bottom-nav">
              <button type="button" className="nav-btn ghost" onClick={previousStep}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
              <button type="button" className="nav-btn primary" onClick={nextStep}>
                <span>Complete &amp; Finish</span>
                <span className="material-symbols-outlined">check</span>
              </button>
            </footer>
          </section>
        );

      case 6:
        return (
          <section className="step-shell complete-step">
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                <span className="step-indicator">08 / 08</span>
              </div>
            </header>

            <main className="content-wrap center-stage">
              <div className="card card-centered complete-card">
                <div className="success-top">
                  <div className="success-badge"><span className="material-symbols-outlined">check</span></div>
                  <h1>Onboarding Complete</h1>
                  <p>Your institutional credentials, verified attributes, and accessibility configurations have been successfully registered.</p>
                </div>

                <div className="summary-grid">
                  <div className="summary-panel">
                    <div className="summary-header">
                      <strong>Profile Overview</strong>
                      <div className="reference-box">
                        <span>{completeCode}</span>
                        <button type="button" onClick={copyReference} aria-label="Copy reference ID">
                          <span className="material-symbols-outlined">content_copy</span>
                        </button>
                      </div>
                    </div>

                    <div className="summary-list">
                      {[
                        ['Language & Environment', 'Configured'],
                        ['Account & Sovereign ID', 'Verified'],
                        ['Credentials & Roles', 'Archived'],
                        ['Compliance Documents', 'Attached'],
                      ].map(([label, state]) => (
                        <div key={label} className="summary-row">
                          <div className="summary-label">
                            <span className="mini-check"><span className="material-symbols-outlined">check</span></span>
                            {label}
                          </div>
                          <span className="summary-state">{state}</span>
                        </div>
                      ))}
                    </div>
                    <div className="summary-footer">
                      <span>Registry Status</span>
                      <span className="lock-status"><span className="material-symbols-outlined">lock</span> Cryptographically Sealed</span>
                    </div>
                  </div>

                  <div className="summary-panel">
                    <div className="summary-header">
                      <strong>Next Steps</strong>
                      <span className="meta-badge">Automated</span>
                    </div>

                    <div className="steps-list">
                      {[
                        ['Provisioning Security Keys', 'Automated generation of hardware tokens and SAML SSO routing.'],
                        ['Welcome Packet Sent to Email', 'A secure institutional summary delivered to your primary mailbox.'],
                        ['Direct Portal Access Unlocked', 'Unlocks enterprise workspace dashboard and organizational nodes.'],
                      ].map(([heading, description], index) => (
                        <div key={heading} className="next-step-item">
                          <span className="step-number">{index + 1}</span>
                          <div>
                            <h4>{heading}</h4>
                            <p>{description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="summary-footer small-gap">
                      <span>Security Architecture</span>
                      <span className="lock-status"><span className="material-symbols-outlined">verified_user</span> Zero-Knowledge Vault</span>
                    </div>
                  </div>
                </div>

                <div className="cta-row">
                  <button type="button" className="nav-btn primary huge">
                    <span>Enter Portal Workspace</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <button type="button" className="nav-btn tertiary">
                    <span className="material-symbols-outlined">download</span>
                    <span>Download Summary Record (PDF)</span>
                  </button>
                </div>
              </div>
            </main>

            <footer className="bottom-nav complete-bottom-nav">
              <button type="button" className="nav-btn ghost" onClick={previousStep}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
              <p className="footer-note">
                Need assistance? <a href="#support">Contact Support</a>
                <span>•</span>
                <span>Compliance Rule ISO-27001</span>
              </p>
              <button type="button" className="nav-btn primary" disabled>
                <span>Completed</span>
                <span className="material-symbols-outlined">check</span>
              </button>
            </footer>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <div className="top-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <header className="top-bar">
        <div className="brand">KELAL</div>
        <div className="header-meta">
          <button
            type="button"
            className={`blind-mode-toggle ${blindMode ? 'is-on' : ''}`}
            aria-pressed={blindMode}
            aria-label="Toggle Blind Mode"
            title="Blind Mode (Screen Reader & Audio Guidance)"
            onClick={toggleBlindMode}
          >
            <span className="material-symbols-outlined">
              {blindMode ? 'visibility_off' : 'blind'}
            </span>
            <span className="blind-mode-label">Blind Mode</span>
            <span className="blind-mode-pill" aria-hidden="true">
              <span className="blind-mode-thumb" />
            </span>
          </button>

          {currentStep > 0 && (
            <div className="mini-lang-dropdown" ref={langDropdownRef}>
              <button
                type="button"
                className={`mini-lang-trigger ${langMenuOpen ? 'open' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={langMenuOpen}
                aria-label="Select Language"
                onClick={() => setLangMenuOpen((prev) => !prev)}
              >
                <span className="material-symbols-outlined">language</span>
                <span className="mini-lang-code">{selectedLanguageLabel?.tag || 'ET-AM'}</span>
                <span className="mini-lang-name">{selectedLanguageLabel?.label}</span>
                <span className="material-symbols-outlined mini-lang-chevron">
                  {langMenuOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {langMenuOpen && (
                <ul className="mini-lang-menu" role="listbox" aria-label="Available languages">
                  {LANGUAGES.map((lang) => {
                    const isSelected = lang.code === selectedLanguage;
                    return (
                      <li key={lang.code} role="option" aria-selected={isSelected}>
                        <button
                          type="button"
                          className={`mini-lang-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                        >
                          <span className="mini-lang-item-left">
                            <span className="mini-lang-native">{lang.label}</span>
                            <span className="mini-lang-en">{lang.english}</span>
                          </span>
                          <span className="mini-lang-item-right">
                            <span className="mini-lang-tag">{lang.tag}</span>
                            {isSelected && (
                              <span className="material-symbols-outlined">check</span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          <div
            className="mini-progress"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={0}
            aria-valuemax={HEADER_TITLES.length}
            aria-valuenow={currentStep + 1}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <span className="step-indicator">
            {String(currentStep + 1).padStart(2, '0')} / {String(HEADER_TITLES.length).padStart(2, '0')}
          </span>
        </div>
      </header>
      <main className="page-stage">
        <div className="content-frame" style={frameHeight == null ? undefined : { height: frameHeight }}>
          <div ref={contentRef} className={`step-transition is-${stepMotion}`} key={currentStep}>
            {renderStep()}
          </div>
        </div>
      </main>
      <footer className={`bottom-nav ${currentStep === HEADER_TITLES.length - 1 ? 'complete-bottom-nav' : ''}`}>
        <button type="button" className="nav-btn ghost" onClick={previousStep} disabled={currentStep === 0}>
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back</span>
        </button>
        {currentStep === HEADER_TITLES.length - 1 && (
          <p className="footer-note">
            Need assistance? <a href="#support">Contact Support</a>
            <span>•</span>
            <span>Compliance Rule ISO-27001</span>
          </p>
        )}
        <button
          type="button"
          className="nav-btn primary"
          onClick={nextStep}
          disabled={currentStep === HEADER_TITLES.length - 1}
        >
          <span>{currentStep === HEADER_TITLES.length - 1 ? 'Completed' : currentStep === HEADER_TITLES.length - 2 ? 'Complete & Finish' : 'Next'}</span>
          <span className="material-symbols-outlined">
            {currentStep === HEADER_TITLES.length - 1 ? 'check' : currentStep === HEADER_TITLES.length - 2 ? 'check' : 'arrow_forward'}
          </span>
        </button>
      </footer>
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-button" onClick={() => setModalOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="id-illustration">
              <div className="id-card">
                <div className="id-topline">
                  <span className="dot" />
                  <span className="tiny">NATIONAL ID CARD</span>
                  <span className="material-symbols-outlined">contactless</span>
                </div>
                <div className="id-main">
                  <div className="avatar"><span className="material-symbols-outlined">person</span></div>
                  <div className="id-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="id-bottom">
                  <span>ID-9482-TX-291</span>
                  <div className="scan-bars"><span /> <span /></div>
                </div>
              </div>
              <div className="scan-tag">
                <span className="material-symbols-outlined">auto_awesome</span>
                Fast OCR Optical Ready
              </div>
            </div>

            <h2>Fast-Track Identity Verification</h2>
            <p>Scan your National ID to autofill your personal and account details instantly, or choose to enter them manually.</p>

            <button type="button" className="action-primary block" onClick={handleAutoFill}>
              <span className="material-symbols-outlined">document_scanner</span>
              Scan National ID (Autofill)
            </button>

            <button type="button" className="action-secondary block" onClick={() => setModalOpen(false)}>
              No thanks, I will fill manually
            </button>

            <div className="security-note">
              <span>🔒</span>
              <span>End-to-end encrypted biometric scan • GDPR Compliant</span>
            </div>
          </div>
        </div>
      )}
      {toastVisible && (
        <div className="toast-banner">
          <span className="material-symbols-outlined">check_circle</span>
          <span>ID verified! Credentials autofilled successfully.</span>
        </div>
      )}
      <AccessibilityWidget
        options={ACCESSIBILITY_OPTIONS}
        accessibility={accessibility}
        toggleAccess={toggleAccess}
      />
    </div>
  );
}

export default App;
