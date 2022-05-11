// Uncomment for step-by-step execution.
// debugger;

// Header.
function makeHeader(div) {
    div.style.background = '#CCC';
    div.style.border = '1px solid black';
    // CSS property box-shadow needs to be quoted in JS to 
    // avoid confusion with the minus sign. 
    div.style['box-shadow'] = '2px 2px';
}
let divAbove = document.getElementById("above");
makeHeader(divAbove);