diff --git a/app/admin/page.jsx b/app/admin/page.jsx
index 786e410..80fec56 100644
--- a/app/admin/page.jsx
+++ b/app/admin/page.jsx
@@ -4,10 +4,10 @@ import AddAnnouncementForm from "../ui/AddAnnouncementForm";
 
 const AddAnnouncementPage = () => {
   return (
-    <>
+    <div className="flex flex-col">
       <h1>Announcements</h1>
       <AddAnnouncementForm />
-    </>
+    </div>
   );
 };
 
diff --git a/app/globals.css b/app/globals.css
index 13d40b8..08cda9a 100644
--- a/app/globals.css
+++ b/app/globals.css
@@ -2,26 +2,6 @@
 @tailwind components;
 @tailwind utilities;
 
-:root {
-  --background: #ffffff;
-  --foreground: #171717;
-}
-
-@media (prefers-color-scheme: dark) {
-  :root {
-    --background: #0a0a0a;
-    --foreground: #ededed;
-  }
-}
-
 body {
-  color: var(--foreground);
-  background: var(--background);
-  font-family: Arial, Helvetica, sans-serif;
-}
-
-@layer utilities {
-  .text-balance {
-    text-wrap: balance;
-  }
+  @apply bg-gradient-to-b from-[#091925] to-[#275173] text-white min-h-screen p-5;
 }
diff --git a/app/ui/AddAnnouncementForm.jsx b/app/ui/AddAnnouncementForm.jsx
index dfdb704..b6c4c82 100644
--- a/app/ui/AddAnnouncementForm.jsx
+++ b/app/ui/AddAnnouncementForm.jsx
@@ -2,11 +2,42 @@ import { addAnnouncement } from "../lib/serverActions";
 
 const AddAnnouncementForm = () => {
   return (
-    <form action={addAnnouncement}>
-      <input name="title" type="text" placeholder="Title here..." required />
-      <textarea name="body" placeholder="Description here..." required />
-      <input name="author" type="text" placeholder="Author here..." required />
-      <button type="submit">Add this new announcement</button>
+    <form
+      action={addAnnouncement}
+      className="flex flex-col space-y-4 w-full h-full flex-grow"
+    >
+      <div
+        className="flex flex-col space-y-2 rounded-lg h-full p-4"
+        style={{ backgroundColor: "#172937" }}
+      >
+        <input
+          name="title"
+          type="text"
+          placeholder="Title here..."
+          required
+          className="p-2 rounded bg-transparent focus:outline-none border border-gray-600"
+        />
+        <textarea
+          name="body"
+          placeholder="Description here..."
+          required
+          className="p-2 rounded h-full bg-transparent focus:outline-none flex-1 border border-gray-600 resize-none"
+        />
+        <input
+          name="author"
+          type="text"
+          placeholder="Author here..."
+          required
+          className="p-2 rounded bg-transparent focus:outline-none border border-gray-600"
+        />
+      </div>
+      <button
+        type="submit"
+        className="p-2 rounded-lg w-full"
+        style={{ backgroundColor: "#172937" }}
+      >
+        Add this new announcement
+      </button>
     </form>
   );
 };
diff --git a/tailwind.config.js b/tailwind.config.js
index af99692..cf5c154 100644
--- a/tailwind.config.js
+++ b/tailwind.config.js
@@ -5,13 +5,5 @@ module.exports = {
     "./components/**/*.{js,ts,jsx,tsx,mdx}",
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
-  theme: {
-    extend: {
-      colors: {
-        background: "var(--background)",
-        foreground: "var(--foreground)",
-      },
-    },
-  },
   plugins: [],
 };
