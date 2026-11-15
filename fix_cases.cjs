const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\r\n');

// Keep everything before case 7 (lines 0..935, i.e. slice up to index 936)
const before = lines.slice(0, 936).join('\r\n');
// Keep everything after the renderStep closing }; (line 1125 onward, index 1125)
const after = lines.slice(1125).join('\r\n');

const newCases = `      case 6:
        return (
          <section className="step-shell docs-step">
            <div className="top-progress"><span style={{ width: \`\${progress}%\` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: \`\${progress}%\` }} /></div>
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

      case 7:
        return (
          <section className="step-shell complete-step">
            <div className="top-progress"><span style={{ width: \`\${progress}%\` }} /></div>
            <header className="top-bar">
              <div className="brand">KELAL</div>
              <div className="header-meta">
                <div className="mini-progress"><span style={{ width: \`\${progress}%\` }} /></div>
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
  };`;

const result = before + '\r\n' + newCases + '\r\n' + after;
fs.writeFileSync('src/App.jsx', result);
console.log('Done. Total lines:', result.split('\r\n').length);
