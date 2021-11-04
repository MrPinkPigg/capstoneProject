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

const barcodeData = require("./data.json")
let barcodes = barcodeData;

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
//********THIS IS THE COMMENTED OUT STUFF
/*
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
});*/

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
    /*$(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })*/
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