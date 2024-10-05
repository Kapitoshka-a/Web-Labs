document.getElementById('createClipForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const artist = document.getElementById('artist').value.trim();
    const songTitle = document.getElementById('songTitle').value.trim();
    const duration = parseInt(document.getElementById('duration').value);
    const views = parseInt(document.getElementById('views').value);

    // Basic validation
    if (artist === '' || songTitle === '' || duration <= 0 || views < 0) {
        alert('Please fill out the form correctly.');
        return;
    }

    // Fetch existing clips from local storage
    const clips = JSON.parse(localStorage.getItem('clips')) || [];

    // Check for duplicate songTitle
    const duplicateClip = clips.find(clip => clip.songTitle.toLowerCase() === songTitle.toLowerCase());
    if (duplicateClip) {
        alert(`A clip with the song title "${duplicateClip.songTitle}" made by ${duplicateClip.artist} already exists.`);
        return;
    }

    // Create and add the new clip
    const newClip = { id: Date.now(), artist, songTitle, duration, views };
    clips.push(newClip);

    // Save to local storage
    localStorage.setItem('clips', JSON.stringify(clips));

    // Inform the user and redirect
    alert('Clip created successfully!');
    window.location.href = 'index.html';
});

