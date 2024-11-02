"use client";

import Title from "../ui/Title";
import AddAnnounceInputs from "../ui/AddAnnounceInpunts";
import AddAnnounceButton from "../ui/AddAnnounceButton";
import { addAnnouncement } from "../lib/serverActions";

const AddAnnouncementPage = () => {
  return (
    <>
      <Title title="Announces" />
      <form
        action={addAnnouncement}
        className="text-5xl space-y-4 flex flex-grow flex-col"
      >
        <AddAnnounceInputs />
        <AddAnnounceButton />
      </form>
    </>
  );
};

export default AddAnnouncementPage;
