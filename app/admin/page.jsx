"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import AdminAnnouncementPage from "../ui/adminPages/AdminAnnouncementPage";
import ConfigPage from "../ui/adminPages/ConfigPage";
import VisibilityPage from "../ui/adminPages/VisibilityPage";
import CalendarPage from "../ui/adminPages/CalendarPage";

const splideOptions = {
  direction: "ttb",
  rewind: true,
  height: "100%",
  arrows: true,
  pagination: false,
  autoplay: false,
  wheel: true,
  waitForTransition: false,
  wheelMinThreshold: 50,
  speed: 1000,
};

const AdminPage = () => {
  return (
    <Splide options={splideOptions}>
      <SplideSlide className="flex flex-grow flex-col">
        <AdminAnnouncementPage />
      </SplideSlide>
      <SplideSlide className="flex flex-grow flex-col">
        <ConfigPage />
      </SplideSlide>
      <SplideSlide className="flex flex-grow flex-col">
        <VisibilityPage />
      </SplideSlide>
      <SplideSlide className="flex flex-grow flex-col">
        <CalendarPage />
      </SplideSlide>
    </Splide>
  );
};

export default AdminPage;
