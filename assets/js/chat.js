const chatWindow = document.getElementById("chatWindow");
const partialRestoreBtn = document.getElementById("partialRestoreBtn");
const fragmentBtn = document.getElementById("fragmentBtn");
const chatResult = document.getElementById("chatResult");
const chatStatusValue = document.getElementById("chatStatusValue");
const chatStatusHint = document.getElementById("chatStatusHint");
const toast = document.getElementById("toast");

const baseLog = [
  { time: "12/15 23:10", who: "自分", text: "連絡先を整理しておく" },
  { time: "12/15 23:45", who: "自分", text: "明日は大事な日" },
  { time: "12/16 07:30", who: "自分", text: "準備はできた" },
  { time: "12/16 12:??", who: "system", text: "[データ欠落]" },
  { time: "12/16 15:20", who: "自分", text: "やっと終わった" },
  { time: "12/16 18:40", who: "自分", text: "帰路につく" },
];

const partialLog = [
  { time: "12/15 23:45", who: "自分", text: "明日は大事な日" },
  { time: "12/16 07:30", who: "自分", text: "準備はできた" },
  { time: "12/16 12:??", who: "system", text: "[データ破損]" },
  { time: "12/16 15:20", who: "自分", text: "やっと終わった" },
];

const fullLog = [
  { time: "12/15 23:45", who: "自分", text: "明日決行する" },
  { time: "12/16 07:30", who: "自分", text: "準備は完璧。例のものは収納ケースに入れた" },
  { time: "12/16 12:15", who: "自分", text: "会場に着いた。警備は予想通り" },
  { time: "12/16 12:34", who: "自分", text: "完了。北側階段、誰も見ていない" },
  { time: "12/16 15:20", who: "自分", text: "やっと終わった。これで全部終わる" },
  { time: "12/16 23:00", who: "自分", text: "このログを削除して差し替え版を作る" },
];

const state = {
  stage: "missing",
};

function renderChat(log) {
  chatWindow.innerHTML = "";
  log.forEach((entry) => {
    const line = document.createElement("div");
    line.className = `chat-line ${entry.who === "system" ? "system" : "user"}`;
    line.innerHTML = `
      <span class="chat-time">${entry.time}</span>
      <span class="chat-who">${entry.who}</span>
      <span class="chat-text">${entry.text}</span>
    `;
    chatWindow.appendChild(line);
  });
}

function updateStatus() {
  if (state.stage === "missing") {
    chatStatusValue.textContent = "欠落あり";
    chatStatusHint.textContent = "復元を試みてください。";
  } else if (state.stage === "partial") {
    chatStatusValue.textContent = "部分復元";
    chatStatusHint.textContent = "完全復元には断片データが必要です。";
  } else {
    chatStatusValue.textContent = "完全復元";
    chatStatusHint.textContent = "決定打のログが復元されました。";
  }
}

function handlePartialRestore() {
  if (state.stage !== "missing") return;
  state.stage = "partial";
  renderChat(partialLog);
  fragmentBtn.disabled = false;
  showToast("部分復元に成功しました。");
  updateStatus();
}

function handleFragmentLoad() {
  if (state.stage !== "partial") return;
  state.stage = "full";
  renderChat(fullLog);
  fragmentBtn.disabled = true;
  partialRestoreBtn.disabled = true;
  chatResult.classList.add("show");
  showToast("完全復元が完了しました。");
  updateStatus();
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

partialRestoreBtn.addEventListener("click", handlePartialRestore);
fragmentBtn.addEventListener("click", handleFragmentLoad);

renderChat(baseLog);
updateStatus();
