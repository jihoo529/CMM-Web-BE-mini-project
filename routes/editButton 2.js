/*function showEditForm(content) {
	console.log("hello");
	const contentInput = document.createElement('textarea');
	contentInput.value = content;

	const saveButton = document.createElement('button');
	saveButton.textContent = 'Save';
	saveButton.addEventListener('click', () => {
		const updatedContent = contentInput.value;
		const data = { content: updatedContent };

		fetch('/display/edit', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the response from the server after saving the edit
				console.log(data);
			})
			.catch((error) => {
				// Handle any errors that occurred during the request
				console.error('Error:', error);
			});
	});

	document.body.addEventListener('click', function(event) {
		if (event.target.matches('.edit-button')) {
		  const content = event.target.getAttribute('data-content');
		  showEditForm(content);
		}
	});
}*/

// editButton.js
function showEditForm() {
	console.log('showEditForm called');
	// Rest of the function code
}