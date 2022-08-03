// variables for HTML elements
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

//app variable for keeping track of current working app
let app = 'Clock';

//Initializing variables for counting clock time
let clkhr = 0;
let clkmin = 0;
let clksec = 0;

//Initializing variables for counting stopwatch time
let swhr = 0;
let swmin = 0;
let swsec = 0;

//Initializing variables for counting countdown time
let cdhr = 0;
let cdmin = 0;
let cdsec = 0;

//Initializing timeout variables
let swtimeout;
let cdtimeout;

//Clock will be selected default
checkApp(stopwatch, countdown, clock);
setInterval(clockTime, 0);

//selecting app to display
clock.onclick = () => { checkApp(stopwatch, countdown, clock); }
stopwatch.onclick = () => { checkApp(clock, countdown, stopwatch); }
countdown.onclick = () => { checkApp(clock, stopwatch, countdown); }

playbtn.onclick = () => {
    if (app == 'StopWatch') {       //if stopwatch app is selected
        if (playbtn.className == "fa-solid fa-play") {
            playbtn.className = "fa-solid fa-pause";
            swtimeout = setInterval(swTime, 1000);
        } else {
            playbtn.className = "fa-solid fa-play";
            clearInterval(swtimeout);
        }
    } else {                        //if countdown app is selected
        if (playbtn.className == "fa-solid fa-play") {
            block();
            playbtn.className = "fa-solid fa-pause";
            cdhr = parseInt(inhour.value);
            cdmin = parseInt(inmin.value);
            cdsec = parseInt(insec.value);
            cdtimeout = setInterval(cdTime, 1000);
        } else {
            unblock();
            playbtn.className = "fa-solid fa-play";
            clearInterval(cdtimeout);
        }
    }
}

lapbtn.onclick = () => {
    let newlap = document.createElement('div');
    let laptime = document.createElement('span');
    let trash = document.createElement('i');

    newlap.className = 'new-lap';
    laptime.className = 'laptime';
    trash.className = 'fa-solid fa-delete-left';

    trash.onclick = () => { newlap.remove(); }

    let hr = swhr < 10 ? '0' + swhr : swhr;
    let min = swmin < 10 ? '0' + swmin : swmin;
    let sec = swsec < 10 ? '0' + swsec : swsec;
    laptime.innerHTML = hr + " : " + min + " : " + sec;
    
    newlap.appendChild(laptime)
    newlap.appendChild(trash);
    lapdiv.appendChild(newlap);
}

stopbtn.onclick = resetclk;         //function declared explicitly to 

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

function cdTime() {
    if (cdhr == 0 && cdmin == 0 && cdsec == 0) {
        unblock();
        resetclk();
    } else {
        if (cdsec != 0) cdsec--;
        else if (cdmin != 0 && cdsec == 0) cdmin--, cdsec = 59;
        else if (cdhr != 0 && cdmin == 0 && cdsec == 0) cdhr--, cdmin = 59, cdsec = 59;
        app == 'CountDown' ? Display(cdhr, cdmin, cdsec) : 0;
    }
}

function block() {
    inputs.forEach(element => element.readOnly = true);
    inputs.forEach(element => element.style.cursor = 'default');
}
function unblock() {
    inputs.forEach(element => element.readOnly = false);
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

function resetclk() {
    playbtn.className = "fa-solid fa-play";
    if (app == 'StopWatch') {
        swhr = 0, swmin = 0, swsec = 0;
        clearInterval(swtimeout);
    } else {
        clearInterval(cdtimeout);
        alert("CountDown Finished !");
    }
    clearDisplay();
}

function checkApp(a1, a2, a3) {
    // choosing currently selected app
    a3.className == 'Selected' ? 0 : clearDisplay();
    a1.className == 'Selected' ? a1.classList.toggle('Selected') : 0;
    a2.className == 'Selected' ? a2.classList.toggle('Selected') : 0;
    a3.className != 'Selected' ? a3.classList.toggle('Selected') : 0;
    app = a3.innerText;

    // displaying content according to selected app
    app == 'CountDown' ? unblock() : block();
    app == 'Clock' ? btndiv.style.display = 'none' : btndiv.style.display = 'flex';
    app == 'Clock' || app == 'CountDown' ? lapdiv.style.display = 'none' : lapdiv.style.display = 'flex';
    app == 'CountDown' ? lapbtn.style.display = 'none' : lapbtn.style.display = 'inline-block';

    // changing coontrol buttons according to selected app
    if (app == 'StopWatch' && swhr == 0 && swmin == 0 && swsec == 0) playbtn.className = "fa-solid fa-play";
    else if (app == 'CountDown' && cdhr == 0 && cdmin == 0 && cdsec == 0) playbtn.className = "fa-solid fa-play";
    else if (swhr != 0 || swmin != 0 || swsec != 0 || cdhr != 0 || cdmin != 0 || cdsec != 0) playbtn.className = "fa-solid fa-pause";
}