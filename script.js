document.getElementById('inputForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const textarea = document.getElementById('userInput');
    const userInput = textarea.value;

    const outputDiv = document.getElementById('output');
    const outputContainer = document.getElementById('outputContainer');
    const submitButton = document.querySelector('#inputForm button[type="submit"]');
    const responseTop = document.getElementById('responseTop'); // if you added the anchor

    // Freeze the draft (still scrollable, not editable)
    textarea.readOnly = true;

    // Show loading state + lock button
    outputDiv.innerText = "StanceQ is analyzing your draft and generating feedback…";
    outputContainer.style.display = "block";
    submitButton.disabled = true;

    // Smooth scroll to response section (after it becomes visible)
    requestAnimationFrame(() => {
        (responseTop || outputContainer).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    try {
        const response = await fetch('https://gpt-backend-wlm2.onrender.com/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        outputDiv.innerText = data.answer;

    } catch (error) {
        console.error("Error:", error);
        outputDiv.innerText = "An error occurred while processing your request.";
    } finally {
        // Re-enable after 20 seconds no matter what
        setTimeout(() => {
            submitButton.disabled = false;

            // ✅ Option A: unlock the textarea again after cooldown
            textarea.readOnly = false;

            // ✅ Option B (permanent lock): delete the line above
        }, 20000);
    }
});
