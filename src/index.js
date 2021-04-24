import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import "./globals.css";

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
