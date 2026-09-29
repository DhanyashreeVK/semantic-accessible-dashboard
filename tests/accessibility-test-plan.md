# Accessibility Test Plan

This document defines the manual accessibility tests for the Semantic
Accessible Dashboard.

The **Test Procedure** sections describe the checks to perform. The
**Actual Test Result** sections must be completed only after the test has
been performed.

Each completed result should include:

- Test date
- Browser and version
- Operating system
- Assistive technology, if applicable
- Observed result
- Pass/Fail status
- Any issues discovered

## Test Environment

Complete this information before recording manual test results.

- **Browser/version:** ______________________________
- **Operating system:** ____________________________
- **Assistive technology:** _________________________
- **Tester:** ______________________________________
- **Test date:** ____________________________________

## How to Start the Site

The project can be tested using VS Code Live Server.

1. Open the project in VS Code.
2. Open `index.html`.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. Open the URL provided by Live Server, for example:

   `http://127.0.0.1:5500/index.html`

Do not record a test result until the site has loaded successfully.

---

# 1. Keyboard Navigation

### Test Procedure

Put the mouse aside and use only the keyboard.

On every page, starting from the top of the document:

1. Press `Tab` repeatedly.
2. Confirm that every interactive link, button and form control can receive
   focus.
3. Confirm that links can be activated with `Enter`.
4. Confirm that buttons can be activated with `Enter` or `Space`.
5. Confirm that the focus order follows the visual and logical order.
6. Press `Shift + Tab` to move backwards through the interface.
7. Confirm that no interactive element is skipped.

### Pages to Test

- `index.html`
- `pages/dashboard.html`
- `pages/users.html`
- `pages/reports.html`
- `pages/settings.html`

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 2. Skip Link

### Test Procedure

1. Load a page.
2. Place focus at the top of the page.
3. Press `Tab` once.
4. Confirm that the **Skip to main content** link becomes visible.
5. Press `Enter`.
6. Confirm that focus moves to the main content area.
7. Press `Tab` again.
8. Confirm that focus continues into the main content rather than returning
   to the header or sidebar.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 3. Focus Visibility

### Test Procedure

Use the keyboard to move through each page.

Confirm that the currently focused element has a clearly visible focus
indicator.

Check focus visibility on:

- Header links
- Navigation links
- Sidebar links
- Buttons
- Form fields
- Checkboxes/radio controls where present
- Table controls
- Modal controls
- Mobile menu controls

The focus indicator must remain visible against both light and dark
backgrounds.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 4. Navigation

### Test Procedure

For each page:

1. Confirm that the primary navigation is present.
2. Confirm that navigation links point to the correct pages.
3. Confirm that the current page is visually identified.
4. If a screen reader is available, confirm that the current page is
   announced as the current page.
5. Resize the browser to approximately 375 px wide.
6. Confirm that the responsive Menu button appears.
7. Activate the Menu button using `Enter` and `Space`.
8. Confirm that the sidebar opens and closes correctly.
9. Press `Escape` while the menu is open.
10. Confirm that the menu closes.
11. Confirm that focus returns to the Menu button.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Assistive Technology:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 5. Forms

### Test Procedure

Test the forms on:

- Settings
- Reports
- Edit User dialog
- Add User dialog

For each form:

1. Click each visible form label.
2. Confirm that the associated input receives focus.
3. Confirm that labels clearly describe their controls.
4. Check that grouped controls use appropriate `<fieldset>` and `<legend>`
   markup where applicable.
5. If a screen reader is available, confirm that:
   - Field labels are announced.
   - Hint/help text is announced with the associated field.
   - Fieldset legends are announced for grouped controls.
   - Required fields are identified appropriately.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Assistive Technology:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 6. Form Validation

### Test Procedure

Submit each applicable form without entering any information.

Confirm that:

1. An error summary appears.
2. The error summary can receive focus.
3. Each summary link moves focus to the corresponding field.
4. Each invalid field has a clear text error message.
5. The error message is associated with the relevant field.
6. Invalid fields receive `aria-invalid="true"`.
7. Correcting the field clears its associated error.
8. Error information is not communicated through colour alone.

Test the following invalid inputs:

- Empty required fields
- Invalid email such as `abc`
- Password shorter than 12 characters
- Mismatched password and confirmation
- A To date earlier than the From date

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 7. Tables

### Test Procedure

Test each page containing a data table.

With a screen reader, move through table cells and confirm that:

1. The table caption is available.
2. Column headers are correctly associated with their cells.
3. Row headers are announced where applicable.
4. The table structure is understandable when navigating by cell.

