import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { getAnnouncements } from "../../../lib/getAnnouncements";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import TransitionManager from "../../../lib/TransitionManager";
import Title from "../../Title";

const splideOptions = {
  direction: "ltr",
  rewind: true,
  arrows: false,
  pagination: true,
  autoplay: false,
  wheel: true,
  waitForTransition: true,
  wheelMinThreshold: 50,
  speed: 1000,
  gap: "32px",
};
const panelsDisplayDuration = [10000, 10000]; // Duration for each panel
const transitionManager = new TransitionManager();

const Announce = () => {
  const [announcements, setAnnouncements] = useState([]);

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
    handleSlideMove(splideRef.current.splide, 0);
    return () => transitionManager.resetTimer(timerRef); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const updateAnnouncements = async () => {
      let actualAnnouncements = await getAnnouncements();
      setAnnouncements(actualAnnouncements);
    };

    updateAnnouncements();
    const interval = setInterval(updateAnnouncements, 5000);

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <Title title="Announcements" />
      <Splide
        ref={splideRef}
        options={splideOptions}
        onMoved={handleSlideMove} // Only trigger timer on slide move
        // onMounted={handleSlideMove}
        className="flex flex-col flex-grow"
      >
        {announcements.map((announcement) => (
          <SplideSlide
            key={announcement.announcement_id}
            className="bg-secondary-blue rounded-3xl flex flex-col flex-grow space-y-8 p-8 mb-8"
          >
            <div>{announcement.title}</div>
            <div className="rounded bg-transparent flex-grow">
              {announcement.body}
            </div>
            <div className="rounded bg-transparent text-right">
              {announcement.author}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Announce;
