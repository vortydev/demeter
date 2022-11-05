import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createTask, deleteTask, getTasksByParent, updateTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";

interface CRFormProps {
  task: Task;
  show: boolean;
  close: () => void;
  success: (succes: boolean) => void;
}

function EditTaskForm({ task, close, success, show }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);
  const [childTask, setChildTask] = useState<Task[]>([]);

  async function handleSubmit() {
    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;

    const updatedTask: Task = {
      id: task.id,
      title: taskName.value,
      description: description.value,
      categorytaskId: parseFloat(typeTask.value),
      parentId: null,
      completed: false,
      active: false,
      picture: null,
      date: new Date(),
    };

    for(const ct of childTask){
      if(await(createTask(ct))){
        console.log('task created');
      } else {
        console.log('bleh t create');
        setError(true);
      }
    }
    if (await updateTask(updatedTask) && error === false) {
      success(true);
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
        if(event.target.name === "description"){
          ct.description = event.target.value;
        } else if(event.target.name === "title"){
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
      <Form>
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>NOM : </Form.Label>
          <Form.Control defaultValue={task.title} type="text" />
        </Form.Group>
        <Form.Select
          className="mb-3"
          defaultValue={task.categorytaskId}
          id="typeTask"
          aria-label="TYPE : "
        >
          <option value="1">Quotidiennes</option>
          <option value="2">Hebdomadaires</option>
          <option value="3">Autre</option>
        </Form.Select>
        {childTask.map((ct) => (
          <div key={ct.id}>
            <Form.Group className="mb-3" controlId="subTaskName">
              <Form.Label>NOM : </Form.Label>
              <Form.Control
              name="title"
                value={ct.title}
                type="text"
                onChange={(event: {
                  target: { name: string | number; value: any };
                }) => handleChangeSubTask(ct.id, event)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subTaskDescription">
              <Form.Label>DESCRIPTION: </Form.Label>
              <Form.Control
                value={ct.description}
                name="description"
                type="text"
                onChange={(event: {
                  target: { name: string | number; value: any };
                }) => handleChangeSubTask(ct.id, event)}
              />
            </Form.Group>

            <Button
              onClick={() => handleRemoveSubTask(ct.id)}
            >
              DELETE
            </Button>
          
          </div>
        ))}
  <Button onClick={handleAddSubTask}>
              Ajouter une tâche subordonnée
            </Button>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>DESCRIPTION : </Form.Label>
          <Form.Control
            defaultValue={task.description}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Ajouter</Button>
        <Button onClick={close}>Annuler</Button>
      </Form>
    </Modal>
  );
}

export { EditTaskForm };
