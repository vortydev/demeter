import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { updateNews } from "../../services/news.functions";
import { createTask, deleteTask } from "../../services/task.funtions";
import { News, Task } from "../../types/Types";

interface CRFormProps {
  show: boolean;
  news: News;
  task: Task | undefined;
  close: () => void;
  success: () => void;
}

function EditNewsForm({ show, news, task, close, success }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);
  const [taskInEdit, setTaskInEdit] = useState<Task | undefined>(task);
  const [addTask, setAddTask] = useState<boolean>(false);

  async function handleSubmit() {
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;

    const editNews: News = {
      id: news.id,
      title: title.value,
      description: description.value,
      author: author.value,
      img: null,
      active: true,
      roleId: receiver.value,
      taskId: taskInEdit ? taskInEdit.id : 0,
      picture: null,
      date: new Date(),
    };

    if (await updateNews(news.id, editNews)) {
      success();
      close();
    } else {
      setError(true);
    }
  }

  async function removeTask() {
    if (taskInEdit) {
      if (await deleteTask(taskInEdit.id)) {
        console.log("taskdeleted");
      } else {
        console.log("uh...");
      }
    } else {
      if (await deleteTask(task!.id)) {
        console.log("taskdeleted");
      } else {
        console.log("uh...");
      }
    }
  }

  async function addingTask() {
    const taskTitle = document.getElementById("tasktitle") as HTMLInputElement;
    const taskDesc = document.getElementById(
      "taskdescription"
    ) as HTMLInputElement;

    const newsTask = {
      id: 1,
      title: taskTitle.value,
      description: taskDesc.value,
      categorytaskId: 4, // Ne s'Affichent pas dans la liste de tâches
      parentId: 0,
      active: true,
      completed: false,
      picture: null,
      date: new Date(),
      receiver: "",
    };

    const taskCreated = await createTask(newsTask);
    if (taskCreated) {
      setTaskInEdit(taskCreated);
      setAddTask(false);
    } else {
      console.log("that task wasnt created");
      setTaskInEdit(undefined);
    }
  }

  return (
    <Modal show={show} onHide={close}>
      {error && (
        <Alert variant="danger">La mise à jour n'a pas fonctionnée.</Alert>
      )}
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>TITRE : </Form.Label>
          <Form.Control defaultValue={news.title} type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>AUTEUR : </Form.Label>
          <Form.Control defaultValue={news.author} type="text" />
        </Form.Group>
        <Form.Group className="popupSelectBox mb-2" controlId="receiver">
          <Form.Label className="popupSelectLabel">Destinataires</Form.Label>
          <Form.Select defaultValue={news.roleId} aria-label="target">
            <option value="1">Administrateurs</option>
            <option value="2">Employés</option>
            <option value="3">Livreurs</option>
            <option value="4">Autres</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>DESCRIPTION : </Form.Label>
          <Form.Control
            defaultValue={news.description}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        {(taskInEdit || task) && (
          <div>
            {taskInEdit ? taskInEdit.title : task!.title}{" "}
            <Button onClick={removeTask}>DELETE</Button>
          </div>
        )}
        {!taskInEdit && !task && !addTask && (
          <Button onClick={() => setAddTask(true)}>Ajouter une tâche</Button>
        )}
        {addTask && (
          <div>
            <Form.Group className="mb-2" controlId="tasktitle">
              <Form.Label>Titre de la tâche</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="taskdescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button onClick={() => setAddTask(false)}>Annuler</Button>
            <Button onClick={addingTask}>Confirmer</Button>
          </div>
        )}

        <Button onClick={handleSubmit}>Confirmer</Button>
        <Button onClick={close}>Annuler</Button>
      </Form>
    </Modal>
  );
}

export { EditNewsForm };
