document.addEventListener("DOMContentLoaded", function () {
   const submitPasswordButton = document.getElementById("submitPasswordButton");
   const alert = document.querySelector(".my-alert");
   const form = document.getElementById("passwordForm");
   const passwordInput = document.getElementById("password");
   const showPasswordCheckbox = document.getElementById("showPassword");
   const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
   const refreshButton = document.getElementById("refreshButton");

   // Menyembunyikan alert saat halaman dimuat
   alert.classList.add('d-none');

   const passwordMap = {
      "https://1drv.ms/f/s!AkX4lxPqYPPDgg2MhxJHZvrsZ89P?e=iG3MUX": "humasdkifotovideo",
      "https://1drv.ms/f/s!AkX4lxPqYPPDgbpkP8vwr887Q8Bbvw?e=polJ5t": "humasdkiflyer",
      "https://1drv.ms/f/s!AkX4lxPqYPPDgbpj_J__W0hoCUqWcw?e=ZfJ5yX": "humasdkibackdrop"
   };


   // Mendapatkan tombol-tombol <a> dan menambahkan event listener
   const buttons = document.querySelectorAll(".toggleModal");

   function hasAccessToLink(url) {
      const hasAccess = sessionStorage.getItem(url);
      return hasAccess === "true";
   }

   buttons.forEach(button => {
      const targetUrl = button.getAttribute("data-url");
      const targetPassword = passwordMap[targetUrl];
      if (hasAccessToLink(targetUrl)) {
         button.querySelector(".kunci-img").style.display = "none";
      }

      button.addEventListener("click", function (event) {
         event.preventDefault();

         submitPasswordButton.setAttribute("data-url", targetUrl);

         const hasAccess = sessionStorage.getItem(targetUrl);
         if (hasAccess === "true") {
            window.location.href = targetUrl;
         } else {
            modal.show();
         }
      });
   });

   submitPasswordButton.addEventListener("click", function () {
      const passwordInputValue = passwordInput.value;
      const targetUrl = submitPasswordButton.getAttribute("data-url");
      const correctPassword = passwordMap[targetUrl];

      if (passwordInputValue === "") {
         alert.textContent = "Password harus diisi!";
         alert.classList.remove('d-none');
         setTimeout(function () {
            alert.classList.add('d-none');
         }, 3000);
      } else if (passwordInputValue === correctPassword) {
         sessionStorage.setItem(targetUrl, "true");
         modal.hide();
         window.location.href = targetUrl;
      } else {
         alert.textContent = "Maaf Password yang anda masukan salah, silahkan hubungi Subbag Humas!";
         alert.classList.remove('d-none');
         form.reset();
         setTimeout(function () {
            alert.classList.add('d-none');
         }, 3000);
      }
   });

   // Event listener untuk checkbox tampilkan password
   showPasswordCheckbox.addEventListener("change", function () {
      if (showPasswordCheckbox.checked) {
         passwordInput.type = "text";
      } else {
         passwordInput.type = "password";
      }
   });

   // Event listener saat modal ditutup
   modal._element.addEventListener('hidden.bs.modal', function () {
      form.reset();
   });

   // Mengecek saat halaman kembali dari halaman lain
   window.onpageshow = function (event) {
      if (event.persisted) {
         const hasAccess = sessionStorage.getItem(event.target.location.href);

         if (hasAccess === "true") {
            window.location.reload();
         }
      }
   };
});