import fs from 'fs';

const htmlConfirmation = `=<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #faf7f2; margin: 0; padding: 20px; color: #57534e;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #f5f5f4;">
        
        <div style="background-color: {{ $('Webhook POST').item.json.body.branding.colors.accent || '#e0f2fe' }}; padding: 28px 24px; text-align: center; border-bottom: 1px solid {{ $('Webhook POST').item.json.body.branding.colors.border || '#bae6fd' }};">
            <div style="width: 50px; height: 50px; background-color: {{ $('Webhook POST').item.json.body.branding.colors.primary || '#bae6fd' }}; color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }}; border-radius: 50%; display: inline-block; line-height: 50px; font-weight: bold; font-size: 24px; margin-bottom: 6px;">L</div>
            <h1 style="color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }}; margin: 0; font-size: 22px; font-weight: 700;">{{ $('Webhook POST').item.json.body.branding.name || 'Lumina Estética' }}</h1>
        </div>
        
        <div style="padding: 28px 24px;">
            <div style="font-size: 18px; font-weight: 600; color: #44403c; margin-bottom: 10px;">
                ¡Hola, {{ $('Webhook POST').item.json.body.clienteInfo.nombre }}! 👋
            </div>
            
            <div style="background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: 600; font-size: 13px; margin-bottom: 20px;">
                ✨ Tu turno ha sido confirmado con éxito
            </div>
            
            <p style="font-size: 14px; color: #78716c; line-height: 1.5; margin-bottom: 20px;">
                Gracias por reservar con nosotros. A continuación tienes los detalles de tu cita:
            </p>

            <div style="background-color: #faf7f2; border: 1px solid #e7e5e4; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                    <tr>
                        <td style="padding: 8px 0; color: #78716c; border-bottom: 1px dashed #e7e5e4;">💅 <strong>Servicio:</strong></td>
                        <td style="padding: 8px 0; color: #292524; font-weight: 600; text-align: right; border-bottom: 1px dashed #e7e5e4;">{{ $('Webhook POST').item.json.body.idServicio }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #78716c; border-bottom: 1px dashed #e7e5e4;">📅 <strong>Fecha:</strong></td>
                        <td style="padding: 8px 0; color: #292524; font-weight: 600; text-align: right; border-bottom: 1px dashed #e7e5e4;">{{ $('Webhook POST').item.json.body.fecha }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #78716c;">⏰ <strong>Hora:</strong></td>
                        <td style="padding: 8px 0; color: #292524; font-weight: 600; text-align: right;">{{ $('Webhook POST').item.json.body.horaInicio }} hs</td>
                    </tr>
                </table>
            </div>

            <a href="https://estetica.neco-dev.cloud/reserva.html" style="display: block; width: 100%; text-align: center; background-color: {{ $('Webhook POST').item.json.body.branding.colors.primary || '#bae6fd' }}; color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }} !important; font-weight: 700; text-decoration: none; padding: 14px 0; border-radius: 12px; font-size: 15px; box-sizing: border-box;">
                📅 Ver o Modificar Turno
            </a>
        </div>

        <div style="background-color: #faf7f2; padding: 18px 24px; text-align: center; font-size: 12px; color: #a8a29e; border-top: 1px solid #f5f5f4;">
            ¡Te esperamos en <strong>{{ $('Webhook POST').item.json.body.branding.name || 'Lumina Estética' }}</strong>! ✨<br>
            <span style="font-size: 11px; opacity: 0.8;">Este es un mensaje automático de confirmación.</span>
        </div>
    </div>
</body>
</html>`;

