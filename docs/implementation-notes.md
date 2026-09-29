# Implementation Notes

## Project Architecture

The project is a static, dependency-free accessibility dashboard built with
HTML5, CSS3, and vanilla JavaScript. There is no build step or frontend
framework.

Each page is a complete, standalone HTML document and includes the required
stylesheets and JavaScript files directly.

## Page Structure

All pages follow a consistent semantic structure consisting of:

- A skip link for keyboard users
- A `<header>` containing the application branding and account area
- A primary `<nav>` for site navigation
- A responsive sidebar navigation
- A `<main id="main-content">` landmark for page-specific content
- Semantic `<section>` and `<article>` elements where appropriate
- A `<footer>` containing supporting information

Modal dialogs are placed outside the main layout so that the rest of the
interface can be made inert while a dialog is open.

### Pages

- `index.html`
  - Application entry page
  - Module/navigation cards
  - Keyboard accessibility information

- `pages/dashboard.html`
  - Dashboard statistics
  - Progress/meter information
  - System status
  - Recent activity
  - Maintenance information

- `pages/users.html`
  - User search and filtering form
  - Accessible user data table
  - Edit user dialog
  - Delete confirmation dialog
  - Add user dialog

- `pages/reports.html`
  - Report filtering form
  - Date and select controls
  - Form validation
  - Report data table
  - Status messaging

- `pages/settings.html`
  - Profile settings
  - Notification settings
  - Account status
  - Password management form

## Component Structure

The `components/` directory contains documentation versions of the reusable
interface components:

- `header.html`
- `navigation.html`
- `sidebar.html`
- `modal.html`
- `footer.html`

These component files are not imported dynamically at runtime. Each page
contains its own complete markup so that it can operate independently without
a build system or framework.

This approach also ensures that each HTML document can be validated and
tested independently.

When a shared component is changed, the corresponding markup in each page
should be kept synchronized with the component documentation.

## JavaScript Responsibilities

### `js/navigation.js`

Responsible for:

- Enabling JavaScript-specific navigation behavior
- Toggling the responsive sidebar
- Supporting keyboard access to the navigation
- Closing the mobile navigation with the Escape key

The script exits safely when the required navigation elements are not present.

### `js/modal.js`

Responsible for:

- Opening and closing modal dialogs
- Moving keyboard focus into the active dialog
- Trapping focus within the dialog
- Supporting Tab and Shift+Tab navigation
- Closing dialogs with the Escape key
- Returning focus to the element that opened the dialog
- Making background content inert while a modal is active
- Demonstrating edit, delete, and add-user interactions

### `js/forms.js`

Responsible for:

- Form validation
- Required-field validation
- Email and password validation
- Date validation
- Inline validation messages
- Error summaries
- `aria-invalid` and `aria-describedby` state management
- Status messages
- User table filtering

All scripts use isolated functions and safely exit when their required
elements are not available on a particular page.

## CSS Responsibilities

### `css/styles.css`

Provides:

- Design tokens
- Page layout
- Header and navigation styles
- Sidebar styles
- Cards and tables
- Forms
- Buttons
- Modal presentation
- Responsive layouts

### `css/accessibility.css`

Provides accessibility-focused styling including:

- Skip-link presentation
- Visible keyboard focus indicators
- Visually hidden content
- Form error styling
- Status message styling
- Minimum touch-target sizing
- Reduced-motion support
- Forced-colors/high-contrast support

## Semantic HTML5 Implementation

The project uses HTML5 semantic elements to provide meaningful document
structure and accessibility landmarks.

Examples include:

- `<header>` for page and application headers
- `<nav>` for navigation
- `<main>` for the primary page content
- `<aside>` for supporting/sidebar content
- `<section>` for related groups of content
- `<article>` for self-contained content
- `<footer>` for page footer information
- `<table>` for tabular data
- `<form>` for user input
- `<fieldset>` and `<legend>` for logically grouped form controls

The pages maintain a logical heading hierarchy with a single primary
`<h1>` heading per document.

## Accessible Forms

Form controls use explicit `<label>` elements and associated `for`/`id`
attributes.

Additional accessibility attributes are used where appropriate, including:

- `aria-label`
- `aria-labelledby`
- `aria-describedby`
- `aria-invalid`
- `aria-current`
- `aria-controls`

Validation uses native HTML attributes such as:

- `required`
- `type="email"`
- `minlength`
- `pattern`
- `min`
- `max`

JavaScript validation supplements the native validation behavior and provides
clear text-based error messages.

## Accessible Data Tables

Data tables use semantic table markup including:

