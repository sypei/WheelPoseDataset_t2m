const figures = [];
const answers = {};

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
const saveButton = document.getElementById("saveButton");
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
    // difficulty
    const difficultylabel = document.createElement("label");
    difficultylabel.textContent = `How difficult is it for you to do this motion in real life?`;
    const difficultyDiv = document.createElement("div");

    difficultyDiv.appendChild(document.createTextNode("No difficulty"));
    for (let i = 1; i <= 5; i++) {
        const Input = document.createElement("input");
        Input.type = "radio";
        Input.name = `difficulty-${index}`;
        Input.value = `${i}`;
        Input.required = true;
        difficultyDiv.appendChild(Input);
    }
    difficultyDiv.appendChild(document.createTextNode("Unable"));
    
    // freqency
    const frequencylabel = document.createElement("label");
    frequencylabel.textContent = `How frequently do you do this motion in your real life?`;
    const frequencyDiv = document.createElement("div");

    frequencyDiv.appendChild(document.createTextNode("Every day"));
    for (let i = 1; i <= 5; i++) {
        const Input = document.createElement("input");
        Input.type = "radio";
        Input.name = `frequency-${index}`;
        Input.value = `${i}`;
        Input.required = true;
        frequencyDiv.appendChild(Input);
    }
    frequencyDiv.appendChild(document.createTextNode("Never"));

    form.appendChild(figureDiv);
    form.appendChild(difficultylabel);
    form.appendChild(difficultyDiv);
    
    form.appendChild(frequencylabel);
    form.appendChild(frequencyDiv);
    
}

prevButton.addEventListener("click", () => {
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;
    if (currentIndex > 0) {
        currentIndex--;
        showFigure(currentIndex);
    }
});

nextButton.addEventListener("click", () => {
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;
    if (currentIndex < figures.length - 1) {
        currentIndex++;
        showFigure(currentIndex);
    }
});

// Initialize the first figure
showFigure(currentIndex);

saveButton.addEventListener("click", () => {
    saveAnswers();
});

function saveAnswers() {
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;
    // Display saved answers in the console
    console.log("Answers:", answers);
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    // record the current page
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;

    // Convert responses to CSV format
    const csvData = Object.entries(answers).map(([figure, response]) => `${figure},${response}`).join("\n");

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
