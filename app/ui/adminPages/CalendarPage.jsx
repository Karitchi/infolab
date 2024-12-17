"use client";

import React, { useEffect, useState } from "react";
import ICAL from "ical.js";
import "./calendar.css";
import Title from "../Title";

/**
 * Composant pour afficher un indicateur de statut (libre/occupé)
 */
const StatusMarker = ({ isFree }) => (
  <div className={`status-marker ${isFree ? "free" : "busy"}`} />
);

/**
 * Composant pour afficher un créneau horaire avec son statut
 */
const TimeSlot = ({ time, isFree = true, onClick }) => (
  <div className="time-slot" onClick={() => onClick(time)}>
    <span className="time">{time}</span>
    <StatusMarker isFree={isFree} />
  </div>
);

/**
 * Nettoie la description de l'événement en retirant les informations de mise à jour
 */
const cleanDescription = (description) => {
  if (!description) return "";
  return description.replace(/Last Updated.*(\r\n|\n|\r)/g, "").trim();
};

/**
 * Composant pour afficher les informations d'un événement
 */
const EventInfo = ({ event }) => {
  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const getEventStatus = (event) => {
    const title = event.title.toLowerCase();
    const description = (event.description || "").toLowerCase();
    return title.includes("libre") || description.includes("libre");
  };

  const cleanedDescription = cleanDescription(event.description);

  return (
    <div className="event-item">
      <div className="event-info">
        <span className="event-title">{event.title}</span>
        <span className="event-time">
          {formatTime(event.start)} - {formatTime(event.end)}
        </span>
        {event.location && (
          <span className="event-location">{event.location}</span>
        )}
        {cleanedDescription && (
          <span className="event-description">{cleanedDescription}</span>
        )}
      </div>
      <StatusMarker isFree={getEventStatus(event)} />
    </div>
  );
};

/**
 * Composant pour afficher une colonne de jour avec ses créneaux horaires
 */
