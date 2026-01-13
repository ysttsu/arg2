const evidenceItems = [
  {
    id: "hotel_reservation",
    title: "ホテル予約確認",
    category: "A",
    summary: "2025-12-21 みなとシティホテル / 予約ID HTL-20251221-0421",
  },
  {
    id: "shinkansen_eticket",
    title: "新幹線 eチケット",
    category: "A",
    summary: "2025-12-21 東京→新横浜 / HIKARI 521",
  },
  {
    id: "entrance_mail",
    title: "入場受付 完了メール",
    category: "B",
    summary: "2025-12-21 10:05 喜多川ホール / QR発行済み",
  },
  {
    id: "venue_eticket",
    title: "電子チケット",
    category: "B",
    summary: "2025-12-21 13:00 喜多川ホール",
  },
  {
    id: "live_photo",
    title: "現地写真",
    category: "C",
    summary: "2025-12-21 18:42 裏口ポスター / EXIF付き",
  },
  {
    id: "receipt_photo",
    title: "現地レシート",
    category: "C",
    summary: "2025-12-21 19:10 会場近隣店舗 / 日付明記",
  },
];

const state = {
  selections: {
    A: null,
    B: null,
    C: null,
  },
  submitted: false,
};

const evidenceGrid = document.getElementById("evidenceGrid");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");
const statusValue = document.getElementById("statusValue");
const statusHint = document.getElementById("statusHint");
const toast = document.getElementById("toast");

function renderEvidence() {
  evidenceGrid.innerHTML = "";
  evidenceItems.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "evidence-card";
    card.draggable = true;
    card.dataset.id = item.id;
    card.setAttribute("aria-label", `${item.title} (${item.category})`);

    card.innerHTML = `
      <span class="evidence-tag">カテゴリ ${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
    `;

    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", item.id);
    });

    card.addEventListener("click", () => {
      if (state.submitted) return;
      const slot = document.querySelector(`.slot[data-category="${item.category}"]`);
      if (!slot) return;
      placeItem(item, slot);
    });

    evidenceGrid.appendChild(card);
  });
}

function attachSlotHandlers() {
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (state.submitted) return;
      slot.classList.add("drag-over");
    });

    slot.addEventListener("dragleave", () => {
      slot.classList.remove("drag-over");
    });

    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      slot.classList.remove("drag-over");
      if (state.submitted) return;
      const id = event.dataTransfer.getData("text/plain");
      const item = evidenceItems.find((entry) => entry.id === id);
      if (!item) return;
      placeItem(item, slot);
    });
  });
}

function placeItem(item, slot) {
  const category = slot.dataset.category;
  if (item.category !== category) {
    showToast(`カテゴリ${category}には別の証拠が必要です。`);
    return;
  }

  state.selections[category] = item.id;
  slot.querySelector(".slot-body").innerHTML = `
    <span class="slot-item">${item.title}</span><br />
    <span class="slot-desc">${item.summary}</span>
  `;

  updateState();
}

function updateState() {
  const ready = Object.values(state.selections).every(Boolean);
  submitBtn.disabled = !ready || state.submitted;

  if (state.submitted) {
    statusValue.textContent = "提出済み";
    statusHint.textContent = "パスワードヒントが解放されました。";
    return;
  }

  if (ready) {
    statusValue.textContent = "提出可能";
    statusHint.textContent = "カテゴリA/B/Cが揃いました。";
  } else {
    statusValue.textContent = "未提出";
    statusHint.textContent = "3カテゴリが揃うと提出できます。";
  }
}

function handleSubmit() {
  if (state.submitted) return;
  state.submitted = true;
  result.classList.add("show");
  submitBtn.disabled = true;
  showToast("3点一致を確定しました。");
  updateState();
}

function handleReset() {
  state.selections = { A: null, B: null, C: null };
  state.submitted = false;
  result.classList.remove("show");

  document.querySelectorAll(".slot").forEach((slot) => {
    const body = slot.querySelector(".slot-body");
    if (!body) return;
    body.innerHTML = "ここに配置";
  });

  updateState();
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

submitBtn.addEventListener("click", handleSubmit);
resetBtn.addEventListener("click", handleReset);

renderEvidence();
attachSlotHandlers();
updateState();
