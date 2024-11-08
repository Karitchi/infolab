"use client";

import Title from "../ui/Title";
import AddAnnounceInputs from "../ui/AddAnnounceInpunts";
import AddAnnounceButton from "../ui/AddAnnounceButton";
import { addAnnouncement } from "../lib/serverActions";
import { useActionState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAnnouncementPage = () => {
  const [formState, formAction, isPending] = useActionState(
    addAnnouncement,
    {}
  );

  const notify = () => toast("item added successfully!");

  return (
    <div className="flex flex-grow flex-col">
      <Title title="Announces" />
      <form action={formAction} className="flex flex-grow flex-col">
        {/* <ToastContainer /> */}
        <AddAnnounceInputs />
        {/* {isPending ? "Loading..." : formState?.success ? notify() : notify()} */}
        <AddAnnounceButton />
      </form>
    </div>
  );
};

export default AddAnnouncementPage;
