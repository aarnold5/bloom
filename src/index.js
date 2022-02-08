import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './style.scss';
import Invoices from "./invoices";
import App from "./app";
// eslint-disable-next-line no-unused-vars


const rootElement = document.getElementById("main");
render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>,
  rootElement);

