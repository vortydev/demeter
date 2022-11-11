import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Modal, ModalHeader, Row } from "react-bootstrap";
import { getAllVendor } from "../../../services/vendor.functions";
import { Vendor } from "../../../types/Types";

interface VendorDisplayProps {
    show: boolean;
    close: () => void;
}
function VendorDisplay({show, close}: VendorDisplayProps) {

    
    return (
        <Modal size="lg" show={show} onHide={close}>
            <h3 className="popupTitle">Liste des fournisseurs</h3>
            <Container>
                <Row>
                    <h4>Nom</h4>
                    <h4>Téléphone</h4>
                    <h4>Courriel</h4>
                    <h4>Adresse postale</h4>
                </Row>
                <VendorList/>
            </Container>
            <div className="mt-3 popupBtnBox">
                <Button variant="demeter-dark" onClick={close}>Retour</Button>
            </div>
        </Modal>
    );
}

// insert code about displaying a vendor here
function VendorList(){
    const [ vendors, setVendors ] = useState<Vendor[]>([]);

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    });
    return (
        <React.Fragment>
            {vendors.map((vendor) => (
                <VendorRow vendor={vendor} />
            ))}
        </React.Fragment>
    );
}

interface VendorRow {
    vendor: Vendor;
}
function VendorRow({vendor}:VendorRow):JSX.Element{
    return (
        <Row>
            <div>{vendor.vendor}</div>
            <div>{vendor.phone}</div>
            <div>{vendor.email}</div>
            <div>{vendor.address}</div>
        </Row>
    );
}

export {VendorDisplay};