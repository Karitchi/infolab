"use client";

import { useEffect, useState, useRef } from "react";
import Title from "./Title";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import TransitionManager from "@/app/lib/TransitionManager";
import { getAnnouncements } from "@/app/lib/getAnnouncements";
import AddAnnouncementForm from "./announcements/add/AddAnnouncementForm";
import DeleteAnnouncementForm from "./announcements/delete/DeleteAnnouncementForm";

const splideOptions = {
  direction: "ltr",
  rewind: true,
  arrows: false,
  pagination: true,
  autoplay: false,
  wheel: true,
  wheelMinThreshold: 50,
  speed: 1000,
  gap: "32px",
};
const panelsDisplayDuration = [10000, 10000]; // Duration for each panel
const transitionManager = new TransitionManager();

const AdminAnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  const splideRef = useRef(null);
  const timerRef = useRef(null);

  const handleSlideMove = async (Splide, slideIndex = 0) => {
    transitionManager.resetTimer(timerRef);
    timerRef.current = await transitionManager.startTimer(
      timerRef,
      slideIndex,
      panelsDisplayDuration
    );
    // transitionManager.scroll(Splide);
  };

  useEffect(() => {
    return () => transitionManager.resetTimer(timerRef); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      let actualAnnouncements = await getAnnouncements();
      setAnnouncements(actualAnnouncements);
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="flex flex-grow flex-col">
      <Title title="Announces" />
      <Splide
        ref={splideRef}
        options={splideOptions}
        onMoved={handleSlideMove} // Only trigger timer on slide move
        onMounted={handleSlideMove}
        className="flex flex-col flex-grow"
      >
        <SplideSlide className="flex flex-grow flex-col">
          <AddAnnouncementForm />
        </SplideSlide>

        {announcements.map((announcement) => (
          <SplideSlide
            key={announcement.announcement_id}
            className="flex flex-grow flex-col"
          >
            <DeleteAnnouncementForm announcement={announcement} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default AdminAnnouncementPage;
