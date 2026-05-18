/* 共通JavaScript */

// ---- アクティブナビ ----
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});

// ---- 工程ステップ（クリックで詳細表示）----
function toggleStep(id) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step-detail').forEach(d => d.classList.remove('show'));
  const el = document.getElementById(id);
  const btn = document.querySelector(`[onclick="toggleStep('${id}')"]`);
  if (el && btn) {
    el.classList.add('show');
    btn.classList.add('active');
  }
}

// ---- クイズ ----
function answerQuiz(btn, correct, msg) {
  const box = btn.closest('.quiz-box');
  box.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
  btn.classList.add(correct ? 'correct' : 'wrong');
  const result = box.querySelector('.quiz-result');
  result.innerHTML = correct
    ? `<span style="color:#2e8b57">✅ せいかい！　${msg}</span>`
    : `<span style="color:#c0392b">❌ ざんねん…　${msg}</span>`;
}

// ---- メモ保存（localStorage）----
function saveMemo(key, el) {
  localStorage.setItem('memo_' + key, el.previousElementSibling.value);
  el.textContent = '💾 ほぞんしました！';
  setTimeout(() => { el.textContent = 'メモをほぞんする'; }, 1500);
}

function loadMemos() {
  document.querySelectorAll('.memo-box textarea').forEach(ta => {
    const key = ta.dataset.key;
    if (key) {
      const saved = localStorage.getItem('memo_' + key);
      if (saved) ta.value = saved;
    }
  });
}

document.addEventListener('DOMContentLoaded', loadMemos);

// ---- 学習チェック（進捗）----
function markDone(pageKey) {
  const done = JSON.parse(localStorage.getItem('progress') || '{}');
  done[pageKey] = true;
  localStorage.setItem('progress', JSON.stringify(done));
  updateProgress();
}

function updateProgress() {
  const done = JSON.parse(localStorage.getItem('progress') || '{}');
  const total = 5; // ページ数
  const count = Object.keys(done).length;
  const bar = document.getElementById('progress-bar');
  const label = document.getElementById('progress-label');
  if (bar) bar.style.width = (count / total * 100) + '%';
  if (label) label.textContent = `${count} / ${total} ページ 学習ずみ`;
}

document.addEventListener('DOMContentLoaded', updateProgress);
