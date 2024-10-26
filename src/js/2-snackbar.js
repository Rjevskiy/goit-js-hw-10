import iziToast from "izitoast"; 
import "izitoast/dist/css/iziToast.min.css"; 

const form = document.querySelector('.form');

// кнопка 
const submitButton = form.querySelector('button[type="submit"]'); 

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const delay = parseInt(form.delay.value); 
    const state = form.state.value; 

       // кнопка  неактивна
    submitButton.disabled = true; 
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    
    promise
        .then(delay => {
            iziToast.success({
                title: 'Успех!',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight'
            });
        })
        .catch(delay => {
            iziToast.error({
                title: 'Ошибка!',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight'
            });
        })
    
           // Разблокируем кнопку
        .finally(() => { 
            submitButton.disabled = false;
        });
       
console.log('Задержка:', delay); 
console.log('Состояние:', state); 
        
});
