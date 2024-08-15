import React, { useState } from "react";
import closeIcon from "../../../assets/close-modal-icon.svg";
import apiService from "../../../apiService";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const AddProductModal = ({ show, onClose }) => {
  const [styleNo, setStyleNo] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [brand, setBrand] = useState("");
  const [fabric, setFabric] = useState("");
  const [fabricFinish, setFabricFinish] = useState("");
  const [gsm, setGsm] = useState(null);
  const [knitType, setKnitType] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [decorations, setDecorations] = useState("");
  const [printOrEmbName, setPrintOrEmbName] = useState("");
  const [stitchDetails, setStitchDetails] = useState("");
  const [neck, setNeck] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [length, setLength] = useState("");
  const [measurementChart, setMeasurementChart] = useState("");
  const [selectedMeasurementImage, setSelectedMeasurementImage] = useState(null);
  const [packingMethod, setPackingMethod] = useState("");
  const [category, setCategory] = useState("");
  const [productTypes, setProductTypes] = useState("");
  const [innerPcs, setInnerPcs] = useState(null);
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //suggestion brand states
  const [brandDropdown, setBrandDropdown] = useState(false);
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  //suggestion fabric states
  const [fabricDropdown, setFabricDropdown] = useState(false);
  const [fabricSuggestions, setFabricSuggestions] = useState([]);
  const [selectedFabricId, setSelectedFabricId] = useState(null);

  //suggestion reference No states
  const [referenceDropdown, setReferenceDropdown] = useState(false);
  const [referenceSuggestions, setReferenceSuggestions] = useState([]);
  const [selectedReferenceId, setSelectedReferenceId] = useState(null);

  //suggestion Fabric Finish states
  const [fabricFinishDropdown, setFabricFinishDropdown] = useState(false);
  const [fabricFinishSuggestions, setFabricFinishSuggestions] = useState([]);
  const [selectedFabricFinishId, setSelectedFabricFinishId] = useState(null);

  //suggestion GSM states
  const [gsmDropdown, setGsmDropdown] = useState(false);
  const [gsmSuggestions, setGsmSuggestions] = useState([]);
  const [selectedGsmId, setSelectedGsmId] = useState(null);

  //suggestion knit type states
  const [knitDropdown, setKnitDropdown] = useState(false);
  const [knitSuggestions, setKnitSuggestions] = useState([]);
  const [selectedKnitId, setSelectedKnitId] = useState(null);

  //suggestion color states
  const [colorDropdown, setColorDropdown] = useState(false);
  const [colorSuggestions, setColorSuggestions] = useState([]);
  const [selectedColorId, setSelectedColorId] = useState(null);

  //suggestion size states
  const [sizeDropdown, setSizeDropdown] = useState(false);
  const [sizeSuggestions, setSizeSuggestions] = useState([]);
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  //suggestion decorations states
  const [decorationDropdown, setDecorationDropdown] = useState(false);
  const [decorationSuggestions, setDecorationSuggestions] = useState([]);
  const [selecteDecorationId, setSelectedDecorationId] = useState(null);

  //suggestion print states
  const [printDropdown, setPrintDropdown] = useState(false);
  const [printSuggestions, setPrintSuggestions] = useState([]);
  const [selectedPrintId, setSelectedPrintId] = useState(null);

  //suggestion stitchDetails states
  const [stitchDetailDropdown, setStitchDetailDropdown] = useState(false);
  const [stitchDetailSuggestions, setStitchDetailSuggestions] = useState([]);
  const [selectedStitchDetailId, setSelectedStitchDetailId] = useState(null);

  //suggestion neck states
  const [neckDropdown, setNeckDropdown] = useState(false);
  const [neckSuggestions, setNeckSuggestions] = useState([]);
  const [selectedNeckId, setSelectedNeckId] = useState(null);

  //suggestion sleeve states
  const [sleeveDropdown, setSleeveDropdown] = useState(false);
  const [sleeveSuggestions, setSleeveSuggestions] = useState([]);
  const [selectedSleeveId, setSelectedSleeveId] = useState(null);

  //suggestion length states
  const [lengthDropdown, setLengthDropdown] = useState(false);
  const [lengthSuggestions, setLengthSuggestions] = useState([]);
  const [selectedLengthId, setSelectedLengthId] = useState(null);

  //suggestion packing states
  const [packingDropdown, setPackingDropdown] = useState(false);
  const [packingSuggestions, setPackingSuggestions] = useState([]);
  const [selectedPackingId, setSelectedPackingId] = useState(null);

  //suggestion mesurement states
  const [mesurementDropdown, setMesurementDropdown] = useState(false);
  const [mesurementSuggestions, setMesurementSuggestions] = useState([]);
  const [selectedMesurementId, setSelectedMesurementId] = useState(null);
  const [selectedMesurement, setSelectedMesurement] = useState(null);

  //suggestion category states
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  //suggestion productTypes states
  const [productTypesDropdown, setProductTypesDropdown] = useState(false);
  const [productTypesSuggestions, setProductTypesSuggestions] = useState([]);
  const [selectedProductTypesId, setSelectedProductTypesId] = useState(null);

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [loading, setLoading] = useState(false);

  // fetch brand
  const fetchBrandSuggestions = async (brandInput) => {
    try {
      if (brandInput.length > 0) {
        const response = await apiService.get("/brands/getall");
        const filteredBrands = response.data.filter((b) =>
          b.brandName.toLowerCase().startsWith(brandInput.toLowerCase())
        );
        setBrandSuggestions(filteredBrands);
      } else {
        setBrandSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleBrandChange = (e) => {
    const brandInput = e.target.value;
    setBrand(brandInput);
    setBrandDropdown(true);
    fetchBrandSuggestions(brandInput);
  };

  const handleBrandSelect = (brand) => {
    setBrand(brand.brandName);
    setSelectedBrandId(brand.id);
    setBrandSuggestions([]);
    setBrandDropdown(false);
  };

  const handleAddNewBrand = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new brand:", brand);
    // Close the dropdown after adding the buyer
    setBrandDropdown(false);
  };

  // fetch reference no
  const fetchReferenceSuggestions = async (referenceInput) => {
    try {
      if (referenceInput.length > 0) {
        const response = await apiService.get("/references/getall");
        const filteredReference = response.data.filter((b) =>
          b.reference_no.toLowerCase().startsWith(referenceInput.toLowerCase())
        );
        setReferenceSuggestions(filteredReference);
      } else {
        setReferenceSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching Reference No:", error);
    }
  };

  const handleReferenceChange = (e) => {
    const referenceInput = e.target.value;
    setReferenceNo(referenceInput);
    setReferenceDropdown(true);
    fetchReferenceSuggestions(referenceInput);
  };

  const handleReferenceSelect = (ref) => {
    setReferenceNo(ref.reference_no);
    setSelectedReferenceId(ref.id);
    setReferenceSuggestions([]);
    setReferenceDropdown(false);
  };

  const handleAddNewReference = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new reference NO:", referenceNo);
    // Close the dropdown after adding the buyer
    setReferenceDropdown(false);
  };

  // fetch fabric
  const fetchFabricSuggestions = async (fabricInput) => {
    try {
      if (fabricInput.length > 0) {
        const response = await apiService.get("/fabrics/getall");
        const filteredfabrics = response.data.filter((b) =>
          b.fabricName.toLowerCase().startsWith(fabricInput.toLowerCase())
        );
        setFabricSuggestions(filteredfabrics);
      } else {
        setFabricSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching fabrics:", error);
    }
  };

  const handleFabricChange = (e) => {
    const fabricInput = e.target.value;
    setFabric(fabricInput);
    setFabricDropdown(true);
    fetchFabricSuggestions(fabricInput);
  };

  const handleFabricSelect = (fabric) => {
    setFabric(fabric.fabricName);
    setSelectedFabricId(fabric.id);
    setFabricSuggestions([]);
    setFabricDropdown(false);
  };

  const handleAddNewFabric = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new fabric:", fabric);
    // Close the dropdown after adding the buyer
    setFabricDropdown(false);
  };

  // fetch Fabric Finish
  const fetchFabricFinishSuggestions = async (fabricFinishInput) => {
    try {
      if (fabricFinishInput.length > 0) {
        const response = await apiService.get("/fabricFinishes/getall");
        const filteredFabricFinishs = response.data.filter((b) =>
          b.fabricFinishName
            .toLowerCase()
            .startsWith(fabricFinishInput.toLowerCase())
        );
        setFabricFinishSuggestions(filteredFabricFinishs);
      } else {
        setFabricFinishSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching fabric finish:", error);
    }
  };

  const handleFabricFinishChange = (e) => {
    const fabricFinishInput = e.target.value;
    setFabricFinish(fabricFinishInput);
    setFabricFinishDropdown(true);
    fetchFabricFinishSuggestions(fabricFinishInput);
  };

  const handleFabricFinishSelect = (fabricFinish) => {
    setFabricFinish(fabricFinish.fabricFinishName);
    setSelectedFabricFinishId(fabricFinish.id);
    setFabricFinishSuggestions([]);
    setFabricFinishDropdown(false);
  };

  const handleAddNewFabricFinish = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new fabric finish:", fabricFinish);
    // Close the dropdown after adding the buyer
    setFabricFinishDropdown(false);
  };

  // fetch GSM
  const fetchGsmSuggestions = async (gsmInput) => {
    try {
      if (gsmInput.length > 0) {
        const response = await apiService.get("/gsms/getall");
        const filteredGsms = response.data.filter((b) =>
          b.gsmValue.toString().startsWith(gsmInput)
        );
        console.log(gsmInput, filteredGsms);
        setGsmSuggestions(filteredGsms);
      } else {
        setGsmSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching gsm:", error);
    }
  };

  const handleGsmChange = (e) => {
    const gsmInput = e.target.value;
    setGsm(gsmInput);
    setGsmDropdown(true);
    fetchGsmSuggestions(gsmInput);
  };

  const handleGsmSelect = (gsm) => {
    setGsm(gsm.gsmValue);
    setSelectedGsmId(gsm.id);
    setGsmSuggestions([]);
    setGsmDropdown(false);
  };

  const handleAddNewGsm = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new gsm:", gsm);
    // Close the dropdown after adding the buyer
    setGsmDropdown(false);
  };

  // fetch knit type
  const fetchKnitSuggestions = async (knitInput) => {
    try {
      if (knitInput.length > 0) {
        const response = await apiService.get("/knitTypes/getall");
        const filteredKnit = response.data.filter((b) =>
          b.knitType.toLowerCase().startsWith(knitInput.toLowerCase())
        );
        setKnitSuggestions(filteredKnit);
      } else {
        setKnitSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching knit type:", error);
    }
  };

  const handleKnitChange = (e) => {
    const knitInput = e.target.value;
    setKnitType(knitInput);
    setKnitDropdown(true);
    fetchKnitSuggestions(knitInput);
  };

  const handleKnitSelect = (knit) => {
    setKnitType(knit.knitType);
    setSelectedKnitId(knit.id);
    setKnitSuggestions([]);
    setKnitDropdown(false);
  };

  const handleAddNewKnitType = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new knit type:", knitType);
    // Close the dropdown after adding the buyer
    setKnitDropdown(false);
  };

  // fetch color
  const fetchColorSuggestions = async (colorInput) => {
    try {
      if (colorInput.length > 0) {
        const response = await apiService.get("/colors/getall");
        const filteredColors = response.data.filter((b) =>
          b.colorName.toLowerCase().startsWith(colorInput.toLowerCase())
        );
        setColorSuggestions(filteredColors);
      } else {
        setColorSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const handleColorChange = (e) => {
    const colorInput = e.target.value;
    setColors(colorInput);
    setColorDropdown(true);
    fetchColorSuggestions(colorInput);
  };

  const handleColorSelect = (color) => {
    setColors(color.colorName);
    setSelectedColorId(color.id);
    setColorSuggestions([]);
    setColorDropdown(false);
  };

  const handleAddNewColor = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new color:", colors);
    // Close the dropdown after adding the buyer
    setColorDropdown(false);
  };

  // fetch size
  const fetchSizeSuggestions = async (sizeInput) => {
    try {
      if (sizeInput.length > 0) {
        const response = await apiService.get("/sizes/getall");
        const filteredSizes = response.data.filter((b) =>
          b.type_name.toLowerCase().startsWith(sizeInput.toLowerCase())
        );
        setSizeSuggestions(filteredSizes);
      } else {
        setSizeSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const handleSizeChange = (e) => {
    const sizeInput = e.target.value;
    setSizes(sizeInput);
    setSizeDropdown(true);
    fetchSizeSuggestions(sizeInput);
  };

  const handleSizeSelect = (size) => {
    setSizes(size.sizes);
    setSelectedSizeId(size.id);
    setSizeSuggestions([]);
    setSizeDropdown(false);
  };

  const handleAddNewSize = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new size:", sizes);
    // Close the dropdown after adding the buyer
    setSizeDropdown(false);
  };

  // fetch decoration
  const fetchDecorationSuggestions = async (decorationInput) => {
    try {
      if (decorationInput.length > 0) {
        const response = await apiService.get("/decorations/getall");
        const filteredDecorations = response.data.filter((b) =>
          b.decorationName
            .toLowerCase()
            .startsWith(decorationInput.toLowerCase())
        );
        setDecorationSuggestions(filteredDecorations);
      } else {
        setDecorationSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching decorations:", error);
    }
  };

  const handleDecorationChange = (e) => {
    const decorationInput = e.target.value;
    setDecorations(decorationInput);
    setDecorationDropdown(true);
    fetchDecorationSuggestions(decorationInput);
  };

  const handleDecorationSelect = (decoration) => {
    setDecorations(decoration.decorationName);
    setSelectedDecorationId(decoration.id);
    setDecorationSuggestions([]);
    setDecorationDropdown(false);
  };

  const handleAddNewDecoration = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new decoration:", decorations);
    // Close the dropdown after adding the buyer
    setDecorationDropdown(false);
  };

  // fetch print
  const fetchPrintSuggestions = async (printInput) => {
    try {
      if (printInput.length > 0) {
        const response = await apiService.get("/printEmb/getall");
        const filteredPrintEmb = response.data.filter((b) =>
          b.printType.toLowerCase().startsWith(printInput.toLowerCase())
        );
        setPrintSuggestions(filteredPrintEmb);
      } else {
        setPrintSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching prints:", error);
    }
  };

  const handlePrintChange = (e) => {
    const printInput = e.target.value;
    setPrintOrEmbName(printInput);
    setPrintDropdown(true);
    fetchPrintSuggestions(printInput);
  };

  const handlePrintSelect = (print) => {
    setPrintOrEmbName(print.printType);
    setSelectedPrintId(print.id);
    setPrintSuggestions([]);
    setPrintDropdown(false);
  };

  const handleAddNewPrint = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new print/Emb:", printOrEmbName);
    // Close the dropdown after adding the buyer
    setPrintDropdown(false);
  };

  // fetch stitchDetails
  const fetchStitchSuggestions = async (stitchInput) => {
    try {
      if (stitchInput.length > 0) {
        const response = await apiService.get("/stitchDetails/getall");
        const filteredstitchDetails = response.data.filter((b) =>
          b.stictchDetail.toLowerCase().startsWith(stitchInput.toLowerCase())
        );
        setStitchDetailSuggestions(filteredstitchDetails);
      } else {
        setStitchDetailSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching stitchDetails:", error);
    }
  };

  const handleStitchDetailChange = (e) => {
    const stitchInput = e.target.value;
    setStitchDetails(stitchInput);
    setStitchDetailDropdown(true);
    fetchStitchSuggestions(stitchInput);
  };

  const handleStitchDetailSelect = (stitchDetails) => {
    setStitchDetails(stitchDetails.stictchDetail);
    setSelectedStitchDetailId(stitchDetails.id);
    setStitchDetailSuggestions([]);
    setStitchDetailDropdown(false);
  };

  const handleAddNewStitch = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new stitch detail:", stitchDetails);
    // Close the dropdown after adding the buyer
    setStitchDetailDropdown(false);
  };

  // fetch neck
  const fetchNeckSuggestions = async (neckInput) => {
    try {
      if (neckInput.length > 0) {
        const response = await apiService.get("/necks/getall");
        const filteredNecks = response.data.filter((b) =>
          b.neckType.toLowerCase().startsWith(neckInput.toLowerCase())
        );
        setNeckSuggestions(filteredNecks);
      } else {
        setNeckSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching neck:", error);
    }
  };

  const handleNeckChange = (e) => {
    const neckInput = e.target.value;
    setNeck(neckInput);
    setNeckDropdown(true);
    fetchNeckSuggestions(neckInput);
  };

  const handleNeckSelect = (neck) => {
    setNeck(neck.neckType);
    setSelectedNeckId(neck.id);
    setNeckSuggestions([]);
    setNeckDropdown(false);
  };

  const handleAddNewNeck = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new neck:", neck);
    // Close the dropdown after adding the buyer
    setNeckDropdown(false);
  };

  // fetch sleeve
  const fetchSleeveSuggestions = async (sleeveInput) => {
    try {
      if (sleeveInput.length > 0) {
        const response = await apiService.get("/sleeves/getall");
        const filteredSleeves = response.data.filter((b) =>
          b.sleeveName.toLowerCase().startsWith(sleeveInput.toLowerCase())
        );
        setSleeveSuggestions(filteredSleeves);
      } else {
        setSleeveSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching sleeve:", error);
    }
  };

  const handleSleeveChange = (e) => {
    const sleeveInput = e.target.value;
    setSleeve(sleeveInput);
    setSleeveDropdown(true);
    fetchSleeveSuggestions(sleeveInput);
  };

  const handleSleeveSelect = (sleeve) => {
    setSleeve(sleeve.sleeveName);
    setSelectedSleeveId(sleeve.id);
    setSleeveSuggestions([]);
    setSleeveDropdown(false);
  };

  const handleAddNewSleeve = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new sleeve:", sleeve);
    // Close the dropdown after adding the buyer
    setSleeveDropdown(false);
  };

  // fetch length
  const fetchLengthSuggestions = async (lengthInput) => {
    try {
      if (lengthInput.length > 0) {
        const response = await apiService.get("/lengths/getall");
        const filteredlengths = response.data.filter((b) =>
          b.lengthType.toLowerCase().startsWith(lengthInput.toLowerCase())
        );
        setLengthSuggestions(filteredlengths);
      } else {
        setLengthSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching lengths:", error);
    }
  };

  const handleLengthChange = (e) => {
    const lengthInput = e.target.value;
    setLength(lengthInput);
    setLengthDropdown(true);
    fetchLengthSuggestions(lengthInput);
  };

  const handleLengthSelect = (length) => {
    setLength(length.lengthType);
    setSelectedLengthId(length.id);
    setLengthSuggestions([]);
    setLengthDropdown(false);
  };

  const handleAddNewLength = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new length:", length);
    // Close the dropdown after adding the buyer
    setLengthDropdown(false);
  };

  // fetch packingMethods
  const fetchPackingMethodSuggestions = async (packingMethodInput) => {
    try {
      if (packingMethodInput.length > 0) {
        const response = await apiService.get("/packingMethods/getall");
        const filteredPackingMethods = response.data.filter((b) =>
          b.packingType
            .toLowerCase()
            .startsWith(packingMethodInput.toLowerCase())
        );
        setPackingSuggestions(filteredPackingMethods);
      } else {
        setPackingSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching packingMethods:", error);
    }
  };

  const handlePackingMethodChange = (e) => {
    const packingMethodInput = e.target.value;
    setPackingMethod(packingMethodInput);
    setPackingDropdown(true);
    fetchPackingMethodSuggestions(packingMethodInput);
  };

  const handlePackingMethodSelect = (packingMethod) => {
    setPackingMethod(packingMethod.packingType);
    setSelectedPackingId(packingMethod.id);
    setPackingSuggestions([]);
    setPackingDropdown(false);
  };

  const handleAddNewPackingMethod = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new packing method:", packingMethod);
    // Close the dropdown after adding the buyer
    setPackingDropdown(false);
  };

  // fetch mesurementChart
  const fetchMesurementChartSuggestions = async (mesurementChartInput) => {
    try {
      if (mesurementChartInput.length > 0) {
        const response = await apiService.get("/mesurementCharts/getall");
        const filteredMesurementCharts = response.data.filter((b) =>
          b.name.toLowerCase().startsWith(mesurementChartInput.toLowerCase())
        );
        setMesurementSuggestions(filteredMesurementCharts);
      } else {
        setMesurementSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching mesurementChart:", error);
    }
  };

  const handleMesurementChartChange = (e) => {
    const mesurementChartInput = e.target.value;
    setMeasurementChart(mesurementChartInput);
    setMesurementDropdown(true);
    fetchMesurementChartSuggestions(mesurementChartInput);
  };

  const handleMesurementChartSelect = (mesurementChart) => {
    setMeasurementChart(mesurementChart.name);
    setSelectedMeasurementImage(mesurementChart.sample_size_file);
    setSelectedMesurement(mesurementChart);
    setSelectedMesurementId(mesurementChart.id);
    setMesurementSuggestions([]);
    setMesurementDropdown(false);
  };

  const handleAddNewMeasurement = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new Measurements:", measurementChart);
    // Close the dropdown after adding the buyer
    setMesurementDropdown(false);
  };

  // fetch categorie
  const fetchCategorySuggestions = async (categoryInput) => {
    try {
      if (categoryInput.length > 0) {
        const response = await apiService.get("/categories/getall");
        const filteredCategories = response.data.filter((b) =>
          b.categoryName.toLowerCase().startsWith(categoryInput.toLowerCase())
        );
        setCategorySuggestions(filteredCategories);
      } else {
        setCategorySuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryInput = e.target.value;
    setCategory(categoryInput);
    setCategoryDropdown(true);
    fetchCategorySuggestions(categoryInput);
  };

  const handleCategorySelect = (category) => {
    setCategory(category.categoryName);
    setSelectedCategoryId(category.id);
    setCategorySuggestions([]);
    setCategoryDropdown(false);
  };

  const handleAddNewCategory = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new category:", category);
    // Close the dropdown after adding the buyer
    setCategoryDropdown(false);
  };

   // fetch product types
   const fetchProductTypesSuggestions = async (productTypesInput) => {
    try {
      if (productTypesInput.length > 0) {
        const response = await apiService.get("/productTypes/getall");
        const filteredProductTypes = response.data.filter((b) =>
          b.product.toLowerCase().startsWith(productTypesInput.toLowerCase())
        );
        setProductTypesSuggestions(filteredProductTypes);
      } else {
        setProductTypesSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleProductTypesChange = (e) => {
    const productTypesInput = e.target.value;
    setProductTypes(productTypesInput);
    setProductTypesDropdown(true);
    fetchProductTypesSuggestions(productTypesInput);
  };

  const handleProductTypesSelect = (productTypes) => {
    setProductTypes(productTypes.product);
    setSelectedProductTypesId(productTypes.id);
    setProductTypesSuggestions([]);
    setProductTypesDropdown(false);
  };

  const handleAddNewProductType = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new product types:", productTypes);
    // Close the dropdown after adding the buyer
    setProductTypesDropdown(false);
  };

  // Image uploader
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 13) {
      alert("You can only upload up to 13 images.");
      return;
    }

    setImages([...images, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  const handleSelectPrimary = (index) => {
    const newImages = [...images];
    const primaryImage = newImages.splice(index, 1);
    setImages([primaryImage[0], ...newImages]);

    const newPreviews = [...previews];
    const primaryPreview = newPreviews.splice(index, 1);
    setPreviews([primaryPreview[0], ...newPreviews]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newImages = Array.from(images);
    const [movedImage] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, movedImage);
    setImages(newImages);

    const newPreviews = Array.from(previews);
    const [movedPreview] = newPreviews.splice(result.source.index, 1);
    newPreviews.splice(result.destination.index, 0, movedPreview);
    setPreviews(newPreviews);
  };

  
  const handleSubmit = async () => {
    setLoading(true);

     // Ensure primary image is first
     const updatedImages = [...images];
     if (updatedImages[0] !== images[0]) {
       const primaryImage = updatedImages.splice(images.indexOf(images[0]), 1);
       updatedImages.unshift(primaryImage[0]);
     }

    const formData = new FormData();
    formData.append("style_no", styleNo);
    formData.append("reference_id", selectedReferenceId);
    formData.append("category_id", selectedCategoryId);
    formData.append("productType_id", selectedProductTypesId);
    formData.append("brand_id", selectedBrandId);
    formData.append("fabric_id", selectedFabricId);
    formData.append("fabric_finish_id", selectedFabricFinishId);
    formData.append("gsm_id", selectedGsmId);
    formData.append("knit_type_id", selectedKnitId);
    formData.append("color_id", selectedColorId);
    formData.append("size_id", selectedSizeId);
    formData.append("decoration_id", selecteDecorationId);
    formData.append("print_emb_id", selectedPrintId);
    formData.append("stitch_detail_id", selectedStitchDetailId);
    formData.append("neck_id", selectedNeckId);
    formData.append("sleeve_id", selectedSleeveId);
    formData.append("length_id", selectedLengthId);
    formData.append("packing_method_id", selectedPackingId);
    formData.append("inner_pcs", innerPcs);
    formData.append("measurement_chart_id", selectedMesurementId);
    formData.append("short_description", shortDescription);
    formData.append("full_description", fullDescription);
    images.forEach((image) => {
      formData.append("images", image); 
    });
  
    try {
      const response = await apiService.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      if (response.status === 201) {
        setSuccessMessage("Product added successfully.");
        setErrorMessage("");
        // Clear messages after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 5000);

        setLoading(false);
        onClose();
      } else if (response.status === 409) {
        setErrorMessage("Reference number on this Product already exists.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Reference number on this Product already exists.");

        // Clear messages after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 5000);
      } else {
        setErrorMessage("Error adding Product.");

        // Clear messages after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 5000);
      }
      setSuccessMessage("");
      console.error("Error creating product:", error);
      setLoading(false);
    }
  };
  
  if (!show) return null;

  const handleModalClose = () => {
    setPreviews([]);
    setStyleNo("");
    setReferenceNo("");
    setCategory("");
    setProductTypes("");
    setBrand("");
    setFabric("");
    setFabricFinish("");
    setGsm(null);
    setKnitType("");
    setColors("");
    setSizes("");
    setDecorations("");
    setPrintOrEmbName("");
    setStitchDetails("");
    setNeck("");
    setSleeve("");
    setLength("");
    setPackingMethod("");
    setInnerPcs(null);
    setMeasurementChart("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[80vw] h-screen max-h-[90vh] overflow-y-auto lg:overflow-auto">
        <div className="px-10 py-5">
          <div className="flex justify-center">
            {" "}
            {/* Centering the title */}
            <h2 className="text-lg font-bold">Add Product</h2>
            <button
              className="absolute right-5 cursor-pointer"
              onClick={handleModalClose}
            >
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <hr className="my-2" />
          <div className="px-40">

          <div className="flex flex-col gap-3 mt-10">
      <div className="flex gap-4">
        <h1 className="font-bold">Product Images</h1>
        <span className="text-sm text-gray-400 mt-1 relative px-2">
          <span className="absolute left-0 top-0 text-gray-600">*</span>
          Choose up to 13 images
        </span>
      </div>

      <div className="min-h-40 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {previews.map((preview, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative cursor-pointer"
                          onClick={() => handleSelectPrimary(index)}
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className={`w-full h-32 object-cover rounded-lg shadow-md ${index === 0 ? 'border-4 border-blue-500' : ''}`}
                          />
                          {index === 0 && (
                            <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white rounded-lg px-2 py-1 text-xs">
                              Primary
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-1.5 focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="styleNo">
                  Style No:
                </label>
                <input
                  type="text"
                  id="styleNo"
                  value={styleNo}
                  onChange={(e) => setStyleNo(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Style No"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="RefNo">
                  Reference Number:
                </label>
                <input
                  type="text"
                  id="referenceNo"
                  value={referenceNo}
                  onChange={handleReferenceChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Reference Number"
                />
                {referenceDropdown && referenceNo && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {referenceSuggestions.length > 0 ? (
                      referenceSuggestions.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleReferenceSelect(item)}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                          {item.reference_no}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewReference}
                      >
                        Add New Buyer: "{referenceNo}"
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="category">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Category Name"
                />
                {categoryDropdown && category && (
                  <ul className="absolute top-16 left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {categorySuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleCategorySelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.categoryName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="categorie">
                  Product Type:
                </label>
                <input
                  type="text"
                  id="categorie"
                  value={productTypes}
                  onChange={handleProductTypesChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Category Name"
                />
                {productTypesDropdown && productTypes && (
                  <ul className="absolute top-16 left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {productTypesSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleProductTypesSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.product}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="brand">
                  Brand Name:
                </label>
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={handleBrandChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Brand Name"
                />
                {brandDropdown && brand && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {brandSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleBrandSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.brandName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="fabric">
                  Fabric:
                </label>
                <input
                  type="text"
                  id="fabric"
                  value={fabric}
                  onChange={handleFabricChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Fabric"
                />
                {fabricDropdown && fabric && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {fabricSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleFabricSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.fabricName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="fabricFinish">
                  Fabric Finish:
                </label>
                <input
                  type="text"
                  id="fabricFinish"
                  value={fabricFinish}
                  onChange={handleFabricFinishChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Fabric Finish"
                />
                {fabricFinishDropdown && fabricFinish && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {fabricFinishSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleFabricFinishSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.fabricFinishName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="gsm">
                  GSM:
                </label>
                <input
                  type="number"
                  id="gsm"
                  value={gsm}
                  onChange={handleGsmChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter GSM"
                />
                {gsmDropdown && gsm && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {gsmSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleGsmSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.gsmValue}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="knitType">
                  Knit Type:
                </label>
                <input
                  type="text"
                  id="knitType"
                  value={knitType}
                  onChange={handleKnitChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Knit Type"
                />
                {knitDropdown && knitType && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {knitSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleKnitSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.knitType}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="colors">
                  Colors:
                </label>
                <input
                  type="text"
                  id="colors"
                  value={colors}
                  onChange={handleColorChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Colors"
                />
                {colorDropdown && colors && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {colorSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleColorSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.colorName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="sizes">
                  Sizes:
                </label>
                <input
                  type="text"
                  id="sizes"
                  value={sizes}
                  onChange={handleSizeChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Sizes"
                />
                {sizeDropdown && sizes && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {sizeSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSizeSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.type_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="decorations">
                  Decorations:
                </label>
                <input
                  type="text"
                  id="decorations"
                  value={decorations}
                  onChange={handleDecorationChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Decorations"
                />
                {decorationDropdown && decorations && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {decorationSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleDecorationSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.decorationName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="printOrEmbName">
                  Print {"("}or{")"} Emb Name:
                </label>
                <input
                  type="text"
                  id="printorEmbName"
                  value={printOrEmbName}
                  onChange={handlePrintChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Print (or) Emb Name"
                />
                {printDropdown && printOrEmbName && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {printSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handlePrintSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.printType}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="stitchDetails">
                  Stitch Details:
                </label>
                <input
                  type="text"
                  id="stitchDetails"
                  value={stitchDetails}
                  onChange={handleStitchDetailChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Stitch Details"
                />
                {stitchDetailDropdown && stitchDetails && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {stitchDetailSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleStitchDetailSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.stictchDetail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="neck">
                  Neck:
                </label>
                <input
                  type="text"
                  id="neck"
                  value={neck}
                  onChange={handleNeckChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Neck"
                />
                {neckDropdown && neck && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {neckSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleNeckSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.neckType}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="sleeve">
                  Sleeve:
                </label>
                <input
                  type="text"
                  id="sleeve"
                  value={sleeve}
                  onChange={handleSleeveChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Sleeve"
                />
                {sleeveDropdown && sleeve && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {sleeveSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSleeveSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.sleeveName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="length">
                  Length:
                </label>
                <input
                  type="text"
                  id="length"
                  value={length}
                  onChange={handleLengthChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Length"
                />
                {lengthDropdown && length && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {lengthSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleLengthSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.lengthType}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="packingMethod">
                  Packing Method:
                </label>
                <input
                  type="text"
                  id="packingMethod"
                  value={packingMethod}
                  onChange={handlePackingMethodChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Packing Method"
                />
                {packingDropdown && packingMethod && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {packingSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handlePackingMethodSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.packingType}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="piecesPerInner">
                  No.of pcs per inner:
                </label>
                <input
                  type="number"
                  id="piecesPerInner"
                  value={innerPcs}
                  onChange={(e) => setInnerPcs(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter No of pieces per inner"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="mesurementChart">
                  Measurement Chart:
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    id="mesurementChart"
                    value={measurementChart}
                    onChange={handleMesurementChartChange}
                    className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                    placeholder="Enter Measurement Chart"
                  />                
                {mesurementDropdown && measurementChart && (
                  <ul className="absolute top-16 left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {mesurementSuggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleMesurementChartSelect(item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </div>

              {selectedMesurement && selectedMesurement.sample_size_file && (
                <div className="flex justify-center mt-4">
                  <img
                    src={selectedMesurement.sample_size_file}
                    alt="Measurement Chart"
                    className="max-w-full h-auto rounded-md"
                  />
                </div>
              )}
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

            <div className="flex flex-col gap-2 mt-3">
              <label className="font-semibold" htmlFor="shortDescription">
                Short Description:
              </label>
              <textarea
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                rows="1"
                placeholder="Enter Short Description"
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label className="font-semibold" htmlFor="fullDescription">
                Full Description:
              </label>
              <textarea
                id="fullDescription"
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-2 bg-zinc-200"
                rows="2"
                placeholder="Enter Full Description"
              />
            </div>
            
            <div className="mt-10 flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;