document.addEventListener("DOMContentLoaded", function () {
   const submitPasswordButton = document.getElementById("submitPasswordButton");
   const alert = document.querySelector(".my-alert");
   const form = document.getElementById("passwordForm");
   const passwordInput = document.getElementById("password");
   const showPasswordCheckbox = document.getElementById("showPassword");
   const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
   const buttons = document.querySelectorAll(".toggleModal");

   alert.classList.add('d-none');

   const passwordMap = {
      "https://1drv.ms/f/s!AkX4lxPqYPPDgg2MhxJHZvrsZ89P?e=iG3MUX": "humasdkifotovideo",
      "https://1drv.ms/f/s!AkX4lxPqYPPDgbpkP8vwr887Q8Bbvw?e=polJ5t": "humasdkiflyer",
      "https://1drv.ms/f/s!AkX4lxPqYPPDgbpj_J__W0hoCUqWcw?e=ZfJ5yX": "humasdkibackdrop"
   };

   buttons.forEach(button => {
      const targetUrl = button.getAttribute("data-url");
      const targetPassword = passwordMap[targetUrl];
      if (hasAccessToLink(targetUrl)) {
         button.querySelector(".kunci-img").style.display = "none";
      }

      button.addEventListener("click", function (event) {
         event.preventDefault();
         submitPasswordButton.setAttribute("data-url", targetUrl);
         const hasAccess = hasAccessToLink(targetUrl);
         if (hasAccess) {
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
         showAlert("Password harus diisi!");
      } else if (passwordInputValue === correctPassword) {
         sessionStorage.setItem(targetUrl, "true");
         modal.hide();
         window.location.href = targetUrl;
      } else {
         showAlert("Maaf Password yang anda masukan salah, silahkan hubungi Subbag Humas!");
         form.reset();
      }
   });

   showPasswordCheckbox.addEventListener("change", function () {
      passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
   });

   modal._element.addEventListener('hidden.bs.modal', function () {
      form.reset();
   });

   window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
         const hasAccess = hasAccessToLink(event.target.location.href);
         if (hasAccess) {
            sessionStorage.removeItem(event.target.location.href);
            window.location.reload();
         }
      }
   });

   passwordInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
         event.preventDefault();
         submitPasswordButton.click();
      }
   });

   function hasAccessToLink(url) {
      const hasAccess = sessionStorage.getItem(url);
      return hasAccess === "true";
   }

   function showAlert(message) {
      alert.textContent = message;
      alert.classList.remove('d-none');
      setTimeout(function () {
         alert.classList.add('d-none');
      }, 3000);
   }
});