Also test browser zoom:

1. Set zoom to 200%.
2. Confirm that table content remains available.
3. Set zoom to 400%.
4. Confirm that the table can be scrolled horizontally within its intended
   container.
5. Confirm that the entire page does not unnecessarily scroll sideways.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Assistive Technology:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 8. Modal Opening

### Test Procedure

On the Users page:

1. Locate the Edit button.
2. Activate it using `Enter`.
3. Close the dialog.
4. Activate it using `Space`.
5. Repeat the test for Delete.
6. Repeat the test for Add User.

Confirm that:

- The dialog opens successfully.
- The dialog has a visible heading.
- The heading provides an accessible name for the dialog.
- The dialog can be opened using the keyboard without using a mouse.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 9. Modal Focus

### Test Procedure

When each dialog opens:

1. Confirm that focus moves inside the dialog.
2. For Edit/Add dialogs, confirm that focus moves to the expected first
   interactive control.
3. For the Delete confirmation, confirm that focus moves to the intended
   confirmation/cancel control.
4. Continue pressing `Tab`.
5. Confirm that focus does not move to interactive elements behind the
   dialog.

If a screen reader is available, confirm that the dialog is announced and
that background content is not exposed as normal interactive content while
the modal is active.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Assistive Technology:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 10. Modal Keyboard Focus Containment

### Test Procedure

Open each modal dialog.

1. Press `Tab` repeatedly.
2. Confirm that focus moves only between controls inside the dialog.
3. When focus reaches the last control, press `Tab`.
4. Confirm that focus returns to the first control in the dialog.
5. Move focus to the first control.
6. Press `Shift + Tab`.
7. Confirm that focus wraps to the last control.
8. Confirm that focus never moves to the page behind the dialog.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 11. Escape Key and Close Controls

### Test Procedure

Open each dialog and test all available closing methods.

For each dialog:

1. Press `Escape`.
2. Confirm that the dialog closes.
3. Open the dialog again.
4. Activate the visible close button.
5. Confirm that the dialog closes.
6. Where a Cancel button is available, activate Cancel.
7. Confirm that the dialog closes.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 12. Focus Restoration

### Test Procedure

Open each dialog from its corresponding trigger.

Test the available closing methods:

- Escape
- Close button
- Cancel button
- Successful save/confirmation where applicable

After the dialog closes:

1. Confirm that focus returns to the button that originally opened the
   dialog.
2. For the Delete workflow, confirm that the deleted trigger no longer
   exists.
3. Confirm that focus moves to the **User directory** heading or the
   documented fallback target.

The focus location should be logical and should not unexpectedly move to the
top of the page.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# 13. Responsive Behavior

### Test Procedure

Test the interface at approximately:

- 1280 px wide
- 768 px wide
- 375 px wide

Also test browser zoom at:

- 200%
- 400%

Confirm that:

1. Content remains available.
2. Text is readable.
3. No important content is clipped.
4. Navigation remains usable.
5. Forms remain usable.
6. Buttons remain comfortably tappable.
7. Tables can be scrolled within their intended containers.
8. Dialogs remain inside the viewport.
9. Dialog content can scroll when necessary.
10. No unnecessary horizontal page scrolling occurs.
11. Responsive navigation works correctly at narrow widths.

### Actual Test Result

**Status:** __________________

**Date:** __________________

**Browser/OS:** __________________

**Result/Notes:**  
____________________________________________________________  
____________________________________________________________

---

# Test Summary

Complete this section after all applicable tests have been performed.

| Test | Status | Notes |
|---|---|---|
| Keyboard navigation | __________ | __________ |
| Skip link | __________ | __________ |
| Focus visibility | __________ | __________ |
| Navigation | __________ | __________ |
| Forms | __________ | __________ |
| Form validation | __________ | __________ |
| Tables | __________ | __________ |
| Modal opening | __________ | __________ |
| Modal focus | __________ | __________ |
| Modal focus containment | __________ | __________ |
| Escape and close controls | __________ | __________ |
| Focus restoration | __________ | __________ |
| Responsive behavior | __________ | __________ |

## Testing Notes

This test plan records manual verification only.

Automated structural checks and JavaScript checks performed during project
development are documented separately in `docs/implementation-notes.md`.

Manual test results must reflect the actual observed behavior. A test should
not be marked as passed solely because the implementation was designed to
support the requirement.

Screen-reader-specific tests should only be marked as completed when a
screen reader was actually used.

W3C HTML validation is documented separately in:

`docs/validation-report.md`