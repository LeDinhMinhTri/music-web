const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');
const mainPlayBtn = document.getElementById('main-play-btn');
const followBtn = document.getElementById('follow-btn');
const moreBtn = document.getElementById('more-btn');
const songItems = document.querySelectorAll('.song-item');
const songPlayBtns = document.querySelectorAll('.song-play-btn');
const songMoreBtns = document.querySelectorAll('.song-more-btn');

// State
let isFollowing = false;
let currentlyPlaying = null;

// Navigation Functions
function goBack() {
    console.log('Going back...');
    // In a real app, this would handle browser history
}

function goForward() {
    console.log('Going forward...');
    // In a real app, this would handle browser history
}

// Play Functions
function playMainTrack() {
    console.log('Playing main track...');
    // In a real app, this would start playing the artist's top track
    
    // Visual feedback
    mainPlayBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        mainPlayBtn.style.transform = 'scale(1.05)';
    }, 100);
}

function playSong(songNumber) {
    console.log(`Playing song ${songNumber}...`);
    
    // Update currently playing state
    if (currentlyPlaying) {
        currentlyPlaying.classList.remove('playing');
    }
    
    const songItem = document.querySelector(`[data-song="${songNumber}"]`);
    songItem.classList.add('playing');
    currentlyPlaying = songItem;
    
    // In a real app, this would start playing the selected song
}

// Follow Function
function toggleFollow() {
    isFollowing = !isFollowing;
    
    if (isFollowing) {
        followBtn.textContent = 'Following';
        followBtn.style.backgroundColor = '#1db954';
        followBtn.style.color = '#000000';
        followBtn.style.borderColor = '#1db954';
    } else {
        followBtn.textContent = 'Follow';
        followBtn.style.backgroundColor = 'transparent';
        followBtn.style.color = '#b3b3b3';
        followBtn.style.borderColor = '#b3b3b3';
    }
    
    console.log(isFollowing ? 'Following artist' : 'Unfollowed artist');
}

// More Options Function
function showMoreOptions() {
    console.log('Showing more options...');
    // In a real app, this would show a context menu
}

function showSongOptions(songNumber) {
    console.log(`Showing options for song ${songNumber}...`);
    // In a real app, this would show a context menu for the song
}

// Event Listeners
backBtn.addEventListener('click', goBack);
forwardBtn.addEventListener('click', goForward);
mainPlayBtn.addEventListener('click', playMainTrack);
followBtn.addEventListener('click', toggleFollow);
moreBtn.addEventListener('click', showMoreOptions);

// Song item event listeners
songItems.forEach((songItem, index) => {
    const songNumber = index + 1;
    
    // Click anywhere on song item to play
    songItem.addEventListener('click', (e) => {
        // Don't trigger if clicking on buttons
        if (!e.target.closest('button')) {
            playSong(songNumber);
        }
    });
    
    // Play button click
    const playBtn = songItem.querySelector('.song-play-btn');
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSong(songNumber);
    });
    
    // More options button click
    const moreBtn = songItem.querySelector('.song-more-btn');
    moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSongOptions(songNumber);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            playMainTrack();
            break;
        case 'ArrowLeft':
            if (e.altKey) {
                e.preventDefault();
                goBack();
            }
            break;
        case 'ArrowRight':
            if (e.altKey) {
                e.preventDefault();
                goForward();
            }
            break;
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add playing state styles
const style = document.createElement('style');
style.textContent = `
    .song-item.playing {
        background-color: rgba(29, 185, 84, 0.1) !important;
    }
    
    .song-item.playing .song-title {
        color: #1db954 !important;
    }
    
    .song-item.playing .number {
        display: none !important;
    }
    
    .song-item.playing .song-play-btn {
        opacity: 1 !important;
        color: #1db954 !important;
    }
`;
document.head.appendChild(style);

console.log('Spotify Artist Page initialized');

