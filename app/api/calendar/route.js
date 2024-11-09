import ical from 'ical';
import fetch from 'node-fetch';
import { NextResponse } from 'next/server';
import { authorize, addEventToGoogleCalendar } from '../../../utils/googleCalendar';

// URL du fichier .ics d'Outlook
const icsUrl = 'https://outlook.office365.com/owa/calendar/9d490f6291574ed794b57fe9d33e3fd2@students.ephec.be/87d23e0576a549a888ac627d182ca85c15461609017930916619/calendar.ics';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    try {
        // Récupérer les données .ics d'Outlook
        const response = await fetch(icsUrl);
        const icsData = await response.text();
        const parsedData = ical.parseICS(icsData);

        // Filtrer les événements de la semaine
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const eventsToAdd = [];

        for (let eventKey in parsedData) {
            const event = parsedData[eventKey];

            if (event.type === 'VEVENT' && event.start >= startOfWeek && event.start <= endOfWeek) {
                // Créer un objet événement pour Google Calendar
                const googleEvent = {
                    summary: event.summary,
                    location: event.location || '',
                    description: event.description || '',
                    start: {
                        dateTime: event.start.toISOString(),
                        timeZone: 'Europe/Brussels',
                    },
                    end: {
                        dateTime: event.end.toISOString(),
                        timeZone: 'Europe/Brussels',
                    },
                };
                eventsToAdd.push(googleEvent);
            }
        }

        // Autoriser l'accès à Google Calendar et ajouter les événements
        authorize((auth) => {
            eventsToAdd.forEach((event) => addEventToGoogleCalendar(auth, event));
        });

        console.log('Événements ajoutés à Google Calendar :', eventsToAdd.length);
        return NextResponse.json({ message: 'Les événements ont été transférés avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return NextResponse.json({ message: 'Erreur lors de la récupération des données.' }, { status: 500 });
    }
}
