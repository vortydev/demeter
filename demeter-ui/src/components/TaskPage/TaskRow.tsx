import { Button } from "react-bootstrap";
import { Task } from "../../types/Types";
import "./task.css";

interface TaskRowProps {
  task: Task;
}

function TaskRow ({task}: TaskRowProps){

    return(
       <div className="taskRow"><Button variant="outline-dark">This is a checkbox</Button> {task.title} <Button>edit</Button> <Button>delete</Button></div>
    );

}

export { TaskRow };