- `<caption>` to identify the purpose of each table
- `<thead>` for column headings
- `<tbody>` for table data
- `<th>` for header cells
- `scope="col"` and `scope="row"` where appropriate

This provides a meaningful structure for screen-reader and keyboard users.

## Accessible Modal Dialogs

The dashboard uses modal dialogs with:

- `role="dialog"`
- `aria-modal="true"`
- An accessible dialog name
- Keyboard focus management
- Focus trapping
- Escape-key support
- Explicit close controls
- Focus restoration after closing
- Background content made inert while the dialog is open

When a dialog opens, focus is moved into the dialog. Users can move through
interactive controls using Tab and Shift+Tab without leaving the dialog.

When the dialog closes, focus returns to the element that originally opened
it.

## Keyboard Accessibility

The interface is designed to be usable without a mouse.

Keyboard support includes:

- Skip link navigation
- Tab and Shift+Tab navigation
- Visible focus indicators
- Enter/Space activation of native buttons and links
- Escape-key dismissal of dialogs
- Keyboard navigation of responsive navigation controls
- Focus management within modal dialogs

Interactive functionality uses native `<button>` and `<a>` elements rather
than clickable `<div>` or `<span>` elements.

## Responsive Design

The interface adapts to smaller viewport sizes.

Responsive behavior includes:

- Collapsible sidebar navigation
- Mobile navigation controls
- Responsive content layout
- Horizontally scrollable data tables where required
- Dialogs that remain usable within smaller viewports
- Touch-friendly interactive controls

## Accessibility Decisions

The implementation follows WCAG 2.1 principles and focuses on:

- Perceivable content
- Operable keyboard navigation
- Understandable forms and feedback
- Robust semantic HTML
- Clear focus indicators
- Accessible names and descriptions
- Text-based status and error information

Dialogs use `role="dialog"` because they represent standard application
dialogs. A destructive confirmation dialog could alternatively use
`role="alertdialog"` when its behavior requires an urgent user response.

Validation errors are presented after form submission and are cleared when
the associated input is corrected. This avoids unnecessary layout changes
while the user is completing a form.

Status information is communicated through text as well as visual styling,
so information is not conveyed by colour alone.

## Automated Checks

Before packaging, the project was checked using an offline structural
validation script.

The automated checks covered:

- Balanced HTML tags
- One `<h1>` per page
- One `<main>` landmark per page
- `lang` attribute
- Character encoding
- Viewport metadata
- Unique IDs
- Label/control associations
- ARIA target references
- Accessible button names
- Accessible link names
- Table captions
- Table header `scope` attributes
- Heading hierarchy
- Absence of inline event handlers
- Local CSS and JavaScript references
- Local page links

JavaScript syntax was checked using `node --check`.

The interface behavior was also exercised in a browser environment,
including:

- Modal opening and closing
- Keyboard focus management
- Form validation
- User filtering
- User deletion demonstration
- Responsive navigation behavior

These checks are supplementary and do not replace W3C validation or manual
accessibility testing.

## Validation Status

W3C HTML validation is a separate verification step and must be performed
using the official W3C Markup Validation Service for all project pages.

The following files require validation:

- `index.html`
- `pages/dashboard.html`
- `pages/users.html`
- `pages/reports.html`
- `pages/settings.html`

The validation results should be recorded in:

`docs/validation-report.md`

No W3C validation result is claimed in this document until the pages have
actually been submitted to the validator.

## Manual Accessibility Testing

Manual accessibility testing should include:

- Keyboard-only navigation
- Skip-link operation
- Modal focus behavior
- Escape-key dialog closing
- Focus restoration
- Form error identification
- Responsive navigation
- Browser zoom at increased magnification
- Screen-reader navigation where available
- Visible focus indicators

Manual test results should be recorded in:

`tests/accessibility-test-plan.md`

Only tests that have actually been performed should be marked as passed.

## Known Limitations

The current implementation is a static demonstration rather than a
production application.

Known limitations include:

- User data is fictional and static.
- Add, edit, and delete operations are demonstration interactions and are
  not persisted to a backend.
- Changes are lost when the page is reloaded.
- The Add User workflow displays a confirmation but does not persist a new
  user to the table.
- Component markup is duplicated across pages because the project does not
  use a build system or component framework.
- Colour contrast should be independently confirmed using a dedicated
  contrast-checking tool.
- W3C validation and manual accessibility testing must be documented only
  after they have been performed.

## Browser Compatibility

The project is designed for modern browsers with support for standard
HTML5, CSS3, JavaScript, semantic accessibility APIs, and the `inert`
attribute.

The project should be tested in current versions of major browsers,
including Chromium-based browsers, Firefox, and Safari, before production
deployment.