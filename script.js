const figures = ["Figure 1", "Figure 2", "Figure 3"]; // Add more figures as needed

const form = document.getElementById("surveyForm");

figures.forEach(figure => {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = `Do you approve of ${figure}?`;

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
    const responses = {};

    for (const [name, value] of formData.entries()) {
        responses[name] = value;
    }

    // You can now send the responses to a server or perform any other actions
    console.log("Recorded responses:", responses);
});
