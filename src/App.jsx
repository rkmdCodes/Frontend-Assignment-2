import React from "react";
import Home from "./pages/Home";
import DataProvider from "./contex/DataProvider";

const App = () => {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
};

export default App;
