// pages/api/submit-form.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { name, email, phone, selectedProperty } = req.body;

    // Criar cliente JWT com as credenciais da conta de serviço
    const client = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL, // Usando dotenv
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,   // Usando dotenv
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Obter token de acesso
    const token = await client.getAccessToken();

    const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID; // Usando dotenv
    const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME; // Usando dotenv

    const values = [
      [
        new Date().toLocaleDateString(),
        name,
        email,
        phone,
        selectedProperty
      ]
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:E:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}