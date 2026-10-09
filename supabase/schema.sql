-- Vitrin: Supabase şeması ve RLS
-- Bu dosyayı Supabase Dashboard'da SQL Editor'e yapıştırıp çalıştırın.
--
-- Sipariş oluşturma, ödeme (iyzico) doğrulama ve erişim token'ı üretme dahil tüm
-- yazma işlemleri yalnızca sunucudaki Next.js API route'larından (src/app/api/),
-- service-role anahtarla yapılır (bkz. IYZICO-ENTEGRASYON.md). Service-role RLS'yi
-- atlar, bu yüzden tabloda tarayıcıya (anon/authenticated) hiçbir yazma veya okuma
-- politikası YOKTUR — browser'ın bu tabloya doğrudan erişimi olmamalıdır.
-- Siparişleri görüntülemek için Supabase Dashboard'daki Table Editor'ü kullanın
-- (proje sahibi olarak giriş yaptığınızda RLS'yi atlar).

create table if not exists orders (
  id text primary key,
  order_no text not null unique,
  access_token text,
  pricing_version text not null,
  customer jsonb not null,
  business jsonb not null,
  package text not null default 'temel',
  addons jsonb not null default '[]'::jsonb,
  quote_requests jsonb not null default '[]'::jsonb,
  total integer not null,
  first_year_service integer not null default 0,
  yearly_service integer not null default 0,
  invoice jsonb not null,
  consents jsonb,
  payment_status text,
  payment_ref text,
  project_status text,
  content_form jsonb,
  created_at timestamptz,
  received_at timestamptz not null default now()
);

alter table orders enable row level security;

drop policy if exists "anon sipariş ekleyebilir" on orders;
create policy "anon sipariş ekleyebilir"
  on orders
  for insert
  to anon
  with check (true);

-- Not: anon anahtar tarayıcı paketine gömülür (herkese görünür) — bu, Google E-Tablo
-- entegrasyonundaki secret ile aynı kabul: güvenlik anahtarın gizliliğinden değil,
-- politikanın yalnızca EKLEMEYE izin vermesinden ve hiçbir satırın geri okunamamasından gelir.
