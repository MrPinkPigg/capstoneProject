//Barcodes.js

import React, {Component} from 'react';

//Grabs the information from data.json (the barcodes)
const barcodeData = require("./../data.json");

let barcodes = barcodeData;

//Generates the list of barcodes based on the data in data.json (barcode data)
const generateBarcodes = () => {
    const barcodesDiv = document.getElementById("barcodes");
    let barcodesInfo = {};
    if (barcodesDiv.classList.contains("hide")) {
        barcodesDiv.classList.remove("hide");
    }
    else {
        barcodesDiv.classList.add("hide");
    }
    barcodesDiv.innerHTML = '';
    barcodes.forEach(barcode => {
        barcodesInfo[barcode] = {};
        barcodesDiv.innerHTML += `<li class='compounds'><button type="button" class="btn btn-secondary m-1 btn-sm" id=${barcode}>${barcode}</button></li>`;
    });
}

//Renders the generated list of barcodes from generateBarcodes
const barcodesRender = () => {
    return(
        <div>
            <button id='' class='collapsible' onClick={generateBarcodes}>Click to Expand List of Barcodes</button>
            <div id='barcodes' class='content hide'> 
            </div>
        </div>
        );
}

class Compounds {
    constructor(name, conc, vol) {
        this.name = name;
        this.conc = conc;
        this.vol = vol;
    }
}

//Exports the rendering of the barcodes for App.js to use
export default barcodesRender;

