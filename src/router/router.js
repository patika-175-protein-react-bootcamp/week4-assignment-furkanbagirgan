import React from "react";
import { Routes, Route } from "react-router-dom";
import Tour from "../pages/Tour";
import Outcome from "../pages/Outcome";
import Home from "../pages/Home";

function Router() {
  //Here, the appropriate component according to the link of the page is displayed on the screen.
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tour" element={<Tour />} />
      <Route path="outcome" element={<Outcome />} />
    </Routes>
  )
}

export default Router;