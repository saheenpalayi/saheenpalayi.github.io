const themeStorageKey = "saheen-theme";
const themeToggle = document.querySelector("[data-theme-toggle]");
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: light)");

function getCurrentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function setTheme(theme, shouldSave) {
  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  if (shouldSave) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // Browsers can block localStorage in private or restricted contexts.
    }
  }
}

if (themeToggle) {
  setTheme(getCurrentTheme(), false);

  themeToggle.addEventListener("click", () => {
    setTheme(getCurrentTheme() === "light" ? "dark" : "light", true);
  });
}

systemThemeQuery.addEventListener("change", (event) => {
  try {
    if (localStorage.getItem(themeStorageKey)) {
      return;
    }
  } catch {
    return;
  }

  setTheme(event.matches ? "light" : "dark", false);
});
