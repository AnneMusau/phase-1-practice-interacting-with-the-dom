document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let count = 0;
    let timer;
    let isPaused = false;
    const likes = {};

    const countElement = document.getElementById('counter');
    const plusButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const submitButton = document.getElementById('submit');
    const commentInput = document.getElementById('comment-input');
    const likesList = document.querySelector('.likes');
    const commentList = document.querySelector('.comments');

    // Function to update the counter display
    function updateCounter() {
        countElement.textContent = count;
    }

    // Function to start the timer
    function startTimer() {
        timer = setInterval(() => {
            if (!isPaused) {
                count++;
                updateCounter();
            }
        }, 1000);
    }

    // Start the timer initially
    startTimer();

    // Event listener for the plus button
    plusButton.addEventListener('click', function() {
        count++;
        updateCounter();
    });

    // Event listener for the minus button
    minusButton.addEventListener('click', function() {
        count--;
        updateCounter();
    });

    // Event listener for the heart button (like)
    heartButton.addEventListener('click', function() {
        if (!likes[count]) {
            likes[count] = 0;
        }
        likes[count]++;
        renderLikes();
    });

    // Function to render likes
    function renderLikes() {
        likesList.innerHTML = '';
        Object.keys(likes).forEach(key => {
            const likeItem = document.createElement('li');
            likeItem.textContent = `${key}: ${likes[key]} ❤️`;
            likesList.appendChild(likeItem);
        });
    }

    // Event listener for the pause button
    pauseButton.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timer);
            pauseButton.textContent = 'resume';
            plusButton.disabled = true;
            minusButton.disabled = true;
            heartButton.disabled = true;
            submitButton.disabled = true;
        } else {
            startTimer();
            pauseButton.textContent = 'pause';
            plusButton.disabled = false;
            minusButton.disabled = false;
            heartButton.disabled = false;
            submitButton.disabled = false;
        }
    });

    // Event listener for submitting a comment
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const comment = commentInput.value.trim();
        if (comment !== '') {
            const commentItem = document.createElement('li');
            commentItem.textContent = comment;
            commentList.appendChild(commentItem);
            commentInput.value = '';
        }
    });
});
