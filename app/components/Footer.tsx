import React from "react";

const Footer = () => {
  return (
    <div className="text-xs bg-white h-4 fixed bottom-0 w-screen pb-8 py-3 px-8 border border-solid border-gray-300">
      @ {new Date().getFullYear()} Hostshare Inc.
    </div>
  );
};

export default Footer;
