// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  const myModal = new bootstrap.Modal(document.getElementById("warningModal"));

  document.querySelector("#CEP").addEventListener("input", function (e) {
    const cepValue = e.target.value;

    const address = document.querySelector("#address");
    const neighbourhood = document.querySelector("#neighbourhood");
    const state = document.querySelector("#state");
    const city = document.querySelector("#city");

    if (cepValue.length === 8) {
      //e.target.disabled = true;
      fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
        .then((resposta) => resposta.json())
        .then((cep) => {
          console.log(cep);
          if (cep.erro) {
            myModal.show();
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
      //e.target.disabled = true;
    }
  });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
