import { useEffect, useRef, useState } from 'react';

export default function AccessibilityWidget({
  options,
  accessibility,
  toggleAccess,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleClickOutside = (e) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const activeCount = Object.values(accessibility).filter(Boolean).length;

  return (
    <div className="a11y-floating-root">
      {isOpen && (
        <div
          id="kelal-a11y-popover"
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility Mode Options"
          className="a11y-popover-card"
        >
          <div className="a11y-popover-header">
            <div>
              <h2>Accessibility Mode</h2>
              <p>Optimize your experience across all pages</p>
            </div>
            <button
              type="button"
              className="a11y-popover-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="a11y-popover-grid">
            {options.map((option) => (
              <div
                key={option.key}
                className={`a11y-mini-card ${accessibility[option.key] ? 'is-active' : ''}`}
              >
                <div className="a11y-mini-top">
                  <div className="icon-wrap">
                    <span className="material-symbols-outlined">{option.icon}</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={accessibility[option.key]}
                    aria-label={option.title}
                    className={`switch ${accessibility[option.key] ? 'on' : ''}`}
                    onClick={() => toggleAccess(option.key)}
                  >
                    <span className="switch-thumb" />
                  </button>
                </div>

                <div className="a11y-mini-copy">
                  <h3>{option.title}</h3>
                  <p>{option.detail}</p>
                </div>

                {option.key === 'fontSize' && (
                  <div className="option-scale">
                    <span>A</span>
                    <div className="scale-bar">
                      <span className="fill" />
                      <span className="fill" />
                      <span />
                      <span />
                    </div>
                    <span className="scale-plus">A+</span>
                  </div>
                )}

                {option.key === 'screenReading' && (
                  <div className="option-linear">
                    <span>Synthesizer Rate</span>
                    <strong>1.0x (Default)</strong>
                  </div>
                )}

                {option.key === 'colorContrast' && (
                  <div className="segmented">
                    <span className="active">Standard</span>
                    <span>AAA High</span>
                    <span>Mono</span>
                  </div>
                )}

                {option.key === 'magnification' && (
                  <div className="option-linear">
                    <span>Hit Target Radius</span>
                    <strong>+8px Expansion</strong>
                  </div>
                )}

                {option.key === 'audioGuidance' && (
                  <div className="option-linear check-row">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Auto-describe fields</span>
                  </div>
                )}

                {option.key === 'keyboard' && (
                  <div className="option-linear">
                    <span>Focus Halo</span>
                    <strong>High Visibility</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        className="a11y-fab-btn"
        aria-label="Accessibility Mode"
        aria-expanded={isOpen}
        aria-controls="kelal-a11y-popover"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Accessibility Mode"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          accessibility_new
        </span>
        {activeCount > 0 && (
          <span className="a11y-fab-badge" aria-hidden="true">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
