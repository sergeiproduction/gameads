import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="wrapper">
      <Header onSidebarToggle={handleSidebarToggle} />
      <Sidebar isCollapsed={sidebarCollapsed} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
