import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { deleteVendor, getAllVendor } from "../../../services/vendor.functions";
import { Vendor } from "../../../types/Types";
import { VendorForm } from "./inventoryAddVendorForm";
import { VendorEdit } from "./vendorEditForm";

interface VendorDisplayProps {
    show: boolean;
    close: () => void;
}
function VendorDisplay({show, close}: VendorDisplayProps) {
    const [createNewVendor, setCreateNewVendor] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
    
    function successVendor(): void {
        setSuccess(true);
        closeVendor();
    }

    function closeVendor(): void {
        setCreateNewVendor(false);
    }

    return (
        <Modal size="lg" show={show} onHide={close}>
            <h3 className="popupTitle">Liste des fournisseurs</h3>
            <FontAwesomeIcon className="iconAdd iconEdit cursor" icon={faPlus} size="lg" onClick={() => {
                setCreateNewVendor(true);
                setSuccess(false);
            }} />
            {createdSuccess && <Alert variant="success">Le fournisseur à été ajouté avec succès</Alert>}
            <Container>
                <Row>
                    <h4>Nom</h4>
                    <h4>Téléphone</h4>
                    <h4>Courriel</h4>
                    <h4>Adresse postale</h4>
                </Row>
                <VendorList create={createdSuccess}/>
            </Container>
            <div className="mt-3 popupBtnBox">
                <Button variant="demeter-dark" onClick={close}>Retour</Button>
            </div>
            <VendorForm show={createNewVendor} close={closeVendor} success={successVendor} />
        </Modal>
    );
}

interface VendorOperationSuccess {
    create:boolean,
}
function VendorList({create}:VendorOperationSuccess){
    const [ vendors, setVendors ] = useState<Vendor[]>([]);
    const [ update, setUpdate ] = useState<boolean>(false);
    const [ deleted, setDeleteSuccess ] = useState<boolean>(false);

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    },[create, update, deleted]);
    return (
        <React.Fragment>
            {vendors.map((vendor) => (
                <VendorRow vendor={vendor} setSuccess={setUpdate} setDeleteSuccess={setDeleteSuccess}/>
            ))}
        </React.Fragment>
    );
}

interface VendorRow {
    vendor: Vendor;
    setSuccess:(success: boolean) => void;
    setDeleteSuccess:(success: boolean)=>void;
}
function VendorRow({vendor, setSuccess, setDeleteSuccess}:VendorRow):JSX.Element{
    const [updateVendor, setUpdateVendor] = useState<boolean>(false);

    function success(): void {
        setSuccess(true);
        close();
      }
  
    function close(): void {
        setUpdateVendor(false);
    }

    return (
        <Row>
            <div>{vendor.vendor}</div>
            <div>{vendor.phone}</div>
            <div>{vendor.email}</div>
            <div>{vendor.address}</div>
            <div>
                <FontAwesomeIcon className="iconEdit cursor" icon={faEdit} size="lg" onClick={() => {
                    setUpdateVendor(true); 
                    setSuccess(false);
                }} />
                <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
                        confirmAlert({
                            title: 'Confirmation',
                            message: 'Êtes-vous sur de vouloir supprimer ce fournisseur?',
                            buttons: [
                              {
                                label: 'Oui',
                                onClick: () => {deleteVendor(vendor.id); setDeleteSuccess(true);}
                              },
                              {
                                label: 'Non',
                                onClick: () => {}
                              }
                            ]
                          }); 
                    }} />
            </div>
            <VendorEdit show={updateVendor} close={close} success={success} vendor={vendor}/>
        </Row>
    );
}

export {VendorDisplay};