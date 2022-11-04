import { useState } from "react";
import { Button } from "react-bootstrap";
import { deleteTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { EditTaskForm } from "../TaskPage/EditTaskForm";
import "./task.css";

interface TaskRowProps {
  task: Task;
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
}

function TaskRow ({task,deleteSuccess,editSuccess}: TaskRowProps){
  const [editform, setEditForm]=useState<boolean>(false);

    function closeEditForm() {
      setEditForm(false); 
    }

    return(
       <div className="taskRow"><input className="responable" type="text" /> {task.title} <Button onClick={() => {setEditForm(true)}}>edit</Button> <Button onClick={ () => {deleteTask(task.id);deleteSuccess(true)}} >delete</Button>
          
          <EditTaskForm task={task} show={editform} close={closeEditForm} success={editSuccess}/>
       </div>
    );

}
export {TaskRow};


