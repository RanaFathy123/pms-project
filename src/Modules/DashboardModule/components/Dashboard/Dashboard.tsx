import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [tasksNumbers, setTasksNumbers] = useState(0);
  const [usersCount, setUsersCount] = useState({
    activeUsersCount: 0,
    inActiveUsersCount: 0,
  });
  const [tasksData, setTasksData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const { loginData } = useContext(AuthContext);

  const getTasksNumbers = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get("/Task/count");
      const tasks = response.data;
      const { toDo, inProgress, done } = tasks;
      const tasksNumbers = toDo + inProgress + done;
      setTasksNumbers(tasksNumbers);
      const tasksData: any = [toDo, inProgress, done];
      setTasksData(tasksData);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersNumbers = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get("/Users/count");
      const allUsers = response.data;
      const { activatedEmployeeCount, deactivatedEmployeeCount } = allUsers;
      setUsersCount({
        activeUsersCount: activatedEmployeeCount,
        inActiveUsersCount: deactivatedEmployeeCount,
      });
      const usersData: any = [activatedEmployeeCount, deactivatedEmployeeCount];
      setUsersData(usersData);
    } catch (error) {
      console.log(error);
    }
  };
  const taskdata = {
    datasets: [
      {
        data: tasksData,
        
        backgroundColor: ["#264b43", "rgb(188, 98, 15)", "rgb(99, 61, 22)"],
        hoverOffset: 4,
      },
    ],
    labels: ["To Do", "In Progress", "Done"], // Add labels for each data segment
  };
  const userdata = {
    datasets: [
      {
        data: usersData,
        backgroundColor: ["#264b43", "#56736d"],
        hoverOffset: 4,
      },
    ],

    labels: ["Active", "In Active"], // Add labels for each data segment
  };
  useEffect(() => {
    getTasksNumbers();
    getUsersNumbers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="container mt-5 p-3 bgHeaderh ">
          <div className="row d-flex justify-content-center align-align-items-center">
            <div className="col-md-8 col-lg-9 col-xl-10 my-md-3 ">
              <h5 className="m-0 DashBoard text-white pt-5">
                Welcome{" "}
                <span className="DashBoardSpan">{loginData?.userName}</span>{" "}
              </h5>
              <p className=" DashBoard mt-4 text-white">
                You can add project and assign tasks to your team
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div>
              <div className="head mt-5 mx-3">
                <h5>Tasks</h5>
                <p className="text-muted">Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="d-flex flex-wrap ">
                <div className="card mx-5" style={{ width: "13rem" }}>
                  <div className="card-body py-4">
                    <span className="task-icon-bg p-3">
                      <i className="fas fa-tasks fw-bold fa-xl "></i>
                    </span>
                    <h5 className="card-title mt-4">Tasks Number</h5>
                    <h2>{tasksNumbers}</h2>
                  </div>
                </div>
                <div className="card " style={{ width: "13rem" }}>
                  <div className="card-body py-4">
                    <span className="project-icon-bg p-3">
                      <i className="fas fa-project-diagram fw-bold fa-xl"></i>
                    </span>
                    <h5 className="card-title mt-4">Projects Number</h5>
                    <h2>50</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="head mt-5 mx-3">
                <h5>Users</h5>
                <p className="text-muted">Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="d-flex flex-wrap ">
                <div className="card mx-5 " style={{ width: "13rem" }}>
                  <div className="card-body py-4">
                    <span className="task-icon-bg p-3">
                      <i className="fas fa-tasks fw-bold fa-xl "></i>
                    </span>
                    <h5 className="card-title mt-4">active</h5>
                    <h2>{usersCount.activeUsersCount}</h2>
                  </div>
                </div>
                <div className="card" style={{ width: "13rem" }}>
                  <div className="card-body py-4">
                    <span className="project-icon-bg p-3  ">
                      <i className="fas fa-project-diagram fw-bold fa-xl"></i>
                    </span>
                    <h5 className="card-title mt-4">inactive</h5>
                    <h2>{usersCount.inActiveUsersCount}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around flex-wrap  ">
        <div className=" mx-4 mt-5">
          <Doughnut data={taskdata} />
        </div>
        <div className=" mx-4 mt-5">
          <Doughnut data={userdata} />
        </div>
      </div>
    </>
  );
}
