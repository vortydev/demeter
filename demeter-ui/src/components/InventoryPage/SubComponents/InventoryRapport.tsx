import React, { useEffect, useState } from 'react';
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template';
import { Product } from '../../../types/Types';
import { getAll } from '../../../services/inventory.functions'
import { Button } from 'react-bootstrap';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InventoryInvoiceButton(): JSX.Element {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    }, []);

    function formatDate(date: number) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    // https://www.npmjs.com/package/jspdf-invoice-template
    var props: any = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "rapport_inventaire_" + formatDate(Date.now()),
        orientationLandscape: false,
        compress: true,
        business: {
            name: "Les Vraies Richesses",
            address: "Sherbrooke, QC, Canada",
            phone: "(819) 933-7272",
            website: "Date: " + formatDate(Date.now()),
        },
        contact: {
          name: "Rapport d'inventaire"  
        },
        invoice: {
            headerBorder: false,
            tableBodyBorder: false,
            header: [
                {
                    title: "#",
                    style: {
                        width: 10
                    }
                },
                {
                    title: "Produit",
                    style: {
                        width: 80
                    }
                },
                { 
                    title: "Format",
                    style: {
                        width: 40
                    }
                },
                { title: "Quantité" },
            ],
            table: 
                Array.from(products, (p, index) => ([
                    index + 1,
                    p.name,
                    p.format,
                    p.qtyInv,
                ])),
        },
        footer: {
            text: "Ce rapport a été généré par le logiciel Demeter.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    function generatePDF() {
        var pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created
    }

    return (
        <React.Fragment>
            <Button variant="icon-outline" onClick={() => {
                generatePDF();
            }}>
                <FontAwesomeIcon className="iconPlus" icon={faFileArrowDown} size="lg" />
                <span>Télécharger</span>
            </Button>
        </React.Fragment>
    );
}

export { InventoryInvoiceButton };