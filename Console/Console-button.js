// Add an event listener to the search button to close the genre select element
document.querySelector('#search-button').addEventListener('click', event => {
  const genreSelectContainer = document.querySelector('#genre-select-container');
  genreSelectContainer.style.display = 'none';
});