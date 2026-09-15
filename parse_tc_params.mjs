import { readFileSync } from 'fs';
const nodes = JSON.parse(readFileSync('./db_nodes.json', 'utf8'));
const n = nodes.find(x => x.name === 'Tiene Correo Dueño?');
console.log('Tiene Correo Dueño? params:', JSON.stringify(n.parameters, null, 2));
const gm = nodes.find(x => x.name === 'Notificar Dueño - Nuevo Turno');
console.log('Notificar Dueño params:', JSON.stringify(gm.parameters, null, 2));
