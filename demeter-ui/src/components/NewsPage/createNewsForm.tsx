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
  const [priority, setPriority] = useState<boolean>(false);
  const [emptyTask, setEmptyTask] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [filebase64, setFileBase64] = useState<string>("");

  async function handlesubmit(): Promise<void> {

    setEmpty(false);
    setEmptyTask(false);

    let newsTask: Task = {
      id: 1,
      title: "changeMe",
      description: "changeMe",
      categorytaskId: 4, // Ne s'Affichent pas dans la liste de tâches
      parentId: 0,
      active: true,
      completed: false,
      date: new Date(),
      priority: false,
      responsable: "",
      receiver: "",
      taskMaster: "",
      whenToDo: "",
    };

    let taskCreated: Task | null = null;

    if (addTask) {
      // Retrive task info
      const taskTitle = document.getElementById("tasktitle") as HTMLInputElement;
      const taskDesc = document.getElementById("taskdescription") as HTMLInputElement;

      if (!taskTitle.value) {
        setEmptyTask(true);
        setTimeout(() => {
          setEmptyTask(false);
        }, 5000);
      } else {
        // Assign task infos
        newsTask.title = taskTitle.value;
        newsTask.description = taskDesc.value;

        // create task
        taskCreated = await createTask(newsTask);

        // validate
        console.log(taskCreated);
        setFileBase64("");
        if (taskCreated === null) {
          setError(true);
        }
      }
    }

    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    // const img = document.getElementById("image") as HTMLInputElement;

    if (!title.value || !author.value) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    }
    else {
      const newNews: News = {
        id: 1,
        title: title.value,
        description: description.value,
        author: author.value,
        img: filebase64,
        active: true,
        roleId: receiver.value,
        taskId: taskCreated ? taskCreated.id : 0,
        date: new Date(),
        priority: priority,
      };

      setError(false);

      if ((await createNews(newNews)) && !error) {
        setAddTask(false);
        setPriority(false);
        success();
      } else {
        setError(true);
      }
    }
  }

  function convertFile(files: FileList | null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string = fileRef.type || ""
      console.log("This file upload is of type:", fileType)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload = (ev: any) => {
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }

  return (
    <Modal show={show} onHide={close}>
      <Form className="popupForm">
        <h3 className="popupTitle">Nouvelle Annonce</h3>
        {empty && <Alert variant="danger">Veuillez donner un titre et un auteur à la tâche</Alert>}
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
            <option value="4">Autres</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="flex" controlId="priority">
          <Form.Label className="popupSelectLabel">Prioritaire</Form.Label>
          <Form.Check className="popupCheck" onChange={() => setPriority(!priority)} type="checkbox" />
        </Form.Group>

        {!addTask && (
          <div className="popupBtnBox mt-2 mb-2">
            <Button
              className="joinTaskBtn"
              variant="outline-dark"
              onClick={() => setAddTask(true)}
            >Joindre une tâche</Button>
          </div>
        )}

        {addTask && (
          <div className="popupForm">
            <hr className="loginLine mb-3" />
            <h4 className="popupTitle">Tâche jointe</h4>
            {emptyTask && <Alert variant="danger">Veuillez donner un titre à la tâche.</Alert>}
            <Form.Group className="mb-2" controlId="tasktitle">
              <Form.Label>Titre de la tâche</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="taskdescription">
              <Form.Label>Description de la tâche</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <div className="popupBtnBox mt-3 mb-2">
              <Button variant="demeter-dark" onClick={() => setAddTask(false)}>
                Annuler
              </Button>
            </div>
            <hr className="loginLine mt-2" />
          </div>
        )}

        <div className="popupImgBox mt-2 mb-2">
          <input id="file" type="file" onChange={(e) => convertFile(e.target.files)} />
          {filebase64 &&
            <>
              {(filebase64.indexOf("image/") > -1) &&
                <img src={filebase64} width={300} />
              }
            </>
          }
        </div>
          
        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={() => { setFileBase64(""); close(); }}>
            Annuler
          </Button>
          <Button variant="demeter" onClick={handlesubmit}>
            Confirmer
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export { CreateNewsForm };
