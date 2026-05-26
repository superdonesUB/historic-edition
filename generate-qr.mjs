import QRCode from 'qrcode';
import { writeFileSync } from 'fs';

const url = 'https://superdonesub.github.io/historic-edition/';
const outputPath = './revista-qr.png';

await QRCode.toFile(outputPath, url, {
  width: 512,
  margin: 2,
  color: { dark: '#211915', light: '#fffaf2' },
});

console.log(`QR generado en: ${outputPath}`);
console.log(`URL: ${url}`);
