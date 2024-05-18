import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DynamicHeader({title,btn}) {
  return (
    <>
    <div className="container p-3">
        <div className="row d-flex justify-content-center align-align-items-center">
            <div className="col-md-8 col-lg-9 col-xl-10 my-md-3">
            <h5 className='m-0'>{title}</h5>
            </div>
            <div className=" col-md-4 col-lg-3 col-xl-2 my-md-3">
                <button className='btn rounded-pill btn-class text-white '>+ Add New {btn}</button>
            </div>

        </div>
    </div>
      
    </>
  )
}
