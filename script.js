// Display today's date
const currentDateElement = document.getElementById('current-date');
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
currentDateElement.innerText = `Today: ${formattedDate}`;

// Select elements
const thoughtsInput = document.getElementById('thoughts-input');
const saveThoughtsBtn = document.getElementById('save-thoughts-btn');
const diaryEntries = document.getElementById('diary-entries');

// Load saved thoughts from localStorage
function loadThoughts() {
  const savedThoughts = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  if (savedThoughts.length === 0) {
    diaryEntries.querySelector('.placeholder-text').style.display = 'block';
  } else {
    diaryEntries.querySelector('.placeholder-text').style.display = 'none';
    savedThoughts.forEach((entry, index) => {
      displayThought(entry.date, entry.text, index);
    });
  }
}

// Display a thought on the page
function displayThought(date, text, index) {
  const diaryEntry = document.createElement('div');
  diaryEntry.classList.add('diary-entry');
  diaryEntry.setAttribute('data-index', index); // Set the data-index attribute to match the index

  diaryEntry.innerHTML = `
    <div class="entry-content">
      <p><strong>${date}</strong></p>
      <p>${text}</p>
    </div>
    <div class="delete-icon" data-index="${index}">
      <!-- SVG for Delete -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M3 6h18v2H3V6zm2 4h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10zm9 2v8h2v-8h-2zm-4 0v8h2v-8H8zm4-8V4h-4v2H5v2h14V6h-5z"/>
      </svg>
    </div>
  `;

  diaryEntries.appendChild(diaryEntry);
}

// Save a new thought
saveThoughtsBtn.addEventListener('click', () => {
  const thoughtText = thoughtsInput.value.trim();

  if (thoughtText !== '') {
    const entry = {
      date: formattedDate,
      text: thoughtText,
    };

    // Save to localStorage
    const savedThoughts = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    savedThoughts.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(savedThoughts));

    // Clear placeholder text if present
    diaryEntries.querySelector('.placeholder-text').style.display = 'none';

    // Display the new thought
    displayThought(entry.date, entry.text, savedThoughts.length - 1);

    // Clear the input field
    thoughtsInput.value = '';
  } else {
    alert('Please write something!');
  }
});

// Delete a thought
diaryEntries.addEventListener('click', (e) => {
  if (e.target.closest('.delete-icon')) {
    const index = e.target.closest('.delete-icon').dataset.index;
    const savedThoughts = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    // Remove the entry from localStorage
    savedThoughts.splice(index, 1);
    localStorage.setItem('diaryEntries', JSON.stringify(savedThoughts));

    // Remove the thought from the page immediately
    const diaryEntryToRemove = e.target.closest('.diary-entry');
    diaryEntryToRemove.remove();

    // Optionally, if there are no more thoughts, show the placeholder text
    if (savedThoughts.length === 0) {
      diaryEntries.querySelector('.placeholder-text').style.display = 'block';
    }
  }
});

// Clear previous entries and load stored thoughts on page load
loadThoughts();
