var avatarUrlInput = document.querySelector('#avatarUrl');
var avatarImg = document.querySelector('img');

function updateAvatar(event) {
  if (avatarUrlInput.value === '') {
    avatarImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    avatarImg.setAttribute('src', event.target.value);
  }
}

avatarUrlInput.addEventListener('input', updateAvatar);
