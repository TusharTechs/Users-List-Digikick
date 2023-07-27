import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./Components/UserList";
import UpdateDetails from "./Components/UpdateDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/:id" element={<UpdateDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
