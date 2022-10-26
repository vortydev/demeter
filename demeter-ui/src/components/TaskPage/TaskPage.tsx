import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Task } from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
import { TaskRow } from "./TaskRow";

function TaskPage(): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<string>("daily");

  const fakeTask: Task = {
    id: 5,
    title: "passer le balais",
    description: "prendre le balais et balayer",
    taskType: 1,
    parentId: null,
    completed: false,
    picture :null,
    date :new Date(),
  };

  
  return (
    <div>
      <TaskNav
        taskCategory={taskCategory}
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />
      {createdSuccess && <Alert>La tâche à été créer avec succès!</Alert>}
      <h1>Tasks Page</h1>
      <p> Liste de tâches {taskCategory}</p>

      <TaskRow task={fakeTask} />
      <Button variant="outline-dark">Afficher L'Historique</Button>
      <Button variant="dark">Compléter les tâches</Button>
    </div>
  );
}

export { TaskPage };
