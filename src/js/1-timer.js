import flatpickr from "flatpickr"; // Импортируем библиотеку flatpickr
import "flatpickr/dist/flatpickr.min.css"; // Импортируем стили flatpickr
import iziToast from "izitoast"; // Импортируем библиотеку iziToast
import "izitoast/dist/css/iziToast.min.css"; // Импортируем стили iziToast

// Настройки для flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];
        console.log('Выбранная дата:', userSelectedDate); // Отладочный вывод

        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: "Ошибка",
                message: "Пожалуйста, выберите дату в будущем",
            });
            startButton.disabled = true; // Деактивируем кнопку "Start"
        } else {
            startButton.disabled = false; // Активируем кнопку "Start"
        }
    },
};

// Инициализация flatpickr
flatpickr("#datetime-picker", options);

// Логика таймера
const startButton = document.querySelector("[data-start]");
startButton.disabled = true; // Деактивируем кнопку "Start" изначально

let timerId = null; // Идентификатор таймера
let isTimerActive = false; // Флаг, указывающий, активен ли таймер

startButton.addEventListener("click", () => {
    if (isTimerActive) return; // Если таймер уже активен, ничего не делаем

    const countdownDate = new Date(document.getElementById('datetime-picker').value).getTime(); // Получаем timestamp
    console.log('Время обратного отсчета:', countdownDate); // Отладочный вывод

    isTimerActive = true; // Устанавливаем флаг, что таймер активен
    startButton.disabled = true; // Деактивируем кнопку "Start" после нажатия

    timerId = setInterval(() => {
        const now = new Date().getTime(); // Получаем текущий timestamp
        const timeLeft = countdownDate - now;

        if (timeLeft <= 0) {
            clearInterval(timerId); // Останавливаем таймер
            // Обновление интерфейса для отображения 00:00:00:00
            document.querySelector("[data-days]").textContent = "00";
            document.querySelector("[data-hours]").textContent = "00";
            document.querySelector("[data-minutes]").textContent = "00";
            document.querySelector("[data-seconds]").textContent = "00";

            isTimerActive = false; // Сбрасываем флаг, таймер завершен
            startButton.disabled = false; // Активируем кнопку "Start" для нового запуска
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        // Обновление интерфейса
        document.querySelector("[data-days]").textContent = addLeadingZero(days);
        document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
        document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
        document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
    }, 1000);
});

// Функция для преобразования миллисекунд
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

// Функция для добавления ведущих нулей
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
