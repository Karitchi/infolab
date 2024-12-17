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
        pagination: true, // Active la pagination par défaut
        arrows: false, // Pas de flèches
        snap: true, // Transition automatique lorsqu'un seuil est atteint
        drag: true, // Glisser pour changer de slide
        flickPower: 500, // Seuil d'accélération pour passer à la slide suivante
        trimSpace: true, // Supprime l'espace résiduel
        gap: "0rem", // Pas d'écart entre les slides
        width: "100%",
        height: "100vh", // Hauteur dynamique selon la taille de l'écran
      }}
    >
      {/* Slide 1 : Slideshow */}
      <SplideSlide>
        <div className="w-full h-full flex flex-col overflow-y-auto">
          <Slideshow />
        </div>
      </SplideSlide>

      {/* Slide 2 : Power Schedule */}
      <SplideSlide>
        <div className="w-full h-full flex flex-col overflow-y-auto">
          <PowerSchedule />
        </div>
      </SplideSlide>

      {/* Slide 3 : Announcements */}
      <SplideSlide>
        <div className="w-full h-full flex flex-col overflow-y-auto">
          <Visibility />
        </div>
      </SplideSlide>

      {/* Slide 4 : Visibility */}
      <SplideSlide>
        <div className="w-full h-full flex flex-col overflow-y-auto">
          <Announcements />
        </div>
      </SplideSlide>

      {/* Personnalisation de la pagination */}
      <div className="splide__pagination">
        <ul className="flex justify-center space-x-2">
          <li className="splide__pagination__item w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 cursor-pointer"></li>
          <li className="splide__pagination__item w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 cursor-pointer"></li>
          <li className="splide__pagination__item w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 cursor-pointer"></li>
          <li className="splide__pagination__item w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 cursor-pointer"></li>
        </ul>
      </div>
    </Splide>
  );
};

export default Page;
