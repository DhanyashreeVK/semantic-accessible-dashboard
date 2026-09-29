/* navigation.js - progressive enhancement for the sidebar on small screens.
   Without JavaScript the sidebar simply stays visible (the "js" class is never added). */
(function () {
  'use strict';

  // Added immediately (script is loaded in <head>) so CSS can avoid a flash of the open sidebar.
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('menu-toggle');
    var sidebar = document.getElementById('sidebar');
    if (!toggle || !sidebar) { return; }

    var desktop = window.matchMedia('(min-width: 901px)');

    function setOpen(open, restoreFocus) {
      sidebar.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (!open && restoreFocus) { toggle.focus(); }
    }

    toggle.addEventListener('click', function () {
      setOpen(!sidebar.classList.contains('is-open'), false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !sidebar.classList.contains('is-open')) { return; }
      if (document.querySelector('[role="dialog"]:not([hidden])')) { return; } // modal handles Escape itself
      if (sidebar.contains(document.activeElement) || document.activeElement === toggle) {
        setOpen(false, true);
      }
    });

    function onBreakpointChange() {
      if (desktop.matches) { setOpen(false, false); }
    }
    if (desktop.addEventListener) { desktop.addEventListener('change', onBreakpointChange); }
    else if (desktop.addListener) { desktop.addListener(onBreakpointChange); }
  });
}());
