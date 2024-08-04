import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const Main = () => {
  const [sideNavOpen, setSideNavOpen] = useState(true); // State to manage SideNav visibility
  const location = useLocation();

  const formattedRoute =
    location.pathname
      .split("/")
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" > ");

  return (
    <div className="flex h-screen">
      {/* Vertical Navbar */}
      <div
        className={`fixed h-full bg-gray-200 duration-300 ${sideNavOpen ? "w-56" : "w-20"}`}
      >
        <SideNav isOpen={sideNavOpen} toggleSideNav={() => setSideNavOpen(!sideNavOpen)} />
      </div>

      {/* Content Area */}
      <div
        className={`flex flex-col flex-grow duration-300 ${sideNavOpen ? "ml-56" : "ml-20"}`}
      >
        {/* Horizontal Navbar */}
        <TopNav />

        {/* Route Breadcrumb */}
        <span className="p-4 text-sm text-start font-light">
          {formattedRoute.substring(2)}
        </span>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto pb-5">
          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
