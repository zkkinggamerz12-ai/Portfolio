// Simple interactive behaviors for the static site

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  // Demo form handlers
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formName = form.getAttribute('data-name') || 'Form';
      alert(`${formName} submitted (demo). This is a static site.`);
    });
  });
});