const htmlCancellation = `=<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #faf7f2; margin: 0; padding: 20px; color: #57534e;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #f5f5f4;">
        
        <div style="background-color: {{ $('Webhook POST').item.json.body.branding.colors.accent || '#e0f2fe' }}; padding: 28px 24px; text-align: center; border-bottom: 1px solid {{ $('Webhook POST').item.json.body.branding.colors.border || '#bae6fd' }};">
            <div style="width: 50px; height: 50px; background-color: {{ $('Webhook POST').item.json.body.branding.colors.primary || '#bae6fd' }}; color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }}; border-radius: 50%; display: inline-block; line-height: 50px; font-weight: bold; font-size: 24px; margin-bottom: 6px;">L</div>
            <h1 style="color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }}; margin: 0; font-size: 22px; font-weight: 700;">{{ $('Webhook POST').item.json.body.branding.name || 'Lumina Estética' }}</h1>
        </div>
        
        <div style="padding: 28px 24px;">
            <div style="font-size: 18px; font-weight: 600; color: #44403c; margin-bottom: 10px;">
                ¡Hola, {{ $('Webhook POST').item.json.body.clienteInfo.nombre }}! 👋
            </div>
            
            <div style="background-color: #fef2f2; color: #991b1b; border: 1px solid #fecaca; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: 600; font-size: 13px; margin-bottom: 20px;">
                ❌ Tu turno ha sido cancelado
            </div>
            
            <p style="font-size: 14px; color: #78716c; line-height: 1.5; margin-bottom: 20px;">
                Te confirmamos que el siguiente turno fue cancelado y el horario ha sido liberado:
            </p>

            <div style="background-color: #faf7f2; border: 1px solid #e7e5e4; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                    <tr>
                        <td style="padding: 8px 0; color: #78716c; border-bottom: 1px dashed #e7e5e4;">💅 <strong>Servicio:</strong></td>
                        <td style="padding: 8px 0; color: #292524; font-weight: 600; text-align: right; border-bottom: 1px dashed #e7e5e4;">{{ $('Webhook POST').item.json.body.idServicio }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #78716c; border-bottom: 1px dashed #e7e5e4;">📅 <strong>Fecha:</strong></td>
                        <td style="padding: 8px 0; color: #292524; font-weight: 600; text-align: right; border-bottom: 1px dashed #e7e5e4;">{{ $('Webhook POST').item.json.body.fecha }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #78716c;">⏰ <strong>Hora:</strong></td>
                        <td style="padding: 8px 0; color: #292524; font-weight: 600; text-align: right;">{{ $('Webhook POST').item.json.body.horaInicio }} hs</td>
                    </tr>
                </table>
            </div>

            <a href="https://estetica.neco-dev.cloud/reserva.html" style="display: block; width: 100%; text-align: center; background-color: {{ $('Webhook POST').item.json.body.branding.colors.primary || '#bae6fd' }}; color: {{ $('Webhook POST').item.json.body.branding.colors.text || '#075985' }} !important; font-weight: 700; text-decoration: none; padding: 14px 0; border-radius: 12px; font-size: 15px; box-sizing: border-box;">
                📅 Agendar un Nuevo Turno
            </a>
        </div>

        <div style="background-color: #faf7f2; padding: 18px 24px; text-align: center; font-size: 12px; color: #a8a29e; border-top: 1px solid #f5f5f4;">
            Esperamos verte pronto en <strong>{{ $('Webhook POST').item.json.body.branding.name || 'Lumina Estética' }}</strong> ✨
        </div>
    </div>
</body>
</html>`;

