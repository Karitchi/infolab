"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useEffect, useRef, useState } from "react";

import { fetchComponentVisibility } from "@/app/lib/serverActionVisibility";
import Announce from "./announcements/display/AnnouncementsDisplay";
import Schedule from "./Schedule";
import Weather from "./Weather";

const splideOptions = {
  direction: "ttb",
  rewind: true,
  height: "100%",
  arrows: false,
  pagination: false,
  autoplay: true,
  wheel: true,
  waitForTransition: true,
  wheelMinThreshold: 50,
  speed: 1000,
};

const defaultDisplayDuration = 10000;

const Slideshow = () => {
  const splideRef = useRef(null);
  const timerRef = useRef(null);
  const [components, setComponents] = useState([]);

  const fetchVisibility = async () => {
    try {
      const result = await fetchComponentVisibility();
      const orderedComponents = result
        .filter((component) => component.is_visible)
        .sort((a, b) => a.order_index - b.order_index);
      setComponents(orderedComponents);
    } catch (error) {
      console.error("Error fetching component visibility:", error);
    }
  };

  const startTimer = (splideInstance, slideIndex = 0) => {
    if (!splideInstance) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const duration = defaultDisplayDuration;

    timerRef.current = setTimeout(() => {
      splideInstance.go("+1");
    }, duration);
  };

  useEffect(() => {
    fetchVisibility();
    const interval = setInterval(fetchVisibility, 15000);

    const splideInstance = splideRef.current?.splide;

    if (splideInstance) {
      const onMounted = () => {
        console.log("Splide mounted");
        startTimer(splideInstance, 0);
      };

      const onMoved = (newIndex) => {
        console.log(`Slide moved to index ${newIndex}`);
        startTimer(splideInstance, newIndex);
      };

      splideInstance.on("mounted", onMounted);
      splideInstance.on("moved", onMoved);

      return () => {
        splideInstance.off("mounted", onMounted);
        splideInstance.off("moved", onMoved);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <Splide ref={splideRef} options={splideOptions}>
      {components.map(({ component_name }) => {
        if (component_name === "Weather") {
          return (
            <SplideSlide key={component_name} className="p-8 flex flex-grow">
              <Weather />
            </SplideSlide>
          );
        }
        if (component_name === "Announce") {
          return (
            <SplideSlide key={component_name} className="p-8 flex flex-grow">
              <Announce />
            </SplideSlide>
          );
        }
        if (component_name === "Schedule") {
          return (
            <SplideSlide key={component_name} className="p-8 flex flex-grow">
              <Schedule />
            </SplideSlide>
          );
        }
        return null;
      })}
    </Splide>
  );
};

export default Slideshow;
