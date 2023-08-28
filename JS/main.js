var nameInput = document.getElementById('name');
var urlInput = document.getElementById('url');
var addMarks = document.getElementById('addMarks');
var tableBody = document.getElementById('tbody');
var bookMarks ;
var mainIndex=0;

if(localStorage.getItem('Bookmarks')==null){
    bookMarks=[];
}

else{
    bookMarks=JSON.parse(localStorage.getItem('Bookmarks')); 
    displayMarks(bookMarks)
}

var nameRegex =/^[A-za-z_]{1,}$/;
console.log(nameRegex.test('route'));

function nameIsValid(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }
    else {
        return false;
    }
}

var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/

function urlIsVslid(){
    if(urlRegex.test(urlInput.value)){
        return true;
    }
    else{
        return false;
    }
}

nameInput.onkeyup=function(){
    if(urlIsVslid() && nameIsValid() ){
        addMarks.removeAttribute('disabled');
    }
    else{
        addMarks.disabled='true';
    }
}

urlInput.onkeyup=function(){
    if(urlIsVslid() && nameIsValid() ){
        addMarks.removeAttribute('disabled');
    }
    else{
        addMarks.disabled='true';
    }
}

addMarks.onclick =function(){

if(addMarks.innerHTML=='Update'){
    addMarks.innerHTML="Submit";
    var bookmark ={
        markName :nameInput.value,
        url : urlInput.value,
    }

    bookMarks.splice(mainIndex,1,bookmark);


}
  else{

    var bookmark ={
        markName :nameInput.value,
        url : urlInput.value,
    }
    bookMarks.push(bookmark);
    
  }  
   
    
   
localStorage.setItem('Bookmarks',JSON.stringify(bookMarks));
displayMarks(bookMarks)
clearData()
}


function displayMarks(anyArray){
    var marks=``;
    for(var i =0 ; i<anyArray.length;i++) {
        marks+=`<tr>
        <td>${anyArray[i].markName}</td>
        <td>${anyArray[i].url}</td>
        <td><button  class="btn btn-primary"> <a href="http://${anyArray[i].url}" target="_blank" rel="noopener noreferrer">Visit</a>  </button></td>
        <td><button onclick="updateMark(${i})"  class="btn btn-info">Update</button></td>
        <td><button onclick="deletMark(${i})"  class="btn btn-danger">Delete</button></td>

        
        </tr>`;
    }

    tableBody.innerHTML=marks;
}

function deletMark(index){
    bookMarks.splice(index,1);
    localStorage.setItem('Bookmarks',JSON.stringify(bookMarks));

    displayMarks(bookMarks);

}

function clearData(){
    nameInput.value ="";
    urlInput.value="";

}


function updateMark(index){
    nameInput.value=bookMarks[index].markName;
    urlInput.value=bookMarks[index].url;
    addMarks.innerHTML='Update';

    mainIndex=index;
}

function search(term){
    var wantedBook =[];
    for(var i = 0;i<bookMarks.length;i++){
        if(bookMarks[i].markName.toLowerCase() .includes(term.toLowerCase())){
            wantedBook.push(bookMarks[i]);
        }
    }
    displayMarks(wantedBook);
}
