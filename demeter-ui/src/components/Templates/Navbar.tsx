import React from 'react';
import { getCookie } from 'typescript-cookie';
import { Nav } from "react-bootstrap";

interface NavBarProps {
    navigateTo: (choice: string) => void;
}


function Navbar({ navigateTo }: NavBarProps) {

    const role = getCookie("role");

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
                    {role !== "2" &&
                        <Nav.Link onClick={() => navigateTo('inventory')} eventKey="inventory">
                            Inventaire
                        </Nav.Link>}
                </Nav.Item>

                {(role === "1" || role === "4") && <div className="flex">
                    <Nav.Item>
                        <Nav.Link onClick={() => navigateTo('recipe')} eventKey="recipe">
                            Recettes
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigateTo('accounts')} eventKey="accounts">
                            Comptes
                        </Nav.Link>
                    </Nav.Item>
                </div>}
            </Nav>
        </section>
    );
}

export { Navbar };
