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
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;



    if(addTask){
      const taskTitle = document.getElementById("tasktitle") as HTMLInputElement;
      const taskDesc = document.getElementById("taskdescription") as HTMLInputElement;

      const newTask: Task = {
        id: 1,
        title: taskTitle.value,
        description: taskDesc.value,
        categorytaskId: 4,
        parentId: 0,
        active:true,
        completed: false,
        picture: null,
        date: new Date(),
      };

      if(await createTask(newTask)){
        console.log('this worked');
      }
    }

    const newNews: News = {
      title: title.value,
      description: description.value,
      author: author.value,
      img: null,
      active: true,
      roleId: receiver.value,
      taskId: 0,
      picture: null,
      date: new Date(),
    };

    setError(false);

    if (await createNews(newNews)) {
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
            <option value="1">Administrateurs</option>
            <option value="2">Employés</option>
            <option value="3">Livreurs</option>
          </Form.Select>
        </Form.Group>
        {!addTask && (
          <Button onClick={() => setAddTask(true)}>
            Ajouter une tâche à l'annonce.
          </Button>
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
            <Button onClick={()=>setAddTask(false)}>Annuler</Button>
          </div>
        )}

        <div className="mt-3 popupBtnBox">
          <Button
            variant="demeter-dark"
            onClick={() => {
              console.log("CANCEL ADD NEWS");
            }}
          >
            Annuler
          </Button>
          <Button
            variant="demeter"
            onClick={() => {
              console.log("ADD NEWS");
            }}
          >
            Confirmer
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export { CreateNewsForm };
