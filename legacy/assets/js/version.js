const toggleHiddenBtn = document.getElementById("toggleHiddenBtn");
const hiddenFiles = document.getElementById("hiddenFiles");
const hiddenStatus = document.getElementById("hiddenStatus");
const hiddenHint = document.getElementById("hiddenHint");
const compareBtn = document.getElementById("compareBtn");
const diffPanel = document.getElementById("diffPanel");
const diffLeft = document.getElementById("diffLeft");
const diffRight = document.getElementById("diffRight");
const diffResult = document.getElementById("diffResult");
const toast = document.getElementById("toast");

const v1Lines = [
  "12/09時点のメモ:",
  "12/16 12:34、北側階段で悲鳴が聞こえたはず。",
  "血痕は階段の3段目あたりに残る可能性。",
  "関係者Aが北側に向かったのは昼過ぎ。",
  "控室の鍵は二つある。予備は受付の引き出し。",
  "私のアリバイ写真は昼前に撮っておく。",
];

const v2Lines = [
  "調査メモ（改訂版）:",
  "当日の動線はまだ確証がない。",
  "血痕位置については現時点で不明。",
  "関係者Aの行動は記録不足のため断定できない。",
  "控室の鍵の所在は未確認。",
  "アリバイ写真は別途保管済み。",
];

const highlightIndexes = [1, 2, 4];

const state = {
  hiddenShown: false,
  compared: false,
};

function renderDiff() {
  diffLeft.innerHTML = v1Lines
    .map((line, index) => {
      const highlight = highlightIndexes.includes(index) ? "highlight" : "";
      return `<div class="diff-line ${highlight}">${line}</div>`;
    })
    .join("");

  diffRight.innerHTML = v2Lines
    .map((line, index) => {
      const highlight = highlightIndexes.includes(index) ? "muted" : "";
      return `<div class="diff-line ${highlight}">${line}</div>`;
    })
    .join("");
}

function updateHiddenState() {
  if (state.hiddenShown) {
    hiddenFiles.classList.remove("hidden");
    hiddenStatus.textContent = "表示中";
    hiddenHint.textContent = "旧版メモが見つかりました。";
  } else {
    hiddenFiles.classList.add("hidden");
    hiddenStatus.textContent = "未表示";
    hiddenHint.textContent = "オプションを有効化してください。";
  }
}

function handleToggleHidden() {
  state.hiddenShown = true;
  toggleHiddenBtn.disabled = true;
  updateHiddenState();
  showToast("隠しファイルを表示しました。");
}

function handleCompare() {
  if (!state.hiddenShown || state.compared) return;
  state.compared = true;
  renderDiff();
  diffPanel.classList.add("show");
  diffResult.classList.add("show");
  showToast("矛盾箇所をハイライトしました。");
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

compareBtn.addEventListener("click", handleCompare);
toggleHiddenBtn.addEventListener("click", handleToggleHidden);

updateHiddenState();
