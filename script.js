document.getElementById('inputForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    const userInput = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');
    const outputContainer = document.getElementById('outputContainer');
    const submitButton = document.querySelector('#inputForm button[type="submit"]');

    // Show loading state immediately
    outputDiv.innerText = "StanceQ is working on your draft...";
    outputContainer.style.display = "block";

    // Smooth scroll to the response container
    outputContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Disable button
    submitButton.disabled = true;

    try {
        const response = await fetch('https://gpt-backend-wlm2.onrender.com/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        outputDiv.innerText = data.answer; // Display GPT response

    } catch (error) {
        console.error("Error:", error);
        outputDiv.innerText = "An error occurred while processing your request.";
    } finally {
        // Re-enable button after 20 seconds no matter what
        setTimeout(() => {
            submitButton.disabled = false;
        }, 20000);
    }
});
