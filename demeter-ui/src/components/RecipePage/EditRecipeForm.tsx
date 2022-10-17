import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";



interface CRFormProps {
    close: () => void;
    success: ()=> void;
  }

  function EditRecipeForm({ close, success }: CRFormProps) {
    return(
      <Modal onHide ={close}>
       <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>TITRE : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Select className="mb-3" aria-label="CATÉGORIE : ">
            <option>Choisir</option>
            <option value="1">Boulangerie</option>
            <option value="2">Patisserie</option>
            <option value="3">Cuisine</option>
            <option value="4">Viennoiserie</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="instruction">
            <Form.Label>INSCTRUCTIONS : </Form.Label>
            <Form.Control as="textarea" rows={3}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="otherExpenses">
            <Form.Label>AUTRE FRAIS : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="nbProduct">
            <Form.Label>NB PRODUIT : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Button onClick={()=>{console.log("Click!")}}>Ajouter</Button>
          <Button onClick={()=>{console.log("Cancel!")}}>Annuler</Button>
        </Form>
      </Modal>
    );
  }

  export { EditRecipeForm };
