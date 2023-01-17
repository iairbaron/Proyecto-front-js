/* ---------------------------------- texto --------------------------------- */
export default function validarFormulario(){
      if (
        validarEmail(inputEmail.value) &&
        validarNombre(inputNombre.value) &&
        validarApellido(inputApellido.value) &&
        validarPassword(inputPassword.value) &&
        compararContrasenias(inputPassword.value, inputPasswordRespetida.value)
      ) {
        return true;
      } else {
        return false;
      }
    };;

window.addEventListener("load", function () {
  const formulario = document.querySelector("#signUp");
  const inputNombre = document.querySelector("#inputNombre");
  const inputApellido = document.querySelector("#inputApellido");
  const inputEmail = document.querySelector(".inputEmail");
  const inputPassword = document.querySelector(".inputPassword");
  const inputPasswordRespetida = document.querySelector(
    "#inputPasswordRepetida"
  );

  const emailError = document.querySelector("#emailError");
  const nombreError = document.querySelector("#nombreError");
  const apellidoError = document.querySelector("#apellidoError");
  const passwordError = document.querySelector("#passwordError");
  const passwordRepetidaError = document.querySelector(
    "#passwordRepetidaError"
  );

  formulario.addEventListener("change", function (e) {
    validarEmail(inputEmail.value);
    validarNombre(inputNombre.value);
    validarApellido(inputApellido.value);
    validarPassword(inputPassword.value);
    compararContrasenias(inputPassword.value, inputPasswordRespetida.value);
    console.log(
      compararContrasenias(inputPassword.value, inputPasswordRespetida.value)
    );
    //Aaaaaaaa


    console.log("La validacion es  " + validarFormulario());
  });

  function validarNombre(texto) {
    if (texto.trim() === "") {
      return false;
    }
    let regName = /^[a-z](([,. -][a-z ])?[a-z]*)*$/;
    if (!regName.test(texto)) {
      nombreError.innerHTML = "Debe ingresar un nombre valido";
    } else {
      nombreError.innerHTML = "";
      return true;
    }
  }

  /* ---------------------------------- apellido --------------------------------- */
  function validarApellido(texto) {
    let regText = /^[a-z]+(([,. -][a-z ])?[a-z]*)*$$/;
    if (texto.trim() !== "") {
      if (!regText.test(texto)) {
        apellidoError.innerText = "Debe ingresar un Apellido valido";
      } else {
        apellidoError.innerText = "";
        return true;
      }
    }
  }

  /* ---------------------------------- email --------------------------------- */
  function validarEmail(email) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (regex.test(email) || email.length == 0) {
      emailError.innerText = " ";
      return true;
    } else {
      emailError.innerText = "Debe ser un mail valido";
      return false;
    }

    //    console.log("Esta mal el mail es  " + resultado)
  }

  /* -------------------------------- password -------------------------------- */
  function validarPassword(password) {
    if (password.trim() === "") {
      // Si el campo de entrada está vacío, asigna el mensaje de error a passwordError.innerText y retorna la función
      passwordError.innerText = "";
      return false;
    }

    // Verifica si la contraseña cumple con los siguientes requisitos:
    // - Tiene al menos 8 caracteres
    // - Contiene al menos una letra mayúscula
    // - Contiene al menos una letra minúscula
    // - Contiene al menos un número
    let mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    if (mediumRegex.test(password)) {
      passwordError.innerText = "";
      return true;
    } else {
      passwordError.innerText =
        "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial!";
      return false;
    }
  }

  function compararContrasenias(contrasenia_1, contrasenia_2) {
    if (contrasenia_2.trim() === "") {
      passwordRepetidaError.innerText = "";
      return false;
    }
    if (contrasenia_1 !== contrasenia_2) {
      passwordRepetidaError.innerText = "No coinciden las contraseñas";
      return false;
    } else {
      passwordRepetidaError.innerText = "";
      return true;
    }
  }
});



