import React from "react";
import Providers from "./app/providers";
import "./styles/globals.css";
import "./styles/variables.css";

/**
 * App — root entry point.
 * Delegates everything to <Providers> which sets up Redux + Router.
 * Keep this file as minimal as possible.
 */
const App = () => <Providers />;

export default App;
