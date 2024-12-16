"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import AdminAnnouncementPage from "../ui/AdminAnnouncementPage";

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
      <SplideSlide className="flex flex-grow">
        <AdminAnnouncementPage />
      </SplideSlide>
      <SplideSlide>
        <h1>hello2</h1>
      </SplideSlide>
    </Splide>
  );
};

export default AdminPage;
