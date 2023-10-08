let credentialList = JSON.parse(sessionStorage.getItem("credentials"));
let user = sessionStorage.getItem("user");
let indexUser = 0;

let userExists = false;

const myModalWarning = new bootstrap.Modal(
  document.getElementById("warningModal")
);

const myModalSuccess = new bootstrap.Modal(
  document.getElementById("successModal")
);

if (credentialList && user) {
  credentialList.forEach((credential, index) => {
    if (credential.user === user) {
      indexUser = index;
      document.querySelector(
        "#user"
      ).innerHTML = `Bem vindo ${credential.name} ${credential.lastName}!`;
      document.querySelector(
        "#userInfo"
      ).innerHTML = `<strong>Mensagem</strong>: ${credential.message}`;
      document.querySelector("#email").value = credential.user;
      document.querySelector("#address").value = credential.address;
      document.querySelector("#address2").value = credential.address2;
      document.querySelector("#city").value = credential.city;
      document.querySelector("#neighbourhood").value = credential.neighbourhood;
      document.querySelector("#state").value = credential.state;
      document.querySelector("#CEP").value = credential.CEP;
    }
  });
} else {
  window.location.replace("/index.html");
}

document.querySelector("#logout").addEventListener("click", function (e) {
  sessionStorage.removeItem("user");
  window.location.replace("/index.html");
});

document.querySelector("#accept").addEventListener("click", function (e) {
  if (credentialList.length <= 1) {
    credentialList.pop();
  } else {
    credentialList.splice(indexUser, 1);
  }
  sessionStorage.removeItem("user");
  console.log(credentialList, indexUser);
  if (credentialList.length > 0) {
    sessionStorage.setItem("credentials", JSON.stringify(credentialList));
  } else {
    sessionStorage.removeItem("credentials");
  }
  myModalSuccess.hide();
  window.location.replace("/index.html");
});

document.querySelector("#ok").addEventListener("click", function (e) {
  myModalSuccess.show();
  window.location.replace("/sign_in/sign_in.html");
});

window.onbeforeunload = function () {
  sessionStorage.removeItem("user");
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (
          event.target.password.value !==
          event.target.passwordConfirmation.value
        ) {
          event.target.password.value = "";
          event.target.passwordConfirmation.value = "";
        }
        if (form.checkValidity()) {
          let pass = await sha256(event.target.password.value);

          console.log(pass);

          credentialList[indexUser].password = pass;

          sessionStorage.setItem("credentials", JSON.stringify(credentialList));

          myModalSuccess.show();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
