# Admin paneli (kurulum)

`/admin`, `/iletisim` ve `/girisim-programi` formlarından gelen tüm mesajları tek bir yerden
görmenizi, durumlarına göre (yeni/okundu/yanıtlandı/arşivlendi) ayırmanızı sağlayan bir yönetim
panelidir. Kalıcı kayıt Supabase'teki `contact_messages` tablosudur — siparişlerle aynı desen
(bkz. CLAUDE.md), yalnızca sunucu (service-role) erişebilir.

Panel tek bir şifreyle korunur; kullanıcı/parola tablosu, üçüncü taraf kimlik doğrulama vb. yoktur
— tek operatörlü bir site için kasıtlı olarak basit tutuldu.

## Vercel'e ortam değişkenlerini ekle

Vercel projende **Settings → Environment Variables** ile aşağıdaki iki değeri **Production**
ortamı için ekle:

| Ad | Değer |
|---|---|
| `ADMIN_PASSWORD` | Panele giriş şifresi — güçlü, rastgele bir değer seçin |
| `ADMIN_SESSION_SECRET` | Oturum çerezini imzalamak için kullanılan ayrı, rastgele bir değer (şifre değildir, kimseyle paylaşılmaz) |

İkisi de `NEXT_PUBLIC_` önekini taşımaz — yalnızca sunucuda kalır. Kaydettikten sonra yeni bir
deploy tetiklenmesi gerekir.

## Nasıl çalışır?

- `/admin/login` şifreyi kontrol eder, doğruysa imzalı ve 7 gün geçerli bir `HttpOnly` çerez
  (`vitrinweb_admin`) ayarlar.
- `src/proxy.ts` (Next.js'in "proxy", eski adıyla "middleware" dosyası) `/admin/*` ve
  `/api/admin/*` isteklerini bu çerez geçerli olmadıkça `/admin/login`'e yönlendirir (API
  isteklerinde `401` döner).
- `/admin` form mesajlarını, `/admin/siparisler` ödeme sonrası müşteri içerik formlarını listeler.
  Panelde her satır açılıp tüm alanları gösterir; durum değiştirmek anında kaydedilir.
- **Kaba kuvvet koruması:** 15 dakikalık pencerede 5'ten fazla başarısız giriş denemesi olursa
  (Supabase'teki `admin_login_attempts` tablosu, şifre doğru olsa bile) tüm girişler geçici olarak
  reddedilir. Tek operatörlü bir panel olduğu için kilitleme IP bazlı değil, geneldir.
- Arama motorları için `robots.txt`'te `/admin` devre dışı bırakıldı, sayfa başlıklarında da
  `noindex` var.

## Form kayıtlarının güvenilirliği

`/api/contact` artık her mesajı hem e-posta olarak göndermeye çalışır (bkz.
ILETISIM-FORMU-KURULUMU.md) hem de Supabase'e kalıcı olarak kaydeder — ikisinden biri başarılı
olduğu sürece mesaj kaybolmaz. E-posta gönderimi başarısız olsa bile (SMTP geçici bir sorun
yaşasa bile) mesaj panelde görünür; `email_sent` sütunu o mesaj için bildirim e-postasının gidip
gitmediğini gösterir.
