# AI Convergence 2026

**Live website:** https://aiconverge.github.io/AI-Convergence-2026/


Static website for **AI Convergence 2026 — International Conference on AI Convergence: Interdisciplinary Innovation through Intelligent Systems**, associated with the Department of Computer Science & Engineering, NIT Jamshedpur.

## Current status

This repository contains the public conference landing page. Dates, registration URLs, paper-submission URLs, official conference email, and social-media links are intentionally shown as **to be announced** unless an official destination is available.

The earlier site draft mixed the 2026 conference title with placeholder 2024–2025 deadlines. Those stale dates have been removed so visitors are not presented with incorrect programme information.

## Files

- `index.html` — conference content and semantic structure.
- `Styles.css` — responsive layout and presentation.
- `Script.js` — navigation, accessibility helpers, notifications, and progressive visual effects.
- `1.jpeg` — local speaker/convenor image.
- `favicon.png` — site icon.

## Local preview

No build step is required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Content updates

Before publishing official calls or registration:

1. Confirm conference dates and deadlines with the organizing committee.
2. Replace TBA submission/registration controls with verified HTTPS links.
3. Replace placeholder contact information with the official institutional conference email.
4. Add confirmed speaker photographs only with permission.
5. Run the repository validation workflow before deployment.

## Deployment

The project is suitable for GitHub Pages or any static web host. No secrets, API keys, or server credentials should be added to the client-side files.
