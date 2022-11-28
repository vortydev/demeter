import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { getAccountsByRole } from "../../services/account.functions";
import { createTask } from "../../services/task.funtions";
import { Account, Task } from "../../types/Types";

interface CRFormProps {
  show: boolean;
  close: () => void;
  success: (success: boolean) => void;
}

function CreateTaskForm({ show, close, success }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);
  const [priority, setPriority] = useState<boolean>(false);
  const [listAccount, setListAccount] = useState<Account[]>([]);
  const [empty, setEmpty] = useState<boolean>(false);
  const [tt, setTypeTask] = useState<string>("1");
  

  useEffect(() => {
    async function getList() {
      setListAccount(await getAccountsByRole(2));
    }
    getList();
  }, []);

  async function handlesubmit() {
    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const receiver = document.getElementById("receiver") as HTMLInputElement;
    const when = document.getElementById("when") as HTMLInputElement;
    const taskMaster = document.getElementById("taskMaster") as HTMLInputElement;

    setEmpty(false);

    if (!taskName.value) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    } else {
      const newTask: Task = {
        id: 1,
        title: taskName.value,
        description: description.value,
        categorytaskId: Number(tt),
        parentId: 0,
        active: true,
        completed: false,
        picture: null,
        date: new Date(),
        priority: priority,
        responsable: "",
        receiver: receiver.value,
        taskMaster: tt === "2" ? taskMaster.value : "",
        whenToDo: tt === "3" ? "" : when.value,
      };

      if (await createTask(newTask)) {
        console.log(newTask);
        success(true);
        setTimeout(() => {
          success(false);
        }, 5000);
        setPriority(false);
        close();
      } else {
        setError(true);
      }
    }
  }

  function typeTask() {
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;
    setTypeTask(typeTask.value);
  }

  return (
    <Modal show={show} onShow={() => setTypeTask("1")} onHide={() => { close(); }}>
      <Form className="popupForm">
        <h3 className="popupTitle">Nouvelle Tâche</h3>
        {empty && (
          <Alert variant="danger">Veuillez donner un titre à la tâche.</Alert>
        )}

        <Form.Group className="mb-2" controlId="taskName">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <div className="popupRowSplit mb-2">
          <Form.Group className="popupSelectBox">
            <Form.Label className="popupSelectLabel">Destinataire</Form.Label>
            <Form.Select id="receiver" aria-label="Type">
              {listAccount.map((employee) => (
                <option value={employee.accName}>{employee.accName}</option>
              ))}
              <option value="delivery">Livreur</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="flex" controlId="priority">
            <Form.Label className="popupSelectLabel">Prioritaire</Form.Label>
            <Form.Check
              className="popupCheck"
              onChange={() => setPriority(!priority)}
              type="checkbox"
            />
          </Form.Group>
        </div>

        <div className="popupRowSplit mb-2">
          <Form.Group className="popupSelectBox">
            <Form.Label className="popupSelectLabel">Type</Form.Label>
            <Form.Select onChange={typeTask} id="typeTask" aria-label="Type">
              <option value="1">Quotidienne</option>
              <option value="2">Hebdomadaire</option>
              <option value="3">Autre</option>
            </Form.Select>
          </Form.Group>

          {tt === "1" && (
            <Form.Group className="popupSelectBox">
              <Form.Label className="popupSelectLabel">Quand</Form.Label>
              <Form.Select onChange={typeTask} id="when" aria-label="Type">
                <option value="open">Ouverture</option>
                <option value="preClose">Pré-fermeture</option>
                <option value="close">Fermeture</option>
              </Form.Select>
            </Form.Group>
          )}
          {tt === "2" && (
            <Form.Group className="popupSelectBox">
              <Form.Label className="popupSelectLabel">Jour</Form.Label>
              <Form.Select onChange={typeTask} id="when" aria-label="Type">
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

        {tt === "2" && (
          <Form.Group className="mb-2" controlId="taskMaster">
            <Form.Label className="popupLabelFull">Responsable</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        )}

        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={() => { setFileBase64(""); setTypeTask("0"); close(); }}>
            Annuler
          </Button>
          <Button variant="demeter" onClick={() => {setTypeTask("0"); handlesubmit(); }}>
            Confirmer
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export { CreateTaskForm };
