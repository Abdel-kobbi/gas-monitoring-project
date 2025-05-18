import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileCsv } from "react-icons/fa6";


function Historique({ data }) {

    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "Date et heure", selector: (row) => row.timestamp, sortable: true },
        { name: "Niveau de gaz(PPM)", selector: (row) => row.ppm, sortable: true },
    ];

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Données Gaz");
        XLSX.writeFile(wb, "donnees_gaz.xlsx");
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Données Gaz", 20, 10);
        const tableData = data.map(row => [row.id, row.timestamp, row.ppm]);
        autoTable(doc, {
            head: [["ID", "Date et heure", "Niveau de gaz (PPM)"]],
            body: tableData,
            startY: 20
        })
        doc.save("donnees_gaz.pdf");
    };

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#343a40', // fond du header (dark)
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        rows: {
            style: {
                minHeight: '60px',
            },
        },
    };


    const conditionalRowStyles = [
        {
            when: row => row.ppm < 300,
            style: {
                backgroundColor: "#d4edda", // Vert clair
                color: "#155724",
                fontWeight: 800
            },
        },
        {
            when: row => row.ppm >= 300 && row.ppm < 500,
            style: {
                backgroundColor: "#fff3cd", // Jaune clair
                color: "#856404",
                fontWeight: 800
            },
        },
        {
            when: row => row.ppm >= 500,
            style: {
                backgroundColor: "#f8d7da", // Rouge clair
                color: "#721c24",
                fontWeight: 800
            },
        },
    ];

    return (
        <>
            <div className="mb-3 float-end">
                <CSVLink data={data} data-bs-toggle="tooltip" data-bs-placement="top" title="Export CSV" filename={"donnees_gaz.csv"} className="btn btn-primary me-2"><FaFileCsv /></CSVLink>
                <button onClick={exportExcel} data-bs-toggle="tooltip" data-bs-placement="top" title="Export Excel" className="btn btn-success me-2"><PiMicrosoftExcelLogoDuotone /></button>
                <button onClick={exportPDF} data-bs-toggle="tooltip" data-bs-placement="top" title="Export PDF" className="btn btn-secondary"><FaFilePdf /></button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                striped
                responsive
                conditionalRowStyles={conditionalRowStyles}
                progressPending={data.length === 0}
                progressComponent={<span className="text-black fs-3">Chargement des données...</span>}
                fixedHeader={true}
                customStyles={customStyles}
            />
        </>
    )
}

export default Historique
