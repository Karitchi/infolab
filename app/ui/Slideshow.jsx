"use client";

import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import TransitionManager from "../lib/TransitionManager";

import Weather from "./Weather";
import Schedule from "./Schedule";
import SoundData from "@/app/ui/SoundData";

const splideOptions = {
  direction: "ttb",
  rewind: true,
  height: "100vh",
  arrows: false,
  pagination: false,
  autoplay: false,
  wheel: true,
  waitForTransition: true,
  wheelMinThreshold: 50,
  speed: 1000,
};

const panelsDisplayDuration = [10000, 10000]; // Duration for each panel

const transitionManager = new TransitionManager();

const Slideshow = () => {
  const splideRef = useRef(null);
  const timerRef = useRef(null);

  const handleSlideMove = async (Splide, slideIndex = 0) => {
    transitionManager.resetTimer(timerRef);
    timerRef.current = await transitionManager.startTimer(
      timerRef,
      slideIndex,
      panelsDisplayDuration,
    );
    transitionManager.scroll(Splide);
  };

  useEffect(() => {
    return () => transitionManager.resetTimer(timerRef); // Cleanup timer on unmount
  }, []);

  return (
    <Splide
      ref={splideRef}
      options={splideOptions}
      onMoved={handleSlideMove} // Only trigger timer on slide move
      onMounted={handleSlideMove}
    >
      <SplideSlide>
        <Weather />
      </SplideSlide>
      <SplideSlide>
        <Schedule />
      </SplideSlide>
      <SplideSlide>
        <SoundData />
      </SplideSlide>
    </Splide>
  );
};

export default Slideshow;
