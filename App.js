import React from "react";
import Routes from "./navigation/Routes.js";
import { AuthProvider } from "./contexts/AuthProvider.js";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
