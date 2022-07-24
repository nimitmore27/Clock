let clock = document.getElementById("clock");
let stopwatch = document.getElementById("stopwatch");
let countdown = document.getElementById("countdown");

let inhour = document.getElementById("inhour");
let inmin = document.getElementById("inmin");
let insec = document.getElementById("insec");

let lapbtn = document.getElementById("lapbtn");
let playbtn = document.getElementById("play-pausebtn");
let stopbtn = document.getElementById("stopbtn");
let inputs = document.querySelectorAll('.box');

let btndiv = document.querySelector('.btndiv');
let lapdiv = document.querySelector('.lap-div');
let laplen = document.getElementsByClassName('new-lap');

let app = 'Clock';

let clkhr = 0;
let clkmin = 0;
let clksec = 0;
let clktimeout;

let swhr = 0;
let swmin = 0;
let swsec = 0;
let swtimeout;

let cdhr = 0;
let cdmin = 0;
let cdsec = 0;
let cdtimeout;

checkApp(stopwatch, countdown, clock);
clktimeout = setInterval(clockTime, 0);

clock.onclick = () => { checkApp(stopwatch, countdown, clock); }
stopwatch.onclick = function () {
    checkApp(clock, countdown, stopwatch);
}
countdown.onclick = function () {
    checkApp(clock, stopwatch, countdown);
}

playbtn.onclick = function () {
    if (app == 'StopWatch') {
        if (playbtn.className == "fa-solid fa-play") {
            playbtn.className = "fa-solid fa-pause";
            swtimeout = setInterval(swTime, 1000);
        }
        else {
            playbtn.className = "fa-solid fa-play";
            clearInterval(swtimeout);
        }
    }
    else{ //working here
        if (playbtn.className == "fa-solid fa-play") {
            block();
            playbtn.className = "fa-solid fa-pause";
            cdhr = parseInt(inhour.value);
            cdmin = parseInt(inmin.value);
            cdsec = parseInt(insec.value);
            cdtimeout = setInterval(cdTime, 1000);
        }
        else {
            unblock();
            playbtn.className = "fa-solid fa-play";
            clearInterval(cdtimeout);
        }
    }
}

function cdTime(){
    if(cdhr == 0 && cdmin == 0 && cdsec == 0){
        resetclk();
        unblock();
    }
    else{
        if(cdsec == 0 && cdhr != 0 && cdmin != 0){
            cdmin -= 1;
            cdsec = 59;
        }else if(cdsec == 0 && cdmin == 0  && cdhr != 0){
            cdhr -= 1;
            cdmin = 59;
            cdsec = 59;
        }else if(cdhr == 0 && cdmin != 0 && cdsec==0){
            cdsec = 59;
            cdmin -= 1;
        }else if(cdhr == 0 && cdmin == 0){
            cdsec -=1;
        }
        console.log(cdhr , cdmin , cdsec);
        app == 'CountDown' ? Display(cdhr,cdmin,cdsec) : 0;
    }
    cdsec -= 1;
}

stopbtn.onclick = resetclk;

function resetclk() {
    playbtn.className = "fa-solid fa-play";
    if (app == 'StopWatch') {
        swhr = 0, swmin = 0, swsec = 0;
        clearInterval(swtimeout);
    }else{
        clearInterval(cdtimeout);
        alert("CountDown Finished !");
    }
    clearDisplay();
}

lapbtn.onclick = function () {
    let newlap = document.createElement('div');
    let laptime = document.createElement('span');
    let trash = document.createElement('i');
    newlap.className = 'new-lap';
    laptime.className = 'laptime';
    trash.className = 'fa-solid fa-delete-left';
    trash.onclick = () => { newlap.remove(); }
    laptime.innerHTML = swhr + " : " + swmin + " : " + swsec;
    newlap.appendChild(laptime)
    newlap.appendChild(trash);
    lapdiv.appendChild(newlap);
}

function clockTime() {
    app == 'StopWatch' ? laplen.length == 0 ? lapdiv.style.display = 'none' : lapdiv.style.display = 'flex' : 0;
    let today = new Date();
    clkhr = today.getHours();
    clkmin = today.getMinutes();
    clksec = today.getSeconds();
    app == 'Clock' ? Display(clkhr, clkmin, clksec) : 0;
}

function swTime() {
    swsec++;
    if (swsec == 60) swmin += 1, swsec = 0;
    if (swmin == 60) swhr += 1, swmin = 0;
    app == 'StopWatch' ? Display(swhr, swmin, swsec) : 0;
}

function Display(e1, e2, e3) {
    inhour.value = e1 < 10 ? '0' + e1 : e1;
    inmin.value = e2 < 10 ? '0' + e2 : e2;
    insec.value = e3 < 10 ? '0' + e3 : e3;
}
function clearDisplay() {
    inhour.value = '00';
    inmin.value = '00';
    insec.value = '00';
}
function block() {
    inputs.forEach(element => element.readOnly = true);
    inputs.forEach(element => element.style.cursor = 'default');
}
function unblock() {
    inputs.forEach(element => element.readOnly = false);
}

function checkApp(a1, a2, a3) {
    a3.className == 'Selected' ? 0 : clearDisplay();
    a1.className == 'Selected' ? a1.classList.toggle('Selected') : 0;
    a2.className == 'Selected' ? a2.classList.toggle('Selected') : 0;
    a3.className != 'Selected' ? a3.classList.toggle('Selected') : 0;
    app = a3.innerText;
    app == 'CountDown' ? unblock() : block();
    app == 'Clock' ? btndiv.style.display = 'none' : btndiv.style.display = 'flex';
    app == 'Clock' || app == 'CountDown' ? lapdiv.style.display = 'none' : lapdiv.style.display = 'flex';
    app == 'CountDown' ? lapbtn.style.display = 'none' : lapbtn.style.display = 'inline-block';
    if(app == 'StopWatch' && swhr == 0 && swmin == 0 && swsec == 0 ){
        playbtn.className = "fa-solid fa-play"
    }else if(app == 'CountDown' && cdhr == 0 && cdmin == 0 && cdsec == 0){
        playbtn.className = "fa-solid fa-play"
    }
    else if(swhr != 0 || swmin != 0 || swsec != 0 || cdhr != 0 || cdmin != 0 || cdsec != 0) playbtn.className = "fa-solid fa-pause";
}