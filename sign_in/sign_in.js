const myModalSuccess = new bootstrap.Modal(
  document.getElementById("successModal")
);

document.querySelector("#accept").addEventListener("click", function (e) {
  myModalSuccess.hide();
  window.location.replace("../register/register.html");
});
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
        window.location.replace("../profile/profile.html");
      } else {
        myModalSuccess.show();
      }
    } else {
      myModalSuccess.show();
    }
  });
