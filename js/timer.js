function Timer() {
    function countTime() {
        "use strict";
        var resetsAmount = 0;     //Переменная указывает количество "обнулений" таймера;
        var shareDuration = 3;    //Переменная указывает длительность акции;
        var deviation = 0;          //Переменная указывает, сколько миллисекунд осталось до "обнуления" таймера;
        var variable = 0;           //Дополнительная переменная, используется для визуализации работы таймера;
        var initialDate = "2016-07-30";
        var endingDate = "";
        var currentDate = new Date();
        var initialDay = initialDate.split("-")[2];
        var initialMonth = initialDate.split("-")[1];
        var initialYear = initialDate.split("-")[0];
        //Количество "обнулений" таймера (общее количество дней, которые прошли с момента начальной даты до текущей, делится на длительность акции, получается
        //количество полных "обнулений" таймера до этого момента);
        resetsAmount = Math.floor(calculateDaysNumber(initialDate + "T00:00:00Z") / shareDuration);
        //Дата следующего "обнуления" (программа автоматически вычисляет дату следующего "обнуления" путем прибавления к начальной дате результата умножения
        //[количества полных "обнулений" таймера + 1] * длительность акции);
        endingDate = new Date(initialYear, initialMonth - 1, parseInt(initialDay) + (resetsAmount + 1) * shareDuration);
        deviation = endingDate - currentDate;
        if (deviation < 0) {
            endingDate = new Date(initialYear, initialMonth - 1, parseInt(initialDay) + (resetsAmount + 2) * shareDuration);
            deviation = endingDate - currentDate;
        }
        //Количество часов, которое осталось до "обнуления" таймера (в часе "3600000" милисекунд);
        variable = parseInt(deviation / 3600000) % 24;
        this.hoursModule.innerHTML = addZero(variable);
        //Количество минут, которое осталось до "обнуления" таймера (в минуте "60000" милисекунд);
        variable = parseInt(deviation / 60000) % 60;
        this.minutesModule.innerHTML = addZero(variable);
        //Количество минут, которое осталось до "обнуления" таймера (в секунде "1000" милисекунд);
        variable = parseInt(deviation / 1000) % 60;
        this.secondsModule.innerHTML = addZero(variable);
    }
    function addZero(variable) {
        "use strict";
        //Функция определяет, нужно ли добавлять "0" перед полученным числом;
        if (variable < 10) variable = "0" + variable.toString();
        else variable = variable.toString();
        return variable;
    }
    function calculateDaysNumber(initialDate) {
        "use strict";
        //Функция вычисляет количество прошедших дней между текущей датой и датой инициализации таймера;
        return (new Date() - new Date(initialDate)) / 86400000;
    }
    function searchElement(className) {
        "use strict";
        if (this.timer.getElementsByClassName(className).length) return {"status": true, "element": this.timer.getElementsByClassName(className)[0]};
        return {"status": false};
    }
    var timerClassName = "timer";
    var daysModuleClassName = "days";
    var hoursModuleClassName = "hours";
    var minutesModuleClassName = "minutes";
    var secondsModuleClassName = "seconds";
    this.timer = new Object();
    this.daysModule = new Object();
    this.hoursModule = new Object();
    this.minutesModule = new Object();
    this.secondsModule = new Object();
    this.createTimer = function(Element) {
        "use strict";
        var AdditoryObject = new Object();
        if (testClassName(Element, timerClassName)) {
            this.timer = Element;
            AdditoryObject = searchElement.bind(this)(hoursModuleClassName);
            if (AdditoryObject.status) {
                this.hoursModule = AdditoryObject.element;
                AdditoryObject = searchElement.bind(this)(minutesModuleClassName);
                if (AdditoryObject.status) {
                    this.minutesModule = AdditoryObject.element;
                    AdditoryObject = searchElement.bind(this)(secondsModuleClassName);
                    if (AdditoryObject.status) {
                        this.secondsModule = AdditoryObject.element;
                        window.setInterval(function () {
                            countTime.bind(this)();
                        }.bind(this), 1000);
                    } else console.error("Не был найден DOM-элемент с классом '" + secondsModuleClassName + "';");
                } else console.error("Не был найден DOM-элемент с классом '" + minutesModuleClassName + "';");
            } else console.error("Не был найден DOM-элемент с классом '" + hoursModuleClassName + "';");
        } else console.error("DOM-элемент должен содержать класс '" + timerClassName + "';");
    };
}