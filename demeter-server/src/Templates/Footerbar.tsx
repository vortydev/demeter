import React from 'react';
import { Button } from 'react-bootstrap';
import { removeCookie } from 'typescript-cookie';
import './template.css';

function handleLogout() :void{
    removeCookie('account');
    window.location.reload();
}

class Footerbar extends React.Component {



    render(): React.ReactNode {
        return (
            <footer className="App-footer">
                <div>
                <p>Cette application est une propriété de Les Vraies Richesses</p> <Button className='deco btn-secondary' onClick={handleLogout}>Déconnexion</Button>
                </div>
            </footer>
        );
    }

}

export {Footerbar};