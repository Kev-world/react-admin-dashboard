import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n/config";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </I18nextProvider>
);
