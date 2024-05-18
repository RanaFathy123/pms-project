import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function DynamicHeader({title,btn}) {
  let navigate = useNavigate();


  const goToComponent =()=>{
    if(btn === 'Project'){
      navigate('/dashboard/project-data')
    }else{
      navigate('/dashboard/task-data')
    }
  
  }
  
  return (
    <>
    <div className="container p-3">
        <div className="row d-flex justify-content-center align-align-items-center">
            <div className="col-md-8 col-lg-9 col-xl-10 my-md-3">
            <h5 className='m-0'>{title}</h5>
            </div>
            <div className=" col-md-4 col-lg-3 col-xl-2 my-md-3">
                <button className='btn rounded-pill btn-class text-white ' onClick={goToComponent}>+ Add New {btn}</button>
            </div>

        </div>
    </div>
      
    </>
  )
}
