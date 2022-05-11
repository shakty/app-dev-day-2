// Uncomment for step-by-step execution.
// debugger;

// Tabs.
let currentTab = null;
function displayTab(tabId) {
  // Make the container div visible.
  // This needs to be done only once, but we repeat
  // at every call for simplicity.
  document.getElementById('below').style.display = '';
  
  if (currentTab) currentTab.className = "tab";
  currentTab = document.getElementById(tabId);
  currentTab.className = "tab tab-active";
}

// Option 2 to add an event listener to clicks.
document.getElementById("power-yes").onclick = function () {
    displayTab("tab-yes");
  };

// Option 2 to add an event listener to clicks.
document.getElementById("power-maybe").onclick = function () {
  displayTab("tab-maybe");
};

// Option 3 to add an event listener to clicks.
document.getElementById("power-no").addEventListener("click", function () {
  displayTab("tab-no");
});
