// Get the clip ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const clipId = urlParams.get('id');

// Fetch existing clips from local storage
const clips = JSON.parse(localStorage.getItem('clips')) || [];

// Find the clip by ID
const clip = clips.find(c => c.id === parseInt(clipId));

// Pre-populate the form with the existing clip data
if (clip) {
    document.getElementById('clipId').value = clip.id;
    document.getElementById('artist').value = clip.artist;
    document.getElementById('songTitle').value = clip.songTitle;
    document.getElementById('duration').value = clip.duration;
    document.getElementById('views').value = clip.views;
}

// Handle form submission for editing
document.getElementById('editClipForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const updatedArtist = document.getElementById('artist').value;
    const updatedSongTitle = document.getElementById('songTitle').value;
    const updatedDuration = parseInt(document.getElementById('duration').value);
    const updatedViews = parseInt(document.getElementById('views').value);

    // Basic validation
    if (updatedArtist === '' || updatedSongTitle === '' || updatedDuration <= 0 || updatedViews < 0) {
        alert('Please fill out the form correctly.');
        return;
    }

    // Update the clip object
    clip.artist = updatedArtist;
    clip.songTitle = updatedSongTitle;
    clip.duration = updatedDuration;
    clip.views = updatedViews;

    // Save the updated clips array back to local storage
    localStorage.setItem('clips', JSON.stringify(clips));

    // Inform the user
    alert('Clip updated successfully!');

    // Redirect to the main page
    window.location.href = 'index.html';
});
