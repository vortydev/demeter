import React from "react";
import { Form } from "react-bootstrap";

import { getCookie } from 'typescript-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Filter {
    setName: (name: string) => void;
}
function RecipeFilter({ setName }: Filter): JSX.Element {

    function update() {
        const name = (document.getElementById("nameFilter") as HTMLInputElement).value;
        setName(name);
    }

    return (
        <React.Fragment>
            <Form.Group className="filterSearch flex" controlId="nameFilter">
                <FontAwesomeIcon className="icon mr-1" icon={faMagnifyingGlass} size="lg" />
                <Form.Control onChange={update} type="text" />
            </Form.Group>
        </React.Fragment>
    );
}

export { RecipeFilter };