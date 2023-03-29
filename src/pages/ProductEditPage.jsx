import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByProductId,
  updateProductByProductId,
} from "../features/products/productSlice";
import MapComponent from "../component/MapComponent";

const ProductEditPage = () => {
  const product = useSelector((state) => state.products.products);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryString, setCategoryString] = useState("");
  const [businessModels, setBusinessModels] = useState([]);
  const [businessModelsString, setBusinessModelsString] = useState("");
  const [trl, setTrl] = useState("");
  const [cost, setCost] = useState("");
  const [position, setPosition] = useState([27.693671, 85.3204]);
  const id = 6781;

  const dispatch = useDispatch();

  // fetch the product data
  useEffect(() => {
    dispatch(fetchProductByProductId(id));
  }, [dispatch]);

  // update the component state variables with the fetched product data
  useEffect(() => {
    if (product) {
      setName(product?.name);
      setDescription(product?.description);
      setVideo(product?.video);
      setCategories(product?.categories);
      setCost(product?.investmentEffort);
      setBusinessModels(product?.businessModels);
      setTrl(product?.trl?.name);
    }
  }, [product]);

  // update categoryString as categories array gets data
  useEffect(() => {
    setCategoryString(categories.map((category) => category.name).join(", "));
    setBusinessModelsString(
      businessModels.map((businessModel) => businessModel.name).join(", ")
    );
  }, [categories]);

  useEffect(() => {
    if (
      product?.company?.address?.latitude &&
      product?.company?.address?.longitude
    ) {
      const { latitude, longitude } = product.company.address;
      setPosition([parseFloat(latitude), parseFloat(longitude)]);
    }
  }, [product]);

  // submit form data to updateProductByProductId after form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        name,
        description,
        video,
        categories: categoryString.split(","),
        businessModels: businessModelsString.split(","),
        trl,
        investmentEffort: cost,
      };

      dispatch(updateProductByProductId({ productId: id, updatedProduct }));
    } catch (error) {
      alert("Error updating product. Please try again later.");
    }
  };

  //this function handle change of Rich Text Box
  const handleChange = (content, delta, source, editor) => {
    setDescription(content);
  };

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit}>
          <div className="mx-auto max-w-7xl w-full">
            <div className="flex flex-col md:flex-row  my-10 border border-gray-300 rounded-2xl shadow-md">
              <div className="md:w-2/3  border-r border-gray-300">
                <div className="flex flex-col gap-1 ">
                  <div className="relative">
                    <img
                      className=" w-full h-64 object-cover "
                      src={product.picture}
                      alt="product"
                    />
                    <div className="absolute top-0 left-0 z-10 p-2 bg-white border-r border-b border-gray-300 rounded-tl-2xl ">
                      {product?.type?.name}
                    </div>
                  </div>

                  <input
                    type="text"
                    className=" px-4 py-2 leading-tight font-semibold bg-white border border-gray-400 rounded appearance-none m-3 mb-0 focus:outline-none"
                    placeholder="Enter text here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <ReactQuill
                    value={description}
                    onChange={handleChange}
                    modules={{ toolbar: true }}
                    className="m-3"
                  />
                </div>
              </div>
              <div className="md:w-1/3 px-4">
                <div className="flex flex-col gap-3">
                  <h1 className="pt-4">Offered By</h1>
                  <img
                    className=" w-52"
                    src={product?.company?.logo}
                    alt="company logo"
                  />
                  <div className="flex flex-row gap-3">
                    <img
                      src={product?.user?.profilePicture}
                      className="w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className=" font-normal text-gray-600 text-base">
                        {`${product?.user?.firstName} ${product?.user?.lastName}`}
                      </h1>
                      <h1 className=" font-normal text-gray-500 text-sm">
                        {product?.company?.name}
                      </h1>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {`${product?.company?.address?.city?.name}, ${product?.company?.address?.country?.name}`}
                  </div>
                  <div className="h-44 shadow-lg rounded-lg">
                    <MapComponent
                      position={position}
                      address={product?.company?.address?.city?.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Video Section */}

            <div className="shadow-md rounded-3xl p-5 my-5  ">
              <label className="block font-bold mb-2" htmlFor="video">
                Video:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 leading-tight  bg-white border border-gray-400 rounded appearance-none focus:outline-none"
                placeholder="Enter Video Link Here"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>

            {/* Other Details Section */}

            <div className="shadow-md rounded-3xl p-5 my-5  ">
              <h1 className="mb-4 text-base font-semibold text-gray-700">
                Offer Details
              </h1>
              <div className="flex flex-col md:flex-row gap-10">
                <div className=" flex flex-col gap-4 md:w-1/2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="categories">Categories</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 leading-tight  bg-white border border-gray-400 rounded appearance-none focus:outline-none"
                      placeholder="Enter Categories Here"
                      value={categoryString}
                      onChange={(e) => setCategoryString(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="trl">TRL</label>
                    <div className="relative inline-block w-full">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={trl}
                        onChange={(e) => setTrl(e.target.value)}
                      >
                        <option disabled>Select an option</option>
                        <option value={trl}>{trl}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon
                          className="h-5 w-5 flex-none"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col md:w-1/2  gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="businessModels">Business Models</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 leading-tight  bg-white border border-gray-400 rounded appearance-none focus:outline-none"
                      placeholder="Enter Business Modal Here"
                      value={businessModelsString}
                      onChange={(e) => setBusinessModelsString(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="businessModal">Cost</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 leading-tight  bg-white border border-gray-400 rounded appearance-none focus:outline-none"
                      placeholder="Enter Cost Here"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end gap-2 mt-3">
                <button className="border border-indigo-800 text-indigo-800 py-1 px-3 rounded">
                  Cancel
                </button>
                <button
                  className=" bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-3 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductEditPage;
