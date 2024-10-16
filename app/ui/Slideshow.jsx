'use client';

import React, { useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import Weather from './Weather';
import Schedule from './Schedule';
import { TransitionManager } from '../lib/TransitionManager';

const splideOptions = {
  direction: 'ttb',
  rewind: true,
  height: '100vh',
  arrows: false,
  pagination: false,
  autoplay: false,
  wheel: true,
  waitForTransition: true,
  wheelMinThreshold: 50,
  speed: 1000,
};

const panelsDisplayDuration = [10000, 10000]; // Duration for each panel

const Slideshow = () => {
  const transitionManager = new TransitionManager();
  const timerRef = useRef(null);
  const splideRef = useRef(null);

  const startTimer = (index) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      transitionManager.scroll(splideRef.current);
    }, panelsDisplayDuration[index]);
  };

  const handleSlideMove = (Splide, newIndex) => {
    startTimer(newIndex); // Start/reset the timer based on the new slide index
  };

  useEffect(() => {
    const initialSlideIndex = 0; // Start from the first slide
    startTimer(initialSlideIndex);

    return () => clearTimeout(timerRef.current); // Cleanup timer on unmount
  }, []);

  return (
    <Splide
      ref={splideRef}
      options={splideOptions}
      onMoved={handleSlideMove} // Only trigger timer on slide move
    >
      <SplideSlide><Weather /></SplideSlide>
      <SplideSlide><Schedule /></SplideSlide>
    </Splide>
  );
};

export default Slideshow;
