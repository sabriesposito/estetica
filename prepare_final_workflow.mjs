import { readFileSync, writeFileSync } from 'fs';
import { Client } from 'ssh2';

const txt = readFileSync('./current_live_n8n_post_turno.json', 'utf8');
const raw = JSON.parse('[' + txt)[0];

// Remove any existing Tiene Correo Dueño? or Notificar Dueño nodes from previous attempt
raw.nodes = raw.nodes.filter(n => n.name !== 'Tiene Correo Dueño?' && n.name !== 'Notificar Dueño - Nuevo Turno' && n.name !== 'Obtener Configuración Branding');

const htmlNotificationOwner = `=<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #faf7f2; margin: 0; padding: 20px; color: #44403c;">
  <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #f5f5f4;">
    
    <div style="background-color: {{ $('Webhook POST').item.json.body.branding.colors.accent || '#e0f2fe' }}; padding: 24px 20px; text-align: center; border-bottom: 1px solid {{ $('Webhook POST').item.json.body.branding.colors.border || '#bae6fd' }};">
      <h1 style="color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }}; margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">{{ $('Webhook POST').item.json.body.branding.name || 'Lumina Estética' }}</h1>
      <span style="background-color: #ffffff; color: #1e293b; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: inline-block; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
        🔔 Nueva Reserva de Turno
      </span>
    </div>

    <div style="padding: 24px 20px;">
      <p style="font-size: 14px; color: #57534e; margin: 0 0 18px 0; line-height: 1.5;">
        Hola 👋 Se ha registrado una nueva cita en tu centro. Aquí tienes todos los datos:
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 10px;">
          👤 Información del Cliente
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13.5px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; width: 35%;">Nombre:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">{{ $('Webhook POST').item.json.body.clienteInfo.nombre }}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Teléfono:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">
              {{ $('Webhook POST').item.json.body.clienteInfo.tel || 'No informado' }}
              {{ $('Webhook POST').item.json.body.clienteInfo.tel ? '<a href="https://wa.me/' + $('Webhook POST').item.json.body.clienteInfo.tel.replace(/[^0-9]/g, '') + '" style="background:#22c55e; color:#ffffff; text-decoration:none; padding:3px 8px; border-radius:6px; font-size:11px; margin-left:6px; font-weight:bold; display:inline-block;">💬 WhatsApp</a>' : '' }}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Correo:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">
              <a href="mailto:{{ $('Webhook POST').item.json.body.clienteInfo.email }}" style="color: #0284c7; text-decoration: none;">{{ $('Webhook POST').item.json.body.clienteInfo.email }}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Condición:</td>
            <td style="padding: 6px 0;">
              {{ $('Webhook POST').item.json.body.esNuevoCliente ? '<span style="background-color:#dcfce7; color:#15803d; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:bold;">✨ NUEVO CLIENTE (1ª vez)</span>' : '<span style="background-color:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:bold;">🔄 Cliente Recurrente</span>' }}
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 14px 16px; margin-bottom: 22px;">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #78716c; letter-spacing: 0.5px; margin-bottom: 10px;">
          📅 Detalles de la Cita
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13.5px;">
          <tr>
            <td style="padding: 6px 0; color: #78716c; width: 35%;">💅 Servicio:</td>
            <td style="padding: 6px 0; color: #1c1917; font-weight: 700;">{{ $('Webhook POST').item.json.body.idServicio }}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">📆 Fecha:</td>
            <td style="padding: 6px 0; color: #1c1917; font-weight: 600;">{{ $('Webhook POST').item.json.body.fecha }}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">⏰ Horario:</td>
            <td style="padding: 6px 0; color: #1c1917; font-weight: 700;">{{ $('Webhook POST').item.json.body.horaInicio }} hs a {{ $('Webhook POST').item.json.body.horaFin }} hs</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">✨ Profesional:</td>
            <td style="padding: 6px 0; color: #1c1917; font-weight: 600;">{{ $('Webhook POST').item.json.body.idStaff }}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">🆔 ID Turno:</td>
            <td style="padding: 6px 0; color: #78716c; font-family: monospace; font-size: 12px;">{{ $('Webhook POST').item.json.body.idTurno }}</td>
          </tr>
        </table>
      </div>

      <a href="https://estetica.neco-dev.cloud/index.html" style="display: block; width: 100%; text-align: center; background-color: {{ $('Webhook POST').item.json.body.branding.colors.primary || '#bae6fd' }}; color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }} !important; font-weight: 700; text-decoration: none; padding: 13px 0; border-radius: 12px; font-size: 14px; box-sizing: border-box;">
        📅 Ver Agenda en Panel Admin
      </a>
    </div>

    <div style="background-color: #faf7f2; padding: 14px 20px; text-align: center; font-size: 11px; color: #a8a29e; border-top: 1px solid #f5f5f4;">
      Aviso enviado automáticamente al correo configurado por el dueño.<br>
      Podés modificar esta casilla en cualquier momento desde <strong>Panel Admin ➔ Configuración</strong>.
    </div>
  </div>
</body>
</html>`;

