import React from 'react';
import { getCookie } from 'typescript-cookie';
import { Nav } from "react-bootstrap";

interface NavBarProps {
    navigateTo: (choice: string) => void;
}


function Navbar({ navigateTo }: NavBarProps) {

    const role = getCookie("role");

    const accessRecipe : string[] = ["1", "4", "5", "6", "7", "8"];
    const accessInventory : string[] = ["1", "3", "4"];
    const accessAccount : string[]= ["1","4"];


    return (
        <section className="appNav">
            <Nav defaultActiveKey="news">
                <Nav.Item>
                    <Nav.Link onClick={() => navigateTo('news')} eventKey="news">
                        Annonces
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => navigateTo('task')} eventKey="tache2">
                        Tâches
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {(accessInventory.find((R)=> R === role) !== undefined) &&
                        <Nav.Link onClick={() => navigateTo('inventory')} eventKey="inventory">
                            Inventaire
                        </Nav.Link>}
                </Nav.Item>

                {(accessRecipe.find((R)=> R === role) !== undefined) && 
                    <Nav.Item>
                        <Nav.Link onClick={() => navigateTo('recipe')} eventKey="recipe">
                            Recettes
                        </Nav.Link>
                    </Nav.Item>
                }
                {(accessAccount.find((R)=> R === role) !== undefined) &&
                    <Nav.Item>
                        <Nav.Link onClick={() => navigateTo('accounts')} eventKey="accounts">
                            Comptes
                        </Nav.Link>
                    </Nav.Item>}
             
            </Nav>
        </section>
    );
}

export { Navbar };
