import React from "react";
import { Form } from "react-bootstrap";

interface Filter {
    setName: (name: string) => void;
}
function RecipeFilter({setName}: Filter): JSX.Element {

    function update(){
        const name = (document.getElementById("nameFilter") as HTMLInputElement).value;
        setName(name);
    }

    return (
        <React.Fragment>
            <Form>
                <Form.Group controlId="nameFilter">
                    <Form.Control onChange={update} type="text"/>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}

export {RecipeFilter};