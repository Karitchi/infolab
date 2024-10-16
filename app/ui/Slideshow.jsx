'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import Weather from './Weather';
import Schedule from './Schedule';

export default Slideshow => {
  return (
    <Splide
      options={{
        direction: 'ttb',
        rewind: true,
        height: '100vh',
        arrows: false,    // Hide navigation arrows
        pagination: false, // Hide pagination dots
        autoplay: true,    // Enable automatic cycling
        interval: 10000,    // Time between transitions (in ms)
        wheel: true,       // Enable mousewheel control
        waitForTransition: true,
        wheelMinThreshold: 50,
      }}
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
