var table = document.querySelector(".schedule__table");
var popup = document.querySelector(".modal-login");
var close = popup.querySelector(".modal__close");
var form = popup.querySelector("form");
var schedule = popup.querySelector("[name=schedule]");
var date = popup.querySelector("[name=date]");
var login = popup.querySelector("[name=login]");
var email = popup.querySelector("[name=email]");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

table.addEventListener('click', function (evt) {
  var target = evt.target;
  var tr = target.closest('tr');
  var td = target.closest('td')
  var order = tr.querySelector('td:last-child');
  var scheduleTd = tr.querySelector('td:first-child').textContent;
  var dateTd = tr.querySelector('td:nth-child(2)').textContent;
  if (target === order) {
    popup.classList.add("modal-show");
    schedule.value = scheduleTd;
    date.value = dateTd;
  } else if (!td) {
    return;
  }
  if (storage) {
    login.value = storage;
    email.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !email.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});
