document.getElementById('inputForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    const userInput = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');

    try {
        // Replace 'https://your-backend-url.com/api/ask' with your actual backend URL
        const response = await fetch('https://your-backend-url.com/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: userInput })
        });

        const data = await response.json();
        outputDiv.innerText = data.answer; // Display GPT response
    } catch (error) {
        console.error("Error:", error);
        outputDiv.innerText = "An error occurred while processing your request.";
    }
});
