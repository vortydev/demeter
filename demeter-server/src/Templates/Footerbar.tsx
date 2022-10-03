import React from 'react';
import { Button } from 'react-bootstrap';
import './template.css';

class Footerbar extends React.Component {

    render(): React.ReactNode {
        return (
            <footer className="App-footer">
                <div>
                <p>Cette application est une propriété de Les Vraies Richesses</p> <Button className='deco btn-secondary'>Déconnexion</Button>
                </div>
            </footer>
        );
    }

}

export {Footerbar};