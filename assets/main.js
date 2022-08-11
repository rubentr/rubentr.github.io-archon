// -------------------------------->
var slist = {
  // INITIALIZE LIST
  items : [], // current shopping list
  hlist : null, // HTML shopping list
  hadd : null, // HTML add item form
  hitem : null, // HTML add item input field
  vekn:null, //vekn player number

  init : function () {
    // GET HTML ELEMENTS ADD ITEM
    slist.hlist = document.getElementById("List_Players");
    slist.hadd = document.getElementById("add_Player_Btn");
    slist.hitem = document.getElementById("add_Player_Name");
    slist.vekn = document.getElementById("add_Player_Vekn");
    //slist.hadd.addEventListener("submit", slist.add);
    slist.hadd.addEventListener("click", slist.add);
    
    // abrir el div con la previa del Torneo
    slist.hbegin = document.getElementById("Begin_Btn");
    slist.hbegin.addEventListener("click",slist.begin);
    // volver al inicio
    slist.hvolver = document.getElementById("volver_Btn");
    slist.hvolver.addEventListener("click",slist.volver);

    // RESTORE PREVIOUS PLAYER LIST
    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    slist.items = JSON.parse(localStorage.items);

    // DRAW HTML PLAYER LIST
    slist.draw();
  },

  // (B) ADD NEW PLAYER TO THE LIST
  add : function (evt) {
    // PREVENT FORM SUBMIT
    //evt.preventDefault();
   
    // ADD NEW PLAYER TO LIST
    if(slist.hitem.value!=""){
      slist.items.push({
        name : slist.hitem.value, // Item name
        vekn : slist.vekn.value, // Player vekn
      });
        
      slist.hitem.value = "";
      slist.vekn.value = "";
      slist.save();

      // REDRAW HTML LIST
      slist.draw();
    }
  },

  // (C) DRAW THE HTML LIST
  draw : function () {
    slist.hlist.innerHTML = "";
    if (slist.items.length > 0) {
      let row, lblName,InName,lblVekn,InVekn,delbtn,editbtn;
      for (let i in slist.items) {

        // ITEM ROW
        row = document.createElement("div");
        row.className = "list-row";
        slist.hlist.appendChild(row);
       
        // ITEM NAME
        lblName = document.createElement("label");//label
        lblName.className="name";
        InName = document.createElement("input");//Input editing
        InName.className="name";
        InName.type="text";
        lblName.innerHTML = slist.items[i].name
        row.appendChild(lblName)
        row.appendChild(InName)
        // name = document.createElement("div");
        // name.className = "list-item item-name";
        // name.innerHTML = slist.items[i].name;
        // row.appendChild(name);

        // ITEM VEKN
        lblVekn = document.createElement("label");//label
        lblVekn.className="vekn";
        InVekn = document.createElement("input");//Input editing
        InVekn.className="vekn";
        InVekn.type="text";
        lblVekn.innerHTML = slist.items[i].vekn
        row.appendChild(lblVekn)
        row.appendChild(InVekn)
        // diVekn = document.createElement("div");
        // diVekn.className = "list-item item-vekn";
        // diVekn.innerHTML = slist.items[i].vekn;
        // row.appendChild(diVekn);

        // ITEM DIV WITH BUTTONS
        divBtn = document.createElement("div");
        divBtn.className = "list-item-btn-wrap";
        row.appendChild(divBtn);

        // EDIT BUTTON
        editbtn = document.createElement("button");
        editbtn.className = "list-item-btn btn-edit";
        editbtn.type = "button";
        editbtn.dataset.id = i;
        editbtn.addEventListener("click", slist.edit);
        divBtn.appendChild(editbtn);

        // DELETE BUTTON
        delbtn = document.createElement("button");
        delbtn.className = "list-item-btn btn-close";
        delbtn.type = "button";
        delbtn.dataset.id = i;
        delbtn.addEventListener("click", slist.delete);
        divBtn.appendChild(delbtn);
      }
    }
    document.getElementById('Num_Players').innerHTML='<strong>' + slist.items.length + '</strong> jugadores';
   
    if(slist.items.length>=10){
      document.getElementById('Begin_Btn').style.display="inline-block";
    }else{
      document.getElementById('Begin_Btn').style.display="none";
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

  // (E) EDIT SELECTED ITEM
  edit: function() {
    // console.log("edit:" + this.dataset.id)
    console.log("Edit Task...");
    console.log("vekn label no funciona");
        
    let listItem,containsClass,editName,elblName,editVekn,elblVekn;
    listItem = this.parentNode.parentNode;
   
    // console.log(listItem)

    editName=listItem.querySelector('input[type=text].name');
    elblName=listItem.querySelector('label.name');
    editVekn=listItem.querySelector('input[type=text].vekn');
    elblVekn=listItem.querySelector('label.vekn');

    //console.log(editVekn.value + ' - ' + elblVekn.innerHTML)
    containsClass = listItem.classList.contains("editMode");
    
    //If class of the parent is .editmode
    if(containsClass){
    //switch to .editmode
    //label becomes the inputs value.
      elblName.innerHTML=editName.value;
      elblVekn.innerHTML=editVekn.value;

      slist.save();

    }else{
      editName.value=elblName.innerHTML;
      editVekn.value=elblVekn.innerHTML;
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
  
  },

 // (E) COMENZAR LA PREVIA DEL TORNEO
  begin: function(){
    document.getElementById('d_player').style.display="none";
    document.getElementById('d_previa').style.display="flex";
  },
  volver: function(){
    document.getElementById('d_player').style.display="flex";
    document.getElementById('d_previa').style.display="none";
  },
};

// // CALCULA CUANTAS MESAS HAY POR RONDA SEGUN EL NUMERO DE JUGADORES
function calcularMesas(n){

  //quitamos el boton
  //document.getElementById('btnMesas').style.display="none"
  //mostramos la info
  document.getElementById('info-mesas-row').style.display="flex"

  // borramos el div donde iran los checks
  document.getElementById('Num_Mesas').innerHTML=""
    
  let mjug=[5,4,3];
  // let values=[];
  
  console.log(n)

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

  document.getElementById('Num_Mesas').appendChild(divcheck);
  divcheck.appendChild(inpMesa);
  divcheck.appendChild(lblMesa);
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}; 

// FUNCION QUE PINTA CADA RONDA
function makeRondas(RondasNum){
  document.getElementById('d_previa').style.display="none";
  document.getElementById('d_tables').style.display="flex";

  document.getElementById("container-rondas").innerHTML=""

  let rondiv,poutput;
  let rondas=document.getElementById("container-rondas")
          
  //console.log(RondasNum)
  if(RondasNum!=""){
    for (i=0;i<RondasNum;i++){
      rondiv = document.createElement("div");
      rondiv.className = "rondas-item-list";
      rondiv.id = "ronda"+ (i+1);
      divTitle = document.createElement("h5");
      divTitle.innerHTML="RONDA " + (i+1)
      poutput = document.createElement("div");
      poutput.className = "row rondas-item";
      poutput.id="output" + (i+1);

      rondiv.appendChild(divTitle)
      rondiv.appendChild(poutput)
      rondas.appendChild(rondiv)

      makeGroupNum([5,5],poutput.id)
    }
  }
}

// Funcion para crear las mesas
function makeGroupNum(groupNum,pid) {
  let peopleNames=[];
  // let items=document.getElementsByClassName("item-name")
  let items=document.querySelectorAll("label.name")

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
     output_string += "<div class='mesa col-md-6'><div class='mesa-header'><span>MESA " + (i+1) + "</span><button type='button' id='btn" + pid + i + "' class='' data-bs-toggle='modal' data-bs-target='#ModalTable'><i class='far fa-edit'></i></button></div><ol>";
    
     for (let j = groups[i].length-1 ; j >= 0 ; j-- ) {
       if ( j == 0 ) {
         output_string += "<li class='li-player'><div><span class='player'>" + groups[i][j] + "</span></div><div><input type='text' value='0'/><input type='text' value='0'/></div></li>"; 
       }
       else {
        // output_string += "<li><span>" + groups[i][j] + "</span></li>" + "<i class='fas fa-chevron-right'></i>";
        output_string += "<li class='li-player'><div><span class='player'>" + groups[i][j] + "</span></div><div><input type='text' value='0'/><input type='text' value='0'/></div></li>"; 
       }
     }
     output_string += "</li></ol></div>";
   }
   
  document.getElementById(pid).innerHTML = output_string;
}

window.addEventListener("DOMContentLoaded", slist.init);

