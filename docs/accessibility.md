# Accessibility Documentation

This document explains the accessibility approach of the Enterprise Operations Dashboard, mapped to WCAG 2.1. It
describes the design intent; it is not a conformance claim. See `tests/accessibility-test-plan.md` for how to verify it.

## Semantic HTML approach
- Landmarks on every page: `<header>`, `<nav aria-label="Primary navigation">`, `<aside aria-label="Sidebar navigation">`
  (containing `<nav aria-label="Section navigation">`), `<main id="main-content">`, `<footer>`.
- Content is grouped with `<section aria-labelledby>` and `<article>` (dashboard cards, module cards); the maintenance notice
  is an `<aside>` inside `<main>`.
- One `<h1>` per page, then `<h2>` and `<h3>` without skipped levels.
- Native controls only: `<a>` for navigation, `<button type="button|submit|reset">` for actions. No clickable `div` or `span`.

## WCAG 2.1 considerations
| Criterion | How it is addressed |
|-----------|--------------------|
| 1.1.1 Non-text content | No images; decorative icons use `aria-hidden="true"` and always sit next to visible text. |
| 1.3.1 Info and relationships | Landmarks, headings, labels, fieldsets/legends, table captions and `scope` headers. |
| 1.3.5 Identify input purpose | `autocomplete` on name, email and password fields. |
| 1.4.1 Use of colour | Status uses text and a symbol as well as colour; errors use an "Error:" prefix, a warning symbol and a border. |
| 1.4.3 / 1.4.11 Contrast | Text and control colours chosen for high contrast (see CSS custom properties); to be confirmed with a contrast tool. |
| 1.4.4 / 1.4.10 Resize and reflow | Relative units, responsive grid, tables scroll inside their own region. |
| 2.1.1 / 2.1.2 Keyboard, no trap | All controls are native; the modal contains focus only while open and Escape always closes it. |
| 2.4.1 Bypass blocks | Skip link to `#main-content`. |
| 2.4.2 Page titled | Unique `<title>` per page. |
| 2.4.3 Focus order | DOM order matches visual order; dialogs are placed after the footer and focus is managed explicitly. |
| 2.4.7 Focus visible | 3px outline on `:focus-visible` (yellow on the dark header). |
| 3.3.1 / 3.3.3 Error identification and suggestion | Messages say what is wrong and how to fix it. |
| 3.3.2 Labels or instructions | Visible labels, "(required)" text and hint paragraphs. |
| 4.1.2 Name, role, value | Native elements first; ARIA only where needed (dialogs, `aria-current`, `aria-expanded`, live regions). |
| 4.1.3 Status messages | `role="status"` regions for results and success; `role="alert"` for the error summary. |

## Keyboard accessibility
Tab and Shift+Tab move through controls in logical order. Enter follows links and activates buttons; Space activates
buttons and toggles checkboxes/radios. Escape closes the open dialog, or the mobile sidebar.

## Focus management
Focus is only moved by script when a dialog opens or closes and when validation fails (to the error summary). The scrollable table regions have
`tabindex="0"` so keyboard users can scroll them.

## Form accessibility
Every control has a `<label for>`. Hints use `<p id="x-help">` and are linked with `aria-describedby`. Related controls
are in `<fieldset><legend>`. `forms.js` validates on submit (the browser's own bubbles are turned off with `novalidate`,
set by script so forms still work without JavaScript). On failure it: shows an error summary that receives focus and
links to each field; shows an inline "Error:" message per field; sets `aria-invalid="true"`; and appends the error's ID to
`aria-describedby`. Fixing a field removes these.

## Table accessibility
Each table has a `<caption>`, `<thead>` with `scope="col"` headers, and the first cell of each body row is a
`<th scope="row">`. Wide tables sit in a focusable `role="region"` container named by the caption.

## Modal accessibility
Dialogs use `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (heading) and `aria-describedby` (description). On open,
`modal.js` remembers the opener, shows the dialog, moves focus inside, marks every other `<body>` child `inert` (so the
background can't be focused or read), traps Tab/Shift+Tab, and locks page scroll. On close it removes `inert` and returns
focus to the opener, or to the "User directory" heading if the opener was deleted. The delete dialog names the person,
states the consequence, and puts initial focus on the safe "Cancel, keep user" button.

## ARIA strategy
Native HTML first. ARIA used: `aria-label` on landmarks and icon-only close buttons, `aria-labelledby`/`aria-describedby`,
`aria-current="page"`, `aria-expanded`/`aria-controls` on the menu button, `aria-haspopup="dialog"` on dialog openers,
`aria-invalid`, `aria-modal`, `role="dialog|status|alert|region|search"`, and `aria-hidden` on decorative icons.

## Responsive accessibility
Below 900px the sidebar becomes a collapsible menu (a Menu button with `aria-expanded`); without JavaScript it stays
visible. Below 600px, controls grow to at least 2.75rem tall and font size increases. Dialogs are limited to the viewport
size and scroll internally. Nothing is removed on small screens.
