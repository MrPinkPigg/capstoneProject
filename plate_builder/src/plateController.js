const size = document.getElementById("size");
const results = document.getElementById("results");
const type = document.getElementById("type");
const volume = document.getElementById("volume");
const unit = document.getElementById("unit");
const conc = document.getElementById("conc");
const concunit = document.getElementById("concunit");
const table = document.getElementById("table");

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
});
*/




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
    //table.innerHTML = generateTable(rows, cols);
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
    //barcodesInfo[barcode.id].placement = cell.id;
    setTubeProps(barcode.id, cell);
    rowFill[cell.getAttribute("row")] += 1;
    //barcode.setAttribute("placement", cell.id);
    //barcodes.splice(barcodes.indexOf(barcode.id),1);
    cell.setAttribute("barcode", barcode.id);
}

const setTubeProps = (barcode, cell) => {
    /*barcodesInfo[barcode].volume = volume.value;
    barcodesInfo[barcode].unit = unit.value;
    barcodesInfo[barcode].conc = conc.value;
    barcodesInfo[barcode].concunit = concunit.value;*/
    cell.setAttribute("data-original-title", `${barcode}\r\nVol: ${volume.value} ${unit.value}\r\nConc: ${conc.value} ${concunit.value}`);
}

const fillOrEditCells = (allowEdit) => {
    const selectedCells = document.querySelectorAll(".selected");
    let filled = 0;
    selectedCells.forEach(cell => { 
        if (cell.getAttribute("barcode")) filled++;
    })
    /*if(volume.value > 0 && conc.value > 0 && selectedCells.length - filled <= barcodes.length){
        selectedCells.forEach(cell => {
            const barcode = document.getElementById(barcodes[0]);
            if(!cell.getAttribute("barcode")) placeTube(barcode, cell);
            else if(allowEdit) setTubeProps(barcode.id, cell);
        })
    }
    else alert("Properties not filled or insufficient number of barcodes");*/
}



//
// Initialization
//
newTable();


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