"use client";

import { useState } from "react";

const AddAnnouncementForm = ({ formData, setFormData, handleSubmit }) => {
  const { title, description, author } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title here..."
        value={title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description here..."
        value={description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author here..."
        value={author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
      />
      <button type="submit">Add this new announcement</button>
    </form>
  );
};

const AddAnnouncementPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ title: "", description: "", author: "" });
  };

  return (
    <>
      <h1>Announcements</h1>
      <AddAnnouncementForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddAnnouncementPage;
