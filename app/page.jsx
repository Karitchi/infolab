"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Announcements from "./announcements/page";
import PowerSchedule from "./power-schedule/page";
import Slideshow from "./ui/Slideshow";
import Visibility from "./visibility/page";

const Page = () => {
  return (
    <Splide
      options={{
        type: "snap", // Comportement par défaut : arrêt sur chaque slide
        perPage: 1, // Une slide visible à la fois
        pagination: false, // Pas de points de navigation
        arrows: false, // Pas de flèches
        snap: true, // Transition automatique lorsqu'un seuil est atteint
        drag: true, // Glisser pour changer de slide
        flickPower: 500, // Seuil d'accélération pour passer à la slide suivante
        trimSpace: true, // Supprime l'espace résiduel
        gap: "0rem", // Pas d'écart entre les slides
        width: "100%",
        height: "100vh",
      }}
    >
      {/* Slide 1 : Slideshow */}
      <SplideSlide>
        <div style={{ width: "100%", height: "100%" }}>
          <Slideshow />
        </div>
      </SplideSlide>

      {/* Slide 2 : Power Schedule */}
      <SplideSlide>
        <div style={{ width: "100%", height: "100%" }}>
          <PowerSchedule />
        </div>
      </SplideSlide>

      {/* Slide 3 : Announcements */}
      <SplideSlide>
        <div style={{ width: "100%", height: "100%" }}>
          <Visibility />
        </div>
      </SplideSlide>

      {/* Slide 4 : Visibility */}
      <SplideSlide>
        <div style={{ width: "100%", height: "100%" }}>
          <Announcements />
        </div>
      </SplideSlide>
    </Splide>
  );
};

export default Page;
