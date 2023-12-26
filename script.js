

function displayPlaces(places) {
    const placesList = document.getElementById('placesList');
    placesList.innerHTML = "<h2>Places</h2>";
    places.forEach(place => {
      const placeDiv = document.createElement('div');
      placeDiv.classList.add('place');
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;
      placeDiv.innerHTML = `
        <h3>${place.name}</h3>
        <a href="${mapLink}" target="_blank">View in Google Maps</a>
        <div class="place-details">
          <img src="${place.photos ? place.photos[0].getUrl() : 'https://via.placeholder.com/150'}" alt="Place Image">
          <p><strong>Address:</strong> ${place.vicinity}</p>
          <p><strong>Rating:</strong> <span class="rating">${place.rating || 'N/A'}</span></p>
          <div class="stars">${generateStars(place.rating)}</div>
        </div>
      `;
      placesList.appendChild(placeDiv);
    });

    // Show the placesList once places are added
    placesList.style.display = 'block';
}
  
  function fetchMostPopularPlaces() {
    const city = document.getElementById('city').value;
    const range = parseFloat(document.getElementById('range').value) * 1000;
    const attractionType = 'cafe'; // Adjust the type if needed
  
    const map = new google.maps.Map(document.createElement('div'));
    const placesService = new google.maps.places.PlacesService(map);
  
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': city }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
  
        const request = {
          location: location,
          radius: range,
          type: attractionType,
          keyword: 'cafe' // Adjust the keyword if needed
        };
  
        placesService.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Add logic to filter or sort the places based on popularity
            const popularPlaces = results.filter(place => place.rating >= 4.5); // Example: Filter by rating
            displayPlaces(popularPlaces);
          } else {
            console.error('Places service request failed. Status:', status);
          }
        });
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }
  function fetchPlaces() {
    const city = document.getElementById('city').value;
    const range = parseFloat(document.getElementById('range').value) * 1000;
    const attractionType = document.getElementById('attractionType').value;
  
    const map = new google.maps.Map(document.createElement('div'));
    const placesService = new google.maps.places.PlacesService(map);
  
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': city }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
  
        const request = {
          location: location,
          radius: range,
          type: attractionType,
          rankBy: google.maps.places.RankBy.PROMINENCE // Fetch places by prominence
        };
  
        placesService.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const famousPlaces = results.filter(place => place.rating >= 4.0); // Filter places by rating (adjust as needed)
            displayPlaces(famousPlaces);
          } else {
            console.error('Places service request failed. Status:', status);
          }
        });
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }
  
  
  
  function generateStars(rating) {
    const roundedRating = Math.round(rating);
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    return stars;
  }
  function toggleContainer() {
    const container2 = document.getElementById('container2');
    container2.style.display = container2.style.display === 'none' ? 'block' : 'none';
    const mostPopularButton = document.querySelector('button[onclick="fetchMostPopularPlaces()"]');
    mostPopularButton.style.display = mostPopularButton.style.display === 'none' ? 'inline' : 'none';
    const clearButton = document.getElementById('clearButton');
    clearButton.style.display = clearButton.style.display === 'none' ? 'inline' : 'none';
    const clearButton2 = document.getElementById('clearButton2');
    clearButton2.style.display = clearButton.style.display === 'none' ? 'inline' : 'none';
}
  
