import React, { useEffect, useState } from "react";
import permissionUserIcon from "../../assets/permission-user-icon.svg";
import { FcDepartment } from "react-icons/fc";
import editIcon from "../../assets/edit-icon.svg";
import TopLayer from "../shared/TopLayer";
import plusIcon from "../../assets/add-icon.svg";
import profileImage from "../../assets/profile-image.png";
import closeIcon from "../../assets/close-modal-icon.svg";
import addUserIcon from "../../assets/add-users-icon.svg";
import apiService from "../../apiService";
import { CiEdit } from "react-icons/ci";
import deleteIcon from "../../assets/delete-icon.svg";
import tickIcon from "../../assets/tick-icon.svg";
import { TbLockAccess } from "react-icons/tb";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Permission = () => {
  const [tooltipStates, setTooltipStates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [addModuleModalVisible, setAddModuleModalVisible] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [department, setDepartment] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     full_name: "John Doe",
  //     department: "Sales",
  //     phone: "9234567890",
  //     is_admin: true,
  //     module_access: { create: true, read: true, edit: true, delete: true },
  //   },
  //   {
  //     id: 2,
  //     full_name: "Jane Smith",
  //     department: "HR",
  //     phone: "8876543210",
  //     is_admin: false,
  //     module_access: { create: false, read: true, edit: true, delete: false },
  //   },
  //   {
  //     id: 3,
  //     full_name: "Michael Johnson",
  //     department: "IT",
  //     phone: "9551234567",
  //     is_admin: false,
  //     module_access: { create: true, read: true, edit: false, delete: false },
  //   },
  // ]);

  const [users, setUsers] = useState([]);

 
  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await apiService.get(`/users/depart/${1}`);
      if (response.status === 200) {
        setDepartment(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching Modles:", error);
    }
  };

   // Fetch users based on department
   const fetchUsers = async (departmentId) => {
    try {
      const response = await apiService.get(`/users/dept/${departmentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);



  const bgColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-maroon-500",
  ];

  const showToolTip = (e, permission) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipStates((prevState) => ({
      ...prevState,
      [permission]: {
        visible: true,
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      },
    }));
  };

  const hideToolTip = () => {
    setTooltipStates({});
  };

  const handleDelete = (userData) => {};

  const openEditModal = (user) => {
    setModalData(user);
    // setSelectedPermission(user.full_name); // Display user's name as modal title
    setIsModalOpen(true);
  };

  const handleSaveClick = () => {
    // Update the users state with the modified data
    const updatedUsers = users.map((user) =>
      user.id === modalData.id ? modalData : user
    );

    // Update state
    setUsers(updatedUsers);

    // Close the modal
    setIsModalOpen(false);
  };

  const permissions = [
    "ADMIN",
    "PURCHASE ORDER",
    "STOCK IN",
    "STOCK OUT",
    "PRODUCT MASTER",
    "REPORTS",
  ];

 

  // const openModal = (e, permission) => {
  //   const rect = e.target.getBoundingClientRect();
  //   setSelectedPermission(permission);
  //   setModalPosition({
  //     top: rect.bottom + window.scrollY,
  //     left: rect.left + window.scrollX,
  //   });
  //   setModalVisible(true);
  //   // Filter users based on the clicked permission
  //   const usersWithPermission = users.filter((user) =>
  //     user.permissions.includes(permission)
  //   );
  //   setUsers(usersWithPermission);
  // };

  const openDeptModal = (dept) => {
    setSelectedPermission(dept.departmentName);
    setModalVisible(true);
    fetchUsers(dept.id); // Fetch users when a department is clicked
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPermission(null);
  };

  const openAddModuleModal = () => {
    setAddModuleModalVisible(true);
  };

  const closeAddModuleModal = () => {
    setAddModuleModalVisible(false);
  };

  const addNewModule = async () => {
    try {
      const response = await apiService.post(
        "/users/newDepartment",
        { departmentName: departmentName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        setDepartmentName("");
        setSuccessMessage("Module added successfully.");
        setErrorMessage("");
        fetchDepartments();

        // Clear messages after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Module already exists.");

        // Clear messages after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 5000);
      } else {
        setErrorMessage("Error adding brand.");

        // Clear messages after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 5000);
      }
      setSuccessMessage("");
    }
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  return (
    <>
      <TopLayer
        isAddButton={true}
        addButtonText="Add Module"
        addButtonIcon={plusIcon}
        onAddButtonClick={openAddModuleModal}
      />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4 px-6">
        {department.map((dept, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg p-4 border bg-white relative cursor-pointer"
            onClick={() => openDeptModal(dept)}
          >
            <div className="flex items-center mb-10 relative">
              <div className="flex-1 text-lg font-medium ml-1 cursor-pointer">
                {dept.departmentName}
              </div>
            </div>
            {/* Add other UI elements here */}
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-4/5 h-4/5 max-w-4xl max-h-[85vh]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                {" "}
                Department: {selectedPermission}
              </h2>
              <button onClick={closeModal} className="text-2xl font-bold">
                &times;
              </button>
            </div>
            <div className="mt-4 flex flex-col h-full">
              <div className="mt-3 overflow-y-auto flex-grow pb-5">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 w-full">
                    <tr>
                      <th className="px-6 py-2 text-center text-md font-medium text-black uppercase w-20">
                        Si No
                      </th>
                      <th className="px-6 py-2 text-left text-md font-medium text-black uppercase w-64">
                        User Name
                      </th>
                      <th className="px-6 py-2 text-left text-md font-medium text-black uppercase">
                        Module Access
                      </th>
                      <th className="px-6 py-2 text-center text-md font-medium text-black uppercase w-40">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((row, index) => (
                      <tr key={row.id} style={{ maxHeight: "50px" }}>
                        <td className="px-2 py-2 whitespace-nowrap text-md text-center text-black w-20">
                          {index + 1}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-md text-left text-black w-64">
                          {row.full_name}
                        </td>
                        <td className="px-6 py-2 text-left text-lg font-medium text-black flex items-center gap-2">
                          {row.module_access.create && (
                            <span className="p-2 bg-green-200 text-black rounded-md font-semibold text-xs">
                              Create
                            </span>
                          )}
                          {row.module_access.read && (
                            <span className="p-2 bg-blue-200 text-black rounded-md font-semibold text-xs">
                              Read
                            </span>
                          )}
                          {row.module_access.edit && (
                            <span className="p-2 bg-yellow-200 text-black rounded-md font-semibold text-xs">
                              Edit
                            </span>
                          )}
                          {row.module_access.delete && (
                            <span className="p-2 bg-red-200 text-black rounded-md font-semibold text-xs">
                              Delete
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap text-md text-center text-black w-40">
                          <button
                            onClick={() => openEditModal(row)}
                            className="text-blue-500 text-center"
                          >
                            <CiEdit color="black" className="h-6 w-7" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isModalOpen && modalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-4 sm:mx-6 lg:mx-8 max-h-[85vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">
                        Department: {selectedPermission}
                      </h2>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                      >
                        &times;
                      </button>
                    </div>
                    <form>
                      <div className="flex justify-between gap-4 mb-6">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            User Name
                          </label>
                          <input
                            type="text"
                            name="full_name"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                            value={modalData.full_name}
                            readOnly
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phone"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                            value={modalData.phone}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Module Access
                        </label>
                        <div className="space-y-4">
                          {["create", "read", "edit", "delete"].map(
                            (accessType) => (
                              <div
                                key={accessType}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                  {accessType}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={
                                      modalData.module_access[accessType]
                                    }
                                    onChange={() =>
                                      setModalData({
                                        ...modalData,
                                        module_access: {
                                          ...modalData.module_access,
                                          [accessType]:
                                            !modalData.module_access[
                                              accessType
                                            ],
                                        },
                                      })
                                    }
                                  />
                                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500  relative">
                                    <div
                                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                        modalData.module_access[accessType]
                                          ? "translate-x-5"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveClick(modalData.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {addModuleModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeAddModuleModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md lg:max-w-lg px-6 py-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Module</h2>
              <button className="cursor-pointer" onClick={closeAddModuleModal}>
                <img src={closeIcon} alt="Close" className="h-6 w-6" />
              </button>
            </div>
            <hr className="w-full mb-4" />
            <div className="flex flex-col items-center">
              <input
                className="bg-gray-200 rounded w-full max-w-sm py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline mb-5 text-lg"
                type="text"
                placeholder="Enter module name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
              {successMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 w-full max-w-sm">
                  <p>{successMessage}</p>
                </div>
              )}
              {errorMessage && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 w-full max-w-sm">
                  <p>{errorMessage}</p>
                </div>
              )}
              <button
                className="bg-sky-600 w-full max-w-sm py-3 text-white rounded-lg font-bold text-lg"
                onClick={addNewModule}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Permission;
