const form = document.getElementById('voteForm');
const statusText = document.getElementById('status');

// Ganti dengan URL Web App kamu
const API_URL = 'https://script.google.com/macros/s/AKfycbxy3LF7ax1sz4E20iZQFmklDZdSY95Y9aX6rmfdH11YZweSk7xVRxDgeTNxRWNps-5rQw/exec';

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
    const formData = new FormData();
    formData.append('nim', nim);
    formData.append('nama', nama);
    formData.append('kandidat', kandidat);

    const res = await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });

    statusText.textContent = 'Vote berhasil dikirim! ✅';
    form.reset();


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
