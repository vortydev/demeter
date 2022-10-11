import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { CreateTaskForm } from "./createTaskForm";

function TaskPage(): JSX.Element {
    const [createTask, setCreateTask] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
  
    function success(): void {
      setSuccess(true);
      close();
    }
  
    function close(): void {
      setCreateTask(false);
    }
  
    return (
      <div>
        {createdSuccess && <Alert>La recette à été créer avec succès!</Alert>}
        <h1>News Page</h1>
        <Button
          variant="secondary"
          onClick={() => {
            setCreateTask(true);
            setSuccess(false);
          }}
        >
          Nouvelle Tâche
        </Button>
        <CreateTaskForm show={createTask} close={close} success={success} />
      </div>
    );
}

export {TaskPage}