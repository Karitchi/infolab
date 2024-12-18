"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VisibilityPage from "../visibility/page";
import AddAnnouncementPage from "../announcements/page";

const splideOptions = {
  direction: "ltr",
  rewind: true,
  arrows: false,
  pagination: false,
  autoplay: false,
  wheel: true,
  waitForTransition: true,
  wheelMinThreshold: 50,
  speed: 1000,
};

const AdminPage = () => {
  return (
    <Splide options={splideOptions}>
      <SplideSlide className="p-8 flex flex-grow">
        <AddAnnouncementPage />
      </SplideSlide>
      <SplideSlide className="p-8">
        <VisibilityPage />
      </SplideSlide>
    </Splide>
  );
};

export default AdminPage;
