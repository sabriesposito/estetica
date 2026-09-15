const payload = {
  action: "nuevo_turno",
  esNuevoCliente: false,
  clienteInfo: {
    idCliente: "C1788482937",
    nombre: "Prueba Alerta Dueño",
    tel: "+5491166266845",
    email: "siempresina23@gmail.com"
  },
  fecha: "2026-09-15",
  horaInicio: "15:00",
  horaFin: "15:30",
  idStaff: "S01",
  idServicio: "Prueba Alerta",
  idTurno: "T_ALERT_TEST_" + Date.now(),
  estado: "Agendado",
  branding: {
    name: "Lumina Estética",
    theme: "amber",
    ownerEmail: "espositosabrina29@gmail.com"
  }
};

fetch("https://n8n.neco-dev.cloud/webhook/post-turno", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
.then(r => r.json())
.then(d => console.log("Webhook response:", d))
.catch(console.error);
