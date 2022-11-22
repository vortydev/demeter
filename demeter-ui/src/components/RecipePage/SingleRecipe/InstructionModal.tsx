import { Button, Modal } from "react-bootstrap";
import { Recipe } from "../../../types/Types";

interface InstructionModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  recipe: Recipe;
}

function InstructionModal({ show, setShow, recipe }: InstructionModalProps) {
  return (
    <Modal show={show}>
      <div className="popupForm">
        <h3 className="popupTitle">Instructions</h3>
        <p>{recipe!.instruction}</p>
        <div className="popupBtnBox mt-3">
          <Button variant="demeter-dark" onClick={() => setShow(false)}>Retour</Button>
        </div>
      </div>
    </Modal>
  );
}
export { InstructionModal };
