// JavaScript para mostrar y ocultar la ventana emergente de registro
function mostrarFormularioRegistro() {
    var popup = document.getElementById("registro-popup");
    popup.style.display = "block";
  }
  
  function cerrarFormularioRegistro() {
    var popup = document.getElementById("registro-popup");
    popup.style.display = "none";
  }
  function registrarme() {
    // Lógica de validación y preparación de datos

    // Envío del formulario
    var formulario = document.getElementById("registro-form");
    formulario.submit();
}

  
  // JavaScript para validar el formulario de registro
  function validarRegistro() {
    var tipoDocumento = document.getElementById("tipo-documento").value;
    var numeroDocumento = document.getElementById("numero-documento").value;
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var correo = document.getElementById("correo").value;
    var contrasena = document.getElementById("contrasena-registro").value;
    var confirmarContrasena = document.getElementById("confirmar-contrasena").value;
  
    // Validaciones adicionales según las especificaciones
    if (!validarCorreo(correo)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return false;
    }
  
    if (contrasena.length < 5 || !(/[A-Z]/.test(contrasena)) || !(/[a-z]/.test(contrasena)) || !(/\d/.test(contrasena))) {
      alert("La contraseña debe tener al menos 5 caracteres y contener letras mayúsculas, minúsculas y números.");
      return false;
    }
  
    if (contrasena !== confirmarContrasena) {
      alert("La contraseña y la confirmación de contraseña deben ser idénticas.");
      return false;
    }
  
    // Si todas las validaciones pasan, el formulario se envía
    return true;
  }