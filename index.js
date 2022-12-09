//Declaracion y asignacion de variables
let R;
let G;
let B;
let numOfSaveColour = 1;
let colourMix;
let indice = 0;
let divShowAllPallets;
let sectionPallets;
const arrayPallet = [];
const buttonRandomColour = document.getElementById('buttonRandomColour');
const buttonGetAPI = document.getElementById("buttonGetAPI");
const buttons = document.getElementById('buttons');
const containerDiv = document.getElementById('containerDiv');
const sectionShowAllPallets = document.getElementById('sectionShowAllPallets');
const buttonShowPreviusSavedPallets = document.getElementById('buttonShowPreviusSavedPallets');
const buttonSaveColour = document.getElementById('buttonSaveColour');
const buttonSavePallet = document.createElement('button');
buttonSavePallet.setAttribute('class','btn btn-primary buttonYES');
buttonSavePallet.setAttribute('type','button');
const buttonDeleteSavedPallets = document.createElement('button');
buttonDeleteSavedPallets.setAttribute('class','btn btn-primary buttonYES');
buttonDeleteSavedPallets.setAttribute('type','button');
const buttonCleanScreen = document.createElement('button');
buttonCleanScreen.setAttribute('class','btn btn-primary buttonYES');
buttonCleanScreen.setAttribute('type','button');
const buttonMoreR = document.getElementById('buttonMoreR');
const buttonMoreG = document.getElementById('buttonMoreG');
const buttonMoreB = document.getElementById('buttonMoreB');
const buttonLessR = document.getElementById('buttonLessR');
const buttonLessG = document.getElementById('buttonLessG');
const buttonLessB = document.getElementById('buttonLessB');
const Circle1ID = document.getElementById("Circle1ID");
const textR = document.getElementById("R");
const textG = document.getElementById("G");
const textB = document.getElementById("B");
const buttonDeletePallet = document.createElement('button');
buttonDeletePallet.setAttribute('class','btn btn-primary buttonYES');
buttonDeletePallet.setAttribute('type','button');
buttonCleanScreen.setAttribute('id',"buttonCleanScreen");
buttonDeletePallet.setAttribute('id',"buttonDeletePallet");
buttonDeletePallet.innerText = "Eliminar Paleta";
buttons.append(buttonDeletePallet);
buttonDeletePallet.disabled = true;
buttonSavePallet.setAttribute('id',"buttonSavePallet");
buttonSavePallet.innerText = "Guardar Paleta";
buttons.append(buttonSavePallet);
buttonSavePallet.disabled = true;
buttonSaveColour.innerText = ('Guardar Color 1');
//Llamo a la funcion que llena los textBox y le da un color al circulo de forma aleatoria
fillRandomColourData();
//FIN Llamo a la funcion que llena los textBox y le da un color al circulo de forma aleatoria
//FIN Declaracion y asignacion de variables
//Saludo de bienvenida
Swal.fire({
        title: "Bienvenido a la creadora de paletas, para crear una debe guardar 5 colores...",
        confirmButtonColor: '#1c45ff',
})
//FIN Saludo de bienvenida
buttonRandomColour.onclick = () =>{
    fillRandomColourData();
}
buttonDeletePallet.onclick= (e) =>{
    Toastify({
        text:`Paleta Eliminada`,
        duration: 3000,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #9eee09, #1c45ff)",
        },
    }).showToast()
    deleteSave(e.target.id);
    buttonShowPreviusSavedPallets.disabled = false;
}
buttonSavePallet.onclick = (e) =>{
    Toastify({
        text:`Paleta Guardada`,
        duration: 3000,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #9eee09, #1c45ff)",
        },
    }).showToast()
    deleteSave(e.target.id);
    buttonShowPreviusSavedPallets.disabled = false;
}
buttonGetAPI.onclick = async () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
    })
    Toast.fire({
        icon: 'success',
        title: 'Cargando Paleta'
    })
    await getPalletFromAPI()
    ventanaSecundaria()
}
buttonSaveColour.onclick = () =>{
    fSaveColour();
}
buttonCleanScreen.onclick = () =>{
    cleanView();
    buttonShowPreviusSavedPallets.disabled = false;
    buttonDeleteSavedPallets.remove();
    buttonCleanScreen.remove();
}
buttonMoreR.onclick = (e) =>{
    verificationForMix(e.target.id);
}
buttonLessR.onclick = (e) =>{
    verificationForMix(e.target.id);
}
buttonMoreG.onclick = (e) =>{
    verificationForMix(e.target.id);
}
buttonLessG.onclick = (e) =>{
    verificationForMix(e.target.id);
}
buttonMoreB.onclick = (e) =>{
    verificationForMix(e.target.id);
}
buttonLessB.onclick = (e) =>{
    verificationForMix(e.target.id);
}
textR.oninput = (e) => {
    R = Number.parseFloat(e.target.value);
    verificationForMixText(R);
}
textG.oninput = (e) => {
    G = Number.parseFloat(e.target.value);
    verificationForMixText(G);
}
textB.oninput = (e) => {
    B = Number.parseFloat(e.target.value);
    verificationForMixText(B);
}
buttonDeleteSavedPallets.onclick = () =>{
    Toastify({
        text:`Elimino Todas Las Paletas Guardadas`,
        duration: 3000,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #9eee09, #1c45ff)",
        },
    }).showToast()
    localStorage.clear();
    cleanView();
    buttonShowPreviusSavedPallets.disabled = false;
    buttonDeleteSavedPallets.remove();
    buttonCleanScreen.remove();
}
buttonShowPreviusSavedPallets.onclick = () =>{
    savedDataLocalStorage();
}
window.onload = function() {
    setInterval(showClock, 1000);
}
//Muestra la hora actual
function showClock() {
    const dateForShow = new Date();
    let hours = dateForShow.getHours();
    let minutes = dateForShow.getMinutes();
    let seconds = dateForShow.getSeconds();
    if(hours < 10) {
        hours = '0' + hours; 
    }
    if(minutes < 10) {
        minutes = '0' + minutes;
    }
    if(seconds < 10) {
        seconds = '0' + seconds;
    }
    document.getElementById('divDateForShow').innerHTML = hours+':'+minutes+':'+seconds;
}
//Crea un div que va a contener las secciones para mostrar las distintas paletas
function createDivShowAllPallets(){
    divShowAllPallets = document.createElement('div');
    sectionShowAllPallets.append(divShowAllPallets);
}
//FIN Crea un div que va a contener las secciones para mostrar las distintas 
//Llama a las funciones para crear los div y secciones para mostrar las paletas y muestra los botones de eliminar paletas guardadas y limpiar , si no hay paletas que mostrar da una alearta
function savedDataLocalStorage(){    
    if (localStorage.length > 0 ){
        buttonShowPreviusSavedPallets.disabled = true;
        createDivShowAllPallets();
        showSavedPalletsByCPFS();
        buttonSaveColour.disabled = true;
        buttonDeleteSavedPallets.innerText = "Eliminar Las Paletas Guardadas";
        buttonCleanScreen.innerText = "Limpiar Pantalla";
        containerDiv.append(buttonDeleteSavedPallets);
        containerDiv.append(buttonCleanScreen);
        buttonCleanScreen.disabled = false;
        buttonDeleteSavedPallets.disabled = false;
    }else{
        Swal.fire({
            title: "Debe guardar primero una paleta",
            confirmButtonColor: '#1c45ff',
    })
    }
}
//FIN Llama a las funciones para crear los div y secciones para mostrar las paletas y muestra los botones de eliminar paletas guardadas y limpiar , si no hay paletas que mostrar da una alearta
//Trae los datos del localStorage y llama a la funcion que crea todas las paletas
function showSavedPalletsByCPFS(){
    for(iLocal=0;iLocal<localStorage.length;iLocal++){
        const showSavedArrayPallets = localStorage.getItem('jSonSavedArrayPallets'+iLocal);
        createPalletsForShow(JSON.parse(showSavedArrayPallets));
    }
}
//FIN Trae los datos del localStorage y llama a la funcion que crea todas las paletas
//Guarda las paletas en el localStorage
function saveInLocalStorage(el){
    let i = localStorage.length;
    const jSonSavedArrayPallets = JSON.stringify(el);
    localStorage.setItem('jSonSavedArrayPallets'+i,jSonSavedArrayPallets);
}
//FIN Guarda las paletas en el localStorage
//Dependiendo del valor del boton (Eliminar Paleta o Guardar Paleta) borra o guarda la paleta y llama a limpiar la pantalla
function deleteSave(e){
    cleanView();
    if(e === "buttonSavePallet"){
        saveInLocalStorage(arrayPallet);
        arrayPallet.splice(0,arrayPallet.length);
    }else{
        arrayPallet.splice(0,arrayPallet.length);
    }
}
//FIN Dependiendo del valor del boton (Eliminar Paleta o Guardar Paleta) borra o guarda la paleta y llama a limpiar la 
//Limpia la pantalla, habilita y deshabilita botones
function cleanView(){
    divShowAllPallets.remove();
    buttonSavePallet.disabled = true;
    buttonDeletePallet.disabled = true;
    buttonSaveColour.disabled = false;
    buttonDeleteSavedPallets.disabled = true;
    buttonCleanScreen.disabled = true;
}
//FIN Limpia la pantalla, habilita y deshabilita botones
//Llama a las funciones que crean las paletas para mostrar
function showAllPallets(){
    createDivShowAllPallets();
    createPalletsForShow(arrayPallet);
    buttonSaveColour.disabled = true;
    buttonSavePallet.disabled = false;
    buttonDeletePallet.disabled = false;
    buttonShowPreviusSavedPallets.disabled = true;
}
//FIN Llama a las funciones que crean las paletas para 
//Guarda los colores que generamos como un objeto y llama la funcion que muestra nuestra paleta
function fSaveColour(){
    if(validateSave(textR.value,textG.value,textB.value)){
        let newColour = new myColourConst(numOfSaveColour,R,G,B)
        if (numOfSaveColour === 5){            
            arrayPallet.push(newColour);
            showAllPallets();
            buttonSaveColour.innerText = ('Guardar Color 1');
            numOfSaveColour = 1;
        }else{
            arrayPallet.push(newColour);
            numOfSaveColour = arrayPallet.length+1;
            buttonSaveColour.innerText = ('Guardar Color '+numOfSaveColour);
            
        }
    }
}
//FIN Guarda los colores que generamos como un objeto y llama la funcion que muestra nuestra paleta
//Asigana un color como RGB a una variable y esta es asignada al style de nuestro circulo para poder per el color que vamos seleccionando
function mix(){
    colourMix = 'rgb('+R+','+G+','+B+')';
    Circle1ID.style.backgroundColor= colourMix;
}
//FIN Asigana un color como RGB a una variable y esta es asignada al style de nuestro circulo para poder per el color que vamos seleccionando
//Crea los distintos elementos para asignarles los datos de nuestras paletas y asi poder verlas
function createPalletsForShow(e){
    sectionPallets = document.createElement('section');
    sectionPallets.setAttribute('id',"sectionPallets");
    sectionPallets.setAttribute('class',"sectionPallets");
    divShowAllPallets.append(sectionPallets);
    e.forEach(element => {
        let elR = element.a
        let elG = element.b
        let elB = element.c
        let showR = document.createElement('h1');
        let showG = document.createElement('h1');
        let showB = document.createElement('h1');
        let inputR = document.createElement('input');
        let inputG = document.createElement('input');
        let inputB = document.createElement('input');
        let circleForShow = document.createElement('div');
        let eachPallets = document.createElement('div');
        eachPallets.setAttribute('id',"eachPallets");
        eachPallets.setAttribute('class',"eachPallets");
        sectionPallets.append(eachPallets);
        showR.innerText= "R";
        showR.setAttribute('id',"showR");
        showG.innerText= "G";
        showG.setAttribute('id',"showG");
        showB.innerText= "B";
        showB.setAttribute('id',"showB");
        inputR.value= elR;
        inputR.setAttribute('id',"inputR");
        inputG.value= elG;
        inputG.setAttribute('id',"inputG");
        inputB.value= elB;
        inputB.setAttribute('id',"inputB");
        circleForShow.setAttribute('id',"circleForShow");
        circleForShow.setAttribute('class',"circleForShow");
        let colourForShow = 'rgb('+elR+','+elG+','+elB+')';
        circleForShow.style.backgroundColor= colourForShow;
        eachPallets.append(showR);
        eachPallets.append(inputR);
        eachPallets.append(showG);
        eachPallets.append(inputG);
        eachPallets.append(showB);
        eachPallets.append(inputB);
        eachPallets.append(circleForShow);
    });
}
//FIN Crea los distintos elementos para asignarles los datos de nuestras paletas y asi poder verlas
//Verifica que los botones de + y - no permitan salirse del rango entre 0 y 255 y llama a la funcion mix
function verificationForMix(e){
    switch (e) {
        case "buttonMoreR":
            if(validate(R) === true){
                R = R + 1;
                textR.value = R;
                mix()
            }else if(R === 0){
                R = R + 1;
                textR.value = R;
                mix()
            }
        break    
        case "buttonLessR":
            if(validate(R) === true){
                R = R - 1;
                textR.value = R;
                mix()
            }else if(R === 255){
                R = R - 1;
                textR.value = R;
                mix()
            }
        break  
        case "buttonMoreG":
            if(validate(G) === true){
                G = G + 1;
                textG.value = G;
                mix()
            }else if(G === 0){
                G = G + 1;
                textG.value = G;
                mix()
            }
        break    
        case "buttonLessG":
            if(validate(G) === true){
                G = G - 1;
                textG.value = G;
                mix()
            }else if(G === 255){
                G = G - 1;
                textG.value = G;
                mix()
            }
        break    
        case "buttonMoreB":
            if(validate(B) === true){
                B = B + 1;
                textB.value = B;
                mix()
            }else if(B === 0){
                B = B + 1;
                textB.value = B;
                mix()
            }
        break    
        case "buttonLessB":
            if(validate(B) === true){
                B = B - 1;
                textB.value = B;
                mix()
            }else if(B === 255){
                B = B - 1;
                textB.value = B;
                mix()
            }
        break    
    }
}
//FIN Verifica que los botones de + y - no permitan salirse del rango entre 0 y 255 y llama a la funcion mix
//Llama a la funcion validate y verifica que los datos sean correctos
function verificationForMixText(e){
    validate(e) === true
    ? mix()
    : e === 0 || e === 255
    mix()
    
}
//FIN Llama a la funcion validate y verifica que los datos sean correctos
//Valida que los textBox tengan un valor entre 1 y 254
function validate(n){
    if (n >0 & n <255 ){
        return true;
    }else{
        return false;
    }
}
//FIN Valida que los textBox tengan un valor entre 1 y 254
//Valida que en los textBox haya numeros entre 0 y 255, sino muestra una alerta
function validateSave(a,b,c){
    if(a === "" || b === "" || c === ""){
        Swal.fire("Solo puede ingresar numeros entre 0 y 255")
        return false;
    }else{
        if(a >= 0 & a <= 255 & b >= 0 & b <= 255 & c >= 0 & c <= 255){
            return true;
        }else{
            Swal.fire("Solo puede ingresar numeros entre 0 y 255")
            return false;
        }
    }
}
//FIN Valida que en los textBox haya numeros entre 0 y 255, sino muestra una 
//Nos devuelve un numero aleatorio entre 0 y 255
function randomRGB(){
    return Math.floor(Math.random() * 256);
}
//FIN Nos devuelve un numero aleatorio entre 0 y 255
//Asigno aleatoriamente un valor a cada textBox
function fillRandomColourData(){
    R = randomRGB();
    G = randomRGB();
    B = randomRGB();
    textR.value = R;
    textG.value = G;
    textB.value = B;
    colourMix = 'rgb('+R+','+G+','+B+')';
    Circle1ID.style.backgroundColor= colourMix;
}
//FIN Asigno aleatoriamente un valor a cada 
//Obtengo una paleta y todos sus datos a traves de una API externa
async function getPalletFromAPI(){
    const arrayPalletsFromAPI = [];
    for(let i=0;i<5;i++){
        const colourMixForApi = 'rgb('+randomRGB()+','+randomRGB()+','+randomRGB()+')';
        const palletsFromAPI = await fetch(`https://www.thecolorapi.com/id?rgb=${colourMixForApi}`);
        const palletsFromAPIJSON = await palletsFromAPI.json()
        arrayPalletsFromAPI.push(palletsFromAPIJSON) 
    }
    const dataFromAPIJSON = JSON.stringify(arrayPalletsFromAPI)
    localStorage.setItem('dataFromAPIJSON',dataFromAPIJSON)
}
//FIN Obtengo una paleta y todos sus datos a traves de una API externa
//Abro la ventana html palletsAPI
function ventanaSecundaria(){ 
    window.open('./palletsAPI.html',"ventana1","width=1400,height=900,scrollbars=NO")
}
//FIN Abro la ventana html palletsAPI
//Clase para construir un objeto de tipo myColourConst
class myColourConst{
    constructor(id,a,b,c){
        this.id = id;
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
//FIN Clase para construir un objeto de tipo myColourConst