document
  .querySelector("#signInForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); //stop form from submitting
    let emailInput = document.querySelector("#floatingInput").value;
    let passwordInput = document.querySelector("#floatingPassword").value;
    passwordInput = await sha256(passwordInput);

    let credentialList = JSON.parse(sessionStorage.getItem("credentials"));

    if (credentialList) {
      let userExists = false;
      credentialList.forEach((credential) => {
        userExists =
          credential.user === emailInput &&
          credential.password === passwordInput;
      });

      if (userExists) {
        sessionStorage.setItem("user", emailInput);
        window.location.replace("/profile/profile.html");
      } else {
        if (
          window.confirm(
            "Usuário ou senha incorreta! Deseja fazer um novo cadastro?"
          )
        ) {
          window.location.replace("/register/register.html");
        }
      }
    } else {
      if (window.confirm("Sem login, ir pra cadastro?")) {
        window.location.replace("/register/register.html");
      }
    }
  });
