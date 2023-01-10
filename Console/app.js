// Load the JSON file
fetch('Console-searcher-data.json')
  .then(response => response.json())
  .then(games => {
    // Get the search input, genre select, and genre button elements
    const searchInput = document.querySelector('#search-input');
    const genreSelect = document.querySelector('#genre-select');
    const genreButton = document.querySelector('#genre-button');

    // Add an event listener to the form to listen for submit events
    document.querySelector('form').addEventListener('submit', event => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the keyword and genre values from the form
      const keyword = searchInput.value.toLowerCase();
      const genre = genreSelect.value;

      // Filter and update the results
      updateResults(games, keyword, genre);
    });

    // Add an event listener to the genre select element to listen for change events
    genreSelect.addEventListener('change', event => {
      // Get the keyword and genre values from the form
      const keyword = searchInput.value.toLowerCase();
      const genre = event.target.value;

      // Filter and update the results
      updateResults(games, keyword, genre);
    });

    // Add an event listener to the genre button to toggle the genre select element
    genreButton.addEventListener('click', event => {
      const genreSelectContainer = document.querySelector('#genre-select-container');
      genreSelectContainer.style.display = genreSelectContainer.style.display === 'none' ? 'block' : 'none';
    });
  });

  function updateResults(games, keyword, genre) {
   // Filter the games by keyword and genre
   const filteredGames = games.filter(game => {
     // Check if the game name includes the keyword
    const nameMatch = game.name.toLowerCase().includes(keyword);

    // Check if the game genre matches the selected genre
    const genreMatch = genre === 'all' || game.genre.toLowerCase().includes(genre.toLowerCase());

     // Return true if the game name includes the keyword and the genre matches the selected genre
    return nameMatch && genreMatch;
   });
  
   // Create an HTML element for each game
   const html = filteredGames.map(game => {
     return `
       <div class="game">
        <img src="${game.image}" alt="${game.name}">
        <h2>${game.name}</h2>
         <p class="genre">Genres: ${game.genre}</p>
         <p class="platform">Platform: ${game.platform}</p>
         <p>${game.description}</p>
         <p><a href="${game.url}" target="_blank">Click for more details and redirect to main website</a></p>

      </div>
     `;
   }).join('');

   // Insert the HTML into the page
   document.querySelector('#results').innerHTML = html;
   }