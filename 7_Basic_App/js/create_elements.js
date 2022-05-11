function doSolution() {
  fetchThingsToDo(todos => {
    todos.forEach(todo => {
        let li = document.createElement('li');
        li.innerHTML = todo;
        // Add a new child element at the bottom of <ul>.
        ul.appendChild(li);
    });

    // Remove loading img.
    p.removeChild(img);

    // Append the <ul> and all of its children here.
    p.appendChild(ul);  
  });
}