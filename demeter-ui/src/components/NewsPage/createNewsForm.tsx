import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createNews } from "../../services/news.functions";
import { News } from "../../types/Types";

interface CRFormProps {
  show : boolean;
    close: () => void;
    success: ()=> void;
  }

  function CreateNewsForm({ show, close, success }: CRFormProps) {
    const [error, setError] = useState<boolean>(false);

    async function handlesubmit(){
      const title = document.getElementById("title") as HTMLInputElement;
      const author = document.getElementById("author") as HTMLInputElement;
      const receiver = document.getElementById("receiver") as HTMLInputElement;
      const description = document.getElementById("description") as HTMLInputElement;

      const newNews: News = {
        title: title.value,
        description: description.value,
        author: author.value,
        img: null,
        active: true,
        roleId: receiver.value,
        taskId: null
      };
  
      if (await createNews(newNews)) {
        success();
      } else {
        setError(true);
      }
    }

    return(
      <Modal show={show} onHide={close}>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>TITRE : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="author">
            <Form.Label>AUTEUR : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Select className="mb-3" id="receiver" aria-label="DESTINATAIRES : ">
            <option>Choisir</option>
            <option value="1">Administration</option>
            <option value="2">Employer</option>
            <option value="3">Livreur</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>DESCRIPTION : </Form.Label>
            <Form.Control as="textarea" rows={3}/>
          </Form.Group>
          <Button onClick={handlesubmit}>Ajouter</Button>
          <Button onClick={()=>{console.log("Cancel!")}}>Annuler</Button>
        </Form>
      </Modal>
    );
  }

  export { CreateNewsForm };