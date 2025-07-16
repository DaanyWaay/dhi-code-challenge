import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorPage } from "./common/pages/ErrorPage/ErrorPage.tsx";
import { LandingPage } from "./common/pages/LandingPage/LandingPage.tsx";
import "./index.css";
import { MainPage } from "./modules/map/pages/MainPage.tsx/MainPage.tsx";
import { MapPage } from "./modules/map/pages/MapPage.tsx";
import { TestPage, TestPageDetails } from "./modules/map/pages/TestPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<LandingPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="test" element={<TestPage />}>
            <Route path=":testid" element={<TestPageDetails />} />
          </Route>
          ♦ <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
