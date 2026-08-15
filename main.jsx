import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/*
  window.storage shim
  --------------------
  The original component was built for an environment that provides a
  window.storage API backed by a hosted key-value store. For a normal
  website deploy there's no such backend, so this shim reimplements the
  same get/set/delete/list interface using the visitor's own browser
  localStorage instead.

  Important limitation: data saved this way (student accounts, enquiry
  form submissions) lives only in that one visitor's browser. It is NOT
  shared across devices and is NOT visible to you as the site owner.
  It's fine for a demo or MVP, but for a real production site you'll
  want to swap this out for a real backend — see the deployment guide
  for suggestions (Firebase, Supabase, or a simple API).
*/
window.storage = {
  async get(key) {
    const raw = localStorage.getItem(key);
    if (raw === null) throw new Error("Key not found: " + key);
    return { key, value: raw, shared: false };
  },
  async set(key, value) {
    localStorage.setItem(key, value);
    return { key, value, shared: false };
  },
  async delete(key) {
    localStorage.removeItem(key);
    return { key, deleted: true, shared: false };
  },
  async list(prefix) {
    const keys = Object.keys(localStorage).filter((k) => !prefix || k.startsWith(prefix));
    return { keys, prefix, shared: false };
  },
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
