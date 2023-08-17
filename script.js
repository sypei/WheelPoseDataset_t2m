const figures = [
    { name: "Figure 1", imageUrl: "datasetA-t2m/0.gif" },
    { name: "Figure 2", imageUrl: "datasetA-t2m/1.gif" },
    { name: "Figure 3", imageUrl: "datasetA-t2m/2.gif" }
    // Add more figures as needed
];

const form = document.getElementById("surveyForm");

const responses = {}; // Store responses in this object

figures.forEach(figure => {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = `Do you approve of ${figure}?`;

    const figureContainer = document.createElement("div");
    figureContainer.classList.add("figure-container");

    const figureImage = document.createElement("img");
    figureImage.src = figure.imageUrl;
    figureImage.alt = figure.name;
    figureImage.classList.add("figure-image");

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
    formGroup.appendChild(figureContainer);
    figureContainer.appendChild(figureImage);
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
