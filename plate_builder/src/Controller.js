import {generateBarcodes} from './components/Plate.js'
const table = document.getElementById("table");
const barcodesDiv = document.getElementById("barcodes");
const size = document.getElementById("size");
const type = document.getElementById("type");
const volume = document.getElementById("volume");
const unit = document.getElementById("unit");
const conc = document.getElementById("conc");
const concunit = document.getElementById("concunit");
const results = document.getElementById("results");

const convertCol2Alpha = (col) => String.fromCharCode(65 + col);
const isCellEmpty = (cell) => !cell.getAttribute("barcode");
let selected = "";
const barcodeData = require("./data.json");
let barcodes = barcodeData;
let rows;
let cols;
let rowFill = {};
//
// Allow for cell selection
//
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


/*const placeTube = (barcode, cell) => {
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
*/


//
// Click functions
//
/*
const click_populate = () => {
    fillOrEditCells(false);
}

const click_override = () => {
    fillOrEditCells(true);
}

const click_reset = () => {
    newTable();
    barcodesInfo = {};
    barcodes = barcodeData;
    generateBarcodes();
    //selected = '';
    size.disabled = false;
    type.disable = false;
    results.innerHTML = '';
}

const click_submit = () => {
    results.innerHTML = '';
    barcodeData.forEach(barcode => {
        if(barcodesInfo[barcode].placement)
            results.innerHTML += `<p>Tube with barcode ${barcode} was placed in ${barcodesInfo[barcode].placement}; 
            it has a volume of ${barcodesInfo[barcode].volume} ${barcodesInfo[barcode].unit} & a concentration of ${barcodesInfo[barcode].conc} ${barcodesInfo[barcode].concunit}.</p>`;
    })
}
*/

//
// Archive
//
const click_row = (row) =>  {
    console.log("clickrow");
    if (barcodes.length >= cols - rowFill[row] && volume.value > 0 && conc.value > 0) {
        for(let colToFill = 0; colToFill < cols; colToFill++) {
            const cell = document.getElementById(convertCol2Alpha(colToFill) + row);
            if(isCellEmpty(cell)) {
                const barcode = document.getElementById(barcodes[0]);
                //placeBarcode(barcode, cell);
            }
        }
    }
}

export const click_cell = (cell) => {
    console.log("clicked: " + cell);
    generateBarcodes();
    if(document.getElementById(cell).title == "Empty") {
        document.getElementById(cell).title = "Filled";
        //document.getElementById(cell).style.backgroundColor = '#0000FF'

    } else if(document.getElementById(cell).title == "Filled"){
        document.getElementById(cell).title = "Empty";

    }
}

