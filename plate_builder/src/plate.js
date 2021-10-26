import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import $ from 'jquery'
import SelectionArea, {SelectionEvent} from '@viselect/react';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();








let rows;
let cols;
let rowFill = {};

//
// Utility
//
const convertCol2Alpha = (col) => String.fromCharCode(65 + col);
const isCellEmpty = (cell) => !cell.getAttribute("barcode");





//
// Set-up functions
//



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






