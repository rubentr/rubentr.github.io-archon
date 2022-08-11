// -------------------------------->
var slist = {
  // (A) INITIALIZE SHOPPING LIST
  items : [], // current shopping list
  hlist : null, // HTML shopping list
  hadd : null, // HTML add item form
  hitem : null, // HTML add item input field
  vekn:null, //vekn player number
  init : function () {
    // (A1) GET HTML ELEMENTS + "ACTIVATE" ADD ITEM
    slist.hlist = document.getElementById("player-list");
    slist.hadd = document.getElementById("player-add");
    slist.hitem = document.getElementById("player-item");
    slist.vekn = document.getElementById("player-vekn");
    slist.hadd.addEventListener("submit", slist.add);

    // (A2) RESTORE PREVIOUS SHOPPING LIST
    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    slist.items = JSON.parse(localStorage.items);

    // (A3) DRAW HTML SHOPPING LIST
    slist.draw();
  },

  // (B) ADD NEW ITEM TO THE LIST
  add : function (evt) {
    // (B1) PREVENT FORM SUBMIT
    evt.preventDefault();

    // (B2) ADD NEW ITEM TO LIST
    slist.items.push({
      name : slist.hitem.value, // Item name
      vekn : slist.vekn.value, // Player vekn
    });
    slist.hitem.value = "";
    slist.vekn.value = "";
    slist.save();

    // (B3) REDRAW HTML SHOPPING LIST
    slist.draw();
  },

  // (C) DRAW THE HTML SHOPPING LIST
  draw : function () {
    slist.hlist.innerHTML = "";
    if (slist.items.length > 0) {
      let row, name, delbtn,diVekn;
      for (let i in slist.items) {
        // (C1) ITEM ROW
        row = document.createElement("div");
        row.className = "item-row";
        slist.hlist.appendChild(row);
        
        // (C2) ITEM NAME
        name = document.createElement("div");
        name.className = "item-name";
        name.innerHTML = slist.items[i].name;
        row.appendChild(name);

        // (C2) ITEM VEKN
        diVekn = document.createElement("div");
        diVekn.className = "item-vekn";
        diVekn.innerHTML = slist.items[i].vekn;
        row.appendChild(diVekn);

        // (C3) DELETE BUTTON
        // delbtn = document.createElement("input");
        // delbtn.className = "btn-close";
        // delbtn.type = "button";
        // delbtn.value = "Borrar";
        delbtn = document.createElement("button");
        delbtn.className = "btn-close";
        delbtn.type = "button";
        // aria-label="Close"
        delbtn.dataset.id = i;
        delbtn.addEventListener("click", slist.delete);
        row.appendChild(delbtn);

      }
    }
    document.getElementById('player-number').innerHTML='Hay ' + slist.items.length + ' jugadores.';
   
    if(slist.items.length>=10){
      document.getElementById('torneo').style.display="block";
    }else{
      document.getElementById('torneo').style.display="none";
    }

  },

  // (D) SAVE LIST INTO LOCAL STORAGE
  save : function () {
    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    localStorage.items = JSON.stringify(slist.items);
  },

  // (E) DELETE SELECTED ITEM
  delete : function () {
    if (confirm("Remove selected item?")) {
      slist.items.splice(this.dataset.id, 1); 
      slist.save();
      slist.draw();
    }
  },

};

// FUNCION QUE PINTA CADA RONDA
function makeRondas(RondasNum){
  document.getElementById("container-rondas").innerHTML=""

  let rondiv,poutput;
  let rondas=document.getElementById("container-rondas")
          
  if(RondasNum!=""){
    for (i=0;i<RondasNum;i++){
      rondiv = document.createElement("div");
      rondiv.className = "rondas-item-list";
      divTitle = document.createElement("h5");
      divTitle.innerHTML="RONDA " + (i+1)
      poutput = document.createElement("div");
      poutput.className = "rondas-item";
      poutput.id="output" + i

      rondiv.appendChild(divTitle)
      rondiv.appendChild(poutput)
      rondas.appendChild(rondiv)

      makeGroupNum([5,5],poutput.id)
    }
  }
}

