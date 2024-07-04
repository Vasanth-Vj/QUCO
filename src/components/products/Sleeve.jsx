import React, { useState, useEffect } from "react";
import editIcon from "../../assets/edit-icon.svg";
import toggleActiveIcon from "../../assets/toggle-active.svg";
import toggleInactiveIcon from "../../assets/toggle-inactive.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import leftArrowIcon from "../../assets/left-arrow-icon.svg";
import rightArrowIcon from "../../assets/right-arrow-icon.svg";
import tickIcon from "../../assets/tick-icon.svg";
import closeIcon from "../../assets/close-modal-icon.svg";
import excelIcon from "../../assets/excel-icon.svg";
import apiService from "../../apiService";

const Sleeve = ({ searchQuery, isModalOpen, onClose }) => {
  // const [data, setData] = useState([
  // { id: 1, sleeve: 'Round sleeve', status: 'active' },
  // { id: 2, sleeve: 'V sleeve', status: 'inactive' },
  // { id: 3, sleeve: 'Tight collar', status: 'active' },
  // { id: 4, sleeve: 'cut', status: 'inactive' },
  // { id: 5, sleeve: 'loose', status: 'active' },
  // { id: 6, sleeve: 'Jersey', status: 'inactive' },
  // { id: 7, sleeve: 'Jersey', status: 'active' },
  // { id: 8, sleeve: 'Jersey', status: 'inactive' },
  // { id: 9, sleeve: 'Jersey', status: 'active' },
  // { id: 10, sleeve: 'Jersey', status: 'inactive' },
  // { id: 11, sleeve: 'Jersey', status: 'active' },
  // { id: 12, sleeve: 'Jersey', status: 'inactive' },
  // ]);
  const [data, setData] = useState([]);
  const [sleeve, setSleeve] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [checkedIds, setCheckedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [addedStyles, setAddedStyles] = useState([]);
  const [singleSleeves, setSingleSleeves] = useState("");

  useEffect(() => {
    fetchAllSleeves();
  }, []);

  const fetchAllSleeves = async () => {
    try {
      const response = await apiService.get("/sleeves/getall");
      console.log(response.data);
      setData(response.data); // Assuming response.data contains an array of brands
    } catch (error) {
      console.error("Error fetching sleeves:", error);
      setSleeve([]); // Handle error as needed
    }
  };
  const handleStatusToggle = async ({ id, isActive }) => {
    try {
      const response = await apiService.put(`/sleeves/${id}`, {
        isActive: !isActive,
      });
      if (response.status === 200) {
        fetchAllSleeves();
      }
    } catch (error) {
      console.error(`Error toggling status for sleeve with ID ${id}:`, error);
      // Handle error as needed
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await apiService.get(`/sleeves/${id}`);
      const styleToUpdate = response.data;
      const updatedData = data.map((sleeve) =>
        sleeve.id === id ? styleToUpdate : sleeve
      );
      setData(updatedData);
      setEditIndex(id);
    } catch (error) {
      console.error(`Error fetching sleeve with ID ${id} for edit:`, error);
      // Handle error as needed
    }
  };

  const handleSaveClick = async (index, id) => {
    try {
      const sleeve = data.find((sleeve) => sleeve.id === id);
      await apiService.put(`/sleeves/${id}`, { Sleeve: sleeve.Sleeve });

      // Update data locally
      setData(
        data.map((sleeve) => (sleeve.id === id ? { ...sleeve } : sleeve))
      );
      setEditIndex(null);
    } catch (error) {
      console.error(`Error saving sleeve with ID ${id}:`, error);
      // Handle error as needed
    }
  };

  const handleInputChange = (e, index) => {
    const newData = [...data];
    newData[index].sleeveName = e.target.value;
    setData(newData);
  };

  const handleCheckboxChange = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = checkedIds;
      await Promise.all(
        idsToDelete.map(async (id) => {
          await apiService.delete(`/sleeves/${id}`);
        })
      );
      const newData = data.filter((row) => !checkedIds.includes(row.id));
      setData(newData);
      setCheckedIds([]);
    } catch (error) {
      console.error("Error deleting sleeves:", error);
      // Handle error as needed
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(data.length / recordsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleInputChangeModal = (e) => {
    setInputValue(e.target.value);
  };

  const handleSingleSleeve = async () => {
    try {
      const response = await apiService.post("/sleeves/create", {
        sleeveName: singleSleeves,
      });

      if (response.status === 201) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error adding sleeve:", error);
    }
  };
  const handleAddStyle = () => {
    if (inputValue.trim() !== "") {
      setAddedStyles([...addedStyles, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveStyle = (index) => {
    const newAddedStyles = [...addedStyles];
    newAddedStyles.splice(index, 1);
    setAddedStyles(newAddedStyles);
  };
  const filteredData = data.filter(
    (item) =>
      item.sleeveName &&
      item.sleeveName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className=" mx-auto p-4 bg-white">
      <div className="min-h-[60vh] max-h-[60vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 w-full">
            <tr>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-40">
                Si No
              </th>
              <th className="px-2 py-3 text-left text-md font-bold text-black uppercase w-40">
                sleeve
              </th>
              <th className="px-6 py-3 text-center text-md font-bold text-black uppercase flex-grow">
                Status
              </th>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-28">
                Action
              </th>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-20">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={(e) =>
                    setCheckedIds(
                      e.target.checked ? data.map((row) => row.id) : []
                    )
                  }
                  checked={checkedIds.length === data.length}
                />
              </th>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-8">
                <button onClick={handleDelete} className="text-red-500">
                  <img src={deleteIcon} alt="Delete" className="h-6 w-6" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData?.map((row, index) => (
              <tr key={row.id} style={{ maxHeight: "50px" }}>
                <td className="px-3 py-3 whitespace-nowrap text-md text-center text-black w-40">
                  {startIndex + index + 1}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-md text-left text-black w-40">
                  {editIndex === startIndex + index ? (
                    <input
                      type="text"
                      value={row.sleeveName}
                      onChange={(e) => handleInputChange(e, index)}
                      className="border border-gray-300 rounded-md px-2 py-2 text-left w-40"
                    />
                  ) : (
                    row.sleeveName
                  )}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-md text-center text-black flex-grow">
                  <button
                    onClick={() =>
                      handleStatusToggle({ id: row.id, isActive: row.isActive })
                    }
                    className="px-2 py-1 rounded-full"
                  >
                    <div className="flex space-x-2">
                      <span
                        className={
                          row.isActive === true
                            ? "text-green-600 w-20"
                            : "text-gray-300 w-20"
                        }
                      >
                        {row.isActive === true ? "Active" : "In-Active"}
                      </span>
                      <img
                        src={
                          row.isActive === true
                            ? toggleActiveIcon
                            : toggleInactiveIcon
                        }
                        alt="Toggle Status"
                      />
                    </div>
                  </button>
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-16">
                  {editIndex === row.id ? (
                    <button
                      onClick={() => handleSaveClick(index, row.id)}
                      className="bg-green-200 border border-green-500 px-2 py-1 rounded-lg flex"
                    >
                      <img src={tickIcon} alt="" className="mt-1 mr-2" />
                      <span className="text-xs">Update</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(row.id)}
                      className="text-blue-500 text-center"
                    >
                      <img src={editIcon} alt="Edit" className="h-6 w-6" />
                    </button>
                  )}
                </td>
                <td className="px-2 py-3 whitespace-nowrap w-12 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={checkedIds.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-md text-black">
            {recordsPerPage} records per page
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value={5}>Records per page: 5</option>
            <option value={10}>Records per page: 10</option>
            <option value={15}>Records per page: 15</option>
          </select>
          <button
            onClick={() => handlePageChange("prev")}
            className="px-2 py-1 text-md rounded-md"
          >
            <img src={leftArrowIcon} alt="Previous" />
          </button>
          <span className="text-md text-black">
            {currentPage}/{Math.ceil(data.length / recordsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            className="px-2 py-1 text-md rounded-md"
          >
            <img src={rightArrowIcon} alt="Next" />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[35vw] h-screen max-h-[50vh] overflow-y-auto lg:overflow-hidden">
            <div className="py-2 flex flex-col">
              <div>
                <div className="flex justify-center">
                  <h2 className="text-2xl font-bold">Add Sleeve</h2>
                  <button
                    className="absolute right-5 cursor-pointer"
                    onClick={onClose}
                  >
                    <img src={closeIcon} alt="Close" className="mt-2" />
                  </button>
                </div>
                <hr className="w-full mt-3" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-400 font-bold mt-10">
                  *For multiple “Sleeve” feed use enter after each values
                </p>
                <input
                  className="bg-gray-200 rounded w-80 py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline mt-5 text-lg text-center"
                  type="text"
                  placeholder="Enter sleeve"
                  value={singleSleeves}
                  onChange={(e) => setSingleSleeves(e.target.value)}
                />
                <button
                  className="bg-sky-600 w-80 py-3 text-white rounded-lg font-bold text-lg mt-3"
                  onClick={() => handleSingleSleeve()}
                >
                  Update
                </button>
                <div className="text-center mt-4">
                  <p className="flex">
                    <span>
                      <img src={excelIcon} alt="" className="w-7" />
                    </span>
                    <span className="text-sky-600 font-bold text-lg">
                      Upload From excel {"("}Bulk upload{")"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sleeve;
