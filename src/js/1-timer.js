import flatpickr from "flatpickr"; 
import "flatpickr/dist/flatpickr.min.css"; 
import iziToast from "izitoast"; 
import "izitoast/dist/css/iziToast.min.css"; 
// Настройки для flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];
        console.log('Выбранная дата:', userSelectedDate); 

        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: "Ошибка",
                message: "Пожалуйста, выберите дату в будущем",
            });
            startButton.disabled = true;  
        } else {
            startButton.disabled = false; 
        }
    },
};


flatpickr("#datetime-picker", options);

// Логика таймера
const startButton = document.querySelector("[data-start]");

// кнопка "Start" вначале
startButton.disabled = true; 

// Идентификатор таймера. активен ли таймер
let timerId = null; 
let isTimerActive = false; 

startButton.addEventListener("click", () => {
  // Если таймер уже активен, ничего не делаем
    if (isTimerActive) return; 
    const countdownDate = new Date(document.getElementById('datetime-picker').value).getTime(); 
    console.log('Время отсчета:', countdownDate); 

    
  //  флаг таймер активен
    isTimerActive = true; 
  // Деактивируем Start  
  startButton.disabled = true; 

    timerId = setInterval(() => {
        const now = new Date().getTime(); 
        const timeLeft = countdownDate - now;

      console.log('Оставшееся время:', timeLeft); 

      // таймер СТОП
        if (timeLeft <= 0) {
            clearInterval(timerId); 
            
        
          console.log('Таймер закончилосЯ'); 
        
          document.querySelector("[data-days]").textContent = "00";
            document.querySelector("[data-hours]").textContent = "00";
            document.querySelector("[data-minutes]").textContent = "00";
            document.querySelector("[data-seconds]").textContent = "00";

          // Сбрасываем флаг
          isTimerActive = false; 
          //  кнопкф "Start"
          startButton.disabled = false;  
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        
        document.querySelector("[data-days]").textContent = addLeadingZero(days);
        document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
        document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
        document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
    }, 1000);
});


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
