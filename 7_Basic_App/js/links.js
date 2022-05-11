// Uncomment for step-by-step execution.
// debugger;

// Header.
function makeHeader(div) {

    // We already mix .header and .title
    div.style.background = 'rgb(228, 176, 176)';
    div.style.border = '2px solid black';
    div.style.padding = '10px';
    
    // CSS property box-shadow needs to be quoted in JS to 
    // avoid confusion with the minus sign. 
    
    div.style['box-shadow'] = '2px 2px 10px rgb(0 0 0 / 50%)';
    div.style['max-width'] = 'inherit';
    div.style['margin-bottom'] = '30px !important';

}
let divAbove = document.getElementById("above");
makeHeader(divAbove);