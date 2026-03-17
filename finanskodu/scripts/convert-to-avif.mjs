/**
 * Finans Kodu - AVIF Toplu Dönüşüm Scripti
 * WebP görsellerini AVIF formatına dönüştürür (q=40, %40+ küçültme)
 * Çıktı: /tmp/avif-output/
 */

import sharp from '../node_modules/sharp/lib/index.js';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = '/home/ubuntu/finans-kodu/client/public/assets/img';
const OUTPUT_DIR = '/tmp/avif-output';

// AVIF dönüşümü yapılacak görseller (avatar görselleri hariç - zaten küçük)
const SKIP_PATTERNS = [
  'sarp-idle', 'sarp-talking', 'sarp-listening', 'sarp-thinking',
  'sarp-glad', 'sarp-thumbsup', 'sarp-surprised', 'sarp-confused',
  'sarp-ok', 'sarp-excited', // Avatar animasyon görselleri - küçük zaten
];

async function main() {
  // Çıktı dizinini oluştur
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const files = await readdir(INPUT_DIR);
  const webpFiles = files.filter(f => f.endsWith('.webp'));
  
  console.log(`Toplam ${webpFiles.length} WebP görsel bulundu`);
  
  let converted = 0;
  let skipped = 0;
  let totalOriginal = 0;
  let totalAvif = 0;

  for (const file of webpFiles) {
    const shouldSkip = SKIP_PATTERNS.some(p => file.includes(p));
    if (shouldSkip) {
      skipped++;
      continue;
    }

    const inputPath = join(INPUT_DIR, file);
    const outputName = file.replace('.webp', '.avif');
    const outputPath = join(OUTPUT_DIR, outputName);

    try {
      const origSize = (await stat(inputPath)).size;
      
      await sharp(inputPath)
        .avif({ quality: 40, effort: 6 })
        .toFile(outputPath);
      
      const avifSize = (await stat(outputPath)).size;
      
      totalOriginal += origSize;
      totalAvif += avifSize;
      
      const saving = Math.round((1 - avifSize / origSize) * 100);
      console.log(`✓ ${file}: ${(origSize/1024).toFixed(1)}KB → ${(avifSize/1024).toFixed(1)}KB (${saving}% küçük)`);
      converted++;
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`);
    }
  }

  console.log('\n=== ÖZET ===');
  console.log(`Dönüştürülen: ${converted} görsel`);
  console.log(`Atlanan: ${skipped} görsel`);
  console.log(`Toplam WebP: ${(totalOriginal/1024).toFixed(1)}KB`);
  console.log(`Toplam AVIF: ${(totalAvif/1024).toFixed(1)}KB`);
  console.log(`Toplam tasarruf: ${Math.round((1 - totalAvif/totalOriginal) * 100)}%`);
  console.log(`\nAVIF dosyaları: ${OUTPUT_DIR}/`);
}

main().catch(console.error);
