import React, { useEffect, useState } from "react";
import closeIcon from "../../../assets/close-modal-icon.svg";
import apiService from "../../../apiService";
import AddStockOutModel from "../../stocks/stock-out/AddStockOutModel";

const EditWithoutPoModal = ({ show, onClose, withPoOutId }) => {
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString());
  const [selectedProduct, setSelectedProduct] = useState({});

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [assortmentType, setAssortmentType] = useState("assorted");
  const [innerPcs, setInnerPcs] = useState({});
  const [totalInnerPcs, setTotalInnerPcs] = useState(0);
  const [totalOuterPcs, setTotalOuterPcs] = useState(0);
  const [totalInnerPcsPerBundle, setTotalInnerPcsPerBundle] = useState(0);
  const [withOutPoBundle, setWithOutPoBundle] = useState(0);
  const [totalPcs, setTotalPcs] = useState(0);
  const [stockOutPoNo, setStockOutPoNo] = useState("");
  const [stockOutOrder, setStockOutOrder] = useState({});
  const [showStockOut, setShowStockOut] = useState(false);
  const [updatedWithOutPoData, setUpdatedwithOutPoData] = useState({});

  // Suggestion buyer states
  const [buyerDropdown, setBuyerDropdown] = useState(false);
  const [buyerSuggestions, setBuyerSuggestions] = useState([]);
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [updatedBuyerData, setUpdatedBuyerData] = useState({});

  const [withOutPoData, setWithOutPoData] = useState({
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
    req_bundle: "",
    product_id: null,
    stock_by_size: [],
    req_purchase_qty: null,
    packing_type: "",
    notes: "",
    purchase_order_number: "",
    Buyer: {
      name: "",
      location: "",
    },
  });

  useEffect(() => {
    fetchWithPoData(withPoOutId);
  }, [withPoOutId]);

  const fetchWithPoData = async (withPoOutId) => {
    try {
      const response = await apiService.get(`/purchases/${withPoOutId}`);
      setWithOutPoData(response.data);
      setAssortmentType(response.data.packing_type);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error fetching With Out Po data:",
        error.response || error.message
      );
    }
  };

  // Fetch buyer suggestions
  const fetchBuyerSuggestions = async (buyerInput) => {
    try {
      if (buyerInput.length > 0) {
        const response = await apiService.get("/buyers/getall");
        const filteredBuyers = response.data.filter((b) =>
          b.name.toLowerCase().startsWith(buyerInput.toLowerCase())
        );
        console.log(filteredBuyers);
        setBuyerSuggestions(filteredBuyers);
      } else {
        setBuyerSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const handleBuyerChange = (e) => {
    const buyerInput = e.target.value;
    setWithOutPoData({
      ...withOutPoData,
      Buyer: {
        ...withOutPoData.Buyer,
        name: buyerInput,
        location: "",
      },
    });
    setBuyerDropdown(true);
    fetchBuyerSuggestions(buyerInput);
  };

  const handleBuyerSelect = (buyer) => {
    setWithOutPoData({
      ...withOutPoData,
      Buyer: {
        ...withOutPoData.Buyer,
        name: buyer.name,
        location: buyer.location,
      },
    });
    setSelectedBuyerId(buyer.id);
    setBuyerSuggestions([]);
    setBuyerDropdown(false);
    setUpdatedBuyerData({
      ...updatedBuyerData,
      buyer_id: buyer.id,
    });
    setUpdatedwithOutPoData({
      ...updatedWithOutPoData,
      buyer_id: buyer.id,
    });
    console.log(buyer.name);
    console.log(buyer.location);
  };

  const handleAddNewBuyer = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new buyer:", withOutPoData.Buyer.name);
    console.log("Adding new buyer:", withOutPoData.Buyer.location);
    // Close the dropdown after adding the buyer
    setBuyerDropdown(false);
  };

  const handleDeliveryDateChange = (e) => {
    const inputDate = e.target.value;
    setDeliveryDate(new Date(inputDate).toISOString());
  };

  const handleStockBySizeChange = (size, innerPcs, outerPcs) => {
    const updatedStockBySize = withOutPoData.purchase_by_size.map((item) =>
      item.size === size
        ? { ...item, innerPcs, outerPcs } // Update only the matching size
        : item
    );

    setWithOutPoData((prevState) => ({
      ...prevState,
      purchase_by_size: updatedStockBySize,
    }));

    setUpdatedwithOutPoData({
      ...updatedWithOutPoData,
      purchase_by_size: updatedStockBySize,
    });
  };

  // handle size quantity change
  const handleAssortmentTypeChange = (e) => {
    setAssortmentType(e.target.value);
    setUpdatedwithOutPoData({
      ...updatedWithOutPoData,
      packing_type: e.target.value,
    });

    if (e.target.value === "solid" && selectedProduct) {
      // Check if selectedProduct and selectedProduct.Size.sizes exist
      const initialInnerPcs =
        selectedProduct.Size && selectedProduct.Size.sizes
          ? selectedProduct.Size.sizes.reduce((acc, size) => {
              acc[size] = selectedProduct.inner_pcs;
              return acc;
            }, {})
          : {};

      setInnerPcs(initialInnerPcs);
      console.log(innerPcs);
    } else {
      setInnerPcs({});
    }
  };

  const handleInnerPcsChange = (e, size) => {
    const newInnerPcs = parseInt(e.target.value, 10) || null; // Ensure the value is a number
    const sizeData =
      withOutPoData.purchase_by_size.find((item) => item.size === size) || {};

    // Update the stock data with new inner pcs and existing outer pcs
    handleStockBySizeChange(size, newInnerPcs, sizeData.outerPcs || null);

    console.log("Inner pieces updated for size", size);
  };

  const handleOuterPcsChange = (e, size) => {
    const newOuterPcs = parseInt(e.target.value, 10) || null; // Ensure the value is a number
    const sizeData =
      withOutPoData.purchase_by_size.find((item) => item.size === size) || {};

    // Update the stock data with new outer pcs and existing inner pcs
    handleStockBySizeChange(size, sizeData.innerPcs || null, newOuterPcs);

    console.log("Outer pieces updated for size", size);
  };

  useEffect(() => {
    if (withOutPoData?.purchase_by_size) {
      const totalwithOutPoInnerPcs = calculateTotalInnerPcs(
        withOutPoData.purchase_by_size
      );
      setTotalInnerPcs(totalwithOutPoInnerPcs);

      const totalwithOutPoOuterPcs = calculateTotalOuterPcs(
        withOutPoData.purchase_by_size
      );
      setTotalOuterPcs(totalwithOutPoOuterPcs);

      const totalInnerPerBundle = calculateTotalInnerPerBundle(
        withOutPoData.purchase_by_size
      );
      setTotalInnerPcsPerBundle(totalInnerPerBundle);
    }

    if (withOutPoData?.req_bundle !== undefined) {
      setWithOutPoBundle(withOutPoData.req_bundle);
    }

    if (withOutPoBundle > 0 && withOutPoData?.purchase_by_size) {
      const totalPcs = withOutPoData.purchase_by_size.reduce((sum, item) => {
        return sum + item.innerPcs * item.outerPcs * withOutPoBundle;
      }, 0);
      setTotalPcs(totalPcs);
      setUpdatedwithOutPoData({
        ...updatedWithOutPoData,
        totalPcs: totalPcs,
      });
    } else {
      setTotalPcs(0);
    }
  }, [withOutPoData, withOutPoBundle]);

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

  const handleBundleChange = async (e) => {
    const bundleQty = Number(e.target.value);
    setWithOutPoBundle(bundleQty);
    setUpdatedwithOutPoData({
      ...updatedWithOutPoData,
      req_bundle: bundleQty,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updatedWithOutPoData", updatedWithOutPoData);
    try {
      const response = await apiService.put(
        `/purchases/${withPoOutId}`,
        updatedWithOutPoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Submit response:", response);
        setSuccessMessage("With Out-Po updated successfully");
        setErrorMessage("");
        setUpdatedwithOutPoData({});
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleStockOutModelClose = () => {
    setShowStockOut(false);
  };

  const handleClose = () => {
    setUpdatedwithOutPoData({});
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[80vw] h-screen max-h-[90vh] overflow-auto">
        <div className="px-10 py-5">
          <div className="flex justify-center">
            <h2 className="text-xl font-bold">Edit Without Purchase Order</h2>
            <button
              className="absolute right-5 cursor-pointer"
              onClick={handleClose}
            >
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <hr className="my-2" />
          <div className="px-20">
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="styleNo">
                  Purchase Order No:
                </label>
                <input
                  type="text"
                  id="purchaseOrderNo"
                  value={withOutPoData.purchase_order_number}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="buyer">
                  Buyer Name:
                </label>
                <input
                  type="text"
                  id="buyer"
                  value={withOutPoData.Buyer.name}
                  onChange={handleBuyerChange}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  placeholder="Enter Buyer Name"
                />
                {buyerDropdown && withOutPoData.Buyer.name && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {buyerSuggestions.length > 0 ? (
                      buyerSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleBuyerSelect(suggestion)}
                        >
                          {suggestion.name}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewBuyer}
                      >
                        Add New Buyer: "{withOutPoData.Buyer.name}"
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="location">
                  Buyer Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={withOutPoData.Buyer.location}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="deliveryDate">
                  Delivery date:
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  value={deliveryDate.split("T")[0]}
                  onChange={handleDeliveryDateChange}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  placeholder="Enter delivery date"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="styleNo">
                  Style No:
                </label>
                <input
                  type="text"
                  id="styleNo"
                  value={withOutPoData.Product.style_no}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  placeholder="Enter Style No"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="referenceNo">
                  Reference No:
                </label>
                <input
                  type="text"
                  id="referenceNo"
                  value={withOutPoData.Product.Reference.reference_no}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="brand">
                  Brand Name:
                </label>
                <input
                  type="text"
                  id="brand"
                  value={withOutPoData.Product.Brand.brandName}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="fabric">
                  Fabric:
                </label>
                <input
                  type="text"
                  id="fabric"
                  value={withOutPoData.Product.Fabric.fabricName}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="fabricFinish">
                  Fabric Finish:
                </label>
                <input
                  type="text"
                  id="fabricFinish"
                  value={withOutPoData.Product.FabricFinish.fabricFinishName}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="gsm">
                  GSM:
                </label>
                <input
                  type="number"
                  id="gsm"
                  value={withOutPoData.Product.Gsm.gsmValue}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="knitType">
                  Knit Type:
                </label>
                <input
                  type="text"
                  id="knitType"
                  value={withOutPoData.Product.KnitType.knitType}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="category">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  value={withOutPoData.Product.Category.categoryName}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="color">
                  Color:
                </label>
                <input
                  type="text"
                  id="color"
                  value={withOutPoData.Product.Color.colorName}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="size">
                  Size:
                </label>
                <input
                  type="text"
                  id="size"
                  value={withOutPoData.Product.Size.sizes}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="decoration">
                  Decorations:
                </label>
                <input
                  type="text"
                  id="decoration"
                  value={withOutPoData.Product.Decoration.decorationName}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="print">
                  Print or Embed:
                </label>
                <input
                  type="text"
                  id="print"
                  value={withOutPoData.Product.PrintEmbName.printType}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="stitch">
                  Stitch Details:
                </label>
                <input
                  type="text"
                  id="stitch"
                  value={withOutPoData.Product.StitchDetail.stictchDetail}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="neck">
                  Neck:
                </label>
                <input
                  type="text"
                  id="neck"
                  value={withOutPoData.Product.Neck.neckType}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="sleeve">
                  Sleeve:
                </label>
                <input
                  type="text"
                  id="sleeve"
                  value={withOutPoData.Product.Sleeve.sleeveName}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="length">
                  Length:
                </label>
                <input
                  type="text"
                  id="length"
                  value={withOutPoData.Product.Length.lengthType}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="packing">
                  Packing Method:
                </label>
                <input
                  type="text"
                  id="packing"
                  value={withOutPoData.Product.PackingMethod.packingType}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="product-type">
                  Product Type:
                </label>
                <input
                  type="text"
                  id="product-type"
                  value={withOutPoData.Product.ProductType.product}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="measurement-chart">
                  Measurement chart:
                </label>
                <input
                  type="text"
                  id="measurement-chart"
                  value={withOutPoData.Product.MeasurementChart.name}
                  className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label className="font-semibold" htmlFor="shortDescription">
                Short Description:
              </label>
              <textarea
                id="shortDescription"
                value={withOutPoData.Product.short_description}
                className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                rows="1"
                disabled
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label className="font-semibold" htmlFor="fullDescription">
                Full Description:
              </label>
              <textarea
                id="fullDescription"
                value={withOutPoData.Product.full_description}
                className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                rows="2"
                disabled
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label className="font-semibold" htmlFor="notes">
                Notes:
              </label>
              <textarea
                id="notes"
                value={withOutPoData.notes}
                className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                placeholder="Enter additional notes"
                rows="3"
              />
            </div>

            <div className="my-4">
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

            <div className="">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-medium">Order Info:</h3>
              </div>
              <div className="flex gap-4 border border-gray-400 px-5 justify-between">
                <div className="p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-4">
                    Quantity per size:
                  </h4>
                  <div className="flex flex-col gap-4">
                    {withOutPoData?.purchase_by_size?.map((stock, index) => (
                      <div key={index} className="flex items-center gap-4 mb-2">
                        <div className="w-16">{stock.size}: </div>
                        <input
                          type="number"
                          value={stock.innerPcs || null}
                          onChange={(e) => handleInnerPcsChange(e, stock.size)}
                          placeholder="Inner Pcs"
                          className="border border-gray-300 rounded-md px-2 py-1 w-24"
                          disabled={assortmentType === "solid"}
                        />
                        <input
                          type="number"
                          value={stock.outerPcs || null}
                          onChange={(e) => handleOuterPcsChange(e, stock.size)}
                          placeholder="Outer Pcs"
                          className="border border-gray-300 rounded-md px-2 py-1 w-24"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-20 content-center">
                  <label className="font-semibold">Number of Bundles: </label>
                  <input
                    type="number"
                    value={withOutPoBundle}
                    onChange={handleBundleChange}
                    placeholder="Bundles"
                    className="border border-gray-300 rounded-md px-2 py-1 w-24"
                  />
                </div>

                <div className="p-4 bg-gray-100 flex items-center justify-center mt-8 mb-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-5 justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Inner Pcs
                      </label>
                      <span>{totalInnerPcs}</span>
                    </div>
                    <div className="flex gap-5 justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Outer Pcs
                      </label>
                      <span>{totalOuterPcs}</span>
                    </div>
                    <div className="flex gap-5 justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Pcs per Bundle
                      </label>
                      <span>{totalInnerPcsPerBundle}</span>
                    </div>
                    <div className="flex gap-5 justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Pcs
                      </label>
                      <span>{totalPcs}</span>
                    </div>
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
          <div className="flex justify-center px-20 mt-5">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              CREATE WITHOUT PURCHASE ORDER
            </button>
          </div>
        </div>
      </div>
      <AddStockOutModel
        show={showStockOut}
        onClose={handleStockOutModelClose}
        stockOutPoNo={stockOutPoNo}
        stockOutOrder={stockOutOrder}
      />
    </div>
  );
};
export default EditWithoutPoModal;
