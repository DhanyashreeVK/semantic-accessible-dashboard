/* forms.js - client-side validation and table filtering.
   Forms opt in with attributes:
     <form data-validate data-success-message="...">   validation with error summary + inline errors
     <form data-filter-table="table-id">                 filters rows of that table (live, unless also data-validate)
   Each field can have an error paragraph with id "<field-id>-error"; hints use "<field-id>-help". */
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var FIELD_SELECTOR = 'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), select, textarea';

  function labelFor(field) {
    var label = field.id ? document.querySelector('label[for="' + field.id + '"]') : null;
    if (!label) { return field.name || 'This field'; }
    var clone = label.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll('.req'), function (n) { n.remove(); });
    return clone.textContent.trim();
  }

  function validateField(field) {
    if (field.disabled) { return ''; }
    var label = labelFor(field);
    var value = field.type === 'password' ? field.value : field.value.trim();

    if (field.validity && field.validity.badInput) { return 'Enter a valid value for ' + label + '.'; }
    if (field.required && value === '') {
      return field.tagName === 'SELECT' ? 'Choose an option for ' + label + '.' : label + ' is required.';
    }
    if (value === '') { return ''; }
    if (field.type === 'email' && !EMAIL_RE.test(value)) {
      return 'Enter a valid email address, for example name@company.com.';
    }
    if (field.minLength > 0 && value.length < field.minLength) {
      return label + ' must be at least ' + field.minLength + ' characters long.';
    }
    if (field.dataset.match) {
      var other = document.getElementById(field.dataset.match);
      if (other && other.value !== field.value) {
        return field.dataset.matchMessage || label + ' does not match.';
      }
    }
    if (field.dataset.notBefore) {
      var start = document.getElementById(field.dataset.notBefore);
      if (start && start.value && value < start.value) {
        return label + ' must not be earlier than ' + labelFor(start) + '.';
      }
    }
    return '';
  }

  function setError(field, message) {
    var error = document.getElementById(field.id + '-error');
    if (field.dataset.baseDescribedby === undefined) {
      field.dataset.baseDescribedby = field.getAttribute('aria-describedby') || '';
    }
    var base = field.dataset.baseDescribedby;

    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (error) {
        error.textContent = 'Error: ' + message;
        error.hidden = false;
        field.setAttribute('aria-describedby', (base + ' ' + error.id).trim());
      }
    } else {
      field.removeAttribute('aria-invalid');
      if (error) { error.textContent = ''; error.hidden = true; }
      if (base) { field.setAttribute('aria-describedby', base); }
      else { field.removeAttribute('aria-describedby'); }
    }
  }

  function renderSummary(form, errors) {
    var box = form.querySelector('[data-error-summary]');
    if (!box) { return null; }
    var list = box.querySelector('ul');
    var title = box.querySelector('.error-summary-title strong');
    list.textContent = '';
    if (errors.length === 0) { box.hidden = true; return box; }

    title.textContent = errors.length === 1 ? 'There is 1 problem with this form' :
      'There are ' + errors.length + ' problems with this form';
    errors.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + item.field.id;
      a.textContent = item.message;
      li.appendChild(a);
      list.appendChild(li);
    });
    box.hidden = false;
    return box;
  }

  function setStatus(form, message) {
    var region = form.querySelector('[data-form-status]');
    if (!region) { return; }
    region.textContent = '';
    if (message) { window.setTimeout(function () { region.textContent = message; }, 50); }
  }

  function applyFilter(form) {
    var table = document.getElementById(form.dataset.filterTable);
    if (!table) { return; }
    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr[data-filterable]'));
    var qField = form.elements.namedItem('q');
    var query = qField ? qField.value.trim().toLowerCase() : '';
    var fromField = form.elements.namedItem('from');
    var toField = form.elements.namedItem('to');
    var from = fromField ? fromField.value : '';
    var to = toField ? toField.value : '';
    var selects = Array.prototype.slice.call(form.querySelectorAll('select[name]'));
    var shown = 0;

    rows.forEach(function (row) {
      var ok = true;
      if (query) {
        var text = Array.prototype.map.call(row.querySelectorAll('[data-cell]'), function (c) {
          return c.textContent;
        }).join(' ').toLowerCase();
        ok = text.indexOf(query) !== -1;
      }
      selects.forEach(function (s) {
        if (ok && s.value && row.dataset[s.name] !== s.value) { ok = false; }
      });
      var date = row.dataset.date;
      if (ok && date) {
        if (from && date < from) { ok = false; }
        if (to && date > to) { ok = false; }
      }
      row.hidden = !ok;
      if (ok) { shown += 1; }
    });

    var empty = table.querySelector('[data-empty-row]');
    if (empty) { empty.hidden = shown !== 0; }
    var count = form.querySelector('[data-result-count]');
    if (count) {
      count.textContent = 'Showing ' + shown + ' of ' + rows.length + ' ' + (form.dataset.noun || 'items') + '.';
    }
  }

  function initForm(form) {
    form.noValidate = true; // use our accessible messages instead of browser bubbles
    var fields = Array.prototype.slice.call(form.querySelectorAll(FIELD_SELECTOR));
    var validating = form.hasAttribute('data-validate');
    var filtering = form.hasAttribute('data-filter-table');

    function clearAll() {
      fields.forEach(function (f) { setError(f, ''); });
      renderSummary(form, []);
      setStatus(form, '');
    }

    form.addEventListener('form:reset', clearAll);
    form.addEventListener('reset', function () {
      clearAll();
      if (filtering) { window.setTimeout(function () { applyFilter(form); }, 0); }
    });

    if (validating) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var errors = [];
        fields.forEach(function (f) {
          var message = validateField(f);
          setError(f, message);
          if (message) { errors.push({ field: f, message: message }); }
        });
        var box = renderSummary(form, errors);
        if (errors.length) {
          setStatus(form, '');
          (box || errors[0].field).focus();
          return;
        }
        if (filtering) { applyFilter(form); }
        setStatus(form, form.dataset.successMessage || 'The form was submitted successfully.');
        form.dispatchEvent(new CustomEvent('form:valid', { bubbles: true }));
      });

      form.addEventListener('change', function (event) {
        // Only re-check fields already flagged, so a new error message never shifts the layout
        // under the pointer between mouse-down and mouse-up on the submit button.
        var f = event.target;
        if (fields.indexOf(f) !== -1 && f.getAttribute('aria-invalid') === 'true') { setError(f, validateField(f)); }
      });
      form.addEventListener('input', function (event) {
        var f = event.target;
        if (f.getAttribute && f.getAttribute('aria-invalid') === 'true') { setError(f, validateField(f)); }
      });

      var summary = form.querySelector('[data-error-summary]');
      if (summary) {
        summary.addEventListener('click', function (event) {
          var link = event.target.closest('a[href^="#"]');
          if (!link) { return; }
          event.preventDefault();
          var target = document.getElementById(link.getAttribute('href').slice(1));
          if (target) { target.focus(); }
        });
      }
    } else if (filtering) {
      form.addEventListener('submit', function (event) { event.preventDefault(); applyFilter(form); });
      form.addEventListener('input', function () { applyFilter(form); });
      form.addEventListener('change', function () { applyFilter(form); });
    }

    if (filtering) { applyFilter(form); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('form[data-validate], form[data-filter-table]'), initForm);
  });
}());
