const figures = [];

for (let i = 0; i < 100; i++) {
    const figure = {
        number: i,
        filename: `${i}.gif`,
        alt: `Figure ${i}`
    };
    figures.push(figure);
}

const figureContainer = document.getElementById("figureContainer");

const form = document.getElementById("surveyForm");

const responses = {}; // Store responses in this object

figures.forEach(figure => {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = `Do you approve of ${figure}?`;

    const figureDiv = document.createElement("div");
    figureDiv.className = "figure";

    const figureNumber = document.createElement("h2");
    figureNumber.textContent = `Figure ${figure.number}`;

    const figureImage = document.createElement("img");
    figureImage.src = `datasetA-t2m/${figure.filename}`;
    figureImage.alt = figure.alt;

    figureDiv.appendChild(figureNumber);
    figureDiv.appendChild(figureImage);
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

    formGroup.appendChild(label);
    figureContainer.appendChild(figureDiv);
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
