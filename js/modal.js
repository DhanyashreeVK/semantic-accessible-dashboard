/* modal.js - accessible modal dialogs.
   Markup contract:
     opener:  <button type="button" data-modal-open="dialog-id">
     dialog:  <div id="dialog-id" role="dialog" aria-modal="true" aria-labelledby="..." tabindex="-1" hidden>
     closer:  <button type="button" data-modal-close>
   Behaviour: saves the opener, shows the dialog, moves focus inside, makes the rest of the page inert,
   traps Tab / Shift+Tab, closes on Escape or the close button, and restores focus to the opener. */
(function () {
  'use strict';

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  var active = null;      // currently open dialog element
  var opener = null;      // element that opened it
  var currentRow = null;  // table row the dialog is acting on (users page)
  var inerted = [];       // page regions made inert while the dialog is open

  function focusables(dialog) {
    return Array.prototype.filter.call(dialog.querySelectorAll(FOCUSABLE), function (el) {
      return !el.closest('[hidden]') && el.getClientRects().length > 0;
    });
  }

  function cellText(row, name) {
    var cell = row ? row.querySelector('[data-cell="' + name + '"]') : null;
    return cell ? cell.textContent.trim() : '';
  }

  function setStatus(message) {
    var region = document.getElementById('page-status');
    if (!region) { return; }
    region.textContent = '';
    window.setTimeout(function () { region.textContent = message; }, 50);
  }

  function prepare(dialog, trigger) {
    var form = dialog.querySelector('form');
    if (form) {
      if (dialog.hasAttribute('data-reset-on-open')) { form.reset(); }
      form.dispatchEvent(new CustomEvent('form:reset')); // clears old errors (handled in forms.js)
    }
    currentRow = trigger && trigger.closest('tr');
    if (!currentRow) { return; }
    var name = cellText(currentRow, 'name');
    var target = dialog.querySelector('[data-delete-name]');
    if (target) { target.textContent = name; }
    if (dialog.id === 'edit-user-modal' && form) {
      form.elements.namedItem('name').value = name;
      form.elements.namedItem('email').value = cellText(currentRow, 'email');
      form.elements.namedItem('role').value = cellText(currentRow, 'role');
    }
  }

  function open(id, trigger) {
    var dialog = document.getElementById(id);
    if (!dialog || active) { return; }
    opener = trigger || document.activeElement;
    active = dialog;

    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === dialog || el.tagName === 'SCRIPT' || el.getAttribute('role') === 'dialog') { return; }
      if (!el.inert) { el.inert = true; inerted.push(el); }
    });

    prepare(dialog, trigger);
    dialog.hidden = false;
    document.body.classList.add('modal-open');

    var first = dialog.querySelector('[data-autofocus]') ||
      dialog.querySelector('input:not([type="hidden"]), select, textarea') || focusables(dialog)[0] || dialog;
    first.focus();
  }

  function close() {
    if (!active) { return; }
    var dialog = active;
    var returnTo = opener;
    dialog.hidden = true;
    document.body.classList.remove('modal-open');
    inerted.forEach(function (el) { el.inert = false; });
    inerted = [];
    active = null;
    opener = null;
    currentRow = null;

    if (returnTo && document.body.contains(returnTo)) {
      returnTo.focus();
    } else {
      // The opener no longer exists (e.g. its table row was deleted): fall back to a sensible heading.
      var fallback = document.querySelector('[data-focus-fallback]');
      if (fallback) { fallback.focus(); }
    }
  }

  function trapTab(event) {
    var items = focusables(active);
    if (items.length === 0) { event.preventDefault(); active.focus(); return; }
    var first = items[0];
    var last = items[items.length - 1];
    var current = document.activeElement;
    var outside = !active.contains(current) || current === active;

    if (event.shiftKey && (current === first || outside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (current === last || outside)) {
      event.preventDefault();
      first.focus();
    }
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-modal-open]');
    if (trigger) { open(trigger.getAttribute('data-modal-open'), trigger); return; }
    if (active && event.target.closest('[data-modal-close]')) { close(); return; }

    var confirmDelete = event.target.closest('[data-confirm-delete]');
    if (confirmDelete && active && currentRow) {
      var name = cellText(currentRow, 'name');
      var filterForm = document.querySelector('form[data-filter-table]');
      currentRow.remove();
      close();
      if (filterForm) { filterForm.dispatchEvent(new Event('input')); }
      setStatus(name + ' was deleted. (Demonstration only: the change is not saved.)');
    }
  });

  document.addEventListener('keydown', function (event) {
    if (!active) { return; }
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    else if (event.key === 'Tab') { trapTab(event); }
  });

  // A dialog form passed validation (see forms.js): apply the change, close, announce.
  document.addEventListener('form:valid', function (event) {
    var form = event.target;
    var dialog = form.closest('[role="dialog"]');
    if (!dialog || dialog !== active) { return; }
    var name = form.elements.namedItem('name').value.trim();
    var message;

    if (dialog.id === 'edit-user-modal' && currentRow) {
      var role = form.elements.namedItem('role').value;
      currentRow.querySelector('[data-cell="name"]').textContent = name;
      currentRow.querySelector('[data-cell="email"]').textContent = form.elements.namedItem('email').value.trim();
      currentRow.querySelector('[data-cell="role"]').textContent = role;
      currentRow.setAttribute('data-role', role);
      Array.prototype.forEach.call(currentRow.querySelectorAll('.visually-hidden'), function (span) {
        span.textContent = ' ' + name; // keep the accessible names of the row buttons accurate
      });
      message = name + ' was updated. (Demonstration only: the change is not saved.)';
    } else {
      message = name + ' was added. (Demonstration only: the table is not changed and nothing is saved.)';
    }

    var filterForm = document.querySelector('form[data-filter-table]');
    close();
    if (filterForm) { filterForm.dispatchEvent(new Event('input')); }
    setStatus(message);
  });
}());
