var previousDataJson = localStorage.getItem('data-obj');
if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

var $body = document.querySelector('body');

var $form = document.querySelector('.edit-profile-form');
var $avatarImg = document.querySelector('[data-view="edit-profile"] img');
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

function submitProfile(event) {
  event.preventDefault();
  $avatarImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.profile.avatarUrl = $avatarUrlInput.value;
  data.profile.username = $usernameInput.value;
  data.profile.fullName = $fullNameInput.value;
  data.profile.location = $locationInput.value;
  data.profile.bio = $bioTextarea.value;
  dataViewSwap('profile');
  $form.reset();
}

$form.addEventListener('submit', submitProfile);

function createProfile(object) {
  var $contDiv = document.createElement('div');
  $contDiv.className = 'profile-cont';

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

  var $userIcon = document.createElement('i');
  $userIcon.className = 'fas fa-user icon';
  $usernameDiv.appendChild($userIcon);

  var $usernameP = document.createElement('p');
  $usernameP.textContent = object.profile.username;
  $usernameDiv.appendChild($usernameP);

  var $locationDiv = document.createElement('div');
  $locationDiv.className = 'user-detail';
  $detailsDiv.appendChild($locationDiv);

  var $locationIcon = document.createElement('i');
  $locationIcon.className = 'fas fa-map-marker-alt icon';
  $locationDiv.appendChild($locationIcon);

  var $locationP = document.createElement('p');
  $locationP.textContent = object.profile.location;
  $locationDiv.appendChild($locationP);

  var $bioDiv = document.createElement('div');
  $bioDiv.className = 'user-detail';
  $detailsDiv.appendChild($bioDiv);

  var $bioP = document.createElement('p');
  $bioP.textContent = object.profile.bio;
  $bioDiv.appendChild($bioP);

  var $editDiv = document.createElement('div');
  $editDiv.className = 'user-detail';
  $detailsDiv.appendChild($editDiv);

  var $editButton = document.createElement('a');
  $editButton.textContent = 'EDIT PROFILE';
  $editButton.setAttribute('href', '#');
  $editButton.setAttribute('data-view', 'edit-profile');
  $editButton.className = 'button';
  $editDiv.appendChild($editButton);

  return $contDiv;
}

var $profileDataView = document.querySelector('div[data-view="profile"]');

function dataViewSwap(view) {
  var $dataViews = document.querySelectorAll('.view');
  for (var i = 0; i < $dataViews.length; i++) {
    var $currentView = $dataViews[i].getAttribute('data-view');
    if ($currentView === view) {
      if ($currentView === 'profile') {
        var $profileCont = document.querySelector('.profile-cont');
        if ($profileCont) {
          $profileCont.remove();
        }
        $profileDataView.appendChild(createProfile(data));
      } else if ($currentView === 'edit-profile') {
        if (data.profile.avatarUrl) {
          $avatarImg.setAttribute('src', data.profile.avatarUrl);
        }
        $avatarUrlInput.value = data.profile.avatarUrl;
        $usernameInput.value = data.profile.username;
        $fullNameInput.value = data.profile.fullName;
        $locationInput.value = data.profile.location;
        $bioTextarea.value = data.profile.bio;
      } else if ($currentView === 'entries') {
        $entriesUl.textContent = '';
        $searchField.value = data.searchQuery;
        var arraySelection;
        if (!data.searchQuery) {
          arraySelection = data.entries;
        } else {
          arraySelection = data.searchMatchEntries;
        }
        for (var x = arraySelection.length - 1; x >= 0; x--) {
          $entriesUl.appendChild(renderNewEntry(arraySelection[x]));
        }
      }
      $dataViews[i].className = 'view';
    } else {
      $dataViews[i].className = 'view hidden';
    }
  }
  data.view = view;
}

var $entriesUl = document.querySelector('[data-view="entries"] ul');

document.addEventListener('DOMContentLoaded', function (event) {
  if (!data.profile.username) {
    dataViewSwap('edit-profile');
  } else {
    dataViewSwap(data.view);
  }
  if (data.darkMode) {
    $body.className = 'dark-mode';
  }
});

document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return;
  }
  var newDataView = event.target.getAttribute('data-view');
  if (data.profile.username) {
    if (newDataView) {
      dataViewSwap(newDataView);
    }
    if (newDataView === 'edit-entry') {
      editEntryFormPreset(event.target.getAttribute('entry-id'));
    }
  }
});

var $createEntryForm = document.querySelector('.create-entry-form');
var $entryImage = document.querySelector('[data-view="create-entry"] img');
var $entryImageUrlInput = document.querySelector('#entryImageUrl');
var $entryTitleInput = document.querySelector('#title');
var $entryNotesTextarea = document.querySelector('#notes');

function updateEntryImage(event) {
  if (event.target.value === '') {
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $entryImage.setAttribute('src', event.target.value);
  }
}

$entryImageUrlInput.addEventListener('input', updateEntryImage);

function determineEntryId() {
  var newEntryId = 100;
  for (var q = 0; q < data.entries.length; q++) {
    if (data.entries[q].entryId > newEntryId) {
      newEntryId = data.entries[q].entryId;
    }
  }
  newEntryId++;
  return newEntryId;
}

