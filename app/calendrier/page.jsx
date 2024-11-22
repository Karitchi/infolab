"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import ICAL from 'ical.js';
import './calendar.css'; // Assurez-vous de créer ce fichier pour les styles personnalisés

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/calendar');
        const jcalData = ICAL.parse(response.data);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');
        const filteredEvents = vevents.map(event => {
          const vevent = new ICAL.Event(event);
          return {
            title: vevent.summary,
            start: new Date(vevent.startDate.toString()),
            end: new Date(vevent.endDate.toString()),
            location: vevent.location,
          };
        }).filter(event => event.location && (event.location.toLowerCase().includes('openlab') || event.location.toLowerCase().includes('l217')));
        console.log('Filtered events:', filteredEvents); // Afficher les événements filtrés dans la console
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Mon Calendrier</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="calendar"
      />
    </div>
  );
};

export default CalendarPage;