var $form = document.querySelector('form');
var $avatarImg = document.querySelector('img');
var $avatarUrlInput = document.querySelector('#avatarUrl');
var $usernameInput = document.querySelector('#username');
var $fullNameInput = document.querySelector('#fullName');
var $locationInput = document.querySelector('#location');
var $bioTextarea = document.querySelector('#bio');

function updateAvatar(event) {
  if ($avatarUrlInput.value === '') {
    $avatarImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $avatarImg.setAttribute('src', event.target.value);
  }
}

$avatarUrlInput.addEventListener('input', updateAvatar);

function submit(event) {
  event.preventDefault();
  $avatarImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.profile.avatarUrl = $avatarUrlInput.value;
  data.profile.username = $usernameInput.value;
  data.profile.fullName = $fullNameInput.value;
  data.profile.location = $locationInput.value;
  data.profile.bio = $bioTextarea.value;
  for (var key in data.profile) {
    localStorage.setItem(key, data.profile[key]);
  }
  $form.reset();
}

$form.addEventListener('submit', submit);
