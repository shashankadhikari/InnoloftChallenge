import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfigurationById } from "../features/Configuration/configurationSlice";
import { fetchProductByProductId } from "../features/products/productSlice";
import MapComponent from "../component/MapComponent";

const ProductViewPage = () => {
  const dispatch = useDispatch();
  const id = 6781;

  const product = useSelector((state) => state.products.products);
  const config = useSelector((state) => state.configurations.configuration);
  const [position, setPosition] = useState([27.693671, 85.3204]);

  useEffect(() => {
    dispatch(fetchProductByProductId(id));
    dispatch(fetchConfigurationById());
  }, [dispatch]);

  useEffect(() => {
    if (
      product?.company?.address?.latitude &&
      product?.company?.address?.longitude
    ) {
      const { latitude, longitude } = product.company.address;
      setPosition([parseFloat(latitude), parseFloat(longitude)]);
    }
  }, [product]);

  const videoUrl = product?.video;
  const embedUrl = videoUrl?.replace("watch?v=", "embed/");

  return (
    <>
      {product ? (
        <div className="mx-auto max-w-7xl w-full min-h-screen">
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
                    {product.type.name}
                  </div>
                </div>

                <h1 className=" font-semibold px-3">{product.name}</h1>
                <div className="text-sm px-3 pb-3 ">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/3 px-4">
              <div className="flex flex-col gap-3">
                <h1 className="pt-4">Offered By</h1>
                <img
                  className=" w-52"
                  src={product.company.logo}
                  alt="company logo"
                />
                {config?.hasUserSection ? (
                  <div className="flex flex-row gap-3 ">
                    <img
                      src={product.user.profilePicture}
                      className="w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className=" font-normal text-gray-600 text-base">
                        {`${product.user.firstName} ${product.user.lastName}`}
                      </h1>
                      <h1 className=" font-normal text-gray-500 text-sm">
                        {product.company.name}
                      </h1>
                    </div>
                  </div>
                ) : null}
                <div className="text-sm text-gray-500">
                  {`${product.company.address.city.name}, ${product.company.address.country.name}`}
                </div>
                <div className=" h-72 shadow-lg rounded-lg">
                  <MapComponent
                    position={position}
                    address={product?.company?.address?.city?.name}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-md rounded-3xl p-5 my-5  grid grid-row-2 md:grid-cols-2  gap-10">
            <div>
              <h1 className="mb-4 text-base font-semibold text-gray-700">
                Offer Details
              </h1>
              <div className="flex flex-row gap-10">
                <div className=" flex flex-col gap-4 w-1/2">
                  <div className="flex flex-col gap-2">
                    <div>Categories</div>
                    {product.categories.map((category, idx) => (
                      <div className=" text-sm text-gray-500 " key={idx}>
                        <span className="bg-gray-300 rounded-3xl py-1 px-2">
                          {category.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div>TRL</div>
                    <div className=" text-sm text-gray-500">
                      {product.trl.name}
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col w-1/2  gap-4">
                  <div className="flex flex-col gap-2">
                    <div>Business Modal</div>

                    {product.businessModels.map((businessModal, idx) => (
                      <div className=" text-sm text-gray-500 " key={idx}>
                        <span className="bg-gray-300 rounded-3xl py-1 px-2">
                          {businessModal.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div>Cost</div>
                    <div className=" text-sm text-gray-500 mt-2">
                      <span className="bg-gray-300 rounded-3xl py-1 px-2">
                        {product.investmentEffort}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {videoUrl && (
              <iframe
                className="aspect-video w-full rounded-2xl"
                src={embedUrl}
              ></iframe>
            )}
            {!videoUrl && <p>No video available.</p>}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductViewPage;
