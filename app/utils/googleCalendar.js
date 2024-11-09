const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Charger les informations d'identification
const credentialsPath = path.join(__dirname, '../config/client_secret_747520506444-3gujluqhbfstv4p85t7llld9upadqa1m.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '../config/token.json');

// Autoriser l'accès à l'API
function authorize(callback) {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath));
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Vérifier si le token existe déjà
    if (fs.existsSync(TOKEN_PATH)) {
        const token = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    } else {
        getAccessToken(oAuth2Client, callback);
    }
}

// Obtenir un token d'accès
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question('Enter the code from that page here: ', (code) => {
        readline.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
            callback(oAuth2Client);
        });
    });
}

// Ajouter un événement à Google Calendar
function addEventToGoogleCalendar(auth, event) {
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.insert(
        {
            calendarId: 'primary',
            resource: event,
        },
        (err, res) => {
            if (err) return console.error('Error adding event to Google Calendar:', err);
            console.log('Event created:', res.data.htmlLink);
        }
    );
}

module.exports = {
    authorize,
    addEventToGoogleCalendar,
};
