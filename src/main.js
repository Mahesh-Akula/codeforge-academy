import React from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  React.createElement(
    "main",
    null,
    React.createElement("h1", null, "Codeforge Academy"),
    React.createElement(
      "p",
      null,
      "Learn to build software. Get hired doing it.",
    ),
  ),
);
