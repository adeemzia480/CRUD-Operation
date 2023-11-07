const submit = document.querySelector("#submit");
const tBody = document.querySelector("#table");
let lastKey = 0;
const keys = Object.keys(localStorage).filter(key => !isNaN(Number(key))).map(Number);

// localStorage.clear();

if (keys.length > 0) {
  lastKey = Math.max(...keys);
}

submit.addEventListener('click', dataSetUp);

function dataSetUp(event) {
  event.preventDefault();
  let isValid = inputValidation(event);

  if (isValid) {
    lastKey++;
    setData(lastKey);
  }
}


//To store data in localstorage
function setData(lastKey) {
    const getValues = document.body.childNodes[1];
    const fnInputValue = getValues.childNodes[3].querySelector("#firstNameInput").value;
    const snInputValue = getValues.childNodes[3].querySelector("#secondNameInput").value;
    const emailInputValue = getValues.childNodes[3].querySelector("#emailInput").value;
    const pwdInputValue = getValues.childNodes[3].querySelector("#passwordInput").value;
    const user = {
        firstName: fnInputValue,
        secondName: snInputValue,
        email: emailInputValue,
        password: pwdInputValue
    };
    localStorage.setItem(lastKey, JSON.stringify(user));
    getData(lastKey);

    getValues.childNodes[3].querySelector("#firstNameInput").value = "";
    getValues.childNodes[3].querySelector("#secondNameInput").value = "";
    getValues.childNodes[3].querySelector("#emailInput").value = "";
    getValues.childNodes[3].querySelector("#passwordInput").value = "";
}

//To get data from localstorage
function getData(key) {
    const retrievedUser = JSON.parse(localStorage.getItem(key));
    let newRow = document.createElement('tr');
    newRow.innerHTML = `<th scope="row">${key}</th>
        <td>${retrievedUser.firstName}</td>
        <td>${retrievedUser.secondName}</td>
        <td>${retrievedUser.email}</td>
        <td>${retrievedUser.password}</td>
        <td>
            <i id="edit-button" data-key="${key}" onclick = "editData(${key})" class='far fa-edit'></i>
            <i id="delete-button" data-key="${key}" onclick = "deleteData(${key})" class='far fa-trash-alt'></i>
        </td>`;
    tBody.appendChild(newRow);
}

//To display data according to keys in localstorage
function displayData() {
    for (let i = 1; i <= lastKey; i++) {
        getData(i);
    }
}
displayData();


function deleteData(key){
 localStorage.removeItem(key);
 location.reload();
}


function editData(key, event) {
    submit.removeEventListener('click', dataSetUp);
    submit.textContent = "Update";
    const currKey = key;
    const retrievedUser = JSON.parse(localStorage.getItem(key));
    const getValues = document.body.childNodes[1];
    getValues.childNodes[3].querySelector("#firstNameInput").value = retrievedUser.firstName;
    getValues.childNodes[3].querySelector("#secondNameInput").value = retrievedUser.secondName;
    getValues.childNodes[3].querySelector("#emailInput").value = retrievedUser.email;
    getValues.childNodes[3].querySelector("#passwordInput").value = retrievedUser.password;
  
    submit.addEventListener('click', editSubmitHandler);
  
    function editSubmitHandler(event) {
      const existingData = JSON.parse(localStorage.getItem(currKey));
      const fnInputValue = getValues.childNodes[3].querySelector("#firstNameInput").value;
      const snInputValue = getValues.childNodes[3].querySelector("#secondNameInput").value;
      const emailInputValue = getValues.childNodes[3].querySelector("#emailInput").value;
      const pwdInputValue = getValues.childNodes[3].querySelector("#passwordInput").value;

      const isValid = inputValidation(event);
  
      if (isValid) {
        if (existingData) {
          existingData.firstName = fnInputValue;
          existingData.secondName = snInputValue;
          existingData.email = emailInputValue;
          existingData.password = pwdInputValue;
          localStorage.setItem(key, JSON.stringify(existingData));
          location.reload();
        }
      }
    }
  }  

  function inputValidation(event) {
    const getValues = document.body.childNodes[1];
    const fnInputValue = getValues.childNodes[3].querySelector("#firstNameInput").value.trim();
    const snInputValue = getValues.childNodes[3].querySelector("#secondNameInput").value.trim();
    const emailInputValue = getValues.childNodes[3].querySelector("#emailInput").value.trim();
    const pwdInputValue = getValues.childNodes[3].querySelector("#passwordInput").value.trim();
  
    const fnErrorMsg = document.getElementById("firstNameError");
    const lnErrorMsg = document.getElementById("lastNameError");
    const emailErrorMsg = document.getElementById("emailError");
    const pwdErrorMsg = document.getElementById("passwordError");
  
    let isValid = true;
  
    if (fnInputValue === "" || fnInputValue == null) {
      fnErrorMsg.style.display = "block";
      isValid = false;
    } else {
      fnErrorMsg.style.display = "none";
    }
  
    if (snInputValue === "" || snInputValue == null) {
      lnErrorMsg.style.display = "block";
      isValid = false;
    } else {
      lnErrorMsg.style.display = "none";
    }
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailInputValue)) {
      emailErrorMsg.style.display = "block";
      isValid = false;
    } else {
      emailErrorMsg.style.display = "none";
    }
  
    if (pwdInputValue.length < 8) {
      pwdErrorMsg.style.display = "block";
      isValid = false;
    } else {
      pwdErrorMsg.style.display = "none";
    }
  
    // Assign the isValid variable to the end of the function, after all of the input validation checks have been performed.
    return isValid;
  }
  