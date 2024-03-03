const day = document.getElementById("day");
const month = document.getElementById("Month");
const year = document.getElementById("Year");
const monthres = document.getElementById("monthres");
const dayres = document.getElementById("daysres");
const yearres = document.getElementById("Yearres");
const messageErrors = [
    document.getElementById("messageerror1"),
    document.getElementById("messageerror2"),
    document.getElementById("messageerror3"),
    document.getElementById("messageerror4"),
    document.getElementById("messageerror5"),
    document.getElementById("messageerror6")
];
const labels = [
    document.getElementById("l1"),
    document.getElementById("l2"),
    document.getElementById("l3")
];
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function calcul() {
    const dayInput = parseInt(day.value);
    const monthInput = parseInt(month.value);
    const yearInput = parseInt(year.value);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    messageErrors.forEach(error => error.classList.add("hid"));
    labels.forEach(label => label.classList.remove("error"));
    
    if (isNaN(dayInput) || isNaN(monthInput) || isNaN(yearInput)) {
        messageErrors.slice(0, 3).forEach(error => error.classList.remove("hid"));
        labels.forEach(label => label.classList.add("error"));
        [monthres, dayres, yearres].forEach(element => element.textContent = "--");
        return;
    }
    
    if (monthInput > 12 || monthInput < 1 || (monthInput > currentMonth && currentYear === yearInput)) {
        messageErrors[4].classList.remove("hid");
        labels[1].classList.add("error");
        [monthres, dayres, yearres].forEach(element => element.textContent = "--");
        return;
    }
    
    if (yearInput > currentYear || yearInput < 1) {
        messageErrors[5].classList.remove("hid");
        labels[2].classList.add("error");
        [monthres, dayres, yearres].forEach(element => element.textContent = "--");
        return;
    }
    let maxday=months[monthInput-1];
    if ((monthInput === 2) && (yearInput % 4 === 0 && (yearInput % 100 !== 0 || yearInput % 400 === 0))) {
        maxday = 29;
        
    }
    else if (monthInput === 2) {
        maxday = 28;
    }
    if ((dayInput <= 0 || dayInput > maxday)){
        messageErrors[3].classList.remove("hid");
        labels[0].classList.add("error");
        [monthres, dayres, yearres].forEach(element => element.textContent = "--");
        return;
    }     
    let a=(parseInt(currentYear)-parseInt(yearInput));
    let b=parseInt(currentMonth)-monthInput;
    if(b<0){
        b=12+b;
        a=a-1;
    }if(b === 0){
        b=0;
    }if ((currentDay > dayInput) || (currentDay === dayInput)){
        dayres.textContent=-dayInput+currentDay;
        monthres.textContent=b;
    }else{
        let c;
        if(b-1<0){
            monthres.textContent=11;
            a=a-1
        }else{
            monthres.textContent=b-1;
        }
        c=currentMonth-1;
        if((c === 2)){
            if((yearInput % 4 === 0 && (yearInput % 100 !== 0 || yearInput % 400 === 0))){
                dayres.textContent=29-dayInput+currentDay;
                
            }else{
                dayres.textContent=28-dayInput+currentDay;
            }
        }else{
            dayres.textContent=months[monthInput-1]-dayInput+currentDay;
        }
    }
    yearres.textContent=a;
}