const workflow = {
  "name": "Lumina - Post Turno, Cancelación y Notificaciones",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "post-turno",
        "options": {}
      },
      "name": "Webhook POST",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [-480, 144],
      "id": "f193b633-f486-4ad5-b283-6d39eb7e5604",
      "webhookId": "d3cd463b-dba7-42ee-90c6-910d99cdb974"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "f3dfdf4a-52ec-4b4a-8ff7-2479df4a7dbd",
              "leftValue": "={{ $json.body.action }}",
              "rightValue": "cancelar",
              "operator": {
                "type": "string",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [-272, 144],
      "id": "90bd1469-244d-4bad-95b8-fa44061bd5cb",
      "name": "Es Cancelación?"
    },
    {
      "parameters": {
        "operation": "update",
        "documentId": {
          "__rl": true,
          "value": "1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k",
          "mode": "list",
          "cachedResultName": "BaseDatos_Estetica_Demo",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 931049778,
          "mode": "list",
          "cachedResultName": "Turnos",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k/edit#gid=931049778"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "ID_Turno": "={{ $json.body.idTurno }}",
            "Estado": "Cancelado"
          },
          "matchingColumns": [
            "ID_Turno"
          ],
          "schema": [
            {
              "id": "ID_Turno",
              "displayName": "ID_Turno",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Estado",
              "displayName": "Estado",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [-32, -32],
      "id": "c708481f-05bb-465f-9d61-71c0ce2092b0",
      "name": "Actualizar Estado Cancelado",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "g855PstCDRAtYH2C",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "sendTo": "={{ $('Webhook POST').item.json.body.clienteInfo.email }}",
        "subject": "=Turno Cancelado en {{ $('Webhook POST').item.json.body.branding.name || 'Lumina Estética' }}",
        "message": htmlCancellation,
        "options": {}
      },
      "name": "Enviar Correo Cancelación",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2.1,
      "position": [208, -32],
      "id": "e674a2fb-f8c3-40b3-a175-a805a3234e99",
      "credentials": {
        "gmailOAuth2": {
          "id": "lGbWJrHHYY20r6XS",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{ $('Webhook POST').item.json.body.esNuevoCliente }}",
              "value2": true
            }
          ]
        }
      },
      "name": "Es Cliente Nuevo?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [208, 160],
      "id": "17f94160-2220-4023-bf97-e453acbdcc9e"
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "value": "1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k",
          "mode": "list",
          "cachedResultName": "BaseDatos_Estetica_Demo",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 72646435,
          "mode": "list",
          "cachedResultName": "Clientes",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k/edit#gid=72646435"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "ID_Cliente": "={{ $json.body.clienteInfo.idCliente }}",
            "Nombre_Completo": "={{ $json.body.clienteInfo.nombre }}",
            "Telefono": "={{ $json.body.clienteInfo.tel }}",
            "Correo": "={{ $json.body.clienteInfo.email }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "ID_Cliente",
              "displayName": "ID_Cliente",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Nombre_Completo",
              "displayName": "Nombre_Completo",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Telefono",
              "displayName": "Telefono",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Correo",
              "displayName": "Correo",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "name": "Añadir Cliente",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4,
      "position": [416, 0],
      "id": "cc410ae7-d8b0-4517-9803-b05b6c721fcd",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "g855PstCDRAtYH2C",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {},
      "name": "Merge",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2.1,
      "position": [672, 160],
      "id": "d7fbb786-bcb2-4865-9aad-533727449cb5"
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "value": "1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k",
          "mode": "list",
          "cachedResultName": "BaseDatos_Estetica_Demo",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 931049778,
          "mode": "list",
          "cachedResultName": "Turnos",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1myRSXzpbbr_21hQbVsjYz2HwnNBVbjS1VAenHIdSz7k/edit#gid=931049778"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "ID_Turno": "={{ $json.body.idTurno }}",
            "Fecha": "={{ $json.body.fecha }}",
            "Hora_Inicio": "={{ $json.body.horaInicio }}",
            "Hora_Fin": "={{ $json.body.horaFin }}",
            "ID_Staff": "={{ $json.body.idStaff }}",
            "ID_Servicio": "={{ $json.body.idServicio }}",
            "Estado": "Confirmado",
            "ID_Cliente": "={{ $json.body.clienteInfo.idCliente }}",
            "Origen_Demo": "Link"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "ID_Turno",
              "displayName": "ID_Turno",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Fecha",
              "displayName": "Fecha",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Hora_Inicio",
              "displayName": "Hora_Inicio",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Hora_Fin",
              "displayName": "Hora_Fin",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "ID_Cliente",
              "displayName": "ID_Cliente",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "ID_Staff",
              "displayName": "ID_Staff",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "ID_Servicio",
              "displayName": "ID_Servicio",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Estado",
              "displayName": "Estado",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "name": "Añadir Turno",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4,
      "position": [880, 160],
      "id": "3b52fcd4-17de-4fac-b59b-fac9e83f6cf8",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "g855PstCDRAtYH2C",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "sendTo": "={{ $('Webhook POST').item.json.body.clienteInfo.email }}",
        "subject": "=Turno Confirmado en {{ $('Webhook POST').item.json.body.branding.name || 'Lumina Estética' }}",
        "message": htmlConfirmation,
        "options": {}
      },
      "name": "Enviar Correo Confirmación",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2.1,
      "position": [1072, 160],
      "id": "ce4e24fb-f8c3-40b3-a175-a805a3234e55",
      "credentials": {
        "gmailOAuth2": {
          "id": "lGbWJrHHYY20r6XS",
          "name": "Gmail account"
        }
      }
    }
  ],
  "pinData": {},
  "connections": {
    "Webhook POST": {
      "main": [
        [
          {
            "node": "Es Cancelación?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Es Cancelación?": {
      "main": [
        [
          {
            "node": "Actualizar Estado Cancelado",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Es Cliente Nuevo?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Actualizar Estado Cancelado": {
      "main": [
        [
          {
            "node": "Enviar Correo Cancelación",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Es Cliente Nuevo?": {
      "main": [
        [
          {
            "node": "Añadir Cliente",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Merge",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Añadir Cliente": {
      "main": [
        [
          {
            "node": "Merge",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merge": {
      "main": [
        [
          {
            "node": "Añadir Turno",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Añadir Turno": {
      "main": [
        [
          {
            "node": "Enviar Correo Confirmación",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1"
  }
};

fs.writeFileSync('C:/Users/necos/Downloads/workflow_n8n_lumina_completo.json', JSON.stringify(workflow, null, 2));
console.log('Generación terminada con éxito!');
