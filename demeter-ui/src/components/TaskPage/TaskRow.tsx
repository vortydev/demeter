import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { deleteTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { EditTaskForm } from "../TaskPage/EditTaskForm";
import "./task.css";

interface TaskRowProps {
  task: Task;
  listTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
}

function TaskRow({ task, listTask, deleteSuccess, editSuccess }: TaskRowProps) {
  const [editform, setEditForm] = useState<boolean>(false);
  const [toEdit, setToEdit] = useState<Task>(task);

  const subListTask = listTask.filter((t) => t.parentId === task.id);

  function closeEditForm() {
    setEditForm(false);
  }

  useEffect(() => {
    async function getList() {
      console.log("the list task in the row", listTask);
      console.log("the sublitstask", subListTask);
    }
    getList();
  }, []);

  const role = getCookie("role");
  return (
    <div className="taskRow">
      <input className="responable" type="text" /> {task.title}{" "}
      <Button
        onClick={() => {
          setToEdit(task);
          setEditForm(true);
        }}
      >
        edit
      </Button>{" "}
      <Button
        onClick={() => {
          deleteTask(task.id);
          deleteSuccess(true);
        }}
      >
        delete
      </Button>
     
      <div>
        {subListTask.map((st) => (
          <div>
            <input className="responable" type="text" /> {st.title}{" "}
            { role == "1" || role == "4" &&
              <div>
                <Button onClick={()=>{setToEdit(st); setEditForm(true);}}>EDIT</Button>
                <Button
                  onClick={() => {
                    deleteTask(st.id);
                    deleteSuccess(true);
                  }}
                  >
                  DELETE
                  </Button>
              </div>
            } 
          </div>
        ))}
      </div>
      <EditTaskForm
        task={toEdit}
        show={editform}
        close={closeEditForm}
        success={editSuccess}
      />
    </div>
  );
}
export { TaskRow };
