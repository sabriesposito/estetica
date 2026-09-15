import { readFileSync } from 'fs';
const raw = readFileSync('./exec_14444.txt', 'utf8');
const nodeNames = [
  'Webhook POST',
  'Añadir Turno1',
  'Obtener Configuración Branding',
  'Tiene Correo Dueño?',
  'Notificar Dueño - Nuevo Turno',
  'Enviar Correo Confirmación1'
];
for (const n of nodeNames) {
  console.log(n, 'present:', raw.includes(n));
}
