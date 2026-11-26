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

// "2026-12-05" biçimindeki tarihi "05.12.2026" olarak gösterir
function tarihiBicimlendir(tarih) {
  const [yil, ay, gun] = tarih.split("-");
  return gun + "." + ay + "." + yil;
}

// Tek bir ödev için liste elemanı (li) oluşturur
function odevElemaniOlustur(odev) {
  const li = document.createElement("li");
  li.className = "odev";

  const bilgi = document.createElement("div");
  bilgi.className = "odev-bilgi";

  const ad = document.createElement("span");
  ad.className = "odev-adi";
  ad.textContent = odev.ad;

  const detay = document.createElement("span");
  detay.className = "odev-detay";
  detay.textContent = odev.ders + " · Teslim: " + tarihiBicimlendir(odev.tarih);

  bilgi.append(ad, detay);
  li.append(bilgi);
  return li;
}

// Ödev listesini ekrana çizer
function listeyiGoster() {
  const liste = document.getElementById("odev-listesi");
  liste.innerHTML = "";

  if (odevler.length === 0) {
    const bos = document.createElement("li");
    bos.className = "bos-liste";
    bos.textContent = "Henüz ödev eklenmedi.";
    liste.append(bos);
    return;
  }

  odevler.forEach(function (odev) {
    liste.append(odevElemaniOlustur(odev));
  });
}

// Formun altındaki uyarı mesajını ayarlar
function mesajGoster(metin) {
  document.getElementById("form-mesaji").textContent = metin;
}

// Form gönderildiğinde yeni ödevi ekler
function odevEkle(olay) {
  olay.preventDefault();

  const adAlani = document.getElementById("odev-adi");
  const dersAlani = document.getElementById("ders-adi");
  const tarihAlani = document.getElementById("teslim-tarihi");

  const ad = adAlani.value.trim();
  const ders = dersAlani.value.trim();
  const tarih = tarihAlani.value;

  // Boş alan varsa ekleme yapma, uyarı göster
  if (ad === "" || ders === "" || tarih === "") {
    mesajGoster("Lütfen tüm alanları doldurun.");
    return;
  }

  odevler.push({
    id: Date.now(),
    ad: ad,
    ders: ders,
    tarih: tarih,
    tamamlandi: false
  });

  odevleriKaydet();
  listeyiGoster();
  mesajGoster("");
  olay.target.reset();
  adAlani.focus();
}

// Sayfa yüklendiğinde uygulamayı başlatır
document.addEventListener("DOMContentLoaded", function () {
  odevler = odevleriYukle();
  document.getElementById("odev-formu").addEventListener("submit", odevEkle);
  listeyiGoster();
  console.log("Uygulama hazır");
});
