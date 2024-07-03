import React, { useState } from 'react';
import editIcon from "../../assets/edit-icon.svg";
import toggleActiveIcon from "../../assets/toggle-active.svg";
import toggleInactiveIcon from "../../assets/toggle-inactive.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import leftArrowIcon from "../../assets/left-arrow-icon.svg";
import rightArrowIcon from "../../assets/right-arrow-icon.svg";
import tickIcon from "../../assets/tick-icon.svg";
import MesasurementModal from './Mesasurement-model';
import closeIcon from "../../assets/close-modal-icon.svg"

const MeasurementChart = ({ searchQuery, isModalOpen, onClose }) => {
  const [data, setData] = useState([
    { id: 1, measurementChart: 'Short length', status: 'active' },
    { id: 2, measurementChart: 'medium length', status: 'inactive' },
    { id: 3, measurementChart: 'Full length', status: 'active' },
    { id: 4, measurementChart: 'cut', status: 'inactive' },
    { id: 5, measurementChart: 'loose', status: 'active' },
    { id: 6, measurementChart: 'Jersey', status: 'inactive' },
    { id: 7, measurementChart: 'Jersey', status: 'active' },
    { id: 8, measurementChart: 'Jersey', status: 'inactive' },
    { id: 9, measurementChart: 'Jersey', status: 'active' },
    { id: 10, measurementChart: 'Jersey', status: 'inactive' },
    { id: 11, measurementChart: 'Jersey', status: 'active' },
    { id: 12, measurementChart: 'Jersey', status: 'inactive' },
  ]);
  
  const [editIndex, setEditIndex] = useState(null);
  const [checkedIds, setCheckedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [addedStyles, setAddedStyles] = useState([]);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const filteredData = data.filter(item =>
    item.measurementChart.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusToggle = (index) => {
    const newData = [...data];
    newData[index].status = newData[index].status === 'active' ? 'inactive' : 'active';
    setData(newData);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleUpdateClick = (index) => {
    setEditIndex(null);
  };

  const handleInputChange = (e, index) => {
    const newData = [...data];
    newData[index].measurementChart = e.target.value;
    setData(newData);
  };

  const handleCheckboxChange = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleHeaderCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedIds(data.map((row) => row.id));
    } else {
      setCheckedIds([]);
    }
  };

  const handleDelete = () => {
    const newData = data.filter((row) => !checkedIds.includes(row.id));
    setData(newData);
    setCheckedIds([]);
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < Math.ceil(data.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const isHeaderCheckboxChecked = checkedIds.length > 0 && checkedIds.length === data.length;

  return (
    <div className="px-4 py-2 sm:px-6 lg:px-8">
      <div className="shadow border-b border-gray-200 sm:rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 w-full">
            <tr>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-40">Si No</th>
              <th className="px-2 py-3 text-left text-md font-bold text-black uppercase 2xl:w-[500px] xl:w-[450px] min-w-[200px]">Measurement Chart</th>
              <th className="px-6 py-3 text-center text-md font-bold text-black uppercase flex-grow">Status</th>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-28">Action</th>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-20">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={handleHeaderCheckboxChange}
                  checked={checkedIds.length === data.length}
                />
              </th>
              <th className="px-2 py-3 text-center text-md font-bold text-black uppercase w-8">
                <button onClick={handleDelete} className="text-red-500">
                  <img src={deleteIcon} alt="Delete" className='h-6 w-6' />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr key={row.id} style={{ maxHeight: '50px' }}>
                <td className="px-3 py-3 whitespace-nowrap text-md text-center text-black w-40">{startIndex + index + 1}</td>
                <td className="px-3 py-3 whitespace-nowrap text-md text-left text-black 2xl:w-[500px] xl:w-[450px] min-w-[200px]">
                  {editIndex === startIndex + index ? (
                    <input
                      type="text"
                      value={row.measurementChart}
                      onChange={(e) => handleInputChange(e, startIndex + index)}
                      className="border border-gray-300 rounded-md px-2 py-2 text-left 2xl:w-[500px] xl:w-[450px] min-w-[200px]"
                    />
                  ) : (
                    row.measurementChart
                  )}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-md text-center text-black flex-grow">
                  <button
                    onClick={() => handleStatusToggle(startIndex + index)}
                    className="px-2 py-1 rounded-full"
                  >
                    <div className='flex space-x-2'>
                      <span className={row.status === 'active' ? 'text-green-600 w-20' : 'text-gray-300 w-20'}>
                        {row.status === 'active' ? 'Active' : 'In-Active'}
                      </span>
                      <img src={row.status === 'active' ? toggleActiveIcon : toggleInactiveIcon} alt="Toggle Status" />
                    </div>
                  </button>
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-md text-center text-black w-16">
                  {editIndex === startIndex + index ? (
                    <button onClick={() => handleUpdateClick(startIndex + index)} className="bg-green-200 border border-green-500 px-2 py-1 rounded-lg flex">
                      <img src={tickIcon} alt="" className='mt-1 mr-2' />
                      <span className='text-xs'>Update</span>
                    </button>
                  ) : (
                    <button onClick={() => handleEditClick(startIndex + index)} className="text-blue-500 text-center">
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
          <span className="text-md text-black">{recordsPerPage} records per page</span>
        </div>
        <div className="flex items-center space-x-2">
          <select value={recordsPerPage} onChange={handleRecordsPerPageChange} className="border border-gray-300 rounded-md px-3 py-2">
            <option value={5}>Records per page: 5</option>
            <option value={10}>Records per page: 10</option>
            <option value={15}>Records per page: 15</option>
          </select>
          <button onClick={() => handlePageChange('prev')} className="px-2 py-1 text-md rounded-md">
            <img src={leftArrowIcon} alt="Previous" />
          </button>
          <span className="text-md text-black">{currentPage}/{Math.ceil(data.length / recordsPerPage)}</span>
          <button onClick={() => handlePageChange('next')} className="px-2 py-1 text-md rounded-md">
            <img src={rightArrowIcon} alt="Next" />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          >
          </div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[30vw] h-screen max-h-[35vh] overflow-y-auto lg:overflow-hidden">
            <div className="py-2 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-center">
                  {/* Centering the title */}
                  <h2 className="text-lg font-bold">Add Measurement Chart</h2>
                  <button
                    className="absolute right-5 cursor-pointer"
                    onClick={onClose}
                  >
                    <img src={closeIcon} alt="Close" className="mt-2" />
                  </button>
                </div>
                <hr className="w-full mt-3" />
              </div>
              <div className="flex flex-col justify-between items-center flex-grow">
                <div className="h-full flex flex-row items-center">
                  <button
                    className="bg-sky-600 w-40 py-3 text-white rounded-lg font-bold"
                    onClick={() => setIsSecondModalOpen(true)}
                  >
                    T shirt
                  </button>
                  <span className='p-3 text-lg'>(or)</span>
                  <button className="bg-sky-600 w-40 py-3 text-white rounded-lg font-bold">
                    Pant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSecondModalOpen && (
        <MesasurementModal onClose={() => setIsSecondModalOpen(false)} />
      )}
    </div>
  );
};

export default MeasurementChart;
