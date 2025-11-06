const form = document.getElementById('voteForm');
const statusText = document.getElementById('status');

// Ganti dengan URL Web App kamu
const API_URL = 'https://script.google.com/macros/s/AKfycbwjhlHr2Ro0ggIN0PjxoLokC3mJldSFd-BICYczYaEuLEi1Lk4Dx7YpGbOD8dWAdgNB3Q/exec';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nim = document.getElementById('nim').value.trim();
  const nama = document.getElementById('nama').value.trim();
  const kandidat = document.querySelector('input[name="kandidat"]:checked').value;

  if (!nim || !nama) {
    statusText.textContent = 'Mohon isi semua kolom.';
    return;
  }

  statusText.textContent = 'Mengirim suara...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ nim, nama, kandidat }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (data.status === 'sukses') {
      statusText.textContent = data.pesan + ' ✅';
      form.reset();
    } else {
      statusText.textContent = data.pesan + ' ❌';
    }
  } catch (err) {
    statusText.textContent = 'Terjadi kesalahan jaringan.';
  }
});