const nodeGetBranding = {
  parameters: {
    method: "GET",
    url: "https://estetica.neco-dev.cloud/branding.json",
    options: {}
  },
  name: "Obtener Configuración Branding",
  type: "n8n-nodes-base.httpRequest",
  typeVersion: 4.2,
  position: [ 420, 240 ],
  id: "a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab",
  continueOnFail: true
};

const nodeIfOwnerEmail = {
  parameters: {
    conditions: {
      options: {
        caseSensitive: true,
        leftValue: "",
        typeValidation: "strict",
        version: 3
      },
      conditions: [
        {
          id: "b4f8101a-7b3c-4d5e-89fa-123456789abc",
          leftValue: "={{ ($('Webhook POST').item.json.body.branding?.ownerEmail || $json?.ownerEmail || '').trim() }}",
          rightValue: "@",
          operator: {
            type: "string",
            operation: "contains"
          }
        }
      ],
      combinator: "and"
    },
    options: {}
  },
  type: "n8n-nodes-base.if",
  typeVersion: 2.3,
  position: [ 640, 240 ],
  id: "b4f8101a-7b3c-4d5e-89fa-123456789abc",
  name: "Tiene Correo Dueño?"
};

const nodeNotifyOwner = {
  parameters: {
    sendTo: "={{ $('Webhook POST').item.json.body.branding?.ownerEmail || $('Obtener Configuración Branding').item.json?.ownerEmail }}",
    subject: "=🔔 Nuevo Turno: {{ $('Webhook POST').item.json.body.clienteInfo.nombre }} - {{ $('Webhook POST').item.json.body.idServicio }}",
    message: htmlNotificationOwner,
    options: {}
  },
  name: "Notificar Dueño - Nuevo Turno",
  type: "n8n-nodes-base.gmail",
  typeVersion: 2.1,
  position: [ 860, 240 ],
  id: "c5a9202b-8c4d-5e6f-90ab-234567890bcd",
  continueOnFail: true,
  credentials: {
    gmailOAuth2: {
      id: "lGbWJrHHYY20r6XS",
      name: "Gmail account"
    }
  }
};

raw.nodes.push(nodeGetBranding);
raw.nodes.push(nodeIfOwnerEmail);
raw.nodes.push(nodeNotifyOwner);

// Connect Añadir Turno to both client email and Obtener Configuración Branding
raw.connections["Añadir Turno"] = {
  main: [
    [
      { node: "Enviar Correo Confirmación", type: "main", index: 0 },
      { node: "Obtener Configuración Branding", type: "main", index: 0 }
    ]
  ]
};

// Connect Añadir Turno1 to both client email and Obtener Configuración Branding
raw.connections["Añadir Turno1"] = {
  main: [
    [
      { node: "Enviar Correo Confirmación1", type: "main", index: 0 },
      { node: "Obtener Configuración Branding", type: "main", index: 0 }
    ]
  ]
};

// Connect Obtener Configuración Branding to Tiene Correo Dueño?
raw.connections["Obtener Configuración Branding"] = {
  main: [
    [
      { node: "Tiene Correo Dueño?", type: "main", index: 0 }
    ]
  ]
};

// Connect Tiene Correo Dueño? to Notificar Dueño - Nuevo Turno
raw.connections["Tiene Correo Dueño?"] = {
  main: [
    [
      { node: "Notificar Dueño - Nuevo Turno", type: "main", index: 0 }
    ]
  ]
};

writeFileSync('./final_robust_workflow.json', JSON.stringify(raw, null, 2), 'utf8');
console.log('final_robust_workflow.json generado correctamente!');
