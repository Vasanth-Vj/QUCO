import React, { useState, useEffect } from "react";
import editIcon from "../../../assets/edit-icon.svg";
import closeIcon from "../../../assets/close-modal-icon.svg";
import apiService from "../../../apiService";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

const EditProductModal = ({ show, onClose, productId }) => {
  const [productData, setProductData] = useState({
    Brand: {
      brandName: "",
    },
  });
  const [previews, setPreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);



  //suggestion brand states
  const [brandDropdown, setBrandDropdown] = useState(false);
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({});

  //suggestion fabric states
  const [fabricDropdown, setFabricDropdown] = useState(false);
  const [fabricSuggestions, setFabricSuggestions] = useState([]);
  const [selectedFabricId, setSelectedFabricId] = useState(null);

  //suggestion refNo states
  const [refDropdown, setRefDropdown] = useState(false);
  const [refSuggestions, setRefSuggestions] = useState([]);
  const [selectedRefId, setSelectedRefId] = useState(null);

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

  //suggestion categorie states
  const [categorieDropdown, setCategorieDropdown] = useState(false);
  const [categorieSuggestions, setCategorieSuggestions] = useState([]);
  const [selectedCategorieId, setSelectedCategorieId] = useState(null);

  //suggestion productTypes states
  const [productTypesDropdown, setProductTypesDropdown] = useState(false);
  const [productTypesSuggestions, setProductTypesSuggestions] = useState([]);
  const [selectedProductTypesId, setSelectedProductTypesId] = useState(null);


  const handleStyleNoChange = (e) => {
    const styleNo = e.target.value;
    setProductData({
      ...productData,
      style_no: styleNo,
    });
    setUpdatedProductData({
      ...updatedProductData,
      style_no: styleNo,
    });
  };

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
    setProductData({
      ...productData,
      Brand: {
        ...productData.Brand,
        brandName: brandInput,
      },
    });
    setBrandDropdown(true);
    fetchBrandSuggestions(brandInput);
  };

  const handleBrandSelect = (brand) => {
    setProductData({
      ...productData,
      Brand: {
        ...productData.Brand,
        brandName: brand.brandName,
      },
    });
    setSelectedBrandId(brand.id);
    setBrandSuggestions([]);
    setBrandDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      brand_id: brand.id,
    });
    console.log(brand.brandName);
    console.log(brand.id);
  };

  const handleAddNewBrand = () => {
    // Implement the logic to add a new brand here
    console.log("Adding new brand:", productData.Brand.brandName);
    // Close the dropdown after adding the brand
    setBrandDropdown(false);
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
    setProductData({
      ...productData,
      Fabric: {
        ...productData.Fabric,
        fabricName: fabricInput,
      },
    });

    setFabricDropdown(true);
    fetchFabricSuggestions(fabricInput);
  };

  const handleFabricSelect = (fabric) => {
    setProductData({
      ...productData,
      Fabric: {
        ...productData.Fabric,
        fabricName: fabric.fabricName,
      },
    });
    setSelectedFabricId(fabric.id);
    setFabricSuggestions([]);
    setFabricDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      fabric_id: fabric.id,
    });
    console.log(fabric.fabricName);
    console.log(fabric.id);
  };

  const handleAddNewFabric = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new fabric:", productData.Fabric.fabricName);
    // Close the dropdown after adding the buyer
    setFabricDropdown(false);
  };

  // fetch refNo
  const fetchRefSuggestions = async (refInput) => {
    try {
      if (refInput.length > 0) {
        const response = await apiService.get("/references/getall");
        const filteredRef = response.data.filter((b) =>
          b.reference_no.toLowerCase().startsWith(refInput.toLowerCase())
        );
        setRefSuggestions(filteredRef);
      } else {
        setRefSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching RefNo:", error);
    }
  };

  const handleRefChange = (e) => {
    const refInput = e.target.value;
    setProductData({
      ...productData,
      Reference: {
        ...productData.Reference,
        reference_no: refInput,
      },
    });
    setRefDropdown(true);
    fetchRefSuggestions(refInput);
  };

  const handleRefSelect = (ref) => {
    setProductData({
      ...productData,
      Reference: {
        ...productData.Reference,
        reference_no: ref.reference_no,
      },
    });
    setSelectedRefId(ref.id);
    setRefSuggestions([]);
    setRefDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      reference_id: ref.id,
    });
    console.log(ref.reference_no);
    console.log(ref.id);
  };

  const handleAddNewRef = () => {
    // Implement the logic to add a new buyer here  
    console.log("Adding new reference NO:", productData.Reference.reference_no);
    // Close the dropdown after adding the buyer
    setRefDropdown(false);
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
    setProductData({
      ...productData,
      FabricFinish: {
        ...productData.FabricFinish,
        fabricFinishName: fabricFinishInput,
      },
    });
    setFabricFinishDropdown(true);
    fetchFabricFinishSuggestions(fabricFinishInput);
  };

  const handleFabricFinishSelect = (fabricFinish) => {
    setProductData({
      ...productData,
      FabricFinish: {
        ...productData.FabricFinish,
        fabricFinishName: fabricFinish.fabricFinishName,
      },
    });
    setSelectedFabricFinishId(fabricFinish.id);
    setFabricFinishSuggestions([]);
    setFabricFinishDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      fabric_finish_id: fabricFinish.id,
    });
    console.log(fabricFinish.fabricFinishName);
    console.log(fabricFinish.id);
  };

  const handleAddNewFabricFinish = () => {
    // Implement the logic to add a new buyer here
    console.log(
      "Adding new fabric finish:",
      productData.FabricFinish.fabricFinishName
    );
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
    setProductData({
      ...productData,
      Gsm: {
        ...productData.Gsm,
        gsmValue: gsmInput,
      },
    });
    setGsmDropdown(true);
    fetchGsmSuggestions(gsmInput);
  };

  const handleGsmSelect = (gsm) => {
    setProductData({
      ...productData,
      Gsm: {
        ...productData.Gsm,
        gsmValue: gsm.gsmValue,
      },
    });
    setSelectedGsmId(gsm.id);
    setGsmSuggestions([]);
    setGsmDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      gsm_id: gsm.id,
    });
    console.log(gsm.gsmValue);
    console.log(gsm.id);
  };

  const handleAddNewGsm = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new gsm:", productData.Gsm.gsmValue);
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
    setProductData({
      ...productData,
      KnitType: {
        ...productData.KnitType,
        knitType: knitInput,
      },
    });
    setKnitDropdown(true);
    fetchKnitSuggestions(knitInput);
  };

  const handleKnitSelect = (knit) => {
    setProductData({
      ...productData,
      KnitType: {
        ...productData.KnitType,
        knitType: knit.knitType,
      },
    });
    setSelectedKnitId(knit.id);
    setKnitSuggestions([]);
    setKnitDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      knit_type_id: knit.id,
    });
    console.log(knit.knitType);
    console.log(knit.id);
  };

  const handleAddNewKnitType = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new knit type:", productData.KnitType.knitType);
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
    setProductData({
      ...productData,
      Color: {
        ...productData.Color,
        colorName: colorInput,
      },
    });
    setColorDropdown(true);
    fetchColorSuggestions(colorInput);
  };

  const handleColorSelect = (color) => {
    setProductData({
      ...productData,
      Color: {
        ...productData.Color,
        colorName: color.colorName,
      },
    });
    setSelectedColorId(color.id);
    setColorSuggestions([]);
    setColorDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      color_id: color.id,
    });
    console.log(color.colorName);
    console.log(color.id);
  };

  const handleAddNewColor = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new color:", productData.Color.colorName);
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
    setProductData({
      ...productData,
      Size: {
        ...productData.Size,
        sizes: sizeInput,
      },
    });
    setSizeDropdown(true);
    fetchSizeSuggestions(sizeInput);
  };

  const handleSizeSelect = (size) => {
    setProductData({
      ...productData,
      Size: {
        ...productData.Size,
        sizes: size.sizes,
      },
    });
    setSelectedSizeId(size.id);
    setSizeSuggestions([]);
    setSizeDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      size_id: size.id,
    });
    console.log(size.sizes);
    console.log(size.id);
  };

  const handleAddNewSize = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new size:", productData.Size.sizes);
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
    setProductData({
      ...productData,
      Decoration: {
        ...productData.Decoration,
        decorationName: decorationInput,
      },
    });
    setDecorationDropdown(true);
    fetchDecorationSuggestions(decorationInput);
  };

  const handleDecorationSelect = (decoration) => {
    setProductData({
      ...productData,
      Decoration: {
        ...productData.Decoration,
        decorationName: decoration.decorationName,
      },
    });
    setSelectedDecorationId(decoration.id);
    setDecorationSuggestions([]);
    setDecorationDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      decoration_id: decoration.id,
    });
    console.log(decoration.decorationName);
    console.log(decoration.id);
  };

  const handleAddNewDecoration = () => {
    // Implement the logic to add a new buyer here
    console.log(
      "Adding new decoration:",
      productData.Decoration.decorationName
    );
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
    setProductData({
      ...productData,
      PrintEmbName: {
        ...productData.PrintEmbName,
        printType: printInput,
      },
    });
    setPrintDropdown(true);
    fetchPrintSuggestions(printInput);
  };

  const handlePrintSelect = (print) => {
    setProductData({
      ...productData,
      PrintEmbName: {
        ...productData.PrintEmbName,
        printType: print.printType,
      },
    });
    setSelectedPrintId(print.id);
    setPrintSuggestions([]);
    setPrintDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      print_emb_id: print.id,
    });
    console.log(print.printType);
    console.log(print.id);
  };

  const handleAddNewPrint = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new print/Emb:", productData.PrintEmbName.printType);
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
    setProductData({
      ...productData,
      StitchDetail: {
        ...productData.StitchDetail,
        stictchDetail: stitchInput,
      },
    });
    setStitchDetailDropdown(true);
    fetchStitchSuggestions(stitchInput);
  };

  const handleStitchDetailSelect = (stitchDetails) => {
    setProductData({
      ...productData,
      StitchDetail: {
        ...productData.StitchDetail,
        stictchDetail: stitchDetails.stictchDetail,
      },
    });
    setSelectedStitchDetailId(stitchDetails.id);
    setStitchDetailSuggestions([]);
    setStitchDetailDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      stitch_detail_id: stitchDetails.id,
    });
    console.log(stitchDetails.stictchDetail);
    console.log(stitchDetails.id);
  };

  const handleAddNewStitch = () => {
    // Implement the logic to add a new buyer here
    console.log(
      "Adding new stitch detail:",
      productData.StitchDetail.stictchDetail
    );
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
    setProductData({
      ...productData,
      Neck: {
        ...productData.Neck,
        neckType: neckInput,
      },
    });
    setNeckDropdown(true);
    fetchNeckSuggestions(neckInput);
  };

  const handleNeckSelect = (neck) => {
    setProductData({
      ...productData,
      Neck: {
        ...productData.Neck,
        neckType: neck.neckType,
      },
    });
    setSelectedNeckId(neck.id);
    setNeckSuggestions([]);
    setNeckDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      neck_id: neck.id,
    });
    console.log(neck.neckType);
    console.log(neck.id);
  };

  const handleAddNewNeck = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new neck:", productData.Neck.neckType);
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
    setProductData({
      ...productData,
      Sleeve: {
        ...productData.Sleeve,
        sleeveName: sleeveInput,
      },
    });
    setSleeveDropdown(true);
    fetchSleeveSuggestions(sleeveInput);
  };

  const handleSleeveSelect = (sleeve) => {
    setProductData({
      ...productData,
      Sleeve: {
        ...productData.Sleeve,
        sleeveName: sleeve.sleeveName,
      },
    });
    setSelectedSleeveId(sleeve.id);
    setSleeveSuggestions([]);
    setSleeveDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      sleeve_id: sleeve.id,
    });
    console.log(sleeve.sleeveName);
    console.log(sleeve.id);
  };

  const handleAddNewSleeve = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new sleeve:", productData.Sleeve.sleeveName);
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
    setProductData({
      ...productData,
      Length: {
        ...productData.Length,
        lengthType: lengthInput,
      },
    });
    setLengthDropdown(true);
    fetchLengthSuggestions(lengthInput);
  };

  const handleLengthSelect = (length) => {
    setProductData({
      ...productData,
      Length: {
        ...productData.Length,
        lengthType: length.lengthType,
      },
    });
    setSelectedLengthId(length.id);
    setLengthSuggestions([]);
    setLengthDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      length_id: length.id,
    });
    console.log(length.lengthType);
    console.log(length.id);
  };

  const handleAddNewLength = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new length:", productData.Length.lengthType);
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
    setProductData({
      ...productData,
      PackingMethod: {
        ...productData.PackingMethod,
        packingType: packingMethodInput,
      },
    });
    setPackingDropdown(true);
    fetchPackingMethodSuggestions(packingMethodInput);
  };

  const handlePackingMethodSelect = (packingMethod) => {
    setProductData({
      ...productData,
      PackingMethod: {
        ...productData.PackingMethod,
        packingType: packingMethod.packingType,
      },
    });
    setSelectedPackingId(packingMethod.id);
    setPackingSuggestions([]);
    setPackingDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      packing_method_id: packingMethod.id,
    });
    console.log(packingMethod.packingType);
    console.log(packingMethod.id);
  };

  const handleAddNewPackingMethod = () => {
    // Implement the logic to add a new buyer here
    console.log(
      "Adding new packing method:",
      productData.PackingMethod.packingType
    );
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
    setProductData({
      ...productData,
      MeasurementChart: {
        ...productData.MeasurementChart,
        name: mesurementChartInput,
      },
    });
    setMesurementDropdown(true);
    fetchMesurementChartSuggestions(mesurementChartInput);
  };

  const handleMesurementChartSelect = (mesurementChart) => {
    setProductData({
      ...productData,
      MeasurementChart: {
        ...productData.MeasurementChart,
        name: mesurementChart.name,
        sample_size_file: mesurementChart.sample_size_file,
      },
    });
   
    setSelectedMesurement(mesurementChart);
    setSelectedMesurementId(mesurementChart.id);
    setMesurementSuggestions([]);
    setMesurementDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      measurement_chart_id: mesurementChart.id,
    });
    console.log(mesurementChart.name);
    console.log(mesurementChart.id);
  };

  const handleAddNewMeasurement = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new Measurements:", productData.MeasurementChart.name);
    // Close the dropdown after adding the buyer
    setMesurementDropdown(false);
  };

  // fetch categorie
  const fetchCategorieSuggestions = async (categorieInput) => {
    try {
      if (categorieInput.length > 0) {
        const response = await apiService.get("/categories/getall");
        const filteredCategories = response.data.filter((b) =>
          b.categoryName.toLowerCase().startsWith(categorieInput.toLowerCase())
        );
        setCategorieSuggestions(filteredCategories);
      } else {
        setCategorieSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategorieChange = (e) => {
    const categorieInput = e.target.value;
    setProductData({
      ...productData,
      Category: {
        ...productData.Category,
        categoryName: categorieInput,
      },
    });
    setCategorieDropdown(true);
    fetchCategorieSuggestions(categorieInput);
  };

  const handleCategorieSelect = (categorie) => {
    setProductData({
      ...productData,
      Category: {
        ...productData.Category,
        categoryName: categorie.categoryName,
      
      },
    });
   
    setSelectedCategorieId(categorie.id);
    setCategorieSuggestions([]);
    setCategorieDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      category_id: categorie.id,
    });
    console.log(categorie.categoryName);
    console.log(categorie.id);
  };

  const handleAddNewCategory = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new category:", productData.Category.categoryName);
    // Close the dropdown after adding the buyer
    categorieDropdown(false);
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
    setProductData({
      ...productData,
      ProductType: {
        ...productData.ProductType,
        product: productTypesInput,
      },
    });
    setProductTypesDropdown(true);
    fetchProductTypesSuggestions(productTypesInput);
  };

  const handleProductTypesSelect = (productTypes) => {
    setProductData({
      ...productData,
      ProductType: {
        ...productData.ProductType,
        product: productTypes.product,
      
      },
    });
    setSelectedProductTypesId(productTypes.id);
    setProductTypesSuggestions([]);
    setProductTypesDropdown(false);
    setUpdatedProductData({
      ...updatedProductData,
      productType_id: productTypes.id,
    });
    console.log(productTypes.product);
    console.log(productTypes.id);
  };

  const handleAddNewProductType = () => {
    // Implement the logic to add a new buyer here
    console.log("Adding new product types:", productData.ProductType.product);
    // Close the dropdown after adding the buyer
    setProductTypesDropdown(false);
  };

  const handleNumberOfPcsChange = (e) => {
    const NumberOfPcs = e.target.value;
    setProductData({
      ...productData,
      inner_pcs: NumberOfPcs,
    });
    setUpdatedProductData({
      ...updatedProductData,
      inner_pcs: NumberOfPcs,
    });
  };

 

 

  useEffect(() => {
    console.log("Product ID:", productId); // Log the productId

    const fetchProductData = async () => {
      try {
        const response = await apiService.get(`/products/${productId}`);
        setProductData(response.data);
        console.log(response.data);
        setLoading(false);

        // Assuming response.data.images is an array of image URLs
        if (response.data.images) {
          setPreviews(response.data.images);
          setImages(response.data.images.map((image) => ({ url: image })));
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>No data available</div>;
  }

 

  if (!show) {
    return null;
  }

  // Image uploader
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 13) {
      alert("You can only upload up to 13 images.");
      return;
    }

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...newPreviews]);
    setPreviews([...previews, ...newPreviews.map((image) => image.url)]);
  };

  const removeImage = async (index) => {
    try {
      await apiService.delete(`/products/deleteImage/${productId}`);

      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);

      const newPreviews = previews.filter((_, i) => i !== index);
      setPreviews(newPreviews);
    } catch (error) {
      console.error("Error removing image:", error);
    }
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

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // const handleSave = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("productData", JSON.stringify(productData));
  //     images.forEach((image, index) => {
  //       if (image.file) {
  //         formData.append("images", image.file);
  //       } else {
  //         formData.append("existingImages", image.url);
  //       }
  //     });

  //     await apiService.put(/products/${productId}, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     handleModalClose();
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };

  //   const handleUpdate = async () => {
  //   const updatedProduct = {
  //     ...productData,
  //     images: previews, // Send updated images
  //   };

  //   try {
  //     const response = await apiService.put(`/products/${productId}`, updatedProduct);
  //     console.log("Update result:", response.data);
  //     onClose();
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };

  const handleUpdate = async () => {
    try {
      console.log(updatedProductData);
      const formData = new FormData();

       // Append the product data
    formData.append("productData", JSON.stringify(productData));
    
    // Append new images
    images.forEach((image, index) => {
      if (image.file) {
        formData.append("images", image.file);
      } else {
        formData.append("existingImages", image.url);
      }
    });
  

      Object.entries(updatedProductData).map(([key, value]) => {
        formData.append(key, value);
      });

    

      const response = await apiService.put(
        `/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(" updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating :", error);
    }
  };




  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[80vw] h-screen max-h-[85vh] overflow-y-auto lg:overflow-auto">
        <div className="px-10 py-5">
          <div className="flex justify-center">
            {" "}
            {/* Centering the title */}
            <h2 className="text-lg font-bold">Edit Product</h2>
            <button
              className="absolute right-5 cursor-pointer"
              onClick={onClose}
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
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
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
                                    className={`w-full h-32 object-cover rounded-lg shadow-md ${
                                      index === 0
                                        ? "border-4 border-blue-500"
                                        : ""
                                    }`}
                                  />
                                  {index === primaryImageIndex  && (
                                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white rounded-lg px-2 py-1 text-xs">
                                      Primary
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeImage(index, productId);
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
                  value={productData.style_no}
                  onChange={handleStyleNoChange}
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
                  value={productData.Reference.reference_no}
                  onChange={handleRefChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Reference Number"
                />
                {refDropdown && productData.Reference.reference_no && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {refSuggestions.length > 0 ? (
                      refSuggestions.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleRefSelect(item)}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                          {item.reference_no}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewRef}
                      >
                        Add New Buyer: "{productData.Reference.reference_no}"
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="categorie">
                  Category:
                </label>
                <input
                  type="text"
                  id="categorie"
                  value={productData.Category.categoryName}
                  onChange={handleCategorieChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Category Name"
                />
                {categorieDropdown && productData.Category.categoryName && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {categorieSuggestions.length > 0 ? (
                      categorieSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleCategorieSelect(suggestion)}
                        >
                          {suggestion.categoryName}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewCategory}
                      >
                        Add New category: "{productData.Category.categoryName}"
                      </li>
                    )}
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
                  value={productData.ProductType.product}
                  onChange={handleProductTypesChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Category Name"
                />
                 {productTypesDropdown && productData.ProductType.product && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {productTypesSuggestions.length > 0 ? (
                      productTypesSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProductTypesSelect(suggestion)}
                        >
                          {suggestion.product}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewProductType}
                      >
                        Add New product type: "{productData.ProductType.product}"
                      </li>
                    )}
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
                  value={productData.Brand.brandName}
                  onChange={handleBrandChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Brand Name"
                />
                {brandDropdown && productData.Brand.brandName && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {brandSuggestions.length > 0 ? (
                      brandSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleBrandSelect(suggestion)}
                        >
                          {suggestion.brandName}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewBrand}
                      >
                        Add New Brand: "{productData.Brand.brandName}"
                      </li>
                    )}
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
                  value={productData.Fabric.fabricName}
                  onChange={handleFabricChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Fabric"
                />
                {fabricDropdown && productData.Fabric.fabricName && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {fabricSuggestions.length > 0 ? (
                      fabricSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleFabricSelect(suggestion)}
                        >
                          {suggestion.fabricName}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewFabric}
                      >
                        Add New Fabric: "{productData.Fabric.fabricName}"
                      </li>
                    )}
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
                  value={productData.FabricFinish.fabricFinishName}
                  onChange={handleFabricFinishChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Fabric Finish"
                />
                {fabricFinishDropdown &&
                  productData.FabricFinish.fabricFinishName && (
                    <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {fabricFinishSuggestions.length > 0 ? (
                        fabricFinishSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleFabricFinishSelect(suggestion)}
                          >
                            {suggestion.fabricFinishName}
                          </li>
                        ))
                      ) : (
                        <li
                          className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                          onClick={handleAddNewFabricFinish}
                        >
                          Add New Fabric finish: "
                          {productData.FabricFinish.fabricFinishName}"
                        </li>
                      )}
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
                  value={productData.Gsm.gsmValue}
                  onChange={handleGsmChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter GSM"
                />
                {gsmDropdown && productData.Gsm.gsmValue && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {gsmSuggestions.length > 0 ? (
                      gsmSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleGsmSelect(suggestion)}
                        >
                          {suggestion.gsmValue}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewGsm}
                      >
                        Add New GSM: "{productData.Gsm.gsmValue}"
                      </li>
                    )}
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
                  value={productData.KnitType.knitType}
                  onChange={handleKnitChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Knit Type"
                />
                {knitDropdown && productData.KnitType.knitType && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {knitSuggestions.length > 0 ? (
                      knitSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleKnitSelect(suggestion)}
                        >
                          {suggestion.knitType}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewKnitType}
                      >
                        Add New knit type: "{productData.KnitType.knitType}"
                      </li>
                    )}
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
                  value={productData.Color.colorName}
                  onChange={handleColorChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Colors"
                />
                {colorDropdown && productData.Color.colorName && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {colorSuggestions.length > 0 ? (
                      colorSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleColorSelect(suggestion)}
                        >
                          {suggestion.colorName}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewColor}
                      >
                        Add New color: "{productData.Color.colorName}"
                      </li>
                    )}
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
                  value={productData.Size.sizes}
                  onChange={handleSizeChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Sizes"
                />
                {sizeDropdown && productData.Size.sizes && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {sizeSuggestions.length > 0 ? (
                      sizeSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleSizeSelect(suggestion)}
                        >
                          {suggestion.type_name}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewSize}
                      >
                        Add New size: "{productData.Size.sizes}"
                      </li>
                    )}
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
                  value={productData.Decoration.decorationName}
                  onChange={handleDecorationChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Decorations"
                />
                {decorationDropdown &&
                  productData.Decoration.decorationName && (
                    <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {decorationSuggestions.length > 0 ? (
                        decorationSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleDecorationSelect(suggestion)}
                          >
                            {suggestion.decorationName}
                          </li>
                        ))
                      ) : (
                        <li
                          className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                          onClick={handleAddNewDecoration}
                        >
                          Add New decoration: "
                          {productData.Decoration.decorationName}"
                        </li>
                      )}
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
                  value={productData.PrintEmbName.printType}
                  onChange={handlePrintChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Print (or) Emb Name"
                />
                {printDropdown && productData.PrintEmbName.printType && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {printSuggestions.length > 0 ? (
                      printSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handlePrintSelect(suggestion)}
                        >
                          {suggestion.printType}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewPrint}
                      >
                        Add New print/emb: "{productData.PrintEmbName.printType}
                        "
                      </li>
                    )}
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
                  value={productData.StitchDetail.stictchDetail}
                  onChange={handleStitchDetailChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Stitch Details"
                />
                {stitchDetailDropdown &&
                  productData.StitchDetail.stictchDetail && (
                    <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {stitchDetailSuggestions.length > 0 ? (
                        stitchDetailSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleStitchDetailSelect(suggestion)}
                          >
                            {suggestion.stictchDetail}
                          </li>
                        ))
                      ) : (
                        <li
                          className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                          onClick={handleAddNewStitch}
                        >
                          Add New stitch detail: "
                          {productData.StitchDetail.stictchDetail}"
                        </li>
                      )}
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
                  value={productData.Neck.neckType}
                  onChange={handleNeckChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Neck"
                />
                {neckDropdown && productData.Neck.neckType && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {neckSuggestions.length > 0 ? (
                      neckSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleNeckSelect(suggestion)}
                        >
                          {suggestion.neckType}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewNeck}
                      >
                        Add New neck: "{productData.Neck.neckType}"
                      </li>
                    )}
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
                  value={productData.Sleeve.sleeveName}
                  onChange={handleSleeveChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Sleeve"
                />
                {sleeveDropdown && productData.Sleeve.sleeveName && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {sleeveSuggestions.length > 0 ? (
                      sleeveSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleSleeveSelect(suggestion)}
                        >
                          {suggestion.sleeveName}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewSleeve}
                      >
                        Add New sleeve: "{productData.Sleeve.sleeveName}"
                      </li>
                    )}
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
                  value={productData.Length.lengthType}
                  onChange={handleLengthChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Length"
                />
                {lengthDropdown && productData.Length.lengthType && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {lengthSuggestions.length > 0 ? (
                      lengthSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleLengthSelect(suggestion)}
                        >
                          {suggestion.lengthType}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewLength}
                      >
                        Add New length: "{productData.Length.lengthType}"
                      </li>
                    )}
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
                  value={productData.PackingMethod.packingType}
                  onChange={handlePackingMethodChange}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Packing Method"
                />
                {packingDropdown && productData.PackingMethod.packingType && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {packingSuggestions.length > 0 ? (
                      packingSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handlePackingMethodSelect(suggestion)}
                        >
                          {suggestion.packingType}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewPackingMethod}
                      >
                        Add New packing method: "
                        {productData.PackingMethod.packingType}"
                      </li>
                    )}
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
                  value={productData.inner_pcs}
                onChange={handleNumberOfPcsChange}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter No of pieces per inner"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="mesurementChart">
                  Measurement Chart:
                </label>
             
                  <input
                    type="text"
                    id="mesurementChart"
                    value={productData.MeasurementChart.name}
                    onChange={handleMesurementChartChange}
                    className="border border-gray-300 rounded-md px-2 py-1 bg-zinc-200"
                    placeholder="Enter Measurement Chart"
                  />
                  {mesurementDropdown && productData.MeasurementChart.name && (
                  <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {mesurementSuggestions.length > 0 ? (
                      mesurementSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleMesurementChartSelect(suggestion)}
                        >
                          {suggestion.name}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-4 py-2 cursor-pointer text-sm text-blue-600 hover:bg-gray-200"
                        onClick={handleAddNewMeasurement}
                      >
                        Add New measurement chart: "{productData.MeasurementChart.name}"
                      </li>
                    )}
                  </ul>
                )}
              
               
              </div>

              {productData.MeasurementChart &&
                productData.MeasurementChart.sample_size_file && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={productData.MeasurementChart.sample_size_file}
                      alt={
                        productData.MeasurementChart.name || "Measurement Chart"
                      }
                      className="max-w-full h-auto rounded-md"
                    />
                  </div>
                )}
            </div>
            {/* <button className="bg-sky-600 px-28 py-2 text-white absolute bottom-5 right-40 rounded-lg font-bold text-sm" >Add Products</button> */}
            <div className="mt-10 flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Product"}
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

export default EditProductModal;