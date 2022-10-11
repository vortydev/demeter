import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";

function TaskPage(): JSX.Element {

  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<string>('daily');
  
    return (
      <div>
        <TaskNav taskCategory={taskCategory} setTaskCategory={setTaskCategory} success={createdSuccess} setSuccess={setSuccess} />
        {createdSuccess && <Alert>La recette à été créer avec succès!</Alert>}
        <h1>Tasks Page</h1>
        <p> Liste de tâches {taskCategory}</p>
        <Button variant="outline-dark">Afficher L'Historique</Button>
        <Button variant="dark">Compléter les tâches</Button>
        
      </div>
    );
}

export {TaskPage}