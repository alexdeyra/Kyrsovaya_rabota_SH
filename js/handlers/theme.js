// theme.js (Server-only)
// Тема хранится на сервере (MySQL) через DataManager (PHP API). Без localStorage.

function applyTheme(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('dark-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

async function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', async () => {
    const isDark = document.body.classList.contains('dark-theme');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try {
      await DataManager.setTheme(next);
    } catch (e) {
      console.warn('Не удалось сохранить тему на сервере', e);
    }
  });

  try {
    const theme = await DataManager.getTheme();
    applyTheme(theme === 'dark' ? 'dark' : 'light');
  } catch (e) {
    console.warn('Не удалось загрузить тему с сервера', e);
    applyTheme('light');
  }
}
