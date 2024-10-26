
const formData = {
    email: "",
    message: ""
};


const form = document.querySelector('.feedback_form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');


window.addEventListener('load', () => {
    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        formData.email = email;
        formData.message = message;

        emailInput.value = email;
        messageInput.value = message;
    }
});


form.addEventListener('input', (event) => {
    const { name, value } = event.target;
    formData[name] = value.trim();  

   
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});


form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    
    if (!formData.email || !formData.message) {
        alert('Please fill out all fields');
        return;
    }

  
    console.log('Submitted data:', formData);

   
    localStorage.removeItem('feedback-form-state');
    form.reset();

    
    formData.email = "";
    formData.message = "";
});
