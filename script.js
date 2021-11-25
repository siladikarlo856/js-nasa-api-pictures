const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');


// NASA API
const count = 2;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
    resultsArray.forEach((result) => {
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = "NASA Picture of the Day";
        image.loading = "lazy";
        image.classList.add('card-img-top');
        // Card Body
        const body = document.createElement('div');
        body.classList.add('card-body');
        // Card Title
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = result.title;
        // Add to Favorites
        const addToFavorites = document.createElement('p');
        addToFavorites.classList.add('clickable');
        addToFavorites.textContent = 'Add to Favorites';
        // Card Text Explanation
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = result.explanation;
        // Muted Text
        const mutedText = document.createElement('small');
        mutedText.classList.add('text-muted');
        // Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Copyright Info
        const copyrightInfo = document.createElement('span');
        copyrightInfo.textContent = ` ${result.copyright ? result.copyright : ''}`;

        mutedText.append(date, copyrightInfo);
        body.append(title, addToFavorites, cardText, mutedText);
        link.appendChild(image);      
        card.append(link, body);
        imagesContainer.appendChild(card);
    });

}

// Get mages from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    } catch(error) {
        // Catch Error Here
    }
}

// On Load
getNasaPictures();