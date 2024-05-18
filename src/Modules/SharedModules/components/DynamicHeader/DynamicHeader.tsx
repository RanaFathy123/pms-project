import { useNavigate } from "react-router-dom";

interface DynamicHeaderInterface {
  title: string;
  btn: string;
}

export default function DynamicHeader({ title, btn }: DynamicHeaderInterface) {
  const navigate = useNavigate();
  const goToComponent = () => {
    if (btn == "Task") {
      navigate("/dashboard/task-data");
    } else {
      navigate("/dashboard/project-data");
    }
  };
  return (
    <>
      <div className="container p-3">
        <div className="row d-flex  align-items-center">
          <div className=" col-md-9 col-lg-9 col-xl-10">
            <h4 className="Dynamic-heading">{title}</h4>
          </div>
          <div className=" col-md-3 col-lg-3 col-xl-2 ">
            <button className="btn rounded-pill btn-class text-white " onClick={goToComponent}>
              + Add New {btn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
