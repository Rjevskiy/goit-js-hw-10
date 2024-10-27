import flatpickr from "flatpickr"; 
import "flatpickr/dist/flatpickr.min.css"; 
import iziToast from "izitoast"; 
import "izitoast/dist/css/iziToast.min.css"; 

// Настройка flatpickr
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
            input.disabled = true;
        } else {
            startButton.disabled = false;
            input.disabled = false;
        }
    },
};

const input = document.getElementById("datetime-picker");
flatpickr("#datetime-picker", options);

// Логика таймера
const startButton = document.querySelector("[data-start]");
startButton.disabled = true; // Кнопка "Start" неактивна вначале

// Идентификатор таймера и статус
let timerId = null;
let isTimerActive = false;

// Обработчик кнопки Start
startButton.addEventListener("click", () => {
    // Если таймер уже активен, ничего не делаем
    if (isTimerActive) return;

    const countdownDate = new Date(input.value).getTime();
    console.log('Время отсчета:', countdownDate);

    // Устанавливаем флаг, кнопка Start неактивна
    isTimerActive = true;
    startButton.disabled = true;
    input.disabled = true;

    // Запуск таймера
    timerId = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = countdownDate - now;

        console.log('Оставшееся время:', timeLeft);

        // Если таймер закончился
        if (timeLeft <= 0) {
            clearInterval(timerId);
            isTimerActive = false;
            input.disabled = false;

            console.log('Таймер закончился');
            
            document.querySelector("[data-days]").textContent = "00";
            document.querySelector("[data-hours]").textContent = "00";
            document.querySelector("[data-minutes]").textContent = "00";
            document.querySelector("[data-seconds]").textContent = "00";

            // кнопки Start активна
            startButton.disabled = false;
            return;
        }

        // отображение времени
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        document.querySelector("[data-days]").textContent = addLeadingZero(days);
        document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
        document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
        document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
    }, 1000);
});

// Функция часов
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

// формат часов
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
