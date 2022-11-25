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

    const role = getCookie("role");

    return (
        <React.Fragment>
            <div className="filterBar mb-4 mt-5">
                <Form.Group className="filterSearch flex" controlId="nameFilter">
                    <FontAwesomeIcon className="icon mr-1" icon={faMagnifyingGlass} size="lg" />
                    <Form.Control onChange={update} type="text" />
                </Form.Group>
            </div>
        </React.Fragment>
    );
}

export { RecipeFilter };