
import { google } from 'googleapis';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { email } = JSON.parse(event.body || '{}');
  if (!email) {
    return {
      statusCode: 400,
      body: 'Email is required',
    };
  }

  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email saved successfully' }),
    };
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save email' }),
    };
  }
}
