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
  autoplay: false, // Control transitions manually
  wheel: true,
  waitForTransition: true,
  wheelMinThreshold: 50,
  speed: 1000
};

const panelsDisplayDuration = [10000, 10000]; // Duration for each panel

const Slideshow = () => {
  const transitionManager = new TransitionManager();
  const timerRef = useRef(null); // Store the timer ID
  const splideRef = useRef(null); // Reference to the Splide instance


  // Function to start/reset the global timer
  const startTimer = (newIndex) => {
    // Clear the previous timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start a new timer and store its ID
    timerRef.current = setTimeout(async () => {
      transitionManager.scroll(splideRef.current); // Move to the next slide
    }, panelsDisplayDuration[newIndex]);
  };

  // Function to handle slide transition
  const handleSlideMove = (Splide, newIndex) => {
    startTimer(newIndex); // Start/reset the timer based on the new slide index
  };

  // Start the timer after the component has mounted
  useEffect(() => {
    const initialSlideIndex = 0; // Start from the first slide
    startTimer(initialSlideIndex);

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Splide
      ref={splideRef} // Store reference to Splide instance
      options={splideOptions}
      onMoved={handleSlideMove}
    >
      <SplideSlide>
        <Weather />
      </SplideSlide>
      <SplideSlide>
        <Schedule />
      </SplideSlide>
    </Splide>
  );
};

export default Slideshow;
