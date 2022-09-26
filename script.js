/**
 * 1. When the page first loads, the first text field should have the focus state by default to prompt the user.
    - Use the **`.focus()`** method on the **`<input type="text">`** element for the "Name" field.
 */

window.onload = () => {
  document.querySelector("#name").focus();
};

/**
 * 2. The "Job Role" section has an **`<input type="text">`** field where users can enter a custom job role. If the user selects "Other" in the "Job Role" drop down menu, they can enter info into the "Other job role" text field. But this field should be hidden by default and only displayed once users select "Other" in the drop down menu, and be hidden if the user selects any other option.
- Hide the "text field" with the **`id`** of "other-job-role" so it is not displayed when the form first loads.
- Program the "Job Role" **`<select>`** element to listen for user changes. When a change is detected, display/hide the "text field" based on the user’s selection in the drop down menu.
 */
let theOtherJobBox = document.querySelector("input.other-job-role");
theOtherJobBox.style.visibility = "hidden";
function hideOther(element) {
  if (element.value === "other") {
    theOtherJobBox.style.visibility = "visible";
  } else {
    theOtherJobBox.style.visibility = "hidden";
  }
}

/**
 * 3. The options in the "Color" drop down menu are not available for each t-shirt design. So the user shouldn’t be able to see or choose a color option until they have chosen a design.
- Disable the "Color" **`<select>`** element.
- Program the "Design" **`<select>`** element to listen for user changes. When a change is detected:
  - The "Color" **`<select>`** element should be enabled.
  - The "Color" **`<select>`** element should display an available color.
  - The "Color" dropdown menu should display only the color options associated with the selected design. For example:
      - If the user selects "Theme - JS Puns" then the "Color" menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
      - If the user selects "Theme - I ♥ JS" then the "Color" menu should only display "Tomato," "Steel Blue," and "Dim Grey."
 */

let designBox = document.querySelector("#design");
let colorBox = document.querySelector("#color");
//This divides the color options to two
let arrOptions = colorBox.options;
const newArrayOptions = Array.from(arrOptions);

// the colorBox should be disabled
// if user selects a design then the design should be enabled.
function chooseDesign(element) {
  if (element.value === "js puns" || element.value === "heart js") {
    colorBox.disabled = false;
  }

  if (element.value === "js puns") {
   changeColor(newArrayOptions, element.value);

  } 
  
  else if (element.value === "heart js") {
    changeColor(newArrayOptions, element.value);
  } 
  else {
    colorBox.disabled = true;
  }
  //prevents adding up
}

function changeColor(element, value) {
 
  element.forEach((item) => {
    console.log(item.hidden)
    if (item.getAttribute("data-theme") === value) {
      item.hidden = false;
    } else {
      item.hidden = true;
    }
    return;
  });
}

/**
 * 4. The "Total: $" element below the "Register for Activities" section should update to reflect the sum of the cost of the user’s selected activities.
    - Program the "Register for Activities" **`fieldset`** element to listen for user changes. When a change is detected:
        - If an activity is checked, the total cost should increase by the value in the **`data-cost`** attribute of the activity’s **`<input type="checkbox">`** element.
        - If an activity is unchecked, the total cost should decrease by that amount.
        - The **`<p>`** element with the id of "activity-cost" below the activities section should update to reflect the chosen activities' total cost.
 */
const Input_activities = document.querySelectorAll("#activities-box input");
const Input_activitiesArr = Array.from(Input_activities);
let total = document.getElementById("activities-cost");
let val = 0;
//Add to the total
for (const input of Input_activitiesArr) {
  input.addEventListener("click", SeIfChecked);
  function SeIfChecked() {
    let cost = input.getAttribute("data-cost");
    if (input.checked) {
      total.innerHTML = `Total: $${(val += Number(cost))}`;
    } else {
      total.innerHTML = `Total: $${(val -= Number(cost))}`;
    }
  }
}

/**
    * 5. The credit card payment option should be selected for the user by default. So when the form first loads, "Credit Card" should be displayed in the "I'm going to pay with" **`<select>`** element, 
    * and the credit card payment section should be the only payment section displayed in the form’s UI. 
    * And when the user selects one of the payment options from the "I'm going to pay with" drop down menu, the form should update to display only the chosen payment method section.
    - Program the "I'm going to pay with" **`<select>`** element to listen for user changes. When a change is detected, hide all payment sections in the form’s UI except the selected one. 
    */

const pay_Pal = document.querySelector("div #paypal");
const bit_Coin = document.querySelector("div #bitcoin");
const credit_card = document.querySelector("div #credit-card");
const payType = document.querySelector("#payment");
const cardNoInput = document.querySelector("#cc-num");
const cardNoHint = document.querySelector("#cc-hint");
const ZipNo = document.querySelector("#zip");
const ZipHint = document.querySelector("#zip-hint");
const cvvNo = document.querySelector("#cvv");
const cvvHint = document.querySelector("#cvv-hint");

//Onload of page
window.addEventListener("load", creditOption);
function creditOption() {
  for (let i = 0; i < payType.length; i++) {
    if (payType[i].value === "credit-card") {
      payType[i].selected = "credit-card";
    }

    if (payType[i].value === "credit-card") {
      //paypal removal
      pay_Pal.style.display = "none";
      bit_Coin.style.display = "none";
    }
  }
  return;
}

