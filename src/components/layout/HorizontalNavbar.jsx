// import React from "react";
// import { useLocation } from "react-router-dom"; // Import useLocation hook
// import profile from "../../assets/profile-image.png";
// import logoutIcon from "../../assets/logout-icon.svg";

// const HorizontalNavbar = () => {
//   const location = useLocation(); // Get the current location

  
//    const routeNames = {
//     "/main/dashboard": "Dashboard",
//     "/main/permissions": "Permissions",
//     "/main/users": "Users",
//     "/main/product-master": "Product Master",
//     "/main/add-products": "Add Products",
//     "/main/stock-in": "Stock In",
//     "/main/stock-out": "Stock Out",
//     "/main/withpo": "With PO",
//     "/main/withoutpo": "Without PO",
//     "/main/report": "Reports",
//     "/main/profile": "Profile",
   
//   };

//   // Function to extract route name from pathname
//   const getRouteName = () => {
//     const path = location.pathname;
//     // Extract last segment from pathname
//     const segments = path.split("/").filter(Boolean); // Split path by '/' and remove empty segments
//     const lastSegment = segments.pop(); // Get the last segment
//     // Capitalize first letter of last segment
//     return routeNames[path] || (lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : "Dashboard");
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center py-4 px-10 bg-black h-16">
//         <div className="py-2 rounded-full flex relative">
//           <h1 className="text-4xl font-medium text-white">{getRouteName()}</h1> {/* Display dynamically */}
//         </div>
//         <div className="flex items-center">
//           <img
//             className="h-8 w-8 rounded-full mr-4 cursor-pointer hover:scale-105 ease-in-out duration-300"
//             src={profile}
//             alt="Profile"
//           />
//           <div className="flex ml-2 cursor-pointer hover:scale-105 ease-in-out duration-300">
//             <h1 className="text-lg text-white mr-1">Logout</h1>
//             <img
//               className="h-5 w-5 mr-4 mt-1"
//               src={logoutIcon}
//               alt="Profile"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HorizontalNavbar;
