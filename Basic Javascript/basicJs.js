// 1. Hitung Jumlah Bilangan Ganjil
function hitungBilanganGanjil(n) {
  let jumlah = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 2 !== 0) {
      jumlah++;
    }
  }
  return jumlah;
}

// ini juga bisa menggunakan ini
// function hitungBilanganGanjil(n) {
//   return Math.floor((n + 1) / 2);
// }
​
// 2. Cek Tahun Kabisat
function cekTahunKabisat(tahun) {
  return (tahun % 4 === 0);
}
​
// 3. Hitung Faktorial
function hitungFaktorial(n) {
  if (n === 0) return 1;

  let hasil = 1;
  for (let i = 1; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

// 4. Cari Bilangan Prima
function cariBilanganPrima(n) {
  const hasil = [];

  function isPrima(angka) {
    if (angka < 2) return false;
    for (let i = 2; i <= Math.sqrt(angka); i++) {
      if (angka % i === 0) return false;
    }
    return true;
  }

  for (let i = 2; i <= n; i++) {
    if (isPrima(i)) {
      hasil.push(i);
    }
  }

  return hasil;
}
​
// 5. Hitung Jumlah Digit
function hitungJumlahDigit(angka) {
  return angka.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
}

// 6. Cek Palindrom
function cekPalindrom(kata) {
  const normal = kata.toLowerCase();
  const reversed = normal.split('').reverse().join('');
  return normal === reversed;
}

// 7. Hitung Pangkat
function hitungPangkat(angka, pangkat) {
  return Math.pow(angka, pangkat);
}

// 8. Deret Fibonacci
function deretFibonacci(n) {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result.slice(0, n);
}

// 9. Hitung Jumlah Kata
function hitungJumlahKata(kalimat) {
  return kalimat.trim().split(/\s+/).length;
}

// 10. Cari Bilangan Terbesar
function cariBilanganTerbesar(arr) {
  return Math.max(...arr);
}

// 11. Hitung Rata-rata
function hitungRataRata(arr) {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

// 12. Hitung Jumlah Vokal
function hitungJumlahVokal(kata) {
  return (kata.match(/[aeiou]/gi) || []).length;
}

// 13. Cari Faktor Bilangan
function cariFaktorBilangan(angka) {
  const faktor = [];
  for (let i = 1; i <= angka; i++) {
    if (angka % i === 0) faktor.push(i);
  }
  return faktor;
}

// 14. Konversi Suhu
function konversiSuhu(suhu, jenis) {
  if (jenis === "C") return (suhu * 9/5) + 32;
  if (jenis === "F") return Math.round((suhu - 32) * 5/9);
  return null;
}

// 15. Hitung Karakter Unik
function hitungKarakterUnik(str) {
  return new Set(str.replace(/\s+/g, '')).size;
}

// 16. Hitung Jumlah Kemunculan Kata
function hitungKemunculanKata(kalimat, kata) {
  const arr = kalimat.toLowerCase().split(/\s+/);
  return arr.filter(k => k === kata.toLowerCase()).length;
}

// 17. Cari Bilangan Ganjil Terbesar
function cariBilanganGanjilTerbesar(arr) {
  const ganjil = arr.filter(x => x % 2 !== 0);
  return ganjil.length ? Math.max(...ganjil) : null;
}

// 18. Hitung Jumlah Digit Genap
function hitungJumlahDigitGenap(angka) {
  return angka.toString().split('').filter(d => parseInt(d) % 2 === 0).length;
}

// 19. Cek Anagram
function cekAnagram(kata1, kata2) {
  const sortStr = str => str.toLowerCase().split('').sort().join('');
  return sortStr(kata1) === sortStr(kata2);
}

// 20. Hitung Huruf Kapital
function hitungHurufKapital(kalimat) {
  return (kalimat.match(/[A-Z]/g) || []).length;
}

// 21. Cari Bilangan yang Hilang
function cariBilanganHilang(arr) {
  const n = arr.length + 1;
  const total = (n * (n + 1)) / 2;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return total - sum;
}

// 22. Hitung Jumlah Hari
function hitungJumlahHari(tanggal1, tanggal2) {
  const t1 = new Date(tanggal1);
  const t2 = new Date(tanggal2);
  const selisih = Math.abs(t2 - t1);
  return Math.floor(selisih / (1000 * 60 * 60 * 24));
}

// 23. Hitung Jumlah Kata Unik
function hitungKataUnik(kalimat) {
  return new Set(kalimat.toLowerCase().split(/\s+/)).size;
}

// 24. Cari Bilangan Muncul Sekali
function cariBilanganMunculSekali(arr) {
  const frekuensi = {};
  arr.forEach(num => {
    frekuensi[num] = (frekuensi[num] || 0) + 1;
  });
  return Object.keys(frekuensi).filter(k => frekuensi[k] === 1).map(Number);
}

// 25. Hitung Kemunculan Karakter
function hitungKemunculanKarakter(str) {
  const hasil = {};
  for (let char of str) {
    hasil[char] = (hasil[char] || 0) + 1;
  }
  return hasil;
}

// 26. Hitung Kombinasi
function hitungKombinasi(n, r) {
  const faktorial = x => x <= 1 ? 1 : x * faktorial(x - 1);
  return faktorial(n) / (faktorial(r) * faktorial(n - r));
}

function jalankanFungsi() {
  const fungsi = document.getElementById("functionSelector").value;
  const nilai = document.getElementById("inputValue").value;
  const nilai2 = document.getElementById("inputValue2")?.value || ""; // optional second input
  let hasil = "";

  switch (fungsi) {
    case "ganjil":
      hasil = hitungBilanganGanjil(parseInt(nilai));
      break;
    case "kabisat":
      hasil = cekTahunKabisat(parseInt(nilai));
      break;
    case "faktorial":
      hasil = hitungFaktorial(parseInt(nilai));
      break;
    case "prima":
      hasil = cariBilanganPrima(parseInt(nilai)).join(", ");
      break;
    case "jumlahDigit":
      hasil = hitungJumlahDigit(parseInt(nilai));
      break;
    case "palindrom":
      hasil = cekPalindrom(nilai);
      break;
    case "pangkat":
      hasil = hitungPangkat(parseInt(nilai), parseInt(nilai2));
      break;
    case "fibonacci":
      hasil = deretFibonacci(parseInt(nilai)).join(", ");
      break;
    case "jumlahKata":
      hasil = hitungJumlahKata(nilai);
      break;
    case "terbesar":
      hasil = cariBilanganTerbesar(nilai.split(',').map(Number));
      break;
    case "rataRata":
      hasil = hitungRataRata(nilai.split(',').map(Number));
      break;
    case "jumlahVokal":
      hasil = hitungJumlahVokal(nilai);
      break;
    case "faktor":
      hasil = cariFaktorBilangan(parseInt(nilai)).join(", ");
      break;
    case "konversiSuhu":
      hasil = konversiSuhu(parseFloat(nilai), nilai2);
      break;
    case "karakterUnik":
      hasil = hitungKarakterUnik(nilai);
      break;
    case "kemunculanKata":
      hasil = hitungKemunculanKata(nilai, nilai2);
      break;
    case "ganjilTerbesar":
      hasil = cariBilanganGanjilTerbesar(nilai.split(',').map(Number));
      break;
    case "digitGenap":
      hasil = hitungJumlahDigitGenap(parseInt(nilai));
      break;
    case "anagram":
      hasil = cekAnagram(nilai, nilai2);
      break;
    case "hurufKapital":
      hasil = hitungHurufKapital(nilai);
      break;
    case "bilanganHilang":
      hasil = cariBilanganHilang(nilai.split(',').map(Number));
      break;
    case "jumlahHari":
      hasil = hitungJumlahHari(nilai, nilai2);
      break;
    case "kataUnik":
      hasil = hitungKataUnik(nilai);
      break;
    case "munculSekali":
      hasil = cariBilanganMunculSekali(nilai.split(',').map(Number)).join(", ");
      break;
    case "kemunculanKarakter":
      hasil = JSON.stringify(hitungKemunculanKarakter(nilai));
      break;
    case "kombinasi":
      hasil = hitungKombinasi(parseInt(nilai), parseInt(nilai2));
      break;
    default:
      hasil = "Pilih fungsi yang tersedia.";
  }

  document.getElementById("output").innerText = hasil;
}
