import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery'
import SelectionArea, {SelectionEvent} from '@viselect/react';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const table = document.getElementById("table");
const barcodesDiv = document.getElementById("barcodes");
const size = document.getElementById("size");
const type = document.getElementById("type");
const volume = document.getElementById("volume");
const unit = document.getElementById("unit");
const conc = document.getElementById("conc");
const concunit = document.getElementById("concunit");
const results = document.getElementById("results");

const ogBarcodes = [
    "A0284716260327",
    "A3712780793214",
    "A1096229866991",
    "A7135620292528",
    "A2968693730797",
    "A2003576555774",
    "A3778484382192",
    "A2070687082918",
    "A4553212017022",
    "A1254916843339",
    "A0412664115387",
    "A2600764808775",
    "A5314765629655",
    "A7547271251555",
    "A8166012719568",
    "A9675802140493",
    "A0885170089273",
    "A7586764823954",
    "A1191747286877",
    "A2712710553926",
    "A9010045335020",
    "A7399248952169",
    "A9030418768897",
    "A5777517560536",
    "A9383285238650",
    "A9155649185869",
    "A7691290484866",
    "A3052688565934",
    "A1207098125977",
    "A8205525609888",
    "A5688192298389",
    "A2328138166848",
    "A8763471933025",
    "A0114881843141",
    "A4936498034431",
    "A7706068101514",
    "A3614641101544",
    "A0349109728690",
    "A6723746659809",
    "A1985956527391",
    "A8478354369784",
    "A9552227626743",
    "A7930913549576",
    "A5120668718477",
    "A8745237778415",
    "A0272950749524",
    "A6770525231497",
    "A1045920329816",
    "A6155833930513",
    "A6337078482587",
    "A8547254580077",
    "A7652869910001",
    "A7633407904171",
    "A0205934995624",
    "A9820820899773",
    "A7663900954953",
    "A3444560140894",
    "A3561786696735",
    "A6400525588870",
    "A5207510208666",
    "A4030355210935",
    "A4489333698096",
    "A7327996501766",
    "A0701560139864",
    "A5477102548191",
    "A5637821345451",
    "A8627452483070",
    "A2283969567748",
    "A0168712364091",
    "A6081851399295",
    "A9227040288873",
    "A9950056372808",
    "A9047625619553",
    "A5057545902240",
    "A4963955408597",
    "A8448009674662",
    "A3790846233850",
    "A2382496430317",
    "A6165757950535",
    "A7178077540774",
    "A2168034252159",
    "A7001408451718",
    "A7391516451046",
    "A9124342601822",
    "A1739253802749",
    "A0293354360610",
    "A9539287949333",
    "A2945167865223",
    "A2526020606919",
    "A9705101592546",
    "A2784449171375",
    "A6305356844327",
    "A5950816706090",
    "A0968777141732",
    "A1206492550736",
    "A7264980725398",
    "A7306315947089",
    "A2148717072670",
    "A1845705776473",
    "A2162240298000"
];
let barcodes = [...ogBarcodes];

let barcodesInfo = {};
let rows;
let cols;
let rowFill = {};

//
// Utility
//
const convertCol2Alpha = (col) => String.fromCharCode(65 + col);
const isCellEmpty = (cell) => !cell.getAttribute("barcode");

//
// Allow for cell selection
//

const selection = new SelectionArea({ 
    selectables: ['td'], 
    boundaries: ['table']
}).on('start', ({store, event}) => {
    if (!event.ctrlKey && !event.metaKey) {
        for (const el of store.stored) {
            el.classList.remove('selected');
        }
        selection.clearSelection();
    }

}).on('move', ({store: {changed: {added, removed}}}) => {
    for (const el of added) {
        el.classList.add('selected');
    }
    for (const el of removed) {
        el.classList.remove('selected');
    }

}).on('stop', () => {
    document.getElementById("props").classList.remove("d-none");
    selection.keepSelection();
});

//
// Set-up functions
//
const generateBarcodes = () => {
    barcodesDiv.innerHTML = '';
    barcodes.forEach(barcode => {
        barcodesInfo[barcode] = {};
        barcodesDiv.innerHTML += `<li class='compounds'><button type="button" class="btn btn-secondary m-1 btn-sm" id=${barcode} onclick="click_barcode(${barcode})">${barcode}</button></li>`;
    });
}

