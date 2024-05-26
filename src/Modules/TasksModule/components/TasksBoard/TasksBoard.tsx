import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";

export default function TasksBoard() {
  type Task = {
    id: string;
    title: string;
    status: string;
    description: string;
  };
  type Tasks = Task[];
  type ChangeTaskStatus = (
    id: string,
    prevStatus: string,
    newStatus: Status
  ) => void;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskChanged, setIsTaskChanged] = useState(false);
  const getAllTasks = async () => {
    const response = await axiosInstance.get("/Task", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU0LCJyb2xlcyI6WyJjYW5DaGFuZ2VQYXNzd29yZCIsImNhbkdldEN1cnJlbnRVc2VyIiwiY2FuVXBkYXRlVXNlciIsIkVtcGxveWVlIl0sInVzZXJOYW1lIjoiZW1yYW45OSIsInVzZXJFbWFpbCI6ImFib3VlbXJhbjk5QGdtYWlsLmNvbSIsInVzZXJHcm91cCI6IkVtcGxveWVlIiwiaWF0IjoxNzE2MDcwNTkyLCJleHAiOjE3MTk2NzA1OTJ9.G7kS5EHPvQVdc5f4wS228_UlWs8gwoHR7MqfauOV31awxBkNeGtdRKRPCGMBix4GP27LoxFE8HMgcnZ_yAI4VAWI_AMSfN_kcXZ5MEAbGs1wQ39JBK-lpuLjPHkZniWJ0ZLpMCfAxdSumkO_ya0RG36Zrw0slwN9oGupFc3Zi6e1eVoEJtRFyHKsdFQGdP8RA5NaMnuOsCysi6RAXsl4I6KlTFDVkWM0TWdPXithoEJkt_RwHMvJDAm3b4x5c-BROxQZuGEnbEaFV5qCWpfExr1xYPQ5qCRQK5XLEq6PRiStNwZRsPIs3hArB_JlIj1SRPPted46SvAVD2Pb_FmsTw",
      },
    });
    const allTasks = response.data.data;
    setTasks(allTasks);
  };

  useEffect(() => {
    getAllTasks();
  }, [isTaskChanged]);
  const changeTaskStatus: ChangeTaskStatus = async (
    id,
    prevStatus,
    newStatus
  ) => {
    try {
      const newTasks = tasks.map((task: Task) => {
        if (task.id == id) return { ...task, status: newStatus };
        return task;
      });
      setTasks(newTasks);
      if (prevStatus != newStatus) {
        const response = await axiosInstance.put(
          `/Task/${id}/change-status`,
          { status: newStatus },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU0LCJyb2xlcyI6WyJjYW5DaGFuZ2VQYXNzd29yZCIsImNhbkdldEN1cnJlbnRVc2VyIiwiY2FuVXBkYXRlVXNlciIsIkVtcGxveWVlIl0sInVzZXJOYW1lIjoiZW1yYW45OSIsInVzZXJFbWFpbCI6ImFib3VlbXJhbjk5QGdtYWlsLmNvbSIsInVzZXJHcm91cCI6IkVtcGxveWVlIiwiaWF0IjoxNzE2MDcwNTkyLCJleHAiOjE3MTk2NzA1OTJ9.G7kS5EHPvQVdc5f4wS228_UlWs8gwoHR7MqfauOV31awxBkNeGtdRKRPCGMBix4GP27LoxFE8HMgcnZ_yAI4VAWI_AMSfN_kcXZ5MEAbGs1wQ39JBK-lpuLjPHkZniWJ0ZLpMCfAxdSumkO_ya0RG36Zrw0slwN9oGupFc3Zi6e1eVoEJtRFyHKsdFQGdP8RA5NaMnuOsCysi6RAXsl4I6KlTFDVkWM0TWdPXithoEJkt_RwHMvJDAm3b4x5c-BROxQZuGEnbEaFV5qCWpfExr1xYPQ5qCRQK5XLEq6PRiStNwZRsPIs3hArB_JlIj1SRPPted46SvAVD2Pb_FmsTw",
            },
          }
        );
        setIsTaskChanged(!isTaskChanged);
      }
    } catch (error) {
      setIsTaskChanged(!isTaskChanged);
    }
  };
  return (
    <>
      <h3 className="mx-4">Tasks Board</h3>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-4">
            <Column
              title="To Do"
              tasks={tasks}
              status="ToDo"
              changeTaskStatus={changeTaskStatus}
            />
          </div>
          <div className="col-md-4">
            <Column
              title="In Progress"
              tasks={tasks}
              status="InProgress"
              changeTaskStatus={changeTaskStatus}
            />
          </div>
          <div className="col-md-4">
            <Column
              title="Done"
              tasks={tasks}
              status="Done"
              changeTaskStatus={changeTaskStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
  type Status = "ToDo" | "Done" | "InProgress";
  type ColumnProps = {
    title: string;
    tasks: Tasks;
    status: Status;
    changeTaskStatus: ChangeTaskStatus;
  };

  function Column({ title, tasks, status, changeTaskStatus }: ColumnProps) {
    const filteredCards = tasks.filter((task) => task.status === status);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    return (
      <motion.div
        className={
          isDraggingOver
            ? "border border-5 p-5 mx-2 mt-3 min-vh-100 grabbable"
            : "p-5 mx-2 mt-3  min-vh-100"
        }
        layout={true}
        layoutId={status}
        onDrop={(e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("id");
          const prevStatus = e.dataTransfer.getData("status");
          changeTaskStatus(id, prevStatus, status);
          setIsDraggingOver(false);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
      >
        <h4 className="mb-5 d-flex justify-content-between ">
          <span>{title}</span>
          <span className="ms-auto">({filteredCards?.length})</span>
        </h4>
        <div className="bg-secondary w-100 rounded min-vh-100 px-3 py-5">
          {filteredCards.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </motion.div>
    );
  }
  type TaskProps = {
    task: Task;
  };
  function Task({ task }: TaskProps) {
    const { title, id, status } = task;

    return (
      <motion.div
        layout={true}
        layoutId={id}
        className="task-bg text-white fw-bold w-56 rounded-lg py-3 text-start px-3 mb-2 grabbable"
        draggable={true}
        onDragStart={(e: any) => {
          console.log("Drag Start");
          console.log(e);
          e.dataTransfer.setData("id", id);
          e.dataTransfer.setData("status", status);
        }}
      >
        {title}
      </motion.div>
    );
  }
}
