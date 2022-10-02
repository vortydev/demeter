
import React from 'react';
import { Button } from 'react-bootstrap';

class Footerbar extends React.Component {

    render(): React.ReactNode {
        return (
            <footer className="footer">
                <p>Lorem footem ipsum <Button className='deco btn-secondary'>Déconnexion</Button></p>
            </footer>
        );
    }

}

export {Footerbar};