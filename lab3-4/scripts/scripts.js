const clipsContainer = document.getElementById('clipList');
const sortIncrease = document.getElementById('sortIncrease');
const sortDecrease = document.getElementById('sortDecrease');
const totalViewsButton = document.getElementById('totalViewsBtn');
const searchInput = document.getElementById('searchInput');
const findButton = document.getElementById('findButton');
const totalViewsElement = document.getElementById('totalViews');

let localClips = [];
let jsonClips = [];
let currentClips = []; // This will hold the currently displayed clips (all or filtered)
let currentSortOrder = 'asc'; // Track the current sorting order, default is 'asc' (ascending)

// Function to fetch clips from local storage
function fetchLocalClips() {
    return JSON.parse(localStorage.getItem('clips')) || [];
}

// Function to fetch clips from the JSON file
async function fetchJsonClips() {
    try {
        const response = await fetch('../data/clips.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Problem with JSON:', error);
        return [];
    }
}

// Function to load and display clips
async function loadAndDisplayClips() {
    localClips = fetchLocalClips();
    jsonClips = await fetchJsonClips();
    currentClips = [...localClips, ...jsonClips];
    applySorting();
    displayClips(currentClips);
}

// Function to display clips
function displayClips(clips) {
    clipsContainer.innerHTML = '';

    if (clips.length === 0) {
        clipsContainer.innerHTML = '<p>No clips found.</p>';
        totalViewsElement.innerHTML = '';
        return;
    }

    clips.forEach(clip => {
        clipsContainer.innerHTML += `
            <li>
                <strong>Artist:</strong> ${clip.artist}, 
                <strong>Song Title:</strong> ${clip.songTitle}, 
                <strong>Duration:</strong> ${clip.duration} seconds, 
                <strong>Views:</strong> ${clip.views}
                <a href="edit.html?id=${clip.id}">Edit</a>
            </li>
        `;
    });

    const totalViews = calculateTotalViews(clips);
    totalViewsElement.innerHTML = `Total Views: ${totalViews}`;
}

function calculateTotalViews(clips) {
    return clips.reduce((total, clip) => total + clip.views, 0);
}

// Apply sorting based on currentSortOrder (ascending or descending)
function applySorting() {
    if (currentSortOrder === 'asc') {
        currentClips.sort((a, b) => a.views - b.views); // Sort ascending
    } else {
        currentClips.sort((a, b) => b.views - a.views); // Sort descending
    }
}

// Event listener for sorting clips by increasing views
sortIncrease.addEventListener('click', () => {
    currentSortOrder = 'asc'; // Update sort order to ascending
    applySorting();
    displayClips(currentClips);
});

// Event listener for sorting clips by decreasing views
sortDecrease.addEventListener('click', () => {
    currentSortOrder = 'desc';
    applySorting();
    displayClips(currentClips);
});

// Event listener for searching clips by artist
findButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    currentClips = [...localClips, ...jsonClips]; // Reset current clips to all data
    currentClips = currentClips.filter(clip =>
        clip.artist.toLowerCase().includes(searchTerm)
    );
    applySorting();
    displayClips(currentClips);
});

// Load and display clips on page load
document.addEventListener('DOMContentLoaded', loadAndDisplayClips);
