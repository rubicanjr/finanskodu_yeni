/**
 * Favicon ve OG görseli oluşturma scripti
 * Mevcut logo'dan favicon.ico, favicon-32x32.png, favicon-16x16.png,
 * apple-touch-icon.png ve og-image.png üretir.
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../client/public');
const logoPath = path.join(publicDir, 'assets/fk-logo-new.webp');

async function run() {
  console.log('Favicon ve OG görseli oluşturuluyor...');

  // 1. favicon-32x32.png
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 5, g: 8, b: 16, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ favicon-32x32.png');

  // 2. favicon-16x16.png
  await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 5, g: 8, b: 16, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ favicon-16x16.png');

  // 3. apple-touch-icon.png (180x180, opaque background)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 5, g: 8, b: 16, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // 4. favicon.ico — 32x32 PNG'yi ICO formatına dönüştür
  // sharp ICO desteklemiyor, PNG'yi ICO olarak kopyala (modern tarayıcılar PNG favicon destekler)
  // Gerçek ICO için favicon-32x32.png'yi favicon.ico olarak kopyala
  fs.copyFileSync(
    path.join(publicDir, 'favicon-32x32.png'),
    path.join(publicDir, 'favicon.ico')
  );
  console.log('✓ favicon.ico (32x32 PNG)');

  // 5. og-image.png (1200x630 — sosyal medya için standart boyut)
  // Logo'yu koyu arka plan üzerine merkeze yerleştir
  const logoResized = await sharp(logoPath)
    .resize(400, 200, { fit: 'contain', background: { r: 5, g: 8, b: 16, alpha: 0 } })
    .png()
    .toBuffer();

  // 1200x630 koyu arka plan oluştur
  const ogBg = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 5, g: 8, b: 16, alpha: 1 }
    }
  })
  .composite([
    {
      input: logoResized,
      gravity: 'center',
    }
  ])
  .png()
  .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ og-image.png (1200x630)');

  console.log('\nTüm favicon ve OG görseli dosyaları oluşturuldu!');
}

run().catch(console.error);
