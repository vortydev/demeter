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

  useEffect(() => {
    async function getList() {
      setListAccount(await getAccountsByRole(2));
    }
    getList();

  }, [show]);

  async function handleSubmit() {
    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;

    const updatedTask: Task = {
      ...task,
      title: taskName.value,
      description: description.value,
      categorytaskId: parseFloat(typeTask.value),
      priority: priority,
      receiver: task.parentId == 0 ? receiver.value : "",
    };

    for (const ct of childTask) {
      if (await (createTask(ct))) {
        console.log('task created');
      } else {
        console.log('bleh t create');
        setError(true);
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
        categorytaskId: task.categorytaskId,
        parentId: task.id,
        completed: false,
        active: false,
        picture: null,
        date: new Date(),
        priority: false,
        responsable: "",
        receiver: "",
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

  return (
    <Modal onHide={close} show={show}>
      <Form className="popupForm">
        <h3 className="popupTitle">Nouvelle Tâche</h3>
        <Form.Group className="mb-2" controlId="taskName">
          <Form.Label>Titre</Form.Label>
          <Form.Control defaultValue={task.title} type="text" />
        </Form.Group>

        <Form.Group className="popupSelectBox mb-2">
          <Form.Label className="popupSelectLabel">Type</Form.Label>
          <Form.Select defaultValue={task.categorytaskId} id="typeTask" aria-label="Type">
            <option value="1">Quotidienne</option>
            <option value="2">Hebdomadaire</option>
            <option value="3">Autre</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="flex mb-2" controlId="priority">
          <Form.Label className="popupSelectLabel">Prioritaire</Form.Label>
          <Form.Check defaultChecked={task.priority} className="popupCheck" onChange={() => setPriority(!priority)} type="checkbox" />
        </Form.Group>

        {task.parentId === 0 && <Form.Group className="popupSelectBox mb-2">
          <Form.Label className="popupSelectLabel">Destinataire</Form.Label>
          <Form.Select id="receiver" aria-label="Type">
            <option value="delivery">Livreur</option>
            {listAccount.map((employee) => (
              <option value={employee.accName}>{employee.accName}</option>
            ))}
          </Form.Select>
        </Form.Group>}

        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control defaultValue={task.description} as="textarea" rows={3} />
        </Form.Group>

        {childTask.map((ct) => (
          <div className="flex" key={ct.id}>
            <Form.Group className="mb-3" controlId="subTaskName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                name="title"
                value={ct.title}
                type="text"
                onChange={(event: {
                  target: { name: string | number; value: any };
                }) => handleChangeSubTask(ct.id, event)}
              />
            </Form.Group>

            <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
              handleRemoveSubTask(ct.id);
            }} />
          </div>
        ))}
        {task.parentId === 0 && <Button onClick={handleAddSubTask}>
          Ajouter une tâche subordonnée
        </Button>}

        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={close}>Annuler</Button>
          <Button variant="demeter" onClick={handleSubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { EditTaskForm };
