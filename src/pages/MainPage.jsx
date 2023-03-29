import React from "react";

const MainPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center items-center">
      <h1 className=" text-5xl font-semibold text-center">
        Build and run your own B2B Platform
      </h1>
      <p className="text-center">
        Organizations use our platform building kit LoftOS to create and run
        their digital platforms – from networks to marketplaces
      </p>
      <a
        href="https://calendly.com/innoloft_appointments/30min?month=2023-03"
        className="rounded-md bg-white border-2 border-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-black hover:bg-indigo-500 hover:text-white "
        target="_blank"
      >
        Book a Demo
      </a>
    </div>
  );
};

export default MainPage;
