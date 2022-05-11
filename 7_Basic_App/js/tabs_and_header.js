// Uncomment for step-by-step execution.
// debugger;

// Header.
function makeHeader(div) {
  div.style.background = "#CCC";
  div.style.border = "1px solid black";
  // CSS property box-shadow needs to be quoted in JS to
  // avoid confusion with the minus sign.
  div.style["box-shadow"] = "2px 2px";
}
let divAbove = document.getElementById("above");
makeHeader(divAbove);

// Tabs.
let currentTab = null;
function displayTab(tabId) {
  if (currentTab) currentTab.className = "tab";
  currentTab = document.getElementById(tabId);
  currentTab.className = "tab tab-active";
}

// Option 2 to add an event listener to clicks.
document.getElementById("power-maybe").onclick = function () {
  displayTab("tab-maybe");
};

// Option 3 to add an event listener to clicks.
document.getElementById("power-no").addEventListener("click", function () {
  displayTab("tab-no");
});
