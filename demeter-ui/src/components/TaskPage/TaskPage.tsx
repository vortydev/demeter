import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getAll, getbyCategorie } from "../../services/task.funtions";
import { Task} from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
import { TaskRow } from "./TaskRow";

function TaskPage(): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete ] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<number>(1);
  const [listTask,setListTask] = useState<Task[]>([]);

  useEffect(() => {
    async function getList() {
      setListTask(await getbyCategorie(taskCategory));
      console.log("listTask",listTask);
    }
    getList();
  }, [taskCategory,createdSuccess,deletedSuccess]);
  
  return (
    <div>
      <TaskNav
        taskCategory={taskCategory}
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />
      {createdSuccess && <Alert>La tâche à été créer avec succès!</Alert>}
      {deletedSuccess && <Alert>La tâche à été supprimer avec succès!</Alert>}
      <h1>Tasks Page</h1>
      <p>Liste de tâches {taskCategory}</p>

      <div>
      {listTask.map((Task) => (
        <TaskRow task={Task} deleteSuccess={setDelete} />
      ))}
    </div>
      
      <Button variant="outline-dark">Afficher L'Historique</Button>
      <Button variant="demeter-dark">Compléter les tâches</Button>
    </div>
  );
}

export { TaskPage };