const generateTable = (rows, cols) => {
    let tableHTML = `<table class="mb-3"><thead><tr><th></th>`;
    for(let col = 0; col < cols; col++){
        const label = convertCol2Alpha(col);
        tableHTML += `<th scope="col" class="text-center">${label}</th>`;
    }
    tableHTML += "</thead></tr><tbody>";
    for (let row = 1; row <= rows; row++){
        rowFill[row] = 0;
        tableHTML += `<tr><th id=${row} scope="row">${row}</th>`;
        // un-comment to allow to click row & function click_row
        // class="table-row" onclick="click_row(${row})" data-toggle="tooltip" data-placement="right" title="Click to populate row ${row}"
        for(let col = 0; col < cols; col++){
            const cell = convertCol2Alpha(col) + row;
            tableHTML += 
            `<td id=${cell} row=${row} class="border border-2" onclick="click_cell(${cell})" data-toggle="tooltip" data-placement="top" title="Empty">
                <section class="hovercell mx-1">${cell}</section>
            </td>`;
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</tbody></table>";
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    return tableHTML;
}

const newTable = () => {
    if (size.value == "96") {
        rows = 12;
        cols = 8;
    }
    if (size.value == "384") {
        rows = 24;
        cols = 16;
    }
    if(size.value == "1536") {
        rows = 64;
        cols = 24;
    }
    table.innerHTML = generateTable(rows, cols);
}

//
// Cell population and override functions
//
const placeTube = (barcode, cell) => {
    barcode.disabled = true;
    size.disabled = true;
    type.disabled = true;
    document.getElementById("props").classList.add("d-none");
    cell.classList.add("placed");
    barcodesInfo[barcode.id].placement = cell.id;
    setTubeProps(barcode.id, cell);
    rowFill[cell.getAttribute("row")] += 1;
    barcode.setAttribute("placement", cell.id);
    barcodes.splice(barcodes.indexOf(barcode.id),1);
    cell.setAttribute("barcode", barcode.id);
}

const setTubeProps = (barcode, cell) => {
    barcodesInfo[barcode].volume = volume.value;
    barcodesInfo[barcode].unit = unit.value;
    barcodesInfo[barcode].conc = conc.value;
    barcodesInfo[barcode].concunit = concunit.value;
    cell.setAttribute("data-original-title", `${barcode}\r\nVol: ${volume.value} ${unit.value}\r\nConc: ${conc.value} ${concunit.value}`);
}

const fillOrEditCells = (allowEdit) => {
    const selectedCells = document.querySelectorAll(".selected");
    let filled = 0;
    selectedCells.forEach(cell => { 
        if (cell.getAttribute("barcode")) filled++;
    })
    if(volume.value > 0 && conc.value > 0 && selectedCells.length - filled <= barcodes.length){
        selectedCells.forEach(cell => {
            const barcode = document.getElementById(barcodes[0]);
            if(!cell.getAttribute("barcode")) placeTube(barcode, cell);
            else if(allowEdit) setTubeProps(barcode.id, cell);
        })
    }
    else alert("Properties not filled or insufficient number of barcodes");
}

//
// Click functions
//
const click_populate = () => {
    fillOrEditCells(false);
}

const click_override = () => {
    fillOrEditCells(true);
}

const click_reset = () => {
    newTable();
    barcodesInfo = {};
    barcodes = [...ogBarcodes];
    generateBarcodes();
    //selected = '';
    size.disabled = false;
    type.disable = false;
    results.innerHTML = '';
}

const click_submit = () => {
    results.innerHTML = '';
    ogBarcodes.forEach(barcode => {
        if(barcodesInfo[barcode].placement)
            results.innerHTML += `<p>Tube with barcode ${barcode} was placed in ${barcodesInfo[barcode].placement}; 
            it has a volume of ${barcodesInfo[barcode].volume} ${barcodesInfo[barcode].unit} & a concentration of ${barcodesInfo[barcode].conc} ${barcodesInfo[barcode].concunit}.</p>`;
    })
}

//
// Initialization
//
newTable();
generateBarcodes();

//
// Archive
//
/*const click_row = (row) =>  {
    if (barcodes.length >= cols - rowFill[row] && volume.value > 0 && conc.value > 0) {
        for(let colToFill = 0; colToFill < cols; colToFill++) {
            const cell = document.getElementById(convertCol2Alpha(colToFill) + row);
            if(cellEmpty(cell)) {
                const barcode = document.getElementById(barcodes[0]);
                placeBarcode(barcode, cell);
            }
        }
    }
}*/

/*const click_cell = (cell) => {
    if(barcodes[0] && !document.getElementsById(barcodes[0]).getAttribute("placement") && isCellEmpty(cell) && volume.value > 0 && conc.value > 0) 
        placeTube(selected, cell);
}*/

/*const click_barcode = (barcode) => {
    selected = barcode;
    document.getElementById("props").classList.remove("d-none");
}*/
