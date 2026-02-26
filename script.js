document.getElementById('inputForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const textarea = document.getElementById('userInput');
  const userInput = textarea.value;

  const outputDiv = document.getElementById('output');
  const outputContainer = document.getElementById('outputContainer');
  const submitButton = document.querySelector('#inputForm button[type="submit"]');

  // ✅ HARD FREEZE (multiple layers)
  textarea.readOnly = true;
  textarea.setAttribute('readonly', 'readonly');
  textarea.classList.add('is-locked');
  textarea.blur();

  // Show loading + lock submit
  outputDiv.innerText = "StanceQ is analyzing your draft and generating feedback…";
  outputContainer.style.display = "block";
  submitButton.disabled = true;

  // Smooth scroll (after paint)
  requestAnimationFrame(() => {
    outputContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  try {
    const response = await fetch('https://gpt-backend-wlm2.onrender.com/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userInput })
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    outputDiv.innerText = data.answer;

  } catch (error) {
    console.error("Error:", error);
    outputDiv.innerText = "An error occurred while processing your request.";
  } finally {
    // Re-enable submit after 20s
    setTimeout(() => {
      submitButton.disabled = false;

      // If you want the draft to remain locked permanently, leave it locked.
      // If you want to unlock after 20 seconds, uncomment the lines below:

      // textarea.readOnly = false;
      // textarea.removeAttribute('readonly');
      // textarea.classList.remove('is-locked');

    }, 20000);
  }
});
