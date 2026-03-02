// For Reference 
// document.querySelector(".next-btn").addEventListener("click", function () {

//   // Get all fields
//   const name = document.getElementById("name");
//   const email = document.getElementById("email");
//   const phone = document.getElementById("phone");
//   const dob = document.getElementById("dob");
//   const location = document.getElementById("location");
//   const describe = document.getElementById("describe");

//   // Regex patterns (simple + beginner friendly)
//   const nameRegex = /^[A-Za-z ]{2,}$/;
//   const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
//   const phoneRegex = /^[0-9]{6,15}$/;

//   // Store all fields with their validations
//   const fields = [
//     { el: name,     test: v => v !== "" && nameRegex.test(v) },
//     { el: email,    test: v => v !== "" && emailRegex.test(v) },
//     { el: phone,    test: v => v !== "" && phoneRegex.test(v) },
//     { el: dob,      test: v => v !== "" },
//     { el: location, test: v => v !== "" },
//     { el: describe, test: v => v !== "" }
//   ];

//   let allGood = true;

//   // Check each field
//   fields.forEach(item => {
//     const value = item.el.value.trim();

//     if (!item.test(value)) {
//       item.el.classList.add("input-error");     // show red border
//       allGood = false;
//     } else {
//       item.el.classList.remove("input-error"); 
//       item.el.classList.add('input-success') // remove red border
//     }
//   });

//   if (!allGood) {
//     console.log("Some fields are invalid");
//     return;
//   }
//   console.log("All fields valid — go to next step");
//   document.getElementById('form_1').style.display="none";
//   document.getElementById('form_2').style.display="block";
// });
// let go_back = document.getElementById('front_arrow');
// go_back.onclick = function() {
//   document.getElementById('form_1').style.display="block";
//   document.getElementById('form_2').style.display="none";
// } 

//Show Page
function showPage(num) {
  document.querySelectorAll(".form-page").forEach(p => p.style.display = "none");
  document.getElementById("page" + num).style.display = "block";
}

function savePage1() {
  formData.name = document.getElementById("name").value.trim();
  formData.email = document.getElementById("email").value.trim();
  formData.phone = document.getElementById("phone").value.trim();
  formData.location = document.getElementById("location").value.trim();
  formData.dob = document.getElementById("dob").value.trim();
  formData.about = document.getElementById("describe").value.trim();

  // basic empty check
  for (let key in formData) {
    if (formData[key] === "") {
      alert("Please fill all fields");
      return;
    }
  }

  showPage(2);
}
function savePage2() {
  formData.q1 = document.getElementById("q1").value.trim();
  formData.q2 = document.getElementById("q2").value.trim();
  formData.q3 = document.getElementById("q3").value.trim();
  formData.q4 = document.getElementById("q3").value.trim();

  if (!formData.q1 || !formData.q2 || !formData.q3 || !formData.q4) {
    alert("Please answer all questions");
    return;
  }

  showPage(3);
}
function savePage3() {
  formData.q5 = document.getElementById("q1").value.trim();
  formData.q6 = document.getElementById("q2").value.trim();
  formData.q7 = document.getElementById("q3").value.trim();
  formData.q8 = document.getElementById("q3").value.trim();

  if (!formData.q5 || !formData.q6 || !formData.q7) {
    alert("Please answer all questions");
    return;
  }

  submitForm(3);
}

function submitForm() {
  fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
    method: "POST",
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === "success") {
      alert("Form submitted successfully!");
    } else {
      alert("Error submitting form");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Server error");
  });
}




