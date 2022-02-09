import React from "react";
// eslint-disable-next-line no-unused-vars
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./Components/home-page";
import TutorialPage from "./Components/tutorial-page";
//import {Welcome, About} from "./index";


export default function App() {
    return (
      <div>
        <Routes>
        <Route path="/" element={<HomePage />}>
        <Route path="/tutorial" element={<TutorialPage />}/>
        </Route>
        </Routes>
          
      </div>
    );
  }

