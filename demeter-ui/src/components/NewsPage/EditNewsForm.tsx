import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { updateNews } from "../../services/news.functions";
import { createTask, deleteTask } from "../../services/task.funtions";
import { News, Task } from "../../types/Types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
  const [priority, setPriority] = useState<boolean>(news.priority);

  async function handleSubmit() {
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;

    const editNews: News = {
      ...news,
      title: title.value,
      description: description.value,
      author: author.value,
      roleId: receiver.value,
      taskId: taskInEdit ? taskInEdit.id : 0,
      priority: priority,

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
        console.log("Tâche supprimée");
      } else {
        console.log("uh...");
      }
    } else {
      if (await deleteTask(task!.id)) {
        console.log("Sous-tâche supprimée");
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
      responsable: "",
      receiver: "",
      priority: false,
      taskMaster: "",
      whenToDo:"",
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
      <Form className="popupForm">
        <h3 className="popupTitle">Édition d'une Annonce</h3>

        {error && (<Alert variant="danger">La mise à jour n'a pas fonctionnée.</Alert>)}

        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Titre</Form.Label>
          <Form.Control defaultValue={news.title} type="text" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="author">
          <Form.Label>Auteur</Form.Label>
          <Form.Control defaultValue={news.author} type="text" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            defaultValue={news.description}
            as="textarea"
            rows={3}
          />
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

        <Form.Group className="flex" controlId="priority">
          <Form.Label className="popupSelectLabel">Prioritaire</Form.Label>
          <Form.Check defaultChecked={news.priority} className="popupCheck" onChange={() => setPriority(!priority)} type="checkbox" />
        </Form.Group>

        {(taskInEdit || task) && (
          <div className="jointTaskEdit flex">
            <Form.Label className="popupSelectLabel mr-1">Tâche jointe:</Form.Label>
            <span>{taskInEdit ? taskInEdit.title : task!.title}</span>
            <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
              removeTask();
            }} />
          </div>
        )}
        {!taskInEdit && !task && !addTask && (
          <div className="popupBtnBox mt-2 mb-2">
            <Button className="joinTaskBtn" variant="outline-dark" onClick={() => setAddTask(true)}>Joindre une tâche</Button>
          </div>
        )}
        {addTask && (
          <div className="popupForm">
            <hr className="loginLine mb-3" />
            <h4 className="popupTitle">Tâche jointe</h4>

            <Form.Group className="mb-2" controlId="tasktitle">
              <Form.Label>Nom de la tâche</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="taskdescription">
              <Form.Label>Description de la tâche</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <div className="popupBtnBox mt-2 mb-2">
              <Button variant="demeter-dark" onClick={() => setAddTask(false)}>Annuler</Button>
              <Button variant="demeter" onClick={addingTask}>Joindre</Button>
            </div>
            <hr className="loginLine mt-2" />
          </div>
        )}

        <div className="popupBtnBox mt-3">
          <Button variant="demeter-dark" onClick={close}>Annuler</Button>
          <Button variant="demeter" onClick={handleSubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { EditNewsForm };