const DayBlock = ({ day, events, onTimeSlotClick }) => {
  // Réintégration de tous les créneaux horaires
  const timeSlots = [
    "08:30",
    "09:30",
    "10:45",
    "11:45",
    "12:45",
    "13:45",
    "14:45",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const isSlotFree = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    const event = events.find((e) => slotTime >= e.start && slotTime < e.end);
    return !event || event.title.toLowerCase().includes("libre");
  };

  return (
    <div className="day-block">
      <h3 className="day-name">{day}</h3>
      <div className="time-slots">
        {timeSlots.map((time) => (
          <TimeSlot
            key={time}
            time={time}
            isFree={isSlotFree(time)}
            onClick={() => onTimeSlotClick(day, time)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Composant pour afficher la vue détaillée des plages horaires
 */
const TimeBlockView = ({ day, events }) => {
  const timeBlocks = [
    {
      id: "morning",
      title: "Matin",
      timeRange: "08:00 - 12:00",
      filterFn: (e) => e.start.getHours() >= 8 && e.start.getHours() < 12,
    },
    {
      id: "afternoon1",
      title: "Après-midi 1",
      timeRange: "13:30 - 15:45",
      filterFn: (e) => e.start.getHours() >= 13 && e.start.getHours() < 16,
    },
    {
      id: "afternoon2",
      title: "Après-midi 2",
      timeRange: "16:00 - 18:00",
      filterFn: (e) => e.start.getHours() >= 16 && e.start.getHours() <= 18,
    },
  ];

  // Groupe les événements par heure de début
  const groupEventsByStartTime = (events) => {
    return events.reduce((acc, event) => {
      const startTime = event.start.getTime();
      if (!acc[startTime]) acc[startTime] = [];
      acc[startTime].push(event);
      return acc;
    }, {});
  };

  return (
    <div className="time-blocks-grid">
      {timeBlocks.map((block) => {
        const blockEvents = events.filter(block.filterFn);
        const groupedEvents = groupEventsByStartTime(blockEvents);

        return (
          <div key={block.id} className="time-block">
            <h3 className="block-title">{block.title}</h3>
            <div className="block-time">{block.timeRange}</div>
            <div className="block-events">
              {Object.entries(groupedEvents).map(([startTime, timeEvents]) => (
                <div key={startTime} className="events-row">
                  {timeEvents.map((event, idx) => (
                    <EventInfo key={`${event.id || idx}`} event={event} />
                  ))}
                </div>
              ))}
              {blockEvents.length === 0 && (
                <div className="event-item available">
                  <div className="event-info">
                    <span className="event-title">Disponible</span>
                    <span className="event-time">{block.timeRange}</span>
                  </div>
                  <StatusMarker isFree={true} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Composant principal du calendrier
 */
const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [view, setView] = useState("week");
  const [labStatus, setLabStatus] = useState({
    isFree: true,
    nextTime: "15:00",
  });

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  // Met à jour le statut du laboratoire
  const updateLabStatus = (events) => {
    const now = new Date();
    const currentEvents = events.filter(
      (event) => event.start <= now && event.end > now,
    );

    const currentlyFree =
      !currentEvents.length ||
      currentEvents.some((e) => e.title.toLowerCase().includes("libre"));

    // Trouve le prochain événement occupé
    const nextEvent = events
      .filter(
        (event) =>
          !event.title.toLowerCase().includes("libre") && event.start > now,
      )
      .sort((a, b) => a.start - b.start)[0];

    setLabStatus({
      isFree: currentlyFree,
      nextTime: nextEvent ? formatTime(nextEvent.start) : "18:00",
    });
  };

  // Récupère et traite les événements du calendrier
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/calendar");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.text();
        const jcalData = ICAL.parse(data);
        const vcalendar = new ICAL.Component(jcalData);

        const filteredEvents = vcalendar
          .getAllSubcomponents("vevent")
          .map((vevent) => {
            const event = new ICAL.Event(vevent);
            return {
              id: event.uid,
              title: event.summary || "Sans titre",
              start: event.startDate.toJSDate(),
              end: event.endDate.toJSDate(),
              description: cleanDescription(event.description || ""),
              location: event.location || "",
            };
          })
          .filter(
            (event) =>
              event.location &&
              (event.location.toLowerCase().includes("openlab") ||
                event.location.toLowerCase().includes("l217")),
          )
          .sort((a, b) => a.start - b.start);

        setEvents(filteredEvents);
        updateLabStatus(filteredEvents);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    };

    fetchEvents();
    const interval = setInterval(() => updateLabStatus(events), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setView("timeBlocks");
  };

  const handleBack = () => {
    setView("week");
    setSelectedDay(null);
  };

  const getDayEvents = (day) => {
    return events.filter((event) => {
      const eventDay = event.start.toLocaleDateString("fr-FR", {
        weekday: "long",
      });
      return eventDay.toLowerCase() === day.toLowerCase();
    });
  };

  return (
    <div className="calendar-container">
      <div className="header">
        <h1
          className={`title ${labStatus.isFree ? "status-free" : "status-busy"}`}
        >
          The Openlab is {labStatus.isFree ? "free" : "busy"} until{" "}
          {labStatus.nextTime}
        </h1>
        <button className="settings-button">⚙️</button>
      </div>

      {view === "week" ? (
        <div className="week-view">
          {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map((day) => (
            <DayBlock
              key={day}
              day={day}
              events={getDayEvents(day)}
              onTimeSlotClick={handleDaySelect}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="navigation">
            <button className="back-button" onClick={handleBack}>
              ←
            </button>
            <h2 className="view-title">{selectedDay}</h2>
          </div>
          <TimeBlockView day={selectedDay} events={getDayEvents(selectedDay)} />
        </>
      )}
    </div>
  );
};

export default CalendarPage;
