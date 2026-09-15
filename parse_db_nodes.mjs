import { readFileSync } from 'fs';
const nodes = JSON.parse(readFileSync('./db_nodes.json', 'utf8'));
console.log('DB node names:', nodes.map(n => n.name));
