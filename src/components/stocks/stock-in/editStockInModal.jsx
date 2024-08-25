import React, { useState, useEffect } from "react";
import closeIcon from "../../../assets/close-modal-icon.svg";
import apiService from "../../../apiService";

const EditStockInModal = ({
  showModal,
  close,
  getAllStocks,
  stockInId,
  editIndex,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [assortmentType, setAssortmentType] = useState("");
  const [innerPcs, setInnerPcs] = useState({});
  const [outerPcs, setOuterPcs] = useState({});
  const [bundles, setBundles] = useState("");

  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stockInInnerTotals, setStockInInnerTotals] = useState(null);
  const [stockInOuterTotals, setStockInOuterTotals] = useState(null);
  const [totalInnerPcsPerBundle, setTotalInnerPcsPerBundle] = useState(null);
  const [stockInBundle, setStockInBundle] = useState(0);
  const [totalPcs, setTotalPcs] = useState(0);
  const [warehouse, setWarehouse] = useState("");

  // Suggestion warehouse states
  const [warehouseDropdown, setWarehouseDropdown] = useState(false);
  const [warehouseSuggestions, setWarehouseSuggestions] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [updatedWarehouseData, setUpdatedWarehouseData] = useState({});

  const [updatedStockInData, setUpdatedStockInData] = useState({});

  const [stockInData, setStockInData] = useState({
    Product: {
      style_no: "",
      Reference: {
        reference_no: "",
      },
      Category: {
        categoryName: "",
      },
      Brand: {
        brandName: "",
      },
      Color: {
        colorName: "",
      },
      Decoration: {
        decorationName: "",
      },
      Fabric: {
        fabricName: "",
      },
      FabricFinish: {
        fabricFinishName: "",
      },
      Gsm: {
        gsmValue: null,
      },
      KnitType: {
        knitType: "",
      },
      Length: {
        lengthType: "",
      },
      MeasurementChart: {
        name: "",
      },
      Neck: {
        neckType: "",
      },
      PackingMethod: {
        packingType: "",
      },
      PrintEmbName: {
        printType: "",
      },
      ProductType: {
        product: "",
      },
      Size: {
        sizes: [],
      },
      Sleeve: {
        sleeveName: "",
      },
      StitchDetail: {
        stictchDetail: "",
      },
      short_description: "",
      full_description: "",
      images: "",
    },
    no_bundles: "",
    product_id: null,
    stock_by_size: [],
    total_pcs: null,
    packing_type: "",
    Warehouse: {
      warehouse: "",
    },
  });
  const [previews, setPreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch warehouse suggestions
  const fetchWarehouseSuggestions = async (warehouseInput) => {
    try {
      if (warehouseInput.length > 0) {
        const response = await apiService.get("/warehouses/getall");
        const filteredWarehouse = response.data.filter((b) =>
          b.warehouse.toLowerCase().startsWith(warehouseInput.toLowerCase())
        );
        console.log(filteredWarehouse);
        setWarehouseSuggestions(filteredWarehouse);
      } else {
        setWarehouseSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching warehouse:", error);
    }
  };

  const handleWarehouseChange = (e) => {
    const warehouseInput = e.target.value;
    setStockInData({
      ...stockInData,
      Warehouse: {
        ...stockInData.Warehouse,
        warehouse: warehouseInput,
      },
    });

    setWarehouseDropdown(true);
    fetchWarehouseSuggestions(warehouseInput);
  };

  const handleWarehouseSelect = (warehouse) => {
    setStockInData({
      ...stockInData,
      Warehouse: {
        ...stockInData.Warehouse,
        warehouse: warehouse.warehouse,
      },
    });
    setSelectedWarehouseId(warehouse.id);
    setWarehouseSuggestions([]);
    setWarehouseDropdown(false);
    setUpdatedWarehouseData({
      ...updatedWarehouseData,
      warehouse_id: warehouse.id,
    });
    setUpdatedStockInData({
      ...updatedWarehouseData,
      warehouse_id: warehouse.id,
    });
    console.log(warehouse.warehouse);
    console.log(warehouse.id);
  };

  const handleAddNewWarehouse = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new warehouse:", stockInData.Warehouse.warehouse);
    setWarehouseDropdown(false);
  };

  useEffect(() => {
    console.log("stockInId", editIndex);

    if (editIndex) {
      const fetchStockInData = async () => {
        try {
          const response = await apiService.get(`/stocks/stockIn/${editIndex}`);
          setStockInData(response.data);
          setAssortmentType(response.data.packing_type);
          console.log(response.data);
          setLoading(false);

          // Fill the input fields based on the fetched stock-in data
          setSizes(response.data.Size.sizes);
          setSelectedProductId(response.data.product_id);
          setSelectedProduct(response.data);
          setBundles(response.data.no_bundles || "");

          // Assuming response.data.images is an array of image URLs
          if (response.data.images) {
            setPreviews(response.data.images);
            setImages(response.data.images.map((image) => ({ url: image })));
          }
        } catch (error) {
          console.error("Error fetching stock In data:", error);
          setLoading(false);
        }
      };

      fetchStockInData();
    }
  }, [editIndex]);

  const handleStockBySizeChange = (size, innerPcs, outerPcs) => {
    const updatedStockBySize = stockInData.stock_by_size.map((item) =>
      item.size === size
        ? { ...item, innerPcs, outerPcs } // Update only the matching size
        : item
    );

    setStockInData((prevState) => ({
      ...prevState,
      stock_by_size: updatedStockBySize,
    }));
    setUpdatedStockInData((prevState) => ({
      ...prevState,
      stock_by_size: updatedStockBySize,
    }));
  };

  const handleAssortmentTypeChange = (e) => {
    setAssortmentType(e.target.value);
    setAssortmentType(e.target.value);
    setUpdatedStockInData((prevState) => ({
     ...prevState,
      packing_type: e.target.value,
    }));
    if (e.target.value === "solid" && selectedProduct) {
      const initialInnerPcs = selectedProduct.Size.sizes.reduce((acc, size) => {
        acc[size] = selectedProduct.inner_pcs;
        return acc;
      }, {});
      setInnerPcs(initialInnerPcs);
    } else {
      setInnerPcs({});
    }
  };

  const handleInnerPcsChange = (e, size) => {
    const newInnerPcs = parseInt(e.target.value, 10) || null; // Ensure the value is a number
    const sizeData = stockInData.stock_by_size.find((item) => item.size === size) || {};
  
    // Update the stock data with new inner pcs and existing outer pcs
    handleStockBySizeChange(size, newInnerPcs, sizeData.outerPcs || null);
  
    console.log("Inner pieces updated for size", size);
  };
  
  const handleOuterPcsChange = (e, size) => {
    const newOuterPcs = parseInt(e.target.value, 10) || null; // Ensure the value is a number
    const sizeData = stockInData.stock_by_size.find((item) => item.size === size) || {};
  
    // Update the stock data with new outer pcs and existing inner pcs
    handleStockBySizeChange(size, sizeData.innerPcs || null, newOuterPcs);
  
    console.log("Outer pieces updated for size", size);
  };
  

  // useEffect(() => {
  //   // Extract innerPcs and outerPcs from stockInData.stock_by_size
  //   const innerPcs = {};
  //   const outerPcs = {};

  //   stockInData.stock_by_size.forEach((item) => {
  //     innerPcs[item.size] = item.inner || 0;
  //     outerPcs[item.size] = item.outer || 0;
  //   });

  //   // Calculate total inner and total outer pieces
  //   const totalInner = Object.values(innerPcs).reduce(
  //     (sum, pcs) => sum + Number(pcs || 0),
  //     0
  //   );
  //   const totalOuter = Object.values(outerPcs).reduce(
  //     (sum, pcs) => sum + Number(pcs || 0),
  //     0
  //   );
  //   setTotalInnerPcs(totalInner);
  //   setTotalOuterPcs(totalOuter);

  //   // Calculate total inner pieces per bundle
  //   const totalInnerPerBundle = sizes.reduce((sum, size) => {
  //     const inner = innerPcs[size] || 0;
  //     const outer = outerPcs[size] || 0;
  //     return sum + inner * outer;
  //   }, 0);

  //   setTotalInnerPcsPerBundle(totalInnerPerBundle);

  //   // Calculate total products
  //   const totalProducts = totalInnerPerBundle * bundles;
  //   setTotalProducts(totalProducts);
  // }, [stockInData, bundles, sizes]);

  useEffect(() => {
    if (stockInData?.stock_by_size) {
      const totalStockInInnerPcs = calculateTotalInnerPcs(
        stockInData.stock_by_size
      );
      setStockInInnerTotals(totalStockInInnerPcs);

      const totalStockInOuterPcs = calculateTotalOuterPcs(
        stockInData.stock_by_size
      );
      setStockInOuterTotals(totalStockInOuterPcs);

      const totalInnerPerBundle = calculateTotalInnerPerBundle(
        stockInData.stock_by_size
      );
      setTotalInnerPcsPerBundle(totalInnerPerBundle);
    }
  }, [stockInData, sizes]);

  const calculateTotalInnerPcs = (data) => {
    return data.reduce((total, item) => total + item.innerPcs, 0);
  };

  const calculateTotalOuterPcs = (data) => {
    return data.reduce((total, item) => total + item.outerPcs, 0);
  };

  const calculateTotalInnerPerBundle = (data) => {
    return data.reduce((total, item) => {
      const inner = item.innerPcs || 0;
      const outer = item.outerPcs || 0;
      return total + inner * outer;
    }, 0);
  };

  useEffect(() => {
    if (stockInData?.no_bundles !== undefined) {
      setStockInBundle(stockInData.no_bundles);
    }
  }, [stockInData]);



  const handleBundleChange = async (e) => {
    const bundleQty = Number(e.target.value);
    setStockInBundle(bundleQty);
    setUpdatedStockInData((prevState) => ({
      ...prevState,
      no_bundles: bundleQty,
    }));
  };

  useEffect(() => {
    if (stockInBundle > 0 && stockInData?.stock_by_size) {
      const totalPcs = stockInData.stock_by_size.reduce((sum, item) => {
        return sum + item.innerPcs * item.outerPcs * stockInBundle;
      }, 0);
      setTotalPcs(totalPcs);
      setUpdatedStockInData((prevState) => ({
        ...prevState,
        totalPcs: totalPcs,
      }));
    } else {
      setTotalPcs(0);
    }
  }, [stockInBundle, stockInData]);

  const handleSubmit = async () => {
    console.log(updatedStockInData);
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append the updated data to formData
    formData.append("stockInData", JSON.stringify(stockInData));
  
    // Append the updatedWithPoData to formData
    Object.entries(updatedStockInData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });
  
    // Additional data to append to formData
    formData.append("packing_type", assortmentType);
    formData.append("no_bundles", stockInBundle);
    formData.append("total_pcs", totalPcs);
    formData.append("warehouse_id", warehouse);

    //   try {
  //     // Send formData to the server
  //     const response = await apiService.post('/endpoint', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log("Submit response:", response.data);
  
  //     // Handle success (e.g., close the modal or show a success message)
  //     onClose();
  //   } catch (error) {
  //     console.error("Error submitting data:", error.response || error.message);
  //     // Handle error (e.g., show an error message)
  //   }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={close}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[80vw] h-screen max-h-[90vh] overflow-auto py-10">
        <div className="relative flex items-center justify-between px-20 mb-4">
          <div className="flex justify-center gap-3">
            <h2 className="text-2xl font-medium">EDIT STOCK INWARD</h2>
          </div>
          {/* <p className="text-2xl font-medium">Date:</p> */}
          <button className="absolute text-black right-5" onClick={close}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <hr className="m-4" />
        <div className="flex justify-between gap-4 px-20 my-5 mt-6">
          <div className="grid flex-col grid-cols-3 gap-2 2xl:grid-cols-5">
            <div className="flex flex-col">
              <div className="relative flex flex-col gap-2">
                <label className="font-semibold" htmlFor="styleNumber">
                  Style No:
                </label>
                <input
                  type="text"
                  id="styleNumber"
                  value={stockInData?.Product.style_no}
                  className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                  disabled
                />
              </div>
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="referenceNo">
                Reference No:
              </label>
              <input
                type="text"
                id="referenceNo"
                value={stockInData?.Product.Reference.reference_no}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="category">
                Category:
              </label>
              <input
                type="text"
                id="category"
                value={stockInData?.Product.Category.categoryName}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="productType">
                Product Type:
              </label>
              <input
                type="text"
                id="productType"
                value={stockInData?.Product.ProductType.product}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="brand">
                Brand:
              </label>
              <input
                type="text"
                id="brand"
                value={stockInData?.Product.Brand.brandName}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="fabric">
                Fabric:
              </label>
              <input
                type="text"
                id="fabric"
                value={stockInData?.Product.Fabric.fabricName}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="fabric-finish">
                Fabric Fisnish:
              </label>
              <input
                type="text"
                id="fabric-finish"
                value={stockInData?.Product.FabricFinish.fabricFinishName}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="gsm">
                GSM:
              </label>
              <input
                type="number"
                id="gsm"
                value={stockInData?.Product.Gsm.gsmValue}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="knitType">
                Knit Type:
              </label>
              <input
                type="text"
                id="knitType"
                value={stockInData?.Product.KnitType.knitType}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="color">
                Color:
              </label>
              <input
                type="text"
                id="color"
                value={stockInData?.Product.Color.colorName}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="size">
                Size:
              </label>
              <input
                type="text"
                id="size"
                value={stockInData?.Product.Size.sizes}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="decoration">
                Decoration:
              </label>
              <input
                type="text"
                id="decoration"
                value={stockInData?.Product.Decoration.decorationName}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="print">
                Print or Emb:
              </label>
              <input
                type="text"
                id="print"
                value={stockInData?.Product.PrintEmbName.printType}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="stitch">
                Stitch Details:
              </label>
              <input
                type="text"
                id="stitch"
                value={stockInData?.Product.StitchDetail.stictchDetail}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="neck">
                Neck:
              </label>
              <input
                type="text"
                id="neck"
                value={stockInData?.Product.Neck.neckType}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="length">
                Length:
              </label>
              <input
                type="text"
                id="length"
                value={stockInData?.Product.Length.lengthType}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="sleeve">
                Sleeve:
              </label>
              <input
                type="text"
                id="sleeve"
                value={stockInData?.Product.Sleeve.sleeveName}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="packing">
                Packing Method:
              </label>
              <input
                type="text"
                id="packing"
                value={stockInData?.Product.PackingMethod.packingType}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold" htmlFor="measurement">
                Measurement Chart:
              </label>
              <input
                type="text"
                id="measurement"
                value={stockInData?.Product.MeasurementChart.name}
                className="px-2 py-1 border border-gray-300 rounded-md bg-zinc-200"
                disabled
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="warehouse">
                Warehouse:
              </label>
              <input
                type="text"
                id="warehouse"
                value={stockInData.Warehouse.warehouse}
                onChange={handleWarehouseChange}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                placeholder="Enter Warehouse"
              />
              {warehouseDropdown && stockInData.Warehouse.warehouse && (
                <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {warehouseSuggestions.length > 0 ? (
                    warehouseSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleWarehouseSelect(suggestion)}
                      >
                        {suggestion.warehouse}
                      </li>
                    ))
                  ) : (
                    <li
                      className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                      onClick={handleAddNewWarehouse}
                    >
                      Add New Buyer: "{stockInData.Warehouse.warehouse}"
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center h-64 mt-10 border border-gray-400">
            <img
              src={
                stockInData?.Product.images[0] ||
                "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1722163869~exp=1722167469~hmac=37361beb0ca1a1c652d36c9ca94818f793a54d21822edab80e80c6e43a9b7b37&w=740"
              }
              alt="Stock"
              className="object-cover h-64 rounded w-60"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mx-20 mt-3">
          <label className="font-semibold" htmlFor="shortDescription">
            Short Description:
          </label>
          <textarea
            id="shortDescription"
            value={stockInData?.Product.short_description}
            className="px-2 py-2 border border-gray-300 rounded-md bg-zinc-200"
            rows="1"
            disabled
          />
        </div>

        <div className="flex flex-col gap-2 mx-20 mt-3">
          <label className="font-semibold" htmlFor="fullDescription">
            Full Description:
          </label>
          <textarea
            id="fullDescription"
            value={stockInData?.Product.full_description}
            className="px-2 py-2 border border-gray-300 rounded-md bg-zinc-200"
            rows="2"
            disabled
          />
        </div>

        <div className="px-20 my-4">
          <label className="font-semibold">Packaging Type:</label>
          <div className="flex items-center gap-4 mt-2">
            <label>
              <input
                type="radio"
                value="assorted"
                checked={assortmentType === "assorted"}
                onChange={handleAssortmentTypeChange}
                className="mx-1"
              />
              Assorted
            </label>
            <label>
              <input
                type="radio"
                value="solid"
                checked={assortmentType === "solid"}
                onChange={handleAssortmentTypeChange}
                className="mx-1"
              />
              Solid
            </label>
          </div>
        </div>

        <div className="px-20">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-medium">Stock Info:</h3>
          </div>
          <div className="flex justify-between gap-4 px-5 border border-gray-400">
            <div className="p-4 rounded-lg">  
              <h4 className="mb-4 text-sm font-medium">Quantity per size:</h4>
              <div className="flex flex-col gap-4">
                {stockInData?.stock_by_size?.map((stock, index) => (
                  <div key={index} className="flex items-center gap-4 mb-2">
                    <div className="w-16 mt-5">{stock.size}: </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Inner Pcs
                      </label>
                      <input
                        type="number"
                        value={stock.innerPcs || null}
                        onChange={(e) => handleInnerPcsChange(e, stock.size)}
                        placeholder="Inner Pcs"
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                        disabled={assortmentType === "solid"}
                      />
                    </div> 
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Inner Boxes
                      </label>
                      <input
                        type="number"
                        value={stock.outerPcs || null} 
                        onChange={(e) => handleOuterPcsChange(e, stock.size)} 
                        placeholder="Outer Pcs"
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-center px-10">
              <label className="font-semibold">Number of Bundles: </label>
              <input
                type="number"
                value={stockInBundle}
                onChange={handleBundleChange}
                placeholder="Bundles"
                className="w-24 px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex items-center justify-center p-4 my-8 bg-gray-100">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Inner Pcs
                  </label>
                  <span>{stockInInnerTotals}</span>
                </div>
                <div className="flex justify-between gap-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Outer Pcs
                  </label>
                  <span>{stockInOuterTotals}</span>
                </div>
                <div className="flex justify-between gap-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Pcs per Bundle
                  </label>
                  <span>{totalInnerPcsPerBundle}</span>
                </div>
                <div className="flex justify-between gap-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Pcs
                  </label>
                  <span>{totalPcs}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {successMessage && (
          <div className="p-4 my-4 text-green-700 bg-green-100 border-l-4 border-green-500">
            <p>{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="p-4 my-4 text-red-700 bg-red-100 border-l-4 border-red-500">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex justify-end px-20 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            CREATE STOCK INWARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStockInModal;
