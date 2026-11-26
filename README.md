# Ödev Takip

Üniversite öğrencilerinin ödevlerini ve teslim tarihlerini tek bir yerden takip etmesini sağlayan basit bir web uygulaması.

## Problem

Üniversite öğrencileri ödev ve proje teslim tarihlerini birçok farklı yerden takip ediyor: hocaların e-postaları, WhatsApp grupları ve öğrenci bilgi sistemi. Bilgi bu kadar dağınık olunca teslim tarihleri gözden kaçabiliyor.

## Kimin için?

Birden fazla dersi olan ve ödevlerini tek bir yerden takip etmek isteyen üniversite öğrencileri için.

## Kullanıcı hikayeleri

- **Ödev ekleme, silme, tamamlama ([#2](https://github.com/helinyz/odev-takip/issues/2)):** Bir öğrenci olarak ödevlerimi tek bir yerde kaydetmek istiyorum, böylece teslim tarihlerini unutmam.
- **Filtreleme ve sıralama ([#3](https://github.com/helinyz/odev-takip/issues/3)):** Bir öğrenci olarak ödevlerimi derse göre filtrelemek ve teslim tarihine göre sıralamak istiyorum, böylece önce hangi ödeve çalışmam gerektiğini görürüm.

## Bağlantılar

- **Canlı demo:** https://helinyz.github.io/odev-takip/
- **Proje panosu:** https://github.com/users/helinyz/projects/1

## Projeyi çalıştırma

### Yol 1: Canlı demo

[Canlı demo linkini](https://helinyz.github.io/odev-takip/) tarayıcıda açmanız yeterli. Kurulum gerekmez.

### Yol 2: Yerelde çalıştırma

```bash
git clone https://github.com/helinyz/odev-takip.git
cd odev-takip
```

Ardından `index.html` dosyasını tarayıcıda açın (dosyaya çift tıklamanız yeterli).

Sunucu, kurulum veya paket gerekmez. Uygulama yalnızca HTML, CSS ve JavaScript dosyalarından oluşur.

## Özellik 1'i nasıl denerim? (Issue #2)

| Adım | Ne yapılır | Beklenen sonuç |
|------|-----------|----------------|
| 1 | Ödev adı, ders adı ve teslim tarihi alanlarını doldurup **Ekle**'ye basın. | Ödev, ders adı ve teslim tarihiyle birlikte listede görünür; form temizlenir. |
| 2 | Alanlardan birini (veya hepsini) boş bırakıp **Ekle**'ye basın. | Formun altında kırmızı "Lütfen tüm alanları doldurun." mesajı çıkar, ödev eklenmez. Açılır pencere (alert) çıkmaz. |
| 3 | Bir ödevin yanındaki **Sil** butonuna basın. | Yalnızca o ödev listeden kalkar. |
| 4 | Bir ödevin yanındaki onay kutusunu işaretleyin. | Ödevin üstü çizili ve soluk görünür. İşaret kaldırılınca normale döner. |
| 5 | Birkaç ödev ekleyip birini işaretleyin, ardından sayfayı yenileyin. | Ödevler ve işaret durumları aynen korunur (veriler `localStorage`'da saklanır). |

## Özellik 2'yi nasıl denerim? (Issue #3)

**Hazırlık:** Önce farklı derslere ve farklı teslim tarihlerine sahip birkaç örnek ödev ekleyin. Örneğin:

- "Ödev 1" – Matematik – 10.12.2026
- "Ödev 2" – Fizik – 01.12.2026
- "Ödev 3" – Matematik – 30.11.2026

| Adım | Ne yapılır | Beklenen sonuç |
|------|-----------|----------------|
| 1 | **Ders** menüsünü açın. | En başta "Tüm dersler", altında eklediğiniz dersler görünür. |
| 2 | Menüden "Matematik"i seçin. | Yalnızca Matematik ödevleri listelenir. |
| 3 | **Sırala** menüsünden "Teslim tarihi (en yakın önce)" seçin. | En yakın tarihli ödev en üstte olur. "Eklenme sırası" seçilince eski sıra geri gelir. |
| 4 | Bir ödevi tamamlandı olarak işaretleyip **Sadece tamamlanmamışlar** kutusunu işaretleyin. | Tamamlanan ödev listeden gizlenir. |
| 5 | Ders menüsünden "Tüm dersler"i seçin ve onay kutusunu kaldırın. | Tüm ödevler tekrar görünür. |
| 6 | Tek ödevi olan bir dersi (örneğin Fizik) seçin, o ödevi tamamlayın ve **Sadece tamamlanmamışlar** kutusunu işaretleyin. | "Bu filtreye uygun ödev yok." yazısı görünür. |

Filtreleme ve sıralama yalnızca görünümü değiştirir; kayıtlı veriler silinmez ve sıraları bozulmaz.

## Geliştirme süreci

- Planlama, GitHub Projects'teki [proje panosunda](https://github.com/users/helinyz/projects/1) **Yapılacak / Devam Ediyor / Tamamlandı** sütunlarıyla yapıldı.
- Her görev, kullanıcı hikayesi ve kabul kriterleri içeren bir issue olarak tanımlandı.
- Her özellik ayrı bir branch'te geliştirildi ve Pull Request ile `main` branch'ine eklendi.

İlgili Pull Request'ler:

| Pull Request | İçerik | Kapattığı issue |
|--------------|--------|-----------------|
| [#6](https://github.com/helinyz/odev-takip/pull/6) | Proje iskeleti | [#1](https://github.com/helinyz/odev-takip/issues/1) |
| [#7](https://github.com/helinyz/odev-takip/pull/7) | Özellik 1: Ödev ekleme, silme, tamamlama | [#2](https://github.com/helinyz/odev-takip/issues/2) |
| [#8](https://github.com/helinyz/odev-takip/pull/8) | Özellik 2: Filtreleme ve sıralama | [#3](https://github.com/helinyz/odev-takip/issues/3) |

## Kullanılan teknolojiler

- HTML
- CSS
- Vanilla JavaScript (framework veya kütüphane yok)
- localStorage (verilerin tarayıcıda saklanması)
- GitHub Projects (planlama panosu)
- GitHub Pages (canlı demo)

## Proje yapısı

```
odev-takip/
├── index.html   # Sayfa yapısı: başlık, ödev formu, filtreler ve ödev listesi
├── style.css    # Sade ve temiz görünüm için stiller
├── app.js       # Uygulama mantığı: ekleme, silme, tamamlama, filtreleme, sıralama ve localStorage
├── CLAUDE.md    # Geliştirme kuralları (teknoloji, dosyalar, kod stili, özellikler)
└── README.md    # Bu dosya
```

## Not

Geliştirme sürecinde yapay zekâ destekli kodlama aracı Claude Code'dan yardım alınmıştır.
