import { setPriority } from "os";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { getAccountsByRole } from "../../services/account.functions";
import { createTask, deleteTask, getTasksByParent, updateTask } from "../../services/task.funtions";
import { Account, Task } from "../../types/Types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface CRFormProps {
  task: Task;
  show: boolean;
  close: () => void;
  success: (succes: boolean) => void;
}

function EditTaskForm({ task, close, success, show }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);
  const [childTask, setChildTask] = useState<Task[]>([]);
  const [priority, setPriority] = useState<boolean>(task.priority);
  const [listAccount, setListAccount] = useState<Account[]>([]);
  const [empty, setEmpty] = useState<boolean>(false);
  const [tt, setTypeTask] = useState<string>("1");

  useEffect(() => {
    async function getList() {
      setListAccount(await getAccountsByRole(2));
    }
    getList();

  }, [show]);

  async function handleSubmit() {
    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;
    const when = document.getElementById("when") as HTMLInputElement;
    const taskMaster = document.getElementById("taskMaster") as HTMLInputElement;

    setEmpty(false);

    if (!taskName.value) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    }
    else {
      const updatedTask: Task = {
        ...task,
        title: taskName.value,
        description: task.parentId === 0 ? description.value : "",
        categorytaskId: parseFloat(typeTask.value),
        priority: priority,
        receiver: task.parentId === 0 ? receiver.value : "",
        whenToDo: (task.parentId === 0 && tt !== "3") ? when.value : "",
        taskMaster: (task.parentId === 0 && tt === "2") ? taskMaster.value : "",
      };

      for (const ct of childTask) {
        if (ct.title) {
          if (await (createTask(ct))) {
            console.log('task created');
          } else {
            console.log('bleh t create');
            setError(true);
          }
        }
        else {
          setEmpty(true);
          setTimeout(() => {
            setEmpty(false);
          }, 5000);
        }
      }
      if (await updateTask(updatedTask) && error === false) {
        success(true);
        setTimeout(() => {
          success(false);
        }, 5000);
        setChildTask([]);
        close();
      } else {
        setError(true);
      }
    }
  }

  const handleChangeSubTask = (
    id: number,
    event: { target: { name: string | number; value: any } }
  ) => {
    const newChildTask = childTask.map((ct) => {
      if (id === ct.id) {
        if (event.target.name === "description") {
          ct.description = event.target.value;
        } else if (event.target.name === "title") {
          ct.title = event.target.value;
        }
      }
      return ct;
    });

    setChildTask(newChildTask);
  };

  const handleAddSubTask = () => {
    setChildTask([
      ...childTask,
      {
        id: Number(new Date()),
        title: "",
        description: "",
        categorytaskId: parseFloat(tt),
        parentId: task.id,
        completed: false,
        active: false,
        picture: null,
        date: new Date(),
        priority: false,
        responsable: "",
        receiver: "",
        taskMaster: "",
        whenToDo: "",
      },
    ]);
  };

  const handleRemoveSubTask = (id: number) => {
    const values = [...childTask];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setChildTask(values);
  };

  function typeTask() {
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;
    setTypeTask(typeTask.value);
  }

  return (
    <Modal onHide={close} show={show} onShow={() => setTypeTask(task.categorytaskId.toString())}>
      <Form className="popupForm">
        <h3 className="popupTitle">Édition d'une Tâche</h3>
        {empty && <Alert variant="danger">Veuillez donner un titre à la tâche.</Alert>}

        <Form.Group className="mb-2" controlId="taskName">
          <Form.Label>Titre</Form.Label>
          <Form.Control defaultValue={task.title} type="text" />
        </Form.Group>

        <Form.Group className={`mb-2 ${task.parentId !== 0 ? "hide" : ""}`} controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control defaultValue={task.description} as="textarea" rows={3} />
        </Form.Group>

        <div className="popupRowSplit mb-2">
          <Form.Group className={`popupSelectBox ${task.parentId !== 0 ? "hide" : ""}`}>
            <Form.Label className="popupSelectLabel">Destinataire</Form.Label>
            <Form.Select defaultValue={task.receiver} id="receiver" aria-label="Type">
              {listAccount.map((employee) => (
                <option value={employee.accName}>{employee.accName}</option>
              ))}
              <option value="delivery">Livreur</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="flex" controlId="priority">
            <Form.Label className="popupLabel">Prioritaire</Form.Label>
            <Form.Check defaultChecked={task.priority} className="popupCheck" onChange={() => setPriority(!priority)} type="checkbox" />
          </Form.Group>
        </div>

        <div className={`popupRowSplit mb-2 ${task.parentId !== 0 ? "hide" : ""}`}>
          <Form.Group className="popupSelectBox">
            <Form.Label className="popupLabel">Type</Form.Label>
            <Form.Select defaultValue={task.categorytaskId} onChange={typeTask} id="typeTask" aria-label="Type">
              <option value="1">Quotidienne</option>
              <option value="2">Hebdomadaire</option>
              <option value="3">Autre</option>
            </Form.Select>
          </Form.Group>

          {(task.parentId === 0 && tt === "1") && (
            <Form.Group className="popupSelectBox">
              <Form.Label className="popupSelectLabel">Quand</Form.Label>
              <Form.Select defaultValue={task.whenToDo} onChange={typeTask} id="when" aria-label="Type">
                <option value="open">Ouverture</option>
                <option value="preClose">Pré-fermeture</option>
                <option value="close">Fermeture</option>
              </Form.Select>
            </Form.Group>
          )}
          {(task.parentId === 0 && tt === "2") && (
            <Form.Group className="popupSelectBox">
              <Form.Label className="popupSelectLabel">Jour</Form.Label>
              <Form.Select defaultValue={task.whenToDo} onChange={typeTask} id="when" aria-label="Type">
                <option value="mon">Lundi</option>
                <option value="tue">Mardi</option>
                <option value="wed">Mercredi</option>
                <option value="thu">Jeudi</option>
                <option value="fri">Vendredi</option>
                <option value="sat">Samedi</option>
                <option value="sun">Dimanche</option>
              </Form.Select>
            </Form.Group>
          )}
        </div>

        {(task.parentId === 0 && tt === "2") && (
          <Form.Group className="mb-2" controlId="taskMaster">
            <Form.Label className="popupLabelFull">Responsable</Form.Label>
            <Form.Control defaultValue={task.taskMaster} type="text" />
          </Form.Group>
        )}

        <div className="subTaskList flex">
          {childTask.map((ct) => (
            <div className="subTaskBox mb-2">
              <hr className="loginLine mt-3 mb-3" />
              <Form.Group className="subTask flex" controlId="subTaskName" key={ct.id}>
                <Form.Label className="popupLabelFull">Titre sous-tâche</Form.Label>
                <Form.Control name="title" value={ct.title} type="text" onChange={(event: {
                  target: { name: string | number; value: any };
                }) => handleChangeSubTask(ct.id, event)} />
                <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
                  handleRemoveSubTask(ct.id);
                }} />
              </Form.Group>
            </div>
          ))}
        </div>

        {task.parentId === 0 && <div className="btnBar mt-3 mb-2">
          <Button variant="outline-dark" onClick={handleAddSubTask}>
            Ajouter une sous-tâche
          </Button>
        </div>}

        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={() => {setChildTask([]); close();}}>Annuler</Button>
          <Button variant="demeter" onClick={handleSubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { EditTaskForm };
