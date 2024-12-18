import { useState } from "react";

import DeleteAnnouncementButton from "./DeleteAnnouncementButton";
import AnnouncementBodyInput from "../add/inputs/AnnouncementBodyInput";
import AnnouncementAuthorInput from "../add/inputs/AnnouncementAuthorInput";
import AnnouncementTitleInput from "../add/inputs/AnnouncementTitleInput";

const DeleteAnnouncementForm = ({ announcement }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <>
      {/* <Toaster theme="dark" richColors position="top-center" expand /> */}

      <form className="flex flex-grow flex-col">
        <div className="bg-secondary-blue flex flex-col flex-grow rounded-3xl space-y-8 p-8 mb-8">
          <AnnouncementTitleInput
            value={announcement.title}
            onChange={setTitle}
          />
          <AnnouncementBodyInput value={announcement.body} onChange={setBody} />
          <AnnouncementAuthorInput
            value={announcement.author}
            onChange={setAuthor}
          />
        </div>
        <DeleteAnnouncementButton
          announcementId={announcement.announcement_id}
        />
      </form>
    </>
  );
};

export default DeleteAnnouncementForm;
