//Declaracion y asignacion de variables
const divGral = document.getElementById('divGral')
const sectionGral = document.createElement('section')
sectionGral.setAttribute('id',"sectionGral");
sectionGral.setAttribute('class',"sectionGral");
const buttonSavePallet = document.createElement('button');
buttonSavePallet.setAttribute('id','buttonSavePallet');
buttonSavePallet.setAttribute('class','btn btn-primary buttonYES');
buttonSavePallet.setAttribute('type','button');
buttonSavePallet.innerText = "Guardar Paleta";
const dataFromLocalStorage = localStorage.getItem('dataFromAPIJSON');
const dataFromLocalStorageJSON = JSON.parse(dataFromLocalStorage)
divGral.append(buttonSavePallet);
divGral.append(sectionGral)
const arrayForSave = [];
//FIN Declaracion y asignacion de variables
buttonSavePallet.onclick = () =>{
    Toastify({
        text:`Paleta Guardada`,
        duration: 3000,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #9eee09, #1c45ff)",
        },
    }).showToast()
    let i = localStorage.length;
    const jSonSavedArrayPallets = JSON.stringify(arrayForSave);
    localStorage.setItem('jSonSavedArrayPallets'+i,jSonSavedArrayPallets);
}
//Clase para construir un objeto de tipo myColourConst
class myColourConst{
    constructor(a,b,c){
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
//FIN Clase para construir un objeto de tipo myColourConst
//Creo un objeto de tipo myColourConst y lo guardo en un array
function createRGBForSave(a,b,c){
    const colourForSave = new myColourConst(a,b,c)
    arrayForSave.push(colourForSave)
}
//FIN Creo un objeto de tipo myColourConst y lo guardo en un array
//Crea los distintos elementos para asignarles los datos de nuestras paletas y asi poder verlas
function createPalletsForShow(e){
const sectionPallets = document.createElement('section');
sectionPallets.setAttribute('id',"sectionPallets");
sectionPallets.setAttribute('class',"sectionPallets");
    e.forEach(element => {
        const R = element.rgb.r;
        const G = element.rgb.g;
        const B = element.rgb.b;
        createRGBForSave(R,G,B);
        let XYZ = document.createElement('h4');
        let cmyk = document.createElement('h4');
        let hex = document.createElement('h4');
        let hsl = document.createElement('h4');
        let hsv = document.createElement('h4');
        let rgb = document.createElement('h4');
        let XYZp = document.createElement('p');
        let cmykp = document.createElement('p');
        let hexp = document.createElement('p');
        let hslp = document.createElement('p');
        let hsvp = document.createElement('p');
        let rgbp = document.createElement('p');
        let circleForShow = document.createElement('div');
        let eachPallets = document.createElement('div');
        eachPallets.setAttribute('id',"eachPallets");
        eachPallets.setAttribute('class',"eachPallets");
        sectionPallets.append(eachPallets);
        let colourForShow = element.rgb.value;
        let textOfCircle = document.createElement('p')
        textOfCircle.innerText = element.name.value;
        textOfCircle.setAttribute('id',"textOfCircle");
        textOfCircle.setAttribute('class',"textOfCircle");
        circleForShow.append(textOfCircle)
        circleForShow.style.backgroundColor= colourForShow;
        XYZ.innerText= "XYZ";
        XYZ.setAttribute('id',"XYZ");
        cmyk.innerText= "cmyk";
        cmyk.setAttribute('id',"cmyk");
        hex.innerText= "hex";
        hex.setAttribute('id',"hexp");
        hsl.innerText= "hsl";
        hsl.setAttribute('id',"hsl");
        hsv.innerText= "hsv";
        hsv.setAttribute('id',"hsv");
        rgb.innerText= "rgb";
        rgb.setAttribute('id',"rgb");
        XYZp.innerText= element.XYZ.value;
        XYZp.setAttribute('id',"XYZp");
        cmykp.innerText= element.cmyk.value;
        cmykp.setAttribute('id',"cmykp");
        hexp.innerText= element.hex.value;
        hexp.setAttribute('id',"hexp");
        hslp.innerText= element.hsl.value;
        hslp.setAttribute('id',"hslp");
        hsvp.innerText= element.hsv.value;
        hsvp.setAttribute('id',"hsvp");
        rgbp.innerText= element.rgb.value;
        rgbp.setAttribute('id',"rgbp");
        circleForShow.setAttribute('id',"circleForShow");
        circleForShow.setAttribute('class',"circleForShow");
        eachPallets.append(circleForShow);
        eachPallets.append(XYZ);
        eachPallets.append(XYZp);
        eachPallets.append(cmyk);
        eachPallets.append(cmykp);
        eachPallets.append(hex);
        eachPallets.append(hexp);
        eachPallets.append(hsl);
        eachPallets.append(hslp);
        eachPallets.append(hsv);
        eachPallets.append(hsvp);
        eachPallets.append(rgb);
        eachPallets.append(rgbp);
    });    
    sectionGral.append(sectionPallets);
}
//FIN Crea los distintos elementos para asignarles los datos de nuestras paletas y asi poder verlas
//Elimino la paleta aletoria del localStorage
function deleteItemFromLS(){
    if(dataFromLocalStorageJSON){
        localStorage.removeItem('dataFromAPIJSON');
    }
}
//FIN Elimino la paleta aletoria del localStorage
//llamo a la funcion para mostrar la paleta aletoria
createPalletsForShow(dataFromLocalStorageJSON);
//Llamo a la funcion para borrar la paleta aleatoria
deleteItemFromLS();