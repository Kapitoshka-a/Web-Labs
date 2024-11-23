


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const pk = document.getElementById('pk').value
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Stop the form from submitting the traditional way
        
        const formData = new FormData(form);
        console.log(form);

        fetch(`/item_edit/${pk}/`, {
            method: 'PUT',  // Using PUT method
            body: formData,  // Send the form data
            headers: {
                'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value,  // CSRF token
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Error updating item.');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                 // Success message
                window.location.href = "/modellen"; 
                alert('Дані успішно оновлені.'); // Redirect to another page
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        });
    });
});