// CALCULA CUANTAS MESAS HAY POR RONDA SEGUN EL NUMERO DE JUGADORES
function calcularMesas(n){

  //quitamos el boton
  document.getElementById('btnMesas').style.display="none"
  //mostramos la info
  document.getElementById('info-mesas-row').style.display="flex"

  // borramos el div donde iran los checks
  document.getElementById('nmesas').innerHTML=""
    
  let mjug=[5,4,3];
  // let values=[];
  
  mjug.forEach(e => {
    let values=[];
    if (n%e==0) {
      for (let j=0;j<(n/e);j++){
        values.push(e);
        // (e,e,...j...,e)
      }
    }
    // console.log(values.sort((a,b)=>a-b))
    
    if (values!=""){
      // Dibujamos los checks
      printChecks(values)

    }
  
  });
 
}

// crea los checks
function printChecks(values){
  
  divcheck=document.createElement("div");
  divcheck.className="form-check";

  inpMesa = document.createElement("input");
  inpMesa.type="checkbox";
  inpMesa.name="mesas" + String(values).replaceAll(",","")
  inpMesa.value=String(values).replaceAll(",","")
  inpMesa.className="form-check-input"
  lblMesa = document.createElement("label");
  lblMesa.innerText="[" + values + "]";
  lblMesa.className="form-check-label";
  lblMesa.htmlFor=inpMesa.name;
  
  // createLabel(values)

  document.getElementById('nmesas').appendChild(divcheck);
  divcheck.appendChild(inpMesa);
  divcheck.appendChild(lblMesa);
}

// Aun no funciona esta parte
function createLabel(array){
  array=array.sort((a,b)=>a-b)
  let text="";
  let aux;
  let cont=1;

  array.forEach(e=>{
    // if (e==aux){cont+=1;}else{cont=1;}
    text+= cont + " mesa de " + e + " jugadores. <br>";
    aux=e;
  });
  console.log(text)
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}; 

// Funcion para crear las mesas
function makeGroupNum(groupNum,pid) {
  let peopleNames=[];
  let items=document.getElementsByClassName("item-name")

  for (i=0;i<items.length;i++){
    //console.log(items[i].innerText)
    peopleNames.push(items[i].innerText)
  }

  peopleNames = shuffle(peopleNames);

  var groups = [];
  var numPeople = peopleNames.length;
   
  // let groupNum = Number(groupNum);
  var groupNum = Number(groupNum.length);
  let peoplePerGroup = Math.floor( numPeople / groupNum );
  
  let personIndex = 0;
  while (groupNum > 0.0) {
    let newGroup = [];
    let i;
    if ( groupNum <= 1.0 ) {
      while( personIndex < numPeople ) {
        newGroup[newGroup.length] = peopleNames[personIndex];
      personIndex++;
      }
    }
    else {
    for ( i = peoplePerGroup ; i > 0 ; i-- ) {
      newGroup[newGroup.length] = peopleNames[personIndex];
      personIndex++;
    }
    }
    groups[groups.length] = newGroup;
    
    groupNum--;
  }
   
   printGroups(groups,pid);
 }
 
 function printGroups(groups,pid) {
   let output_string = "";
   
   for ( let i = 0 ; i < groups.length ; i++ ) {
     output_string += "<div class='mesa'><div class='mesa-header'><span>MESA " + (i+1) + "</span><button type='button' id='btn" + pid + i + "' class='' data-bs-toggle='modal' data-bs-target='#ModalTable'><i class='far fa-edit'></i></button></div><ol>";
    
     for (let j = groups[i].length-1 ; j >= 0 ; j-- ) {
       if ( j == 0 ) {
         output_string += "<li class='li-player'><span class='player'>" + groups[i][j] + "</span></li>"; 
       }
       else {
        // output_string += "<li><span>" + groups[i][j] + "</span></li>" + "<i class='fas fa-chevron-right'></i>";
        output_string += "<li class='li-player'><span class='player'>" + groups[i][j] + "</span></li>"; 
       }
     }
     output_string += "</li></ol></div>";
   }
   
  document.getElementById(pid).innerHTML = output_string;
}

window.addEventListener("DOMContentLoaded", slist.init);

// change theme
document.getElementById("change-theme").addEventListener("click", () => {
// document.querySelector("#change-theme").addEventListener("click", ()=>{
  console.log("hola");
//   document.getElementById(".sun-logo").classList.toggle("animate-sun");
//   document.getElementById(".moon-logo").classList.toggle("animate-moon");
//   document.getElementById("body").classList.toggle("dark");
});
