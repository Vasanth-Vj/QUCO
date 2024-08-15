import { useEffect, useState } from "react";
import TopLayer from "../../shared/TopLayer";
import editIcon from "../../../assets/edit-icon.svg";
import deleteIcon from "../../../assets/delete-icon.svg";
import leftArrowIcon from "../../../assets/left-arrow-icon.svg";
import rightArrowIcon from "../../../assets/right-arrow-icon.svg";
import tickIcon from "../../../assets/tick-icon.svg";
import EditStockOutModel from "./EditstockOutModel";
import AddStockOutModel from "./AddStockOutModel";
import apiService from "../../../apiService";
import StockSelectOptionModel from "./StockSelectOptionModel";

const StockOut = () => {
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [checkedIds, setCheckedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStockOutId, setSelectedStockOutId] = useState(null);

  const fetchStockOut = async () => {
    try {
      const response = await apiService.get(`/stockOut/get/all`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.filter((item) => item.total_pcs > 0);
      // Format the created_at date
      const formattedData = response.data.map((stock) => ({
        ...stock,
        created_at: new Date(stock.created_at).toLocaleDateString("en-GB"),
      }));
      console.log(formattedData);
      setInitialData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStockOut();
  }, []);

  const handleSearch = (searchValue) => {
    const filtered = initialData.filter((item) =>
      item.purchase_order_number
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleEditClick = (id) => {
    setSelectedStockOutId(id);
    setShowModal(true);
  };

  const handleSaveClick = () => {
    setEditIndex(null);
  };

  const handleCheckboxChange = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    const newData = initialData.filter((row) => !checkedIds.includes(row.id));
    setInitialData(newData);
    setFilteredData(newData); // Also update filtered data
    setCheckedIds([]);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(filteredData.length / recordsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on changing records per page
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStockOutId(null);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div className="">
        <TopLayer
          title="Product List"
          isSearch={true}
          onSearch={handleSearch}
          showDropdown={true}
          options={["BrandA", "BrandB", "BrandC"]}
          selectedOption=""
          setSelectedOption={(option) => {
            const filtered = initialData.filter(
              (item) => item.brand === option
            );
            setFilteredData(filtered);
            setCurrentPage(1);
          }}
          isAddButton={true}
          addButtonText="Add Stock Out"
          onAddButtonClick={() => setShowAddModal(true)}
        />
        <div className=" mx-auto p-4 bg-white mt-5">
          <div className="min-h-[60vh] max-h-[60vh] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 w-full">
                <tr>
                  <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-12">
                    SL No
                  </th>
                  <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-32">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-md font-bold text-black uppercase w-28">
                    Purchase Order
                  </th>
                  <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-36">
                    Buyer
                  </th>
                  <th className="px-6 py-3 text-center text-md font-bold text-black uppercase w-14">
                    Style NO
                  </th>
                  <th className="px-6 py-3 text-center text-md font-bold text-black uppercase w-14">
                    Ref No
                  </th>
                  <th className="px-6 py-3 text-center text-md font-bold text-black uppercase w-14">
                    Stock Out Bundle
                  </th>
                  <th className="px-6 py-3 text-center text-md font-bold text-black uppercase w-14">
                    Total Stock Out Pcs
                  </th>
                  <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-12">
                    Action
                  </th>
                  <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-8">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={(e) =>
                        setCheckedIds(
                          e.target.checked
                            ? initialData.map((row) => row.id)
                            : []
                        )
                      }
                      checked={checkedIds.length === initialData.length}
                    />
                  </th>
                  <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-12">
                    <button onClick={handleDelete} className="text-red-500">
                      <img src={deleteIcon} alt="Delete" className="h-5 w-5" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((row, index) => (
                  <tr key={row.id} style={{ maxHeight: "50px" }}>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-12">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-32">
                      {" "}
                      {row.created_at}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-md text-center text-black w-28">
                      {row.PurchaseOrder.purchase_order_number}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-36">
                      {row.PurchaseOrder.Buyer.name},{" "}
                      {row.PurchaseOrder.Buyer.location}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-14">
                      {row.Stock.Product.style_no}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-md text-center text-black w-14">
                      {row.Stock.Product.Reference.reference_no}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-14">
                      {row.stockOut_bundle}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-14">
                      {row.total_stockOut_pcs}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-12">
                      {editIndex === startIndex + index ? (
                        <button
                          onClick={handleSaveClick}
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
                    <td className="px-2 py-3 whitespace-nowrap w-8 text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={checkedIds.includes(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                      />
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-12">
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-500"
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="h-4 w-5"
                        />
                      </button>
                    </td>
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
                {currentPage}/{Math.ceil(filteredData.length / recordsPerPage)}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                className="px-2 py-1 text-md rounded-md"
              >
                <img src={rightArrowIcon} alt="Next" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditStockOutModel
        show={showModal}
        onClose={handleCloseModal}
        stockOutId={selectedStockOutId}
      />
      {/* <AddStockOutModel show={showAddModal} onClose={handleAddModalClose} fetchStockOut={fetchStockOut}/> */}
      <StockSelectOptionModel
        show={showAddModal}
        onClose={handleAddModalClose}
        fetchStockOut={fetchStockOut}
      />
    </>
  );
};

export default StockOut;
