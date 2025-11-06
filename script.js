const form = document.getElementById('voteForm');
const statusText = document.getElementById('status');

// Ganti dengan URL Web App kamu
const API_URL = 'https://script.google.com/macros/s/AKfycbyour_script_id_here/exec';

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
