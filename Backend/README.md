# KELAL Fayda identity handoff

The Fayda callback now maps verified identity claims into the onboarding form. Available claims are handed to the browser using a random, one-use ticket that expires after two minutes; personal identity values are not placed in the redirect URL. The frontend redeems the ticket, fills only matching fields, and asks the user to review them. Claims not returned by the configured Fayda service remain blank for manual entry.

Supported claim aliases include name/given/middle/family name, birthdate, gender/sex, national-ID/Fayda-number/FAN (with `sub` as a last fallback), ID expiry, email, and phone number. Actual fields depend on the claims enabled for the registered Fayda client and the user’s consent. Password, emergency-contact, family-status, and interest fields are never inferred from ID claims.

Configure the Fayda credentials and redirect URI in a local `.env` based on `.env.example`. Start the backend with `npm ci && npm start` from `Backend/`; start the Vite frontend with `npm ci && npm run dev` from `Frontend/`. Keep `.env` and database files private; they are not included in the project ZIP.
