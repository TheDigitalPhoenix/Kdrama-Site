
// const apiKey = "493840a2f05e02c49d3708051f0052fd";

// const apiKey = "493840a2f05e02c49d3708051f0052fd";
// const baseUrl = 'https://api.themoviedb.org/3';

// async function searchContent() {
//      
//      if(!search) return ('Please Enter a Search Term');

//   try {
//      const response = await fetch(
//           `${'https://api.themoviedb.org/3'}/search/multi?api_key=${"493840a2f05e02c49d3708051f0052fd"}
//           &query=${search}&language=en-US`
//      );
//      const data = await response.json();
//      displayContent(data.results);
//   }
//    catch (error) {
//      showError('Search failed. Check API key or connection.');
//   }
// };

// function displayContent(items) {
//    const container = document.getElementById("content");

//    if (!items || items.length === 0) {
//       container.innerHTML = '<div class="loading">No content found</div>';
//       return;
//    }

//    container.innerHTML = '';

//    items.forEach(item => {
//       const card = document.createElement('div');
//       card.className = 'movie-card';

//       const posterUrl = item.poster_path
//       ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
//    });
// }

// fetchMovie();
  
async function fetchMovie(){
    
  try {
    document.getElementById("movieContainer").innerHTML = '<div class="loading">Searching... 🎬</div>';
    const searchInput = document.getElementById("searchInput");
    const search = searchInput.value;
     // clearing the value
     searchInput.value = "";

    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=493840a2f05e02c49d3708051f0052fd&query=${search}`);
     
    // checking the response
    if (!response.ok) {
       throw new Error("Could not fetch Movie Data");// if not okay throw error
    }
    // if there are no input
    if(!search){
      alert("Please Enter a Search Term");
      return;
    }
    // changing data into json format
    const data = await response.json();
    console.log(data);
    console.log(data.original_name);
    console.log(data.results.length);
    document.getElementById("movieContainer").innerHTML = "";
    // --- FILTER KOREAN CONTENT ---
    const kdrama = data.results.filter(movie => movie.original_language === "ko");
    if(kdrama.length === 0){
      throw new Error("No results found. Try another search! 😢")
    }
    kdrama.forEach(movie => {

      const posterPath = movie.poster_path;
      if (!posterPath) return; // if it doesn't have an image return empty
      
       // declaring variables 
       const yearText = movie.first_air_date ? `📅 ${movie.first_air_date.substring(0, 10)}` : "📅 Year unknown";
       const overview = movie.overview;
       const rating = movie.vote_average;
       const fullImageUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
       

       // Create DOM elements for movie display
       const movieCard = document.createElement("div");
       movieCard.className = "movie-card";

      const imgElement = document.createElement("img");
      const overviewElement = document.createElement("p");
      const ratingElement = document.createElement("p");
      const yearElement = document.createElement("p");

      imgElement.src = fullImageUrl;
      imgElement.alt = movie.title;


       //appending the div element to the browser
      movieCard.appendChild(imgElement);
      movieCard.appendChild(overviewElement);
      movieCard.appendChild(ratingElement);
      movieCard.appendChild(yearElement);

      document.getElementById("movieContainer").appendChild(movieCard);

      imgElement.style.cssText = "display: grid; width: 250px; height: 250px; margin-bottom: 10px; float: left";
      imgElement.style.gridTemplateColumns = "repeat(auto-fit, minmax(150px, 1fr))";

      // assigning the value
      overviewElement.textContent = overview;
      overviewElement.style.cssText = "color: black;"
      ratingElement.textContent = `⭐⭐⭐: ${rating}/10`;
      yearElement.textContent = yearText;
     
      
  
    });
 
 }
 // catch and handle errors
  catch (error) {
    // alert(error);
    document.getElementById("movieContainer").innerHTML = '<div class="error">No results found. Try another search! 😢</div>';
  }
}
document.getElementById("searchInput").addEventListener("keydown", (e) => { 
  if (e.key === "Enter") {
    fetchMovie();
  }
 });

 // Popular code
 async function getPopular(){

  try {
    // const searchInput = document.getElementById("searchInput");
    // const search = searchInput.value;
    // clearing the value
    //  searchInput.value = "";

    const response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=493840a2f05e02c49d3708051f0052fd&language=en-US&sort_by=popularity.desc&with_original_language=ko');

    // checking the response
    if (!response.ok) {
       throw new Error("Could not fetch Movie Data");// if not okay throw error
    }
    // if there are no input
    // if(!search){
    //   alert("Please Enter a Search Term");
    //   return;
    // }
    // changing data into json format
    const data = await response.json();
    console.log(data);
    console.log(data.results.length);
    console.log(data.results.overview);

    // --- FILTER KOREAN CONTENT ---
    const kdrama = data.results.filter(movie => movie.original_language === "ko");
     document.querySelector(".loading").innerHTML = "";
    kdrama.forEach(movie => {

      const posterPath = movie.poster_path;
      if (!posterPath) return; // if it doesn't have an image return empty


       // declaring variables 
       const yearText = movie.first_air_date ? `📅 ${movie.first_air_date.substring(0, 10)}` : "📅 Year unknown";
       const overview = movie.overview;
       const rating = movie.vote_average;
       const fullImageUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
       

       // Create DOM elements for movie display
       const movieCard = document.createElement("div");
       movieCard.className = "movie-card";

      const imgElement = document.createElement("img");
      const overviewElement = document.createElement("p");
      const ratingElement = document.createElement("p");
      const yearElement = document.createElement("p");

      imgElement.src = fullImageUrl;
      imgElement.alt = movie.title;


       //appending the div element to the browser
      movieCard.appendChild(imgElement);
      movieCard.appendChild(overviewElement);
      movieCard.appendChild(ratingElement);
      movieCard.appendChild(yearElement);

      document.getElementById("movieContainer").appendChild(movieCard);

      imgElement.style.cssText = "display: grid; width: 250px; height: 250px; margin-bottom: 10px; float: left";
      imgElement.style.gridTemplateColumns = "repeat(auto-fit, minmax(150px, 1fr))";

      // assigning the value
      overviewElement.textContent = overview;
      overviewElement.style.cssText = "color: black;"
      ratingElement.textContent = `⭐⭐⭐: ${rating}/10`;
      yearElement.textContent = yearText;
     
      
  
    });
 
 }
 // catch and handle errors
  catch (error) {
    alert(error);
  }
}
