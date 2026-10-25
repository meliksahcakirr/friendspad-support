// Light/dark switch: follows the system until the visitor picks one, then remembers it.
(function () {
  var root = document.documentElement;
  var system = window.matchMedia('(prefers-color-scheme: dark)');

  function isDark() {
    var t = root.dataset.theme;
    return t ? t === 'dark' : system.matches;
  }

  function apply() {
    var dark = isDark();
    root.classList.toggle('is-dark', dark);
    document.querySelectorAll('img[data-dark-src]').forEach(function (img) {
      if (!img.dataset.lightSrc) img.dataset.lightSrc = img.getAttribute('src');
      img.src = dark ? img.dataset.darkSrc : img.dataset.lightSrc;
    });
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', dark ? '#1C222B' : '#FBF6EE');
      m.removeAttribute('media');
    });
  }

  document.querySelectorAll('.theme-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      apply();
    });
  });
  system.addEventListener('change', apply);
  apply();
})();
