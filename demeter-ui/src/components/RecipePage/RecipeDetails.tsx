import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

interface CRFormProps {
  show: boolean;
    close: () => void;
    success: ()=> void;
  }
 
  function RecipeDetails({show, close, success }: CRFormProps) {    
    return(
      <Modal show={show} onHide={close}>
        <Form>
            <Button onClick={()=>{console.log("Click!")}}>RETOUR</Button>
            <Button onClick={()=>{console.log("Click!")}}>Modifier</Button>

            <label>INGRÉDIENTS</label>
            <label>NOM</label>
            <label>QUANTITÉ</label>
            <label>PRIX</label>

            <label>COUT TOTALE : </label>
            <label>COUT UNITAIRE : </label>
            <label>COUT PERSONNALISÉ : </label>
            <input type="text" value={"Nb produit"} />

            <Button onClick={()=>{console.log("Click!")}}>CONSULTER LES INSTRUCTIONS</Button>
            <Button onClick={()=>{console.log("Click!")}}>SUPPRIMER</Button>
        </Form>
      </Modal>
    );
  }

  export { RecipeDetails };