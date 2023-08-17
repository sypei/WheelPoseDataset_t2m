const figures = [];

const descriptionPath = `datasetA-t2m/prompts.txt`;

// Fetch the file content using the fetch API
fetch(descriptionPath)
  .then(response => response.text())
  .then(text => {
    // Split the text content into lines
    const lines = text.split('\n');
    for (let i = 0; i < 100; i++) {
        const figure = {
            number: i,
            filename: `${i}.gif`,
            alt: `Figure ${i}`,
            description: `${lines[i]}`
        };
        figures.push(figure);
    }
  });

const form = document.getElementById("surveyForm");

const responses = {}; // Store responses in this object

figures.forEach(figure => {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const figureDiv = document.createElement("div");
    figureDiv.className = "figure";

    const figureNumber = document.createElement("h2");
    figureNumber.textContent = `Figure ${figure.number}`;

    const figureDescription = document.createElement("h2");
    figureDescription.textContent = `${figure.description}`;

    const figureImage = document.createElement("img");
    figureImage.src = `datasetA-t2m/${figure.filename}`;
    figureImage.alt = figure.alt;

    figureDiv.appendChild(figureNumber);
    figureDiv.appendChild(figureDescription);
    figureDiv.appendChild(figureImage);

    const label = document.createElement("label");
    label.textContent = `Are you able to do this motion in your real life ${figure}?`;
    const yesInput = document.createElement("input");
    yesInput.type = "radio";
    yesInput.name = figure;
    yesInput.value = "yes";
    yesInput.required = true;

    const noInput = document.createElement("input");
    noInput.type = "radio";
    noInput.name = figure;
    noInput.value = "no";
    noInput.required = true;

    formGroup.appendChild(figureDiv);
    formGroup.appendChild(label);
    formGroup.appendChild(yesInput);
    formGroup.appendChild(document.createTextNode("Yes"));
    formGroup.appendChild(noInput);
    formGroup.appendChild(document.createTextNode("No"));

    form.appendChild(formGroup);
});

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";
form.appendChild(submitButton);

form.addEventListener("submit", function(event) {
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
