import { readFileSync } from 'fs';
const raw = readFileSync('./exec_14449.txt', 'utf8');
const idx = raw.indexOf('Notificar Dueño - Nuevo Turno');
console.log(raw.slice(idx - 200, idx + 400));
