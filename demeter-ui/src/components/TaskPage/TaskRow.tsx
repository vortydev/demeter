import { Button } from "react-bootstrap";
import { deleteTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import "./task.css";

interface TaskRowProps {
  task: Task;
  deleteSuccess: (deleted: boolean) => void;
}

function TaskRow ({task,deleteSuccess}: TaskRowProps){

    return(
       <div className="taskRow"><input type="text" /> {task.title} <Button>edit</Button> <Button onClick={ () => {deleteTask(task.id);deleteSuccess(true)}} >delete</Button></div>
    );

}
export {TaskRow};



