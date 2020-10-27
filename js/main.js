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

function createProfile(object) {
  var $contDiv = document.createElement('div');

  var $row1 = document.createElement('div');
  $row1.className = 'row padding';
  $contDiv.appendChild($row1);

  var $h1 = document.createElement('h1');
  $h1.textContent = object.profile.fullName;
  $row1.appendChild($h1);

  var $row2 = document.createElement('div');
  $row2.className = 'row';
  $contDiv.appendChild($row2);

  var $avatarDiv = document.createElement('div');
  $avatarDiv.className = 'lrg-half padding img-cont';
  $row2.appendChild($avatarDiv);

  var $avatar = document.createElement('img');
  $avatar.setAttribute('src', object.profile.avatarUrl);
  $avatar.className = 'avatar-img';
  $avatarDiv.appendChild($avatar);

  var $detailsDiv = document.createElement('div');
  $detailsDiv.className = 'lrg-half padding';
  $row2.appendChild($detailsDiv);

  var $usernameDiv = document.createElement('div');
  $usernameDiv.className = 'user-detail';
  $detailsDiv.appendChild($usernameDiv);

  var $userIcon = document.createElement('img');
  $userIcon.setAttribute('src', 'images/user.svg');
  $userIcon.setAttribute('alt', 'User icon');
  $userIcon.className = 'icon';
  $usernameDiv.appendChild($userIcon);

  var $usernameP = document.createElement('p');
  $usernameP.textContent = object.profile.username;
  $usernameDiv.appendChild($usernameP);

  var $locationDiv = document.createElement('div');
  $locationDiv.className = 'user-detail';
  $detailsDiv.appendChild($locationDiv);

  var $locationIcon = document.createElement('img');
  $locationIcon.setAttribute('src', 'images/pin.svg');
  $locationIcon.setAttribute('alt', 'Pin icon');
  $locationIcon.className = 'icon';
  $locationDiv.appendChild($locationIcon);

  var $locationP = document.createElement('p');
  $locationP.textContent = object.profile.location;
  $locationDiv.appendChild($locationP);

  var $bioDiv = document.createElement('div');
  $detailsDiv.appendChild($bioDiv);

  var $bioP = document.createElement('p');
  $bioP.textContent = object.profile.bio;
  $bioDiv.appendChild($bioP);

  return $contDiv;
}

function dataViewSwap(view) {
  var $dataViews = document.querySelectorAll('.view');
  for (var i = 0; i < $dataViews.length; i++) {
    var $currentView = $dataViews[i].getAttribute('data-view');
    if ($currentView === view) {
      $dataViews[i].hidden = false;
    } else {
      $dataViews[i].hidden = true;
    }
  }
}
