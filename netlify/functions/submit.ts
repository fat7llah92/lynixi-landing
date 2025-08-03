
import { google } from 'googleapis';

export async function handler(event) {
  try {
    const { email } = JSON.parse(event.body);

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    const client_email = process.env.GOOGLE_CLIENT_EMAIL;
    const private_key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!client_email || !private_key || !spreadsheetId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing environment variables.' })
      };
    }

    const auth = new google.auth.JWT({
      email: client_email,
      key: private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:A',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[email, new Date().toISOString()]]
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' })
    };

  } catch (err) {
    console.error('❌ Error in submit.ts:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Unknown error' })
    };
  }
}
