import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfigurationById } from "../../features/Configuration/configurationSlice";

const Footer = () => {
  const dispatch = useDispatch();

  const config = useSelector((state) => state.configurations.configuration);

  useEffect(() => {
    dispatch(fetchConfigurationById());
  }, [dispatch]);
  return (
    <div
      className=" py-4 flex flex-row justify-center items-center"
      style={{ backgroundColor: config?.mainColor }}
    >
      <h1 className="text-gray-200">
        Developed By{" "}
        <span>
          {" "}
          <a
            className="underline"
            href="https://shashankadhikari.com.np/"
            target="_blank"
          >
            @shashank
          </a>
        </span>{" "}
      </h1>
    </div>
  );
};

export default Footer;
