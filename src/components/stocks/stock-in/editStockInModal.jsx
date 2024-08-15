import React, { useState, useEffect } from "react";
import closeIcon from "../../../assets/close-modal-icon.svg";
import apiService from "../../../apiService";
import imgbg from "../../../assets/imgbg.jpg";

const EditStockInModal = ({ showModal, close, getAllStocks, stockInId }) => {
  const [styleNumber, setStyleNumber] = useState("");

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ReferenceNo, setReferenceNo] = useState("");
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [fabric, setFabric] = useState("");
  const [fabricFinish, setFabricFinish] = useState("");
  const [gsm, setGsm] = useState(null);
  const [knitType, setKnitType] = useState("");
  const [colors, setColors] = useState(""); 
  const [decoration, setDecoration] = useState("");
  const [printOrEmb, setPrintOrEmb] = useState("");
  const [stitch, setStitch] = useState("");
  const [neck, setNeck] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [length, setLength] = useState("");
  const [measurementChart, setMeasurementChart] = useState("");
  const [selectedMeasurementImage, setSelectedMeasurementImage] =
    useState(null);
  const [packingMethod, setPackingMethod] = useState("");
  const [sizes, setSizes] = useState([]);
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [assortmentType, setAssortmentType] = useState("assorted");
  const [innerPcs, setInnerPcs] = useState({});
  const [outerPcs, setOuterPcs] = useState({});
  const [bundles, setBundles] = useState("");
  const [totalInnerPcs, setTotalInnerPcs] = useState(0);
  const [totalOuterPcs, setTotalOuterPcs] = useState(0);
  const [totalInnerPcsPerBundle, setTotalInnerPcsPerBundle] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
  });
  const [previews, setPreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedStyleId, setSelectedStyleId] = useState(null);
  const [styleDropdown, setStyleDropdown] = useState(false);
  const [styleSuggestions, setStyleSuggestions] = useState([]);
  const [updatedStockInData, setUpdatedStockInData] = useState({});

  // Function to fetch product suggestions based on style number input
  const fetchStyleSuggestions = async (styleInput) => {
    try {
      if (styleInput.length > 0) {
        const response = await apiService.get("/products/getall");
        const filteredStockIn = response.data.filter((e) =>
          e.style_no.toLowerCase().startsWith(styleInput.toLowerCase())
        );
        console.log(filteredStockIn);
        setStyleSuggestions(filteredStockIn);
      } else {
        setStyleSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching Product:", error);
    }
  };

  useEffect(() => {
    console.log("stockInId", stockInId);

    if (stockInId) {
      const fetchStockInData = async () => {
        try {
          const response = await apiService.get(`/stocks/stockIn/${stockInId}`);
          setStockInData(response.data);
          console.log(response.data);
          setLoading(false);

          // Fill the input fields based on the fetched stock-in data
          setStyleNumber(response.data.style_no);
          setReferenceNo(response.data.Reference.reference_no);
          setCategory(response.data.Category.categoryName);
          setProductType(response.data.ProductType.product);
          setBrand(response.data.Brand.brandName);
          setFabric(response.data.Fabric.fabricName);
          setFabricFinish(response.data.FabricFinish.fabricFinishName);
          setGsm(response.data.Gsm.gsmValue);
          setKnitType(response.data.KnitType.knitType);
          setColors(response.data.Color.colorName);
          setDecoration(response.data.Decoration.decorationName);
          setPrintOrEmb(response.data.PrintEmbName.printType);
          setStitch(response.data.StitchDetail.stictchDetail);
          setNeck(response.data.Neck.neckType);
          setLength(response.data.Length.lengthType);
          setSleeve(response.data.Sleeve.sleeveName);
          setPackingMethod(response.data.PackingMethod.packingType);
          setMeasurementChart(response.data.MeasurementChart.name);
          setSelectedMeasurementImage(
            response.data.MeasurementChart.sample_size_file
          );
          setShortDescription(response.data.short_description);
          setFullDescription(response.data.full_description);
          setSizes(response.data.Size.sizes);
          setImageUrl(response.data.images[0]);
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
  }, [stockInId]);

  const handleInputChange = (e) => {
    const styleInput = e.target.value;

    // Update the stockInData state to reflect the new style_no value
    setStockInData((prevData) => ({
      ...prevData,
      Product: {
        ...prevData.Product,
        style_no: styleInput,
      },
    }));

    // Show suggestions if the input is not empty
    if (styleInput.length > 0) {
      setStyleDropdown(true);
      fetchStyleSuggestions(styleInput);
    } else {
      setStyleDropdown(false);
      resetForm(); // Optional: Reset form if needed
    }
  };

  const resetForm = () => {
    setStockInData((prevData) => ({
      ...prevData,
      Product: {
        ...prevData.Product,
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
        StitchDetail:{
          stictchDetail: "",
        },
        short_description: "",
        full_description: "",
        images: "",
     
      },
      no_bundles: null,
      packing_type: "",          
      total_pcs: null,            
      total_inner_pcs: null,      
      stock_by_size: [], 
    }));

    // Reset other individual states
    setReferenceNo("");
    setCategory("");
    setProductType("");
    setBrand("");
    setFabric("");
    setFabricFinish("");
    setGsm("");
    setKnitType("");
    setColors("");
    setSizes([]);
    setDecoration("");
    setPrintOrEmb("");
    setStitch("");
    setLength("");
    setNeck("");
    setSleeve("");
    setMeasurementChart("");
    setSelectedMeasurementImage("");
    setPackingMethod("");
    setShortDescription("");
    setFullDescription("");
    setImageUrl("");
    setSelectedProductId(null);
    setSelectedProduct(null);
    setBundles("");
  };



  const handleStyleSelect = (item) => {
    // Update the style_no in stockInData.Product and all other related states
    setStockInData((prevData) => ({
      ...prevData,
      Product: {
        ...prevData.Product,
        style_no: item.style_no,
        Reference: {
          reference_no: item.Reference.reference_no,
        },
        Category: {
          categoryName: item.Category.categoryName,
        },
        Brand: {
          brandName: item.Brand.brandName,
        },
        Color: {
          colorName: item.Color.colorName,
        },
        Decoration: {
          decorationName: item.Decoration.decorationName,
        },
        Fabric: {
          fabricName: item.Fabric.fabricName,
        },
        FabricFinish: {
          fabricFinishName: item.FabricFinish.fabricFinishName,
        },
        Gsm: {
          gsmValue: item.Gsm.gsmValue,
        },
        KnitType: {
          knitType: item.KnitType.knitType,
        },
        Length: {
          lengthType: item.Length.lengthType,
        },
        MeasurementChart: {
          name: item.MeasurementChart.name
        },
        Neck: {
          neckType: item.Neck.neckType,
        },
        PackingMethod: {
          packingType: item.PackingMethod.packingType,
        },
        PrintEmbName: {
          printType: item.PrintEmbName.printType,
        },
        ProductType: {
          product: item.ProductType.product,
        },
        Size: {
          sizes: item.Size.sizes,
        },
        StitchDetail: {
          stictchDetail: item.StitchDetail.stictchDetail,
        },
        Sleeve: {
          sleeveName: item.Sleeve.sleeveName,
        },
        short_description: item.short_description,
        full_description: item.full_description,
        images: item.images,
        no_bundles: item.no_bundles,
        packing_type: item.packing_type,

      },
    }));

    setSelectedProductId(item.id);
    setStyleSuggestions([]); // Hide suggestions
    setStyleDropdown(false); // Close the dropdown

    // Update all other necessary fields based on the selected item
    setReferenceNo(item.Reference.reference_no);
    setCategory(item.Category.categoryName);
    setProductType(item.ProductType.product);
    setBrand(item.Brand.brandName);
    setFabric(item.Fabric.fabricName);
    setFabricFinish(item.FabricFinish.fabricFinishName);
    setGsm(item.Gsm.gsmValue);
    setKnitType(item.KnitType.knitType);
    setColors(item.Color.colorName);
    setDecoration(item.Decoration.decorationName);
    setPrintOrEmb(item.PrintEmbName.printType);
    setStitch(item.StitchDetail.stictchDetail);
    setNeck(item.Neck.neckType);
    setLength(item.Length.lengthType);
    setSleeve(item.Sleeve.sleeveName);
    setPackingMethod(item.PackingMethod.packingType);
    setMeasurementChart(item.MeasurementChart.name);
    setSelectedMeasurementImage(item.MeasurementChart.sample_size_file);
    setShortDescription(item.short_description);
    setFullDescription(item.full_description);
    setSizes(item.Size.sizes);
    setImageUrl(item.images[0]);
    setSelectedProduct(item);

    if (assortmentType === "solid") {
      const initialInnerPcs = item.Size.sizes.reduce((acc, size) => {
        acc[size] = item.inner_pcs;
        return acc;
      }, {});
      setInnerPcs(initialInnerPcs);
    } else {
      setInnerPcs({});
      setOuterPcs({});
    }
  };



  const handleStockBySizeChange = (sizeName, innerPcs, outerPcs) => {
    setStockInData((prevData) => {
      const updatedStockBySize = prevData.stock_by_size.map((item) => {
        if (item.sizeName === sizeName) {
          return { ...item, innerPcs, outerPcs };
        }
        return item;
      });
  
      return { ...prevData, stock_by_size: updatedStockBySize };
    });
  };
  

  const handleAssortmentTypeChange = (e) => {
    setAssortmentType(e.target.value);
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

const handleInnerPcsChange = (e, sizeName) => {
  const newInnerPcs = e.target.value;
  const outerPcs = stockInData.stock_by_size.find(item => item.sizeName === sizeName)?.outerPcs || 0;

  handleStockBySizeChange(sizeName, newInnerPcs, outerPcs);
};

const handleOuterPcsChange = (e, sizeName) => {
  const newOuterPcs = e.target.value;
  const innerPcs = stockInData.stock_by_size.find(item => item.sizeName === sizeName)?.innerPcs || 0;

  handleStockBySizeChange(sizeName, innerPcs, newOuterPcs);
};

  const handleBundleChange = (value) => {
    setBundles(value);
  };

  useEffect(() => {
    const totalInner = Object.values(innerPcs).reduce(
      (sum, pcs) => sum + Number(pcs || 0),
      0
    );
    const totalOuter = Object.values(outerPcs).reduce(
      (sum, pcs) => sum + Number(pcs || 0),
      0
    );
    setTotalInnerPcs(totalInner);
    setTotalOuterPcs(totalOuter);

    const totalInnerPerBundle = sizes.reduce((sum, size) => {
      const inner = innerPcs[size] || 0;
      const outer = outerPcs[size] || 0;
      return sum + inner * outer;
    }, 0);

    setTotalInnerPcsPerBundle(totalInnerPerBundle);
    const totalProducts = totalInnerPerBundle * bundles;
    setTotalProducts(totalProducts);
  }, [innerPcs, outerPcs, bundles, sizes]);


  const handleSubmit = async () => {
    const stockData = {
      stockInId,
      product_style_number: styleNumber,
      product_id: selectedProductId, 
      packing_type: assortmentType,
      total_pcs: totalProducts,
      stock_by_size: sizes.map((size) => ({
        size,
        innerPcs: innerPcs[size],
        outerPcs: outerPcs[size],
      })),
      no_bundles: bundles,
    };

    console.log("stockData", stockData);
    

    try {
      if (selectedProductId) {
        await apiService.put(
          `/stocks/stockIn/${selectedProductId}`,
          stockInData
        );
        close();
        getAllStocks();
      } else {
        await apiService.post(`/stocks/stockIn`, stockInData);
        close();
        getAllStocks();
      }
    } catch (error) {
      console.error("Error creating stock:", error);
    }
  };


  



 

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={close}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[80vw] h-screen max-h-[90vh] overflow-auto py-10">
        <div className="flex justify-between items-center mb-4 relative px-20">
          <div className="flex justify-center gap-3">
            <h2 className="text-2xl font-medium">EDIT STOCK INWARD</h2>
          </div>
          {/* <p className="text-2xl font-medium">Date:</p> */}
          <button className="text-black absolute right-5" onClick={close}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between px-20 my-5 mt-6">
          <div className="flex flex-col grid grid-cols-3 2xl:grid-cols-5 gap-2">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="styleNumber">
                  Style No:
                </label>
                <input
                  type="text"
                  id="styleNumber"
                  value={stockInData.Product.style_no}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Style Number"
                />
                {styleDropdown && stockInData.Product.style_no && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {styleSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleStyleSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.style_no}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="referenceNo">
                Reference No:
              </label>
              <input
                type="text"
                id="referenceNo"
                value={stockInData.Product.Reference.reference_no}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Category.categoryName}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="productType">
                Product Type:
              </label>
              <input
                type="text"
                id="productType"
                value={stockInData.Product.ProductType.product}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="brand">
                Brand:
              </label>
              <input
                type="text"
                id="brand"
                value={stockInData.Product.Brand.brandName}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Fabric.fabricName}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="fabric-finish">
                Fabric Fisnish:
              </label>
              <input
                type="text"
                id="fabric-finish"
                value={stockInData.Product.FabricFinish.fabricFinishName}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Gsm.gsmValue}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.KnitType.knitType}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Color.colorName}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Size.sizes}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="decoration">
                Decoration:
              </label>
              <input
                type="text"
                id="decoration"
                value={stockInData.Product.Decoration.decorationName}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="print">
                Print or Emb:
              </label>
              <input
                type="text"
                id="print"
                value={stockInData.Product.PrintEmbName.printType}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.StitchDetail.stictchDetail}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Neck.neckType}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Length.lengthType}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.Sleeve.sleeveName}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
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
                value={stockInData.Product.PackingMethod.packingType}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-semibold" htmlFor="measurement">
                Measurement Chart:
              </label>
              <input
                type="text"
                id="measurement"
                value={stockInData.Product.MeasurementChart.name}
                className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                disabled
              />
            </div>
          </div>

          <div className="flex items-center justify-center border border-gray-400 h-64 mt-10">
            <img
              src={
                stockInData.Product.images[0] ||
                "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1722163869~exp=1722167469~hmac=37361beb0ca1a1c652d36c9ca94818f793a54d21822edab80e80c6e43a9b7b37&w=740"
              }
              alt="Stock"
              className="h-64 w-60 object-cover rounded"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3 mx-20">
          <label className="font-semibold" htmlFor="shortDescription">
            Short Description:
          </label>
          <textarea
            id="shortDescription"
            value={stockInData.Product.short_description}
            className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
            rows="1"
            disabled
          />
        </div>

        <div className="flex flex-col gap-2 mt-3 mx-20">
          <label className="font-semibold" htmlFor="fullDescription">
            Full Description:
          </label>
          <textarea
            id="fullDescription"
            value={stockInData.Product.full_description}
            className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
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
          <div className="flex gap-4 border border-gray-400 px-5 justify-between">
            <div className="p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-4">Quantity per size:</h4>
              <div className="flex flex-col gap-4">
              {stockInData.Product.Size.sizes.map((size, index) => (
                  <div key={index} className="flex items-center gap-4 mb-2">
                    <div className="w-16">{size}: </div>
                    <input
                      type="number"
                      value={stockInData.stock_by_size.find(item => item.sizeName === size.sizeName)?.innerPcs || 0}
                      onChange={(e) => handleInnerPcsChange(e, size.sizeName)}
                      placeholder="Inner Pcs"
                      className="border border-gray-300 rounded-md px-2 py-1 w-24"
                      disabled={assortmentType === "solid"}
                    />
                    <input
                      type="number"
                      value={stockInData.stock_by_size.find(item => item.sizeName === size.sizeName)?.outerPcs || 0}
                      onChange={(e) => handleOuterPcsChange(e, size.sizeName)}
                      placeholder="Outer Pcs"
                      className="border border-gray-300 rounded-md px-2 py-1 w-24"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-10 content-center">
              <label className="font-semibold">Number of Bundles: </label>
              <input
                type="number"
                value={stockInData.no_bundles}
                onChange={(e) => setBundles(Number(e.target.value))}
                placeholder="Bundles"
                className="border border-gray-300 rounded-md px-2 py-1 w-24"
              />
            </div>

            <div className="p-4 bg-gray-100 flex items-center justify-center my-8">
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
                  <span>{stockInData.total_pcs}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4">
            <p>{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex justify-end px-20 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            CREATE STOCK INWARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStockInModal;
