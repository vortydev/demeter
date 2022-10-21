import { useState } from "react";
import { Button } from "react-bootstrap";
import { CreateTaskForm } from "./createTaskForm";

interface TaskNavProps{
    taskCategory: string;
    setTaskCategory:(location : string) => void;
    setSuccess:(succeed: boolean) => void;
    success: boolean ;
}

function TaskNav({taskCategory, setTaskCategory, success, setSuccess} :TaskNavProps) {
    const [createTask, setCreateTask] = useState<boolean>(false);

    if(success){
        close();
    }

    function close(): void {
        setCreateTask(false);
      }
      
  return (
    
    <nav className="navbar navbar-expand-sm navbar-light">
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" onClick={()=>setTaskCategory('daily')}>
              Quotidiennes <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setTaskCategory('weekly')}>
              Hebdomadaires
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setTaskCategory('other')}>
              Autres
            </a>
          </li>
          <li className="nav-item">
          <Button
          variant="outline-dark"
          onClick={() => {
            setCreateTask(true);
            setSuccess(false);
          }}
        >
         +
        </Button>
          </li>
        </ul>
      </div>
      <CreateTaskForm show={createTask} close={close} success={setSuccess} />
    </nav>
  );
}

export { TaskNav };
