import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import logo from "../../assets/logo.png";
import brandImage from "../../assets/quco.png";
import { RiDashboardFill, RiFileList3Fill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaClipboardList, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsClipboard2CheckFill } from "react-icons/bs";
import Swal from "sweetalert2";

function SideNav({ isOpen, toggleSideNav }) {
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const getIcon = (icon, highlightedIcon, routes) => {
    const currentRoute = location.pathname.split("/").pop();
    return routes.includes(currentRoute) ? highlightedIcon : icon;
  };

  const isActiveTab = (route) => location.pathname.startsWith(route);

  const Menus = [
    { title: "Dashboard", path: "/main/dashboard", icon: <RiDashboardFill /> },
    {
      title: "Admin",
      icon: <MdAdminPanelSettings />,
      submenu: true,
      submenuItems: [
        { title: "Permissions", path: "/main/permissions" },
        { title: "Users", path: "/main/users" },
      ],
    },
    {
      title: "Product",
      icon: <FaBoxOpen />,
      submenu: true,
      submenuItems: [
        { title: "Product Master", path: "/main/product-master" },
        { title: "Add Products", path: "/main/add-products" },
      ],
    },
    {
      title: "Purchase Order",
      icon: <FaClipboardList />,
      submenu: true,
      submenuItems: [
        { title: "With Po", path: "/main/withpo" },
        { title: "Without Po", path: "/main/withoutpo" },
      ],
    },
    {
      title: "Stock",
      icon: <BsClipboard2CheckFill />,
      submenu: true,
      submenuItems: [
        { title: "Stock In", path: "/main/stock-in" },
        { title: "Stock Out", path: "/main/stock-out" },
      ],
    },
    { title: "Report", path: "/main/report", icon: <RiFileList3Fill /> },
    { title: "Profile", path: "/main/profile", icon: <FaUser /> },
    { title: "Logout", icon: <FaSignOutAlt /> },
  ];

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the actual logout logic here (e.g., clear user session)
        console.log("Logout confirmed");

        // Navigate to the login page
        navigate("/login");
      }
    });
  };

  const handleIconClick = () => {
    if (!isOpen) {
      toggleSideNav();
    }
  };

  return (
    <div
      className={`bg-black min-h-screen p-5 duration-300 ${
        isOpen ? "w-56" : "w-20"
      }`}
    >
      <div className="inline-flex">
        <img
          alt="logo"
          src={logo}
          className={`bg-amber-50 rounded cursor-pointer block float-left duration-500 ${
            !isOpen && "rotate-180"
          }`}
          onClick={toggleSideNav}
        />
        <img
          alt="brand"
          src={brandImage}
          className={`h-8 w-auto duration-300 ${!isOpen && "scale-0"}`}
        />
      </div>

      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <div key={index}>
            <NavLink
              to={menu.path || "#"}
              className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-5 h-12 ${
                isActiveTab(menu.path)
                  ? "bg-[#EEBBC3]"
                  : "hover:bg-[#374151] hover:text-gray-300"
              }`}
              onClick={() => {
                if (menu.title === "Logout") {
                  handleLogoutClick();
                } else if (menu.submenu) {
                  toggleSubmenu(index);
                }
              }}
            >
              <span
                className="text-lg flex items-center justify-center h-full"
                onClick={handleIconClick}
              >
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span
                className={`text-base font-medium flex-1 duration-200 ${
                  !isOpen && "hidden"
                }`}
              >
                {menu.title}
              </span>
              {menu.submenu && isOpen && (
                <BsChevronDown
                  className={`${submenuOpen === index ? "rotate-180" : ""}`}
                />
              )}
            </NavLink>
            {menu.submenu && submenuOpen === index && isOpen && (
              <ul>
                {menu.submenuItems.map((submenuItem, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={submenuItem.path}
                    className={({ isActive }) =>
                      `text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-8 rounded-md ${
                        isActive ? 'bg-[#EEBBC3]' : 'hover:bg-[#374151]'
                      }`
                    }
                  >
                    {submenuItem.title}
                  </NavLink>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;
