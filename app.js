let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container")
let close = document.querySelector(".closeForm");
let form = document.querySelector("form");
let stack = document.querySelector(".stack");
addNote.addEventListener("click",function(){
    formContainer.style.display = "initial";
    console.log("working");
})
close.addEventListener("click",function(){
    formContainer.style.display = "none";
})

let formSubmit = document.querySelector(".submit-btn");
const imageUrlInput = document.querySelector('input[placeholder="https://example.com/photo.jpg"]');
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment note"]');
const categoryInputs = document.querySelectorAll('input[name="category"]');

function saveToLocalStorage(obj){
    if(localStorage.getItem("task") === null){
        let oldTask = [];
        oldTask.push(obj);
        localStorage.setItem("task",JSON.stringify(oldTask));
    }
    else{
        let oldTask = localStorage.getItem("task");
        oldTask = JSON.parse(oldTask);
        oldTask.push(obj);
        localStorage.setItem("task",JSON.stringify(oldTask));
    }
}


form.addEventListener("submit",function(evt){
    evt.preventDefault();
    if (
    imageUrlInput.value.trim() === "" ||
    fullNameInput.value.trim() === "" ||
    homeTownInput.value.trim() === "" ||
    purposeInput.value.trim() === ""
  ) {
    alert("Please fill in all the text fields.");
    return;
  }
  let selected = false;
  categoryInputs.forEach((ele) => {
    if(ele.checked == true) {
        selected = ele.value;
    // console.log(selected);
    }
  })
    saveToLocalStorage({
        fullName: fullNameInput.value.trim(),
        imageUrl: imageUrlInput.value.trim(),
        homeTown: homeTownInput.value.trim(),
        purpose: purposeInput.value.trim(),
        category: selected
    })
    form.reset();
    formContainer.style.display = "none";
    showCards();
})

function showCards(){

    let allTask = [];
    allTask = JSON.parse(localStorage.getItem("task"));
    allTask.forEach(ele => {
        let img = document.createElement("img");
        img.src = ele.imageUrl;
        img.classList.add("avatar")

        let card = document.createElement("div");
        card.classList.add("card");

        let name = document.createElement("h2");
        name.textContent = ele.fullName;
        name.classList.add("name")

        card.appendChild(img);
        card.appendChild(name);
        let homeTown = document.createElement("div");
        homeTown.classList.add("info");

        let homeTownLebel1 = document.createElement("span");
        homeTownLebel1.textContent = "HomeTown";
    
        let homeTownValue1 = document.createElement("span");
        homeTownValue1.textContent = ele.homeTown;

        homeTown.appendChild(homeTownLebel1);
        homeTown.appendChild(homeTownValue1);
        card.appendChild(homeTown);

        let bookingInfo = document.createElement("div");
        bookingInfo.classList.add("info");

        let bookingInfoLebel = document.createElement("span");
        bookingInfoLebel.textContent = "Purpose";
    
        let bookingInfoValue = document.createElement("span");
        bookingInfoValue.textContent = ele.purpose;

        bookingInfo.appendChild(bookingInfoLebel);
        bookingInfo.appendChild(bookingInfoValue);
        card.appendChild(bookingInfo);

        let btnDiv = document.createElement("div");
        btnDiv.classList.add("buttons");

        let callBtn = document.createElement("button");
        callBtn.classList.add("call");
        callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

        const msgBtn = document.createElement("button");
        msgBtn.classList.add("msg");
        msgBtn.textContent = "Message";

        btnDiv.appendChild(callBtn);
        btnDiv.appendChild(msgBtn);

        
        card.appendChild(btnDiv);

        stack.append(card); 
    });
}
showCards();


function update(){

    let cards = document.querySelectorAll(".stack .card");
    for (let i = 0; i < 3; i++) {
        const card = cards[i];
    card.style.zIndex = 3 - i;
    card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
    card.style.opacity = `${1 - i * 0.02}`;
  }
}
let up = document.querySelector("#upBtn");
let down = document.querySelector("#downBtn");

up.addEventListener("click",function(){
    let lastChild = stack.lastElementChild;
    if(lastChild){
        stack.insertBefore(lastChild,stack.firstElementChild);
        update();
    }
});
down.addEventListener("click",function(){
    let firstChild = stack.firstElementChild;
    if(firstChild){
        stack.appendChild(firstChild);
        update();
    }
});