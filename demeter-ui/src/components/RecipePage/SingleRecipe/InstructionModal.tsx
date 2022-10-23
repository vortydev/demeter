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
      <p>{recipe!.instruction}</p>
      <Button onClick={() => setShow(false)}>CLOSE</Button>
    </Modal>
  );
}
export { InstructionModal };
