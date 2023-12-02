import React from "react";
import { Route, Routes } from "react-router-dom";
import EditContact from "./EditContact";
import List from "./List";
import Details from "./Details";
import AddNewContact from "./AddNewContact";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<List />} />
        <Route path={"/addcontacts"} element={<AddNewContact />} />
        <Route path={"/detailscontact/:id"} element={<Details />} />
        <Route path={"/editcontact/:id"} element={<EditContact />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;