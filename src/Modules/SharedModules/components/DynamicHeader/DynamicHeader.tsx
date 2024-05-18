import React from "react";

export default function DynamicHeader({ title, btn }) {
  return (
    <>
      <div className="container p-3">
        <div className="row d-flex  align-items-center">
          <div className=" col-md-9 col-lg-9 col-xl-10">
            <h4 className="Dynamic-heading">{title}</h4>
          </div>
          <div className=" col-md-3 col-lg-3 col-xl-2 ">
            <button className="btn rounded-pill btn-class text-white ">
              + Add New {btn}
            </button>
          </div>
        </div>
      </div>
    </>
  );

}
