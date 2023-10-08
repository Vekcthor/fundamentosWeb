// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  const myModalWarning = new bootstrap.Modal(
    document.getElementById("warningModal")
  );
  const myModalSuccess = new bootstrap.Modal(
    document.getElementById("successModal")
  );

  document.querySelector("#CEP").addEventListener("input", function (e) {
    const cepValue = e.target.value;

    const address = document.querySelector("#address");
    const neighbourhood = document.querySelector("#neighbourhood");
    const state = document.querySelector("#state");
    const city = document.querySelector("#city");

    if (cepValue.length < 8) {
      address.disabled = false;
      neighbourhood.disabled = false;
      state.disabled = false;
      city.disabled = false;
    }

    if (cepValue.length === 8) {
      //e.target.disabled = true;
      fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
        .then((resposta) => resposta.json())
        .then((cep) => {
          if (cep.erro) {
            document.querySelector("#CEP").value = "00000000";
            document.querySelector("#modalMessage").innerHTML =
              "CEP não encontrado, por Por favor, digite seu endereço manualmente.";
            myModalWarning.show();
          } else {
            address.value = cep.logradouro;
            neighbourhood.value = cep.bairro;
            state.value = cep.uf;
            city.value = cep.localidade;

            address.disabled = true;
            neighbourhood.disabled = true;
            state.disabled = true;
            city.disabled = true;
          }
        });
    }

    if (cepValue.length > 8) {
      e.target.value = cepValue.substring(0, 8);
    }
  });

  document.querySelector("#accept").addEventListener("click", function (e) {
    myModalSuccess.hide();
    window.location.replace("/sign_in/sign_in.html");
  });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        event.stopPropagation();
        let credentialList = JSON.parse(sessionStorage.getItem("credentials"));
        if (!credentialList) {
          credentialList = [];
        } else {
          credentialList.forEach((credential) => {
            console.log(credential, credential.user, event.target.email.value);
            if (credential.user === event.target.email.value) {
              document.querySelector("#modalMessage").innerHTML =
                "Email já cadastrado! <br>Caso tenha esquecido sua senha, entre em contato com os administradores do sistema!";
              event.target.email.value = "";
              myModalWarning.show();
            }
          });
        }
        if (
          event.target.password.value !==
          event.target.passwordConfirmation.value
        ) {
          event.target.password.value = "";
          event.target.passwordConfirmation.value = "";
        }
        if (event.target.CEP.value.length !== 8) {
          event.target.CEP.value = "";
        }
        if (form.checkValidity()) {
          const formObj = event.target;
          let passwordHash = await sha256(formObj.password.value);

          credentialList.push({
            user: formObj.email.value,
            password: passwordHash,
            name: formObj.firstName.value,
            lastName: formObj.lastName.value,
            address: formObj.address.value,
            address2: formObj.address2.value,
            city: formObj.city.value,
            neighbourhood: formObj.neighbourhood.value,
            state: formObj.state.value,
            CEP: formObj.CEP.value,
            message: formObj.message.value,
          });

          sessionStorage.setItem("credentials", JSON.stringify(credentialList));

          myModalSuccess.show();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

async function sha256(string) {
  // Create a TextEncoder object
  const encoder = new TextEncoder();
  // Encode the string as a Uint8Array of UTF-8 bytes
  const data = encoder.encode(string);
  // Use the crypto.subtle.digest method to create a Promise that resolves to an ArrayBuffer containing the hash
  const hash = crypto.subtle.digest("SHA-256", data);
  // Use the Promise.then method to handle the resolved value
  const buffer = await hash;
  // Convert the ArrayBuffer to an array of bytes using the Uint8Array constructor
  const bytes = new Uint8Array(buffer);
  // Convert each byte to a hexadecimal string using the toString method with 16 as the radix
  // Use the padStart method to ensure each byte has two digits
  // Join the array of hexadecimal strings into one string using the join method
  const hex = bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return hex;
}
