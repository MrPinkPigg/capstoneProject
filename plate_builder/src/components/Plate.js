//Home.jsY
import React from 'react';
import useParams from 'react';
import {click_cell, currentCell} from "./../Controller.js"; 
//import {onclickBarcode} from "./../Controller.js";
const barcodeData = require('../data.json')
let barcodes = barcodeData
let compounds = [];
let exportArr = [];

const Plate = (props) => {
    
    const rows = +props.row;
    const cols = +props.col;
    const rowsArr = new Array(rows)
    const colsArr = new Array(cols)
    rowsArr.fill("");
    colsArr.fill("");
    console.log(rowsArr)
    console.log(colsArr)
    return(
        <div>
            <div>
                <h3>Select Table Size</h3>
            <select id='tablesize'>
                <option value='96'>96</option>
                <option value='384'>384</option>
                <option value='1538'>1538</option>
            </select>
            </div>
            <div id='barcodes' class='compoundsDiv hide'>
            </div>
            <div id='popup' class='hide'>
                <div>
                <input id='concentration' placeholder='Enter concentration'></input>
                </div>
                <div>
                <input id='volume' placeholder='Enter volume'></input>
                </div>
                <button onClick={returnValues}>Submit</button>
            </div>
        <div id="plate">
            <table class="mb-3">
                <tbody>
                    <tr>
                        <th></th>
                        {rowsArr.map((e, row) => <th scope="col" className ="textcenter">{convertCol2Alpha(row)}</th>)}
                    </tr>
                </tbody>
                <tbody>
                    {rowsArr.map((e, row) => (
                        <tr>
                            <th id={row} scope="row">{row}</th>
                            {colsArr.map((e, col) => {
                                const cell = convertCol2Alpha(col) + row

                                return <td id={cell} row={row} class="border border-2" data-toggle="tooltip" data-placement="top" title="Empty">
                                    <section className="hovercell mx-1" onClick={() => click_cell(cell)}>{cell}</section>
                                </td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            <button type="button" onClick={exportJSON} >Export data</button>
        </div>
        );
}
export default Plate;

let rowFill = {};
const convertCol2Alpha = (col) => String.fromCharCode(65 + col);
/*
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
*/
export const tableSize = () => {
    var size = document.getElementById('tablesize')
    console.log(size.value)
}
export const generateBarcodes = () => {
    const barcodesDiv = document.getElementById("barcodes");
    barcodesDiv.classList.remove("hide");
    let barcodesInfo = {};
    var buildStuff = '<ul id="barcodesList">';
    barcodes.forEach(barcode => {
        barcodesInfo[barcode] = {};
        buildStuff += `<li class='compounds'><button type="button" class="btn btn-secondary m-1 btn-sm" id=${barcode}>${barcode}</button></li>`;
    
    });
    buildStuff += '</ul>';
    barcodesDiv.innerHTML = buildStuff;
    var barcodesL = document.getElementById("barcodesList").getElementsByTagName('li');//array of lis
    Array.from(barcodesL).forEach(function(li) {
        var btnGrab = li.getElementsByTagName('button')[0];
        //console.log(btnGrab.id);
        btnGrab.onclick = function(){
            var values = document.getElementById('popup')
            values.classList.remove('hide')
            compounds.push(this.id)
            
        };
    })
    /*
    $("#barcodesList ul li").each(function(){//this is li
        var btn = $(this).find("button");
        btn.on("click", onclickBarcode(btn.id));
        
    });  */
}
function returnValues() {
    var concentration = document.getElementById('concentration').value;
    var volume = document.getElementById('volume').value;
    compounds.push(concentration, volume)
    var cellValue = document.getElementById(currentCell)
    cellValue.title = compounds;
    cellValue.style.backgroundColor = '#0000FF'
    console.log(cellValue)
    compounds.push(currentCell);
    exportArr.push(compounds);
    return false;
  }
const generateTable = (rows, cols) => {
    let tableHTML = `<table class="mb-3"><tbody><tr><th></th>`;
    for(let col = 0; col < cols; col++){
        const label = convertCol2Alpha(col);
        tableHTML += `<th scope="col" class="text-center">${label}</th>`;
    }
    tableHTML += "</tbody></tr><tbody>";
    for (let row = 1; row <= rows; row++){
        rowFill[row] = 0;
        tableHTML += `<tr><th id=${row} scope="row">${row}</th>`;
        // un-comment to allow to click row & function click_row
        // class="table-row" onclick="click_row(${row})" data-toggle="tooltip" data-placement="right" title="Click to populate row ${row}"
        for(let col = 0; col < cols; col++){
            const cell = convertCol2Alpha(col) + row;
            tableHTML += 
            `<td data='' id=${cell} row=${row} class="border border-2" onclick={compoundSelect(${cell})} data-toggle="tooltip" data-placement="top" title="Empty">
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

/*const newTable = () => {
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

newTable(); 
*/

//document.getElementById("plate").innerHTML = generateTable(16,8);

//$("#plate").add(generateTable(16,8));

function exportJSON() {
    console.log(exportArr);
    //sessionStorage.setItem("jsonData", exportArr);
}