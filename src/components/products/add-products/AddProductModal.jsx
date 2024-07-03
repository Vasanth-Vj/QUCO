import React, { useState } from "react";
import closeIcon from "../../../assets/close-modal-icon.svg";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import apiService from '../../../apiService'; 

const AddProductModal = ({ show, onClose }) => {
  const [styleNo, setStyleNo] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [brand, setBrand] = useState("");
  const [fabric, setFabric] = useState("");
  const [fabricFinish, setFabricFinish] = useState("");
  const [gsm, setGsm] = useState("");
  const [knitType, setKnitType] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [decorations, setDecorations] = useState("");
  const [printOrEmbName, setPrintOrEmbName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [stitchDetails, setStitchDetails] = useState("");
  const [neck, setNeck] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [length, setLength] = useState("");
  const [measurementChart, setMeasurementChart] = useState("");
  const [packingMethod, setPackingMethod] = useState("");
  const [piecesPerInner, setPiecesPerInner] = useState("");
  const [piecesPerOuterCarton, setPiecesPerOuterCarton] = useState("");

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    console.log(files)
    // Ensure the total number of files doesn't exceed 13
    if (files.length + images.length > 13) {
      alert("You can only upload up to 13 images.");
      return;
    }
  
    // Convert FileList to Array and update state
    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    setImages(newImages);
  };

  const uploader = Uploader({
    apiKey: "free" // Get production API keys from Bytescale
  });
  
  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('reference_number', referenceNo);
    formData.append('style_id', styleNo);
    formData.append('category_id', 1); // Example, update as needed
    formData.append('brand_id', brand);
    formData.append('fabric_id', fabric);
    formData.append('fabric_finish_id', fabricFinish);
    formData.append('gsm_id', gsm);
    formData.append('knit_type_id', knitType);
    formData.append('color_id', colors);
    formData.append('size_id', sizes);
    formData.append('decoration_id', decorations);
    formData.append('print_emb_id', printOrEmbName);
    formData.append('stitch_detail_id', stitchDetails);
    formData.append('neck_id', neck);
    formData.append('sleeve_id', sleeve);
    formData.append('length_id', length);
    formData.append('packing_method_id', packingMethod);
    formData.append('inner_pcs_id', piecesPerInner);
    formData.append('outer_carton_pcs_id', piecesPerOuterCarton);
    formData.append('measurement_chart_id', measurementChart);
    formData.append('is_Stocked', false);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await apiService.post('/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success, e.g., close modal, show success message, etc.
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error, e.g., show error message, etc.
      setLoading(false);
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
        <div className="flex justify-center"> {/* Centering the title */}
            <h2 className="text-lg font-bold">Add Product</h2>
            <button className="absolute right-5 cursor-pointer" onClick={onClose}>
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
              <div className="flex flex-wrap gap-4">
                <UploadButton 
                  uploader={uploader}
                  options={options}
                  onComplete={files => {
                    if (files.length > 13) {
                      alert("You can only upload up to 13 images.");
                    } else {
                      setImages(files.map(file => ({
                        fileUrl: file.fileUrl,
                      })));
                    }
                  }}
                >
                  {({onClick}) => (
                    <button onClick={onClick}>
                      Upload a file...
                    </button>
                  )}
                </UploadButton>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="referenceNo">
                  Reference No:
                </label>
                <input
                  type="text"
                  id="referenceNo"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Reference No"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="brand">
                  Brand:
                </label>
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Brand"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="fabric">
                  Fabric:
                </label>
                <input
                  type="text"
                  id="fabric"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Fabric"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="fabricFinish">
                  Fabric Finish:
                </label>
                <input
                  type="text"
                  id="fabricFinish"
                  value={fabricFinish}
                  onChange={(e) => setFabricFinish(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Fabric Finish"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="gsm">
                  GSM:
                </label>
                <input
                  type="text"
                  id="gsm"
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter GSM"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="knitType">
                  Knit Type:
                </label>
                <input
                  type="text"
                  id="knitType"
                  value={knitType}
                  onChange={(e) => setKnitType(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Knit Type"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="colors">
                  Colors:
                </label>
                <input
                  type="text"
                  id="colors"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="sizes">
                  Sizes:
                </label>
                <input
                  type="text"
                  id="sizes"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Sizes"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="decorations">
                  Decorations:
                </label>
                <input
                  type="text"
                  id="decorations"
                  value={decorations}
                  onChange={(e) => setDecorations(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Decorations"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="printOrEmbName">
                  Print {'('}or{')'} Emb Name:
                </label>
                <input
                  type="text"
                  id="printorEmbName"
                  value={printOrEmbName}
                  onChange={(e) => setPrintOrEmbName(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Print (or) Emb Name"
                />
              </div>                            
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="stitchDetails">
                  Stitch Details:
                </label>
                <input
                  type="text"
                  id="stitchDetails"
                  value={stitchDetails}
                  onChange={(e) => setStitchDetails(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Stitch Details"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="neck">
                  Neck:
                </label>
                <input
                  type="text"
                  id="neck"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Neck"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="sleeve">
                  Sleeve:
                </label>
                <input
                  type="text"
                  id="sleeve"
                  value={sleeve}
                  onChange={(e) => setSleeve(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Sleeve"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="length">
                  Length:
                </label>
                <input
                  type="text"
                  id="length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Length"
                />
              </div>              
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="packingMethod">
                  Packing Method:
                </label>
                <input
                  type="text"
                  id="packingMethod"
                  value={packingMethod}
                  onChange={(e) => setPackingMethod(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Packing Method"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="piecesPerInner">
                  No of pieces per inner:
                </label>
                <input
                  type="text"
                  id="piecesPerInner"
                  value={piecesPerInner}
                  onChange={(e) => setPiecesPerInner(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter No of pieces per inner"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="piecesPerOuterCarton">
                  No of pieces per outer carton:
                </label>
                <input
                  type="text"
                  id="piecesPerOuterCarton"
                  value={piecesPerOuterCarton}
                  onChange={(e) => setPiecesPerOuterCarton(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter No of pieces per outer carton"
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label className="font-semibold" htmlFor="shortDescription">
                  Short Description:
                </label>
                <input
                  type="text"
                  id="shortDescription"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Short Description"
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label className="font-semibold" htmlFor="fullDescription">
                  Full Description:
                </label>
                <textarea
                  type="text"
                  id="fullDescription"
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="border border-gray-300  rounded-md px-4 py-3 bg-zinc-200 resize-none"
                  placeholder="Enter Full Description"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="measurementChart">
                  Measurement Chart:
                </label>
                <input
                  type="text"
                  id="measurementChart"
                  value={measurementChart}
                  onChange={(e) => setMeasurementChart(e.target.value)}
                  className="border border-gray-300  rounded-md px-2 py-1 bg-zinc-200"
                  placeholder="Enter Measurement Chart"
                />
                <label htmlFor="fileInput" className="cursor-pointer text-blue-500 underline">Upload Picture</label>
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e)}
                />
              </div>
            </div>
            {/* <button className="bg-sky-600 px-28 py-2 text-white absolute bottom-5 right-40 rounded-lg font-bold text-sm" >Add Products</button> */}
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
