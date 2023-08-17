const figures = [];

const descriptionPath = `datasetA-t2m/prompts.txt`;

// // Fetch the file content using the fetch API (Fetch is blocked by CORS if tested locally)
// fetch(descriptionPath)
//   .then(response => response.text())
//   .then(text => {
//     // Split the text content into lines
//     const lines = text.split('\n');
//     for (let i = 0; i < 100; i++) {
//         const figure = {
//             number: i,
//             filename: `${i}.gif`,
//             alt: `Figure ${i}`,
//             description: `${lines[i]}`
//         };
//         figures.push(figure);
//     }
//   });

for (let i = 0; i < 100; i++) {
    const figure = {
        number: i,
        filename: `${i}.gif`,
        alt: `Figure ${i}`,
    };
    figures.push(figure);
}

const form = document.getElementById("surveyForm");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");

const responses = {}; // Store responses in this object

let currentIndex = 0;

function showFigure(index) {
    form.innerHTML = ""; // Clear the container

    const figureDiv = document.createElement("div");
    figureDiv.className = "figure";

    const figureNumber = document.createElement("h2");
    figureNumber.textContent = `Figure ${index}`;

    const figureImage = document.createElement("img");
    figureImage.src = `datasetA-t2m/${index}.gif`; // Adjust the image path
    figureImage.alt = `Figure ${index}`;

    figureDiv.appendChild(figureNumber);
    figureDiv.appendChild(figureImage);


    // 5 point likert scale
    // ability
    const abilitylabel = document.createElement("label");
    abilitylabel.textContent = `Please rate your ability to do this motion in real life.`;
    const abilityDiv = document.createElement("div");

    abilityDiv.appendChild(document.createTextNode("No difficulty"));
    for (let i = 1; i <= 5; i++) {
        const Input = document.createElement("input");
        Input.type = "radio";
        Input.name = "ability";
        Input.value = `${i}`;
        Input.required = true;
        abilityDiv.appendChild(Input);
    }
    abilityDiv.appendChild(document.createTextNode("Unable"));
    
    // freqency
    const frequencylabel = document.createElement("label");
    frequencylabel.textContent = `How frequently do you do this motion in your real life?`;
    const frequencyDiv = document.createElement("div");

    frequencyDiv.appendChild(document.createTextNode("Every day"));
    for (let i = 1; i <= 5; i++) {
        const Input = document.createElement("input");
        Input.type = "radio";
        Input.name = "frequency";
        Input.value = `${i}`;
        Input.required = true;
        frequencyDiv.appendChild(Input);
    }
    frequencyDiv.appendChild(document.createTextNode("Never"));

    form.appendChild(figureDiv);
    form.appendChild(abilitylabel);
    form.appendChild(abilityDiv);
    
    form.appendChild(frequencylabel);
    form.appendChild(frequencyDiv);
    
}

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showFigure(currentIndex);
    }
});

nextButton.addEventListener("click", () => {
    if (currentIndex < figures.length - 1) {
        currentIndex++;
        showFigure(currentIndex);
    }
});

// Initialize the first figure
showFigure(currentIndex);

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    for (const [name, value] of formData.entries()) {
        responses[name] = value;
    }

    // Convert responses to CSV format
    const csvData = Object.entries(responses).map(([figure, response]) => `${figure},${response}`).join("\n");

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a download link for the CSV file
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "survey_responses.csv";
    downloadLink.click();
});

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        // Left arrow key: Simulate click on "Prev" button
        prevButton.click();
    } else if (event.key === "ArrowRight" || event.key === "Enter" ) {
        // Right arrow key: Simulate click on "Next" button
        nextButton.click();
    }
});
