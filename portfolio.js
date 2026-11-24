const root = document.documentElement;
const themeButton = document.querySelector('.theme');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');

function isDark() {
  return root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
}

function updateThemeLabel() {
  themeButton.setAttribute('aria-label', isDark() ? 'Activar tema claro' : 'Activar tema oscuro');
}

themeButton.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try {
    localStorage.setItem('tema', root.dataset.theme);
  } catch {}
  updateThemeLabel();
});

systemTheme.addEventListener('change', updateThemeLabel);
updateThemeLabel();
themeButton.hidden = false;

const progress = document.querySelector('.progress');
const links = [...document.querySelectorAll('.site-nav a')];
const sections = links.map(link => document.querySelector(link.hash));

function updateScroll() {
  const scrollRange = root.scrollHeight - innerHeight;
  progress.style.transform = 'scaleX(' + (scrollRange > 0 ? scrollY / scrollRange : 0) + ')';

  const anchorOffset = parseFloat(getComputedStyle(root).scrollPaddingTop);
  const atBottom = scrollRange > 0 && scrollY >= scrollRange - 2;
  const active = atBottom
    ? sections.at(-1)
    : sections.findLast(section => section.getBoundingClientRect().top <= anchorOffset + 2);
  links.forEach((link, index) => {
    if (sections[index] === active) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

addEventListener('scroll', updateScroll, { passive: true });
addEventListener('resize', updateScroll);
updateScroll();
document.querySelector('#year').textContent = new Date().getFullYear();
