const payload = {
  action: "nuevo_turno",
  esNuevoCliente: false,
  clienteInfo: {
    idCliente: "C1788482937",
    nombre: "Prueba Sistema Alertas",
    tel: "+5491166266845",
    email: "siempresina23@gmail.com"
  },
  fecha: "2026-09-15",
  horaInicio: "14:00",
  horaFin: "14:30",
  idStaff: "S01",
  idServicio: "Test Alerta Dueño",
  idTurno: "T_TEST_" + Date.now(),
  estado: "Agendado",
  branding: {
    name: "Lumina Estética",
    theme: "amber"
  }
};

fetch("https://n8n.neco-dev.cloud/webhook/post-turno", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
.then(r => r.text())
.then(t => console.log("Webhook response:", t))
.catch(console.error);