$createEntryForm.addEventListener('submit', function (event) {
  var newEntry = {};
  newEntry.imageUrl = $entryImageUrlInput.value;
  newEntry.title = $entryTitleInput.value;
  newEntry.notes = $entryNotesTextarea.value;
  newEntry.entryId = determineEntryId();
  data.entries.push(newEntry);
  $entriesUl.prepend(renderNewEntry(newEntry));
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $createEntryForm.reset();
  dataViewSwap('entries');
});

function renderNewEntry(entryObj) {
  var $entryLi = document.createElement('li');
  $entryLi.className = 'row';
  $entryLi.setAttribute('entry-id', entryObj.entryId);

  var $entryImageDiv = document.createElement('div');
  $entryImageDiv.className = 'lrg-half padding img-cont';
  $entryLi.appendChild($entryImageDiv);

  var $entryImageEl = document.createElement('img');
  $entryImageEl.setAttribute('src', entryObj.imageUrl);
  $entryImageEl.setAttribute('alt', 'entry image');
  $entryImageEl.className = 'avatar-img';
  $entryImageDiv.appendChild($entryImageEl);

  var $entryDetailsDiv = document.createElement('div');
  $entryDetailsDiv.className = 'lrg-half padding';
  $entryLi.appendChild($entryDetailsDiv);

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = entryObj.title;
  $entryDetailsDiv.appendChild($entryTitle);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entryObj.notes;
  $entryDetailsDiv.appendChild($entryNotes);

  var $entryEditButton = document.createElement('a');
  $entryEditButton.textContent = 'EDIT/DELETE';
  $entryEditButton.className = 'button smaller-button';
  $entryEditButton.setAttribute('data-view', 'edit-entry');
  $entryEditButton.setAttribute('href', '#');
  $entryEditButton.setAttribute('entry-id', entryObj.entryId);
  $entryDetailsDiv.appendChild($entryEditButton);

  return $entryLi;
}

var $editEntryForm = document.querySelector('.edit-entry-form');
var $editEntryImage = document.querySelector('[data-view="edit-entry"] img');
var $entryImageUrlEditInput = document.querySelector('#entryImageUrlEdit');
var $titleEditInput = document.querySelector('#titleEdit');
var $notesEditInput = document.querySelector('#notesEdit');

function editEntryFormPreset(entryId) {
  for (var z = 0; z < data.entries.length; z++) {
    if (data.entries[z].entryId.toString() === entryId) {
      data.currentEntry = data.entries[z];
      data.currentEntryIndex = z;
      break;
    }
  }
  $editEntryImage.setAttribute('src', data.currentEntry.imageUrl);
  $entryImageUrlEditInput.value = data.currentEntry.imageUrl;
  $titleEditInput.value = data.currentEntry.title;
  $notesEditInput.value = data.currentEntry.notes;
}

$editEntryForm.addEventListener('submit', function (event) {
  data.currentEntry.imageUrl = $entryImageUrlEditInput.value;
  data.currentEntry.title = $titleEditInput.value;
  data.currentEntry.notes = $notesEditInput.value;
  clearSearch();
  dataViewSwap('entries');
});

var $entryDeleteButton = document.querySelector('#delete');
var $deleteModalCont = document.querySelector('.delete-modal-cont');

$entryDeleteButton.addEventListener('click', function (event) {
  $deleteModalCont.className = 'delete-modal-cont';
});

var $deleteModal = document.querySelector('.delete-modal');

$deleteModal.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    $deleteModalCont.className = 'delete-modal-cont hidden';
  }
  if (event.target.textContent === 'DELETE') {
    data.entries.splice(data.currentEntryIndex, 1);
    clearSearch();
    dataViewSwap('entries');
  }
});

var $searchForm = document.querySelector('.search-form');
var $searchX = document.querySelector('.search-form i');
var $searchField = document.querySelector('#search-field');

function searchEntries() {
  if ($searchField.value === '') {
    return;
  }
  data.searchMatchEntries = [];
  for (var s = 0; s < data.entries.length; s++) {
    if (data.entries[s].title.toLowerCase().includes($searchField.value.toLowerCase()) || data.entries[s].notes.toLowerCase().includes($searchField.value.toLowerCase())) {
      data.searchMatchEntries.push(data.entries[s]);
    }
  }
  data.searchQuery = $searchField.value;
  dataViewSwap('entries');
}

$searchForm.addEventListener('submit', searchEntries);

function clearSearch() {
  data.searchMatchEntries = [];
  data.searchQuery = '';
  $searchForm.reset();
}

$searchX.addEventListener('click', function (event) {
  clearSearch();
  dataViewSwap('entries');
});

var $darkModeButton = document.querySelector('#dark-mode-button');

function toggleDarkMode() {
  if (data.darkMode) {
    $body.className = '';
  } else {
    $body.className = 'dark-mode';
  }
  data.darkMode = !data.darkMode;
}

$darkModeButton.addEventListener('click', toggleDarkMode);

window.addEventListener('beforeunload', function (event) {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data-obj', dataJson);
});
