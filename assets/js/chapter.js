const CHAPTER_KEY = "arg2Chapter";

function getChapter() {
  const value = Number(localStorage.getItem(CHAPTER_KEY));
  return Number.isNaN(value) ? 0 : value;
}

function setChapter(chapter) {
  localStorage.setItem(CHAPTER_KEY, String(chapter));
}

function updateChapterBadge() {
  const badge = document.querySelector("[data-chapter-badge]");
  if (!badge) return;
  badge.textContent = `Chapter ${getChapter()}`;
}

function applyGate() {
  const required = Number(document.body.dataset.requiredChapter || "0");
  if (Number.isNaN(required) || required <= 0) {
    updateChapterBadge();
    applyFeatureGates();
    return;
  }

  const current = getChapter();
  updateChapterBadge();

  if (current >= required) {
    applyFeatureGates();
    return;
  }

  const overlay = document.querySelector(".locked-overlay");
  if (overlay) {
    overlay.classList.add("show");
    overlay.querySelector(".locked-message").textContent =
      `このページは Chapter ${required} で解放されます。`;
    overlay.querySelector(".locked-action").textContent =
      `現在の章: Chapter ${current}`;
  }

  document.body.classList.add("locked");
  applyFeatureGates();
}

function attachChapterSelector() {
  const buttons = document.querySelectorAll("[data-set-chapter]");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = Number(button.dataset.setChapter || "0");
      setChapter(value);
      updateChapterBadge();
      document.querySelectorAll("[data-set-chapter]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.setChapter === String(value));
      });
    });
  });

  const current = getChapter();
  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.setChapter === String(current));
  });
}

function applyFeatureGates() {
  const current = getChapter();
  document.querySelectorAll("[data-feature-chapter]").forEach((element) => {
    const required = Number(element.dataset.featureChapter || "0");
    if (Number.isNaN(required) || required <= current) {
      element.classList.remove("feature-locked");
      if (element.tagName === "BUTTON") {
        element.disabled = false;
      }
      return;
    }

    element.classList.add("feature-locked");
    if (element.tagName === "BUTTON") {
      element.disabled = true;
    }
  });
}

applyGate();
attachChapterSelector();
