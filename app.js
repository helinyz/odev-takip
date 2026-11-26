// localStorage'da verilerin tutulduğu anahtar
const DEPOLAMA_ANAHTARI = "odevler";

// Tüm ödevlerin tutulduğu dizi.
// Her ödev: { id, ad, ders, tarih, tamamlandi }
let odevler = [];

// Ödevleri localStorage'dan okur
function odevleriYukle() {
  const kayitli = localStorage.getItem(DEPOLAMA_ANAHTARI);
  if (!kayitli) {
    return [];
  }
  try {
    return JSON.parse(kayitli);
  } catch (hata) {
    // Bozuk veri varsa boş listeyle başla
    return [];
  }
}

// Ödevleri localStorage'a yazar
function odevleriKaydet() {
  localStorage.setItem(DEPOLAMA_ANAHTARI, JSON.stringify(odevler));
}

// Sayfa yüklendiğinde uygulamayı başlatır
document.addEventListener("DOMContentLoaded", function () {
  odevler = odevleriYukle();
  console.log("Uygulama hazır");
});
