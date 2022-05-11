function doSolution() {
  fetchThingsToDo(todos => {
    todos.forEach(todo => {
        let li = document.createElement('li');
        li.innerHTML = todo;
        // Add a new child element at the bottom of <ol>.
        ol.appendChild(li);
    });

    // Remove loading img.
    div.removeChild(img);

    // Append the <ol> and all of its children here.
    div.appendChild(ol);

    
    // ScrollIntoView is not available in older browser, check if it is defined.
    if ('function' === typeof ol.scrollIntoView) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
      ol.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  });
}