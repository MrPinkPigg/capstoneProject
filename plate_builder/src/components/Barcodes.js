//Barcodes.js

import React, {Component} from 'react';

const barcodeData = require("./../data.json");

let barcodes = barcodeData;

const barcodesRender = () => {
    return(
        <div>
            <button id='' class='collapsible' onClick={generateBarcodes}>Click to Expand List of Barcodes</button>
            <div id='barcodes' class='content hide'> 
            </div>
        </div>
        );
}

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
        barcodesDiv.innerHTML += `<li class='compounds'><button type="button" class="btn btn-secondary m-1 btn-sm" id=${barcode} onclick="click_barcode(${barcode})">${barcode}</button></li>`;
    });
}

class Compounds {
    constructor(name, conc, vol) {
        this.name = name;
        this.conc = conc;
        this.vol = vol;
    }
}

export default barcodesRender;

