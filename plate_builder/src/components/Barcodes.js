//Barcodes.js

import React, {Component} from 'react';

const barcodeData = require("./../data.json");

let barcodes = barcodeData;

class Barcodes extends Component {
    render(){
        return(
            <div>
                <h2>Barcodes</h2>
            </div>
        );
    }
}

/*const generateBarcodes = () => {
    barcodesDiv.innerHTML = '';
    barcodes.forEach(barcode => {
        barcodesInfo[barcode] = {};
        barcodesDiv.innerHTML += `<li class='compounds'><button type="button" class="btn btn-secondary m-1 btn-sm" id=${barcode} onclick="click_barcode(${barcode})">${barcode}</button></li>`;
    });
}*/

export default Barcodes;

