document.addEventListener("DOMContentLoaded", function() {
   const submitPasswordButton = document.getElementById("submitPasswordButton");
   const alert = document.querySelector(".my-alert");
   const form = document.getElementById("passwordForm");
   const passwordInput = document.getElementById("password");
   const showPasswordCheckbox = document.getElementById("showPassword");

   alert.classList.add('d-none');

   submitPasswordButton.addEventListener("click", function() {
      const passwordInput = document.getElementById("password").value;
      const correctPassword = "humasdki"; 

      if (passwordInput === "") {
         alert.textContent = "Password harus diisi!";
         alert.classList.remove('d-none');
         setTimeout(function() {
            alert.classList.add('d-none');
         }, 3000);
      } else if (passwordInput === correctPassword) {
         sessionStorage.setItem("passwordCorrect", true); // Simpan informasi password benar
         window.location.href = "berhasil.html";
      } else {
         // Tampilkan alert, reset form, dan atur waktu munculnya
         alert.textContent = "Maaf Password yang anda masukan salah, silahkan hubungi Subbag Humas!";
         alert.classList.remove('d-none');
         form.reset();
         setTimeout(function() {
            alert.classList.add('d-none');
         }, 3000);
      }
   });

   // Event listener untuk tombol "Foto"
   const fotoButton = document.querySelector(".list-group-item:nth-child(1)"); 
   fotoButton.addEventListener("click", function(event) {
      const passwordCorrect = sessionStorage.getItem("passwordCorrect");
      if (passwordCorrect === "true") {
         event.preventDefault();
         window.location.href = "berhasil.html";
      }
   });

   // Event listener untuk tombol "Flyer"
   const flyerButton = document.querySelector(".list-group-item:nth-child(3)"); 
   flyerButton.addEventListener("click", function(event) {
      const passwordCorrect = sessionStorage.getItem("passwordCorrect");
      if (passwordCorrect === "true") {
         event.preventDefault();
         window.location.href = "berhasil.html";
      }
   });

   // Event listener untuk tombol "Backdrop"
   const backdropButton = document.querySelector(".list-group-item:nth-child(4)"); 
   backdropButton.addEventListener("click", function(event) {
      const passwordCorrect = sessionStorage.getItem("passwordCorrect");
      if (passwordCorrect === "true") {
         event.preventDefault();
         window.location.href = "berhasil.html";
      }
   });

   // Lihat Password
   showPasswordCheckbox.addEventListener("change", function() {
      if (showPasswordCheckbox.checked) {
         passwordInput.type = "text";
      } else {
         passwordInput.type = "password";
      }
   });
});

