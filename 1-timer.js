import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as y,i as f}from"./assets/vendor-BbbuE1sJ.js";const h={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const o=e[0];console.log("Выбранная дата:",o),o<new Date?(f.error({title:"Ошибка",message:"Пожалуйста, выберите дату в будущем"}),t.disabled=!0):t.disabled=!1}};y("#datetime-picker",h);const t=document.querySelector("[data-start]");t.disabled=!0;let l=null,c=!1;t.addEventListener("click",()=>{if(c)return;const e=new Date(document.getElementById("datetime-picker").value).getTime();console.log("Время отсчета:",e),c=!0,t.disabled=!0,l=setInterval(()=>{const o=new Date().getTime(),n=e-o;if(console.log("Оставшееся время:",n),n<=0){clearInterval(l),console.log("Таймер закончилосЯ"),document.querySelector("[data-days]").textContent="00",document.querySelector("[data-hours]").textContent="00",document.querySelector("[data-minutes]").textContent="00",document.querySelector("[data-seconds]").textContent="00",c=!1,t.disabled=!1;return}const{days:d,hours:u,minutes:a,seconds:s}=S(n);document.querySelector("[data-days]").textContent=r(d),document.querySelector("[data-hours]").textContent=r(u),document.querySelector("[data-minutes]").textContent=r(a),document.querySelector("[data-seconds]").textContent=r(s)},1e3)});function S(e){const a=Math.floor(e/864e5),s=Math.floor(e%864e5/36e5),i=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:a,hours:s,minutes:i,seconds:m}}function r(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map