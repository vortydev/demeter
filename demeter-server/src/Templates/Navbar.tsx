import React from 'react';
import './template.css';

class Navbar extends React.Component {

    render(): React.ReactNode {
        return (
            <nav className="navbar navbar-expand-sm navbar-light">
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="">Accueil <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="task">Tâches</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="recipe">Recettes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="inventory">Inventaire</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="accounts">Comptes</a>
                    </li>
                </ul>
            </div>
        </nav>
        );
    }

}

export {Navbar};

