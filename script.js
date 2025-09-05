document.getElementById('inputForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    const userInput = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');

    try {
        // Replace with your actual Render backend URL
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
    }
});
