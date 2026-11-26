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

// --- Filtreleme ve sıralama ---
// Bu fonksiyonlar diziyi değiştirmez, her zaman yeni bir dizi döndürür.

// Ödevlerdeki farklı ders adlarını alfabetik sırayla döndürür
function dersleriGetir(liste) {
  const dersler = [];
  liste.forEach(function (odev) {
    if (!dersler.includes(odev.ders)) {
      dersler.push(odev.ders);
    }
  });
  return dersler.sort(function (a, b) {
    return a.localeCompare(b, "tr");
  });
}

// Sadece verilen dersin ödevlerini döndürür; ders boşsa hepsini döndürür
function dereGoreFiltrele(liste, ders) {
  if (ders === "") {
    return liste.slice();
  }
  return liste.filter(function (odev) {
    return odev.ders === ders;
  });
}

// "Sadece tamamlanmamışlar" seçiliyse tamamlanan ödevleri çıkarır
function tamamlanmamislariFiltrele(liste, sadeceTamamlanmamis) {
  if (!sadeceTamamlanmamis) {
    return liste.slice();
  }
  return liste.filter(function (odev) {
    return !odev.tamamlandi;
  });
}

// Ödevleri teslim tarihine göre sıralar (en yakın tarih önce).
// Tarihler "YYYY-AA-GG" biçiminde olduğu için metin olarak karşılaştırılabilir.
function tariheGoreSirala(liste) {
  return liste.slice().sort(function (a, b) {
    return a.tarih.localeCompare(b.tarih);
  });
}

// Tüm filtreleri ve sıralamayı sırayla uygular
function gorunurOdevleriGetir(liste, secenekler) {
  let sonuc = dereGoreFiltrele(liste, secenekler.ders);
  sonuc = tamamlanmamislariFiltrele(sonuc, secenekler.sadeceTamamlanmamis);
  if (secenekler.sira === "tarih") {
    sonuc = tariheGoreSirala(sonuc);
  }
  return sonuc;
}

// "2026-12-05" biçimindeki tarihi "05.12.2026" olarak gösterir
function tarihiBicimlendir(tarih) {
  const [yil, ay, gun] = tarih.split("-");
  return gun + "." + ay + "." + yil;
}

// Verilen id'ye sahip ödevi listeden siler
function odevSil(id) {
  odevler = odevler.filter(function (odev) {
    return odev.id !== id;
  });
  odevleriKaydet();
  listeyiGoster();
}

// Verilen id'ye sahip ödevin tamamlandı durumunu değiştirir
function tamamlandiDegistir(id) {
  const odev = odevler.find(function (o) {
    return o.id === id;
  });
  if (odev) {
    odev.tamamlandi = !odev.tamamlandi;
    odevleriKaydet();
    listeyiGoster();
  }
}

// Tek bir ödev için liste elemanı (li) oluşturur
function odevElemaniOlustur(odev) {
  const li = document.createElement("li");
  li.className = "odev";
  if (odev.tamamlandi) {
    li.classList.add("tamamlandi");
  }

  // Tamamlandı onay kutusu
  const kutu = document.createElement("input");
  kutu.type = "checkbox";
  kutu.checked = odev.tamamlandi;
  kutu.setAttribute("aria-label", "Tamamlandı olarak işaretle");
  kutu.addEventListener("change", function () {
    tamamlandiDegistir(odev.id);
  });

  const bilgi = document.createElement("div");
  bilgi.className = "odev-bilgi";

  const ad = document.createElement("span");
  ad.className = "odev-adi";
  ad.textContent = odev.ad;

  const detay = document.createElement("span");
  detay.className = "odev-detay";
  detay.textContent = odev.ders + " · Teslim: " + tarihiBicimlendir(odev.tarih);

  bilgi.append(ad, detay);

  // Sil butonu
  const silButonu = document.createElement("button");
  silButonu.type = "button";
  silButonu.className = "sil-butonu";
  silButonu.textContent = "Sil";
  silButonu.addEventListener("click", function () {
    odevSil(odev.id);
  });

  li.append(kutu, bilgi, silButonu);
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
