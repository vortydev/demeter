import React from 'react';

interface NavBarProps {
    navigateTo : (choice: string) => void;
}


function Navbar({navigateTo}: NavBarProps) {

        return (
            <nav className="navbar navbar-expand-sm navbar-light">
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item cursor active">
                        <a className="nav-link" onClick={()=>navigateTo('news')}>Accueil<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item cursor">
                        <a className="nav-link" onClick={()=>navigateTo('task')}>Tâches</a>
                    </li>
                    <li className="nav-item cursor">
                        <a className="nav-link" onClick={()=>navigateTo('recipe')}>Recettes</a>
                    </li>
                    <li className="nav-item cursor">
                        <a className="nav-link" onClick={()=>navigateTo('inventory')}>Inventaire</a>
                    </li>
                    <li className="nav-item cursor">
                        <a className="nav-link"onClick={()=>navigateTo('accounts')}>Comptes</a>
                    </li>
                </ul>
            </div>
        </nav>
        );
    }



export {Navbar};

