"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { Toaster, toast } from "sonner";
import Title from "../ui/Title";
import AddAnnounceInputs from "../ui/AddAnnounceInpunts";
import AddAnnounceButton from "../ui/AddAnnounceButton";
import { addAnnouncement } from "../lib/serverActions";

const AddAnnouncementPage = () => {
  const [formState, formAction, isPending] = useActionState(
    addAnnouncement,
    {}
  );

  // Handle toast notifications based on form state
  useEffect(() => {
    let toastId;

    if (isPending) {
      toastId = toast.loading("Adding your announcement... Just a moment!");
    } else if (formState.success) {
      toast.success("Announcement added successfully!", { id: toastId });
    } else if (formState.error) {
      toast.dismiss(toastId);
      formState.error.forEach((error) => toast.error(`Oops! ${error.message}`));
    }
  }, [isPending, formState]);

  return (
    <div className="flex flex-grow flex-col">
      <Title title="Announces" />
      <form action={formAction} className="flex flex-grow flex-col">
        <AddAnnounceInputs />
        <AddAnnounceButton isPending={isPending} formState={formState} />
      </form>

      <Toaster theme="dark" richColors position="top-center" expand />
    </div>
  );
};

export default AddAnnouncementPage;
