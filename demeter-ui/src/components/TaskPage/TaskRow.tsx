import { Button } from "react-bootstrap";
import { deleteTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import "./task.css";

interface TaskRowProps {
  task: Task;
}

function TaskRow ({task}: TaskRowProps){

    return(
       <div className="taskRow"><input type="text" /> {task.title} <Button>edit</Button> <Button onClick={ () => {deleteTask(task.id)}} >delete</Button></div>
    );

}

export { TaskRow };
