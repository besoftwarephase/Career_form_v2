/****************************
 * COUNTRY CODE
 ****************************/

  const input = document.querySelector("#phone");

  const iti = window.intlTelInput(input, {
    initialCountry: "in",          // Default country (India)
    separateDialCode: true,        // Shows +91 separately
    preferredCountries: ["in","us","gb"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.21/js/utils.js"
  });
if (iti.isValidNumber()) {
  console.log("Valid number");
} else {
  console.log("Invalid number");
}

/****************************
 * GLOBAL ELEMENT REFERENCES
 ****************************/
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const dob = document.getElementById("dob");
const currentLocation = document.getElementById("location");
const describe = document.getElementById("describe");

const q_1 = document.getElementById("q_1");
const q_2 = document.getElementById("q_2");
const q_3 = document.getElementById("q_3");
const q_4 = document.getElementById("q_4");
const q_5 = document.getElementById("q_5");
const q_6 = document.getElementById("q_6");
const q_7 = document.getElementById("q_7");
const q_8 = document.getElementById("q_8");
const q_9 = document.getElementById("q_9");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");



/****************************
 * VALIDATION
 ****************************/
function checkEmpty(id) {
  const field = document.getElementById(id);

  if (!field) return false;

  if (field.type === "file") {
    if (field.files.length === 0) {
      field.classList.add("input-error");
      return false;
    }
    field.classList.remove("input-error");
    return true;
  }

  if (field.value.trim() === "") {
    field.classList.add("input-error");
    return false;
  }

  field.classList.remove("input-error");
  return true;
}

/****************************
 * REMOVE ERROR ON INPUT
 ****************************/
document.querySelectorAll("input, textarea").forEach(field => {
  field.addEventListener("input", () => {
    if (field.value.trim() !== "") {
      field.classList.remove("input-error");
    }
  });
});

q_8.addEventListener("change", () => {
  if (q_8.files.length > 0) {
    q_8.classList.remove("input-error");
  }
});

/****************************
 * PAGE 1 → PAGE 2
 ****************************/
document.getElementById("next1").onclick = () => {

  const fields = ["name", "email", "phone", "dob", "location", "describe"];
  let valid = true;

  fields.forEach(id => {
    if (!checkEmpty(id)) valid = false;
  });

  if (!valid) {
    console.log("Entered data");
    return;
  }

  page1.style.display = "none";
  page2.style.display = "block";
};

/****************************
 * PAGE 2 → PAGE 3
 ****************************/
document.getElementById("next2").onclick = () => {

  const fields = ["q_1", "q_2", "q_3", "q_4"];
  let valid = true;

  fields.forEach(id => {
    if (!checkEmpty(id)) valid = false;
  });

  if (!valid) {
    alert("Please answer all questions.");
    return;
  }

  page2.style.display = "none";
  page3.style.display = "block";
};

/****************************
 * SUBMIT + ADMIN EMAIL
 ****************************/
document.getElementById("submit").onclick = () => {

  const fields = ["q_5", "q_6", "q_7", "q_8", "q_9"];
  let valid = true;

  fields.forEach(id => {
    if (!checkEmpty(id)) valid = false;
  });

  if (!valid) {
    alert("Please fill all fields on this page.");
    return;
  }

  alert("Form submitted successfully! Admin will be notified.");
  
  showLoader();
  const fd = new FormData();

  fd.append("name", fullName.value);
  fd.append("email", email.value);
  fd.append("phone", phone.value);
  fd.append("dob", dob.value);
  fd.append("location", currentLocation.value);
  fd.append("describe", describe.value);

  fd.append("q_1", q_1.value);
  fd.append("q_2", q_2.value);
  fd.append("q_3", q_3.value);
  fd.append("q_4", q_4.value);

  fd.append("preferred_role", q_5.value);
  fd.append("expected_salary", q_6.value);
  fd.append("joining_date", q_7.value);

  if (q_8.files.length > 0) {
    fd.append("resume", q_8.files[0]);
  }

  fd.append("message", q_9.value);

 fetch("http://localhost:3000/submit", {
  method: "POST",
  body: fd
 })
.then(res => res.json())
.then(data => {
  if (data.status === "SUCCESS") {
    hideLoader(); 
    alert("Admin notified successfully ");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    hideLoader(); 
    alert("Submission failed ");
  }
});
};

/****************************
 * BACK BUTTONS
 ****************************/
document.getElementById("front_arrow").onclick = () => {
  page3.style.display = "none";
  page2.style.display = "block";
};

document.getElementById("back_arrow").onclick = () => {
  page2.style.display = "none";
  page1.style.display = "block";
};

/***********************
 * LOADER
 ***********************/
 const loader = document.getElementById("loader");
 function showLoader() {
  loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}