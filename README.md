# Lumina — Sistema Integral de Gestión para Estéticas

Plataforma integral de gestión de reservas, administración, catálogo de servicios, directorio de clientes y onboarding de marca.

## Módulos Principales
- **Panel Admin (index.html)**: Calendario interactivo semanal/mensual, gestión de turnos en tiempo real, catálogo de servicios, equipo de staff, directorio de clientes con métricas de fidelidad y tasa de ausentismo, y panel de métricas de facturación.
- **Reservas Online (eserva.html)**: Portal público para que clientes reserven turnos seleccionando servicio, profesional, fecha y hora disponible, con confirmación inmediata.
- **Onboarding de Marca (onboarding.html)**: Configuración guiada de identidad corporativa (logo, portada, colores de marca, horarios y servicios).
- **Cancelación (cancelar.html)**: Flujo de cancelación directa con token seguro desde notificaciones de WhatsApp / Email.

## Integraciones y Automatizaciones
- Sincronización en tiempo real vía Webhooks n8n (https://n8n.neco-dev.cloud/).
- Base de datos conectada a Google Sheets.
- Notificaciones automáticas de confirmación y recordatorio por WhatsApp y Correo Electrónico.
