let todoList = [];
let addList = document.querySelector(".add-list");
let close = document.querySelector(".close");
let itemObject;
let list;
let count = 0;
let flag = 0;

//backgroud blur functionality
function toggle1() {
    let blur = document.querySelector("#blur");
    blur.classList.toggle('active');
    let popup = document.querySelector(".pop1");
    popup.classList.toggle('active');
    
}

function toggle2() {
    let blur = document.querySelector("#blur");
    blur.classList.toggle('active');
    let popup = document.querySelector(".pop2");
    popup.classList.toggle('active');
}

//To add new card
function addToDoCard() {
    let inputItem = document.querySelector("#inputfield1");
    let cardSection = document.querySelector(".card-section");
    if (inputItem.value===""){
        window.alert("Please Enter A Title");
        return;
    }else{
     itemObject = {
        id: Date.now(),
        title: inputItem.value
    };
    todoList.push(itemObject);
    toggle1();
    
    const cardContent = `<div class="card" id="${itemObject.id}">
    <div class="card-title" onclick="enlargeCard(event)">
        <p class="card-title-p" id="cardtitle">${itemObject.title}</p>
        <hr>
    </div>
    <div class="list-container ">
        <ul class="list">
        </ul>
    </div>
    <div class="cardbutton">
    <div class="add-item icon" onclick="toggle2(); cardSelection(event)"><i class="fas fa-plus-circle"></i></div>
    <div class="delete-card icon" onclick="removeCard(event)"><i class="fa fa-trash"
            aria-hidden="true"></i></div>
</div>
</div>`
    cardSection.innerHTML += cardContent; 
}

}

//to focus when clicked on card
function enlargeCard(event){
    let cards = document.querySelectorAll(".card");
    let backbtn = document.querySelector(".backBtn");
    let cardhead = document.querySelector(".card-heading");
    let headtitle = document.querySelector(".head-title");
    let addlist = document.querySelector(".add-list");
    headtitle.classList.add("inactive");
    backbtn.classList.add("active");
    cardhead.classList.add("active");
    addlist.classList.add("inactive");
   
    cards.forEach(card=>{
        if(!(event.path[1].getAttribute("id")===card.getAttribute("id") ||event.path[2].getAttribute("id")===card.getAttribute("id"))){
            card.style.display="none";    
        }else{
            let cardtitle=card.childNodes[1].textContent;
            cardhead.innerHTML=`<p class="card-title">${cardtitle}</p>`;
        }
    })
    
}

//back function when a card is focused
function backFunction(){
    let cards = document.querySelectorAll(".card");
    let backbtn = document.querySelector(".backBtn");
    let cardhead = document.querySelector(".card-heading");
    let headtitle = document.querySelector(".head-title");
    let addlist = document.querySelector(".add-list");
    headtitle.classList.remove("inactive");
    backbtn.classList.remove("active");
    cardhead.classList.remove("active");
    addlist.classList.remove("inactive");
    cards.forEach(card=>{
            card.style.display="initial";
    })
    cardhead.classList.remove("active");
    cardhead.innerHTML="";
}

//to pick correct card id when a addlist button is clicked inside the card
function cardSelection(event) {
    let cardId = event.path[3].getAttribute("id");
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (card.getAttribute("id") === cardId) {
            list = card.getElementsByClassName("list")[0];
        }
    })
}


//deletecard button function
function removeCard(event) {
    let removeId = event.path[3].getAttribute("id");
    document.getElementById(removeId).remove();
}

//to add the list inside the card with the chosen card id from previous function(addRequiredList(event))
function addListItem(listItem) {
    let inputListItem = document.querySelector("#inputfield2");
    let listItemObject;
    if (inputListItem.value===""){
        window.alert("Please Enter A List");
        return;
    }else{
    listItemObject = {
        id: count++,
        list: inputListItem.value
    }
    toggle2();
    const listContent = `<li class="list-style" id="${listItemObject.id}">
                            <p class="list-items" contenteditable = "true" >${listItemObject.list}</p>
                            <div class="mark-done">
                                <p onclick="markDone(event)" id = "cancelButton">Mark Done</p>
                            </div>
                            <div class = "edit-button" onclick = "focusInput()"> Edit </div>
                        </li>`;
    listItem.innerHTML += listContent;
    }
}

//Function to focus the input form
function focusInput(){
   document.getElementsByClassName('list-items')[0].focus();
}



//markdone function for each entered lists
function markDone(event){
    let listItem = event.path[2].getAttribute("id");
    let listItems = document.querySelectorAll(".list-style");
    listItems.forEach(list=>{
        if(list.getAttribute('id')===listItem){
            flag = 1 - flag;
            if(flag === 1){
              //list.childNodes[3].style.display="none";
              list.style.color="red";
              list.childNodes[1].style.textDecoration="line-through";
              document.getElementById('cancelButton').textContent = "Done";
              document.getElementsByClassName('edit-button')[0].style.pointerEvents = 'none';
            }
            else{
                document.getElementById('cancelButton').textContent = "Mark Done";
                list.style.color="black";
                list.childNodes[1].style.textDecoration = "none";
                document.getElementsByClassName('edit-button')[0].style.pointerEvents = 'auto';  
            }
            
        }
    })
   
}