// Change of options
function Pay_Bit_Toggle(element) {
  if (element.value === "paypal") {
    //paypal removal
    pay_Pal.style.display = "block";
    credit_card.style.display = "none";
    bit_Coin.style.display = "none";
  }

  if (element.value === "bitcoin") {
    bit_Coin.style.display = "block";
    pay_Pal.style.display = "none";
    credit_card.style.display = "none";
  }

  if (element.value === "credit-card") {
    credit_card.style.display = "block";
    pay_Pal.style.display = "none";
    bit_Coin.style.display = "none";
  }
}
/**
 * 6. Program the **`form`** element to listen for the **`submit`** event. When the form submission is detected, each required form field or section should be validated, or checked to ensure that they have been filled out correctly. If any of the following required fields is not valid, the form’s submission should be prevented.
    - The "Name" field cannot be blank or empty.
    - The "Email Address" field must contain a validly formatted email address. The email address does not need to be a real email address, just formatted like one. For example: **`dave@teamtreehouse.com`**. A few characters for the username, followed by "@", followed by a few more characters and a ".com" for the domain name. You don’t have to account for other top-level domains, like .org, .net, etc.
    - The "Register for Activities" section must have at least one activity selected.
    - **If and only if credit card is the selected payment method:**
        - The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number.
        - The "Zip code" field must contain a 5 digit number.
        - The "CVV" field must contain a 3 digit number.
 */
const Form = document.getElementById("form1");

const NameField = document.getElementById("name");
const EmailField = document.getElementById("email");
const ErrorMsgName = document.querySelector("#name-hint");
const EmailFieldEmail = document.querySelector("#email-hint");
const Activities_Box = document.querySelectorAll("input[type=checkbox]");
const ActivitiyErrorMsg = document.getElementById("activities-hint");
const parentActivity = document.querySelector("#activities");
const parentInputs = document.querySelectorAll("label .asterisk");

let letters = "([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}";

function Validate(e) {
  e.preventDefault();
  //Empty and Null Validations
  if (NameField.value === "" || NameField.value === null) {
    ErrorMsgName.style.display = "inline";
  }

  if (NameField.value.match(letters)) {
    console.log("Alli");
    ErrorMsgName.style.display = "none";
  }

  if (EmailField.value === "" || EmailField.value === null) {
    EmailFieldEmail.style.display = "inline";
  }

  eValidate();
  activityValidate();
  sectionValidation();
}
Form.addEventListener("submit", Validate);

function eValidate() {
  let EmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let eValidated = EmailField.value.match(EmailFormat) ? "true" : "false";
  if (eValidated === "true") {
    EmailFieldEmail.style.display = "none";
  } else {
    EmailFieldEmail.style.display = "inline";
  }

  let numValidation = /^[0-9]+$/;
  if (
    cardNoInput.value.match(numValidation) &&
    cardNoInput.value.length >= 13 &&
    cardNoInput.value.length <= 16
  ) {
    cardNoHint.style.display = "none";
  } else {
    cardNoHint.style.display = "inline";
  }

  if (ZipNo.value.match(numValidation) && ZipNo.value.length === 5) {
    ZipHint.style.display = "none";
  } else {
    ZipHint.style.display = "inline";
  }

  if (cvvNo.value.match(numValidation) && cvvNo.value.length === 3) {
    cvvHint.style.display = "none";
  } else {
    cvvHint.style.display = "inline";
  }
}

let canSubmit = false;
// I have a list of input boxes
//
function activityValidate() {
  for (let i = 0; i < Activities_Box.length; i++) {
    if (Activities_Box[i].checked) {
      canSubmit = true;
      if (canSubmit === true) {
        ActivitiyErrorMsg.style.display = "none";
        parentActivity.classList.remove("not-valid");
        parentActivity.classList.add("valid");
      }
    }
  }

  if (canSubmit === false) {
    ActivitiyErrorMsg.style.display = "inline";
    parentActivity.classList.remove("valid");
    parentActivity.classList.add("not-valid");
  }
}

/**
 * - **Make the form validation errors obvious to all users.** With the custom form validation checks you’ve already written, invalid form fields will prevent the form from submitting, but all users should be presented with clear notifications of which fields are invalid.
    - When the user tries to submit the form, if a required form field or section is invalid:
        - Add the ‘.not-valid’ className to the parent element of the form field or section.
         For the activity section, the parent element would be the **`fieldset`** element for the activity section. For the other required inputs, the parent element would be a **`label`** element for the input.
        - Remove the ‘.valid’ className from the parent element of the form field or section.
        - Display the **`.hint`** element associated with the form field or section, which will be the last child of the parent element of the form field or section. The **`parentElement`** and **`lastElementChild`** properties will be helpful here.
    - If a required form field or section is valid:
        - Add the ‘.valid’ className to the parent element of the form field or section.
        - Remove the ‘.not-valid’ className from the parent element of the form field or section.
        - Hide the **`.hint`** element associated with that element.
 */

function sectionValidation() {
  Array.from(parentInputs).forEach((item) => {
    if (canSubmit === false) item.classList.add("not-valid");
    item.classList.remove("valid");

    if (canSubmit === true) {
      item.classList.remove("not-valid");
      item.classList.add("valid");
    }
  });
}

//Adds Focus
let inputCheckbox = document.querySelectorAll(`[type='checkbox']`);
inputCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });

  checkbox.addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
});
