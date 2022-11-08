import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getAll, getbyCategorie } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
import { TaskRow } from "./TaskRow";

function TaskPage(): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete] = useState<boolean>(false);
  const [editedSuccess, editSuccess] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<number>(1);
  const [listTask, setListTask] = useState<Task[]>([]);
  const [allCatTask, setAllCatTask] = useState<Task[]>([]);

  useEffect(() => {
    async function getList() {
      const taskByCat: Task[] = await getbyCategorie(taskCategory);
      setAllCatTask(taskByCat);
      setListTask(taskByCat.filter((t) => t.parentId === 0));
  
    }
    getList();
  }, [taskCategory,createdSuccess,deletedSuccess, editedSuccess]);
  
  async function handlesubmit() {
    const listeResponsable = document.getElementsByClassName("responsable");
    console.log(listeResponsable);
  }

  return (
    <div>
      <h1 className="pageTitle">Tâches</h1>
      <TaskNav
        taskCategory={taskCategory}
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />
      {createdSuccess && <Alert>La tâche à été créée avec succès!</Alert>}
      {deletedSuccess && <Alert>La tâche à été supprimée avec succès!</Alert>}
      <p>Liste de tâches {taskCategory}</p>

      <div>
      {listTask.map((Task) => (
        <TaskRow task={Task} listTask={allCatTask} deleteSuccess={setDelete} editSuccess={editSuccess} />
      ))}
    </div>
      
      <Button variant="outline-dark" >Afficher L'Historique</Button>
      <Button variant="demeter-dark" onClick={handlesubmit}>Compléter les tâches</Button>
    </div>
  );
}

export { TaskPage };
