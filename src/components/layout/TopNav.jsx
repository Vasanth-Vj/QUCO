import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import profileImage from "../../assets/profile-image.png";

function TopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const location = useLocation();

  const routeNames = {
    "/main/dashboard": "Dashboard",
    "/main/permissions": "Permissions",
    "/main/users": "Users",
    "/main/product-master": "Product Master",
    "/main/add-products": "Add Products",
    "/main/stock-in": "Stock In",
    "/main/stock-out": "Stock Out",
    "/main/withpo": "With PO",
    "/main/withoutpo": "Without PO",
    "/main/report": "Reports",
    "/main/profile": "Profile",
  };

  const getRouteName = () => {
    const path = location.pathname;
    return routeNames[path] || "Dashboard";
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">{getRouteName()}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaBell className="text-gray-500 text-2xl cursor-pointer" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1 translate-x-1/2 -translate-y-1/2">
                {notificationCount}
              </span>
            )}
          </div>
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50">
                <ul>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">Profile</li>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">Settings</li>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
