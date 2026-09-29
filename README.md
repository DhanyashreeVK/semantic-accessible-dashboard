# Semantic Accessible Dashboard

## Project Overview
**Enterprise Operations Dashboard**: a multi-page enterprise dashboard built with plain HTML5, CSS3 and vanilla JavaScript
to demonstrate semantic markup, WCAG 2.1-oriented accessibility and accessible modal dialogs. No frameworks, no
dependencies. All data is fictional.

## Assignment
Task 3 — Semantic HTML5 & Accessible Component Architecture

## Features
- Pages: Home (`index.html`), Dashboard, Users, Reports, Settings.
- Statistics cards, system status, recent activity, maintenance notice.
- Search and filter for users and reports, with live result counts.
- Accessible forms with client-side validation and an error summary.
- Accessible data tables and three modal dialogs (Edit user, Delete confirmation, Add user).
- Responsive layout with a collapsible sidebar menu on small screens.

## Semantic HTML Architecture
Every page is a standalone document with: skip link, `<header>` (brand, `<nav aria-label="Primary navigation">`, account
area), `<aside aria-label="Sidebar navigation">`, `<main id="main-content">` with `<section>` / `<article>` and a logical
`h1` > `h2` > `h3` outline, and `<footer>`.

**Component architecture:** `components/` holds documentation copies of the header, navigation, sidebar, modal and footer.
They are not loaded at runtime (browsers no longer support HTML Imports); the same markup is written into each page so
every page runs independently. Update the component file and each page together.

## Accessibility Features
Skip link; visible focus outlines; `aria-current="page"` navigation; labelled landmarks; status not conveyed by colour
alone; decorative icons hidden from assistive technology; `role="status"` messages; reduced-motion and forced-colours
support. Details: `docs/accessibility.md`.

## Keyboard Support
| Key | Action |
|-----|--------|
| Tab / Shift+Tab | Move forward / backward |
| Enter | Follow links, activate buttons |
| Space | Activate buttons, toggle checkboxes and radios |
| Escape | Close the open dialog (or the mobile sidebar) |

## Forms
Every control has a `<label for>`, hints linked by `aria-describedby`, fieldsets with legends, correct input types and
`required`. `js/forms.js` validates required fields, email format, password length and match, and date order. It shows an
error summary (focused), inline errors, `aria-invalid="true"` and links each error ID through `aria-describedby`.

## Tables
`<caption>`, `<thead>`, `<tbody>`, `scope="col"` column headers and `scope="row"` row headers. Wide tables scroll inside a
keyboard-focusable, labelled region.

## Modal Dialogs
`role="dialog"`, `aria-modal="true"`, `aria-labelledby`. On open: opener saved, focus moved inside, background made
`inert`, Tab/Shift+Tab kept inside. Escape or the close button closes it and focus returns to the opener. See `js/modal.js`.

## Project Structure
```
semantic-accessible-dashboard/
├── index.html
├── pages/        dashboard.html  users.html  reports.html  settings.html
├── components/   header.html  navigation.html  sidebar.html  modal.html  footer.html   (documentation only)
├── css/          styles.css  accessibility.css
├── js/           navigation.js  modal.js  forms.js
├── assets/       README.md
├── docs/         accessibility.md  validation-report.md  implementation-notes.md
├── tests/        accessibility-test-plan.md
├── README.md
└── package.json
```

## Running Locally
You need Python 3 or Node.js. From the project folder:
```bash
npm run serve            # uses python3 -m http.server 8080
# or, without npm:
python3 -m http.server 8080
```
Open http://localhost:8080/ in your browser. (Opening `index.html` directly from the file system also works.)
Optional syntax check of the scripts: `npm run check:js`.

## W3C Validation
1. Go to https://validator.w3.org/ and choose **Validate by File Upload**.
2. Upload each file in turn: `index.html`, `pages/dashboard.html`, `pages/users.html`, `pages/reports.html`,
   `pages/settings.html`.
3. Click **Check** and confirm the result shows **Errors: 0**.
4. Record results and screenshots in `docs/validation-report.md`.

## Validation Status
**Pending manual W3C validation.** No official W3C result has been recorded. See `docs/validation-report.md`.

## Manual Accessibility Testing
Follow `tests/accessibility-test-plan.md`: keyboard navigation, skip link, focus visibility, navigation, forms and
validation, tables, modal opening/focus/containment/Escape/focus restoration, and responsive behaviour. Results are blank
until you run the tests yourself. Screen reader testing (NVDA, VoiceOver) is recommended.

## GitHub Submission
Push the complete project folder to a **public** GitHub repository and submit the repository link:
```bash
git init
git add .
git commit -m "Task 3: semantic accessible enterprise dashboard"
git branch -M main
git remote add origin https://github.com/<your-username>/semantic-accessible-dashboard.git
git push -u origin main
```
