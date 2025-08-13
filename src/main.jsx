import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import "./index.css";

const client = new ApolloClient({
  uri: "https://snowtooth.moonhighway.com/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
