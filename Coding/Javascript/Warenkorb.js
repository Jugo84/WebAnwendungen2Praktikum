// Shorthand function for $(document).ready(...);
$(async () => {
    $('#createEntryButton').click(async () => await createNewGuestbookEntry());
});


async function createNewGuestbookEntry() {
    const newEntryModal = $('#zumVerschenkenModal');
    const newEntryForm = $('form', newEntryModal).first();

    const nameInput = $('input[name="name"]', newEntryForm);
    const textInput = $('textarea[name="text"]', newEntryForm);

    const newEntry = {
        name: nameInput.val(),
        text: textInput.val(),
    };

    // Send the new entry via HTTP POST to the API
    var response = await fetch('/api/v1/entries', {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
    });

    // In case something went wrong, show an error
    if(response.status != 200) {
        showError("Failed to create new Guestbook entry!");
        return;
    }

    // Reset the input fields
    textInput.val("");
    nameInput.val("");

    // Hide the newEntryModal
    newEntryModal.modal("hide");
}




