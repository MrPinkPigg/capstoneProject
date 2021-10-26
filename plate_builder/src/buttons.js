import fillOrEditCells from './plateController.js'
import newTable from './plateController.js'

const size = document.getElementById("size");
const results = document.getElementById("results");
const type = document.getElementById("type");
const volume = document.getElementById("volume");
const unit = document.getElementById("unit");
const conc = document.getElementById("conc");
const concunit = document.getElementById("concunit");
const table = document.getElementById("table");
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
    //barcodesInfo = {};
    //barcodes = [...ogBarcodes];
    //selected = '';
    size.disabled = false;
    type.disable = false;
    results.innerHTML = '';
}

const click_submit = () => {
    results.innerHTML = '';
    //ogBarcodes.forEach(barcode => {
    //    if(barcodesInfo[barcode].placement)
    //        results.innerHTML += `<p>Tube with barcode ${barcode} was placed in ${barcodesInfo[barcode].placement}; 
    //        it has a volume of ${barcodesInfo[barcode].volume} ${barcodesInfo[barcode].unit} & a concentration of ${barcodesInfo[barcode].conc} ${barcodesInfo[barcode].concunit}.</p>`;
   // })
}
