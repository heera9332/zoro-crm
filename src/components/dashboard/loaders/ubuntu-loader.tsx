import React from "react";
import "./ubuntu-loader.css";

const UbuntuLoader = ({ size = 128 }) => (
  <>
    <img
      src="/assets/images/ubuntu-loader2.png"
      alt="Ubuntu Logo"
      style={{
        width: size,
        height: size,
        animation: "spin 1.2s linear infinite",
        display: "block",
      }}
    />
    <style>
      {`
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }
    `}
    </style>
  </>
);

export default UbuntuLoader;
