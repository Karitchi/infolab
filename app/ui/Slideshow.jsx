'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import Panel1 from './Panel1';
import Panel2 from './Panel2';
import Panel3 from './Panel3';
import Home from './Home';

export default Slideshow => {
  return (
    <Splide
      options={{
        direction: 'ttb',
        rewind: true,
        height: '100vh',
        arrows: false,    // Hide navigation arrows
        pagination: false, // Hide pagination dots
        // autoplay: true,    // Enable automatic cycling
        // interval: 5000,    // Time between transitions (in ms)
        wheel: true,       // Enable mousewheel control
        // waitForTransition: true,
      }}
    >
      <SplideSlide>
        <Panel1 />
      </SplideSlide>
      <SplideSlide>
        <Panel2 />
      </SplideSlide>
      <SplideSlide>
        <Panel3 />
      </SplideSlide>
      <SplideSlide>
        <Home />
      </SplideSlide>
    </Splide>
  );
};
