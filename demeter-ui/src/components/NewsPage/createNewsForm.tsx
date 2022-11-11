import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createNews } from "../../services/news.functions";
import { createTask } from "../../services/task.funtions";
import { News, Task } from "../../types/Types";

interface CRFormProps {
  show: boolean;
  close: () => void;
  success: () => void;
}

function CreateNewsForm({ show, close, success }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);

  async function handlesubmit(): Promise<void> {

    let newsTask : Task = {
      id: 1,
      title: 'changeMe',
      description: 'changeMe',
      categorytaskId: 4, // Ne s'Affichent pas dans la liste de tâches
      parentId: 0,
      active: true,
      completed: false,
      picture: null,
      date: new Date(),
      receiver: "",
    };

    let taskCreated: Task | null = null;

    if (addTask) {
      // Retrive task info
      const taskTitle = document.getElementById("tasktitle") as HTMLInputElement;
      const taskDesc = document.getElementById("taskdescription") as HTMLInputElement;
      // Assign task infos
      newsTask.title = taskTitle.value;
      newsTask.description= taskDesc.value;
      // create task
      taskCreated = await createTask(newsTask);
      // validate
       console.log(taskCreated);
      if(taskCreated === null){
        setError(true);
      }
    }

    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;

    const newNews: News = {
      id:1,
      title: title.value,
      description: description.value,
      author: author.value,
      img: null,
      active: true,
      roleId: receiver.value,
      taskId: taskCreated ? taskCreated.id : 0,
      picture: null,
      date: new Date(),
    };

    setError(false);

    if (await createNews(newNews) && !error) {
      setAddTask(false);
      success();

    } else {
      setError(true);
    }
  }

  return (
    <Modal show={show} onHide={close}>
      <Form className="popupForm">
        <h3 className="popupTitle">Nouvelle Annonce</h3>

        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="author">
          <Form.Label>Auteur</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="popupSelectBox mb-2" controlId="receiver">
          <Form.Label className="popupSelectLabel">Destinataires</Form.Label>
          <Form.Select aria-label="target">
            {/* TODO fetch from bd? */}
            <option value="1">Administrateurs</option>
            <option value="2">Employés</option>
            <option value="3">Livreurs</option>
            <option value="4">Autres</option>
          </Form.Select>
        </Form.Group>

        {!addTask && (
          <div className="popupBtnBox mt-2 mb-2">
            <Button className="joinTaskBtn" variant="demeter-dark" onClick={() => setAddTask(true)}>
              Joindre une tâche
            </Button>
          </div>
        )}

        {addTask && (
          <div className="popupForm">
            <hr className="loginLine mb-2" />
            <h4 className="popupTitle">Tâche jointe</h4>
            <Form.Group className="mb-2" controlId="tasktitle">
              <Form.Label>Titre de la tâche</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="taskdescription">
              <Form.Label>Description de la tâche</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <div className="popupBtnBox mt-2 mb-2">
              <Button variant="demeter-dark" onClick={() => setAddTask(false)}>Annuler</Button>
            </div>
            <hr className="loginLine mt-2" />
          </div>
        )}

        <div className="mt-2 popupBtnBox">
          <Button variant="demeter-dark" onClick={close}>Annuler</Button>
          <Button variant="demeter" onClick={handlesubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { CreateNewsForm };
