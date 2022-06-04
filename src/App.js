import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./pages/Hello/hello";
import TableContent from "./components/TableContent/table";
import Navbar from "./components/Navbar/index";
import PieChartData from "./components/PieChart/piechart";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Hello />} />
        <Route path="table" element={<TableContent />} />
        <Route path="PieChartData" element={<PieChartData />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
