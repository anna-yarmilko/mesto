const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cardContainer = document.querySelector('.elements');
const сardTemplate = document.querySelector('.card-template');
const addLink = document.querySelector(".profile__button-add");
const editLink = document.querySelector(".profile__button-edit");
const profilePopup = document.getElementById('profile');
const place = document.querySelector('.popup__input_type_place');
const link = document.querySelector('.popup__input_type_link');
const closeEditPopup = document.getElementById('close-edit-profile');
const closeAddPopup = document.getElementById('close-add-place');
const closeImagePopup = document.getElementById('close-image');
const imagePopup = document.getElementById('image');
const imageLarge = document.querySelector('.popup__image-large');
const imageSubtitle = document.querySelector('.popup__subtitle');
const placePopup = document.getElementById('place');
const formProfile = document.getElementById('profile-form');
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formPlace = document.getElementById('place-form');
const placeOverlay = document.getElementById('overlay-place');
const imageOverlay = document.getElementById('overlay-image');
const profileOverlay = document.getElementById('overlay-profile');
const placeSaveButton = document.querySelector('.popup__button_type_create');

function render() {
    const html = initialCards
        .map((item, idx, arr) => {
            return getCard(item);
    });

    cardContainer.append(...html);
}

function getCard(item) {
    const newCard = сardTemplate.content.cloneNode(true);

    const titleCard = newCard.querySelector('.element__title');
    titleCard.textContent = item.name;

    const imageCard = newCard.querySelector(".element__image");
    imageCard.alt = item.name;
    imageCard.src = item.link;
    imageCard.addEventListener('click', () => {
        openPopup(imagePopup);
       imageLarge.src = imageCard.src;
       imageSubtitle.textContent = titleCard.textContent;
       imageLarge.alt = imageCard.alt;
    });

    const deleteBtn = newCard.querySelector('.element__delete');
    deleteBtn.addEventListener('click', function removeCard(evt) {
        const targetEl = evt.target;
        const card = targetEl.closest('.element');
        card.remove();
    });

    const likeCard = newCard.querySelector('.element__like');
    likeCard.addEventListener('click', function like() {
        likeCard.classList.toggle("element__like_active");
    });

    return newCard;
}

function openPopup(evt) {
    evt.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(evt) {
    evt.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(profilePopup);
}

function handleCardSubmit (evt) {
    evt.preventDefault(); 
    const inputPlace = place.value;
    const inputImage = link.value;
    const newPlace = getCard({
        name: inputPlace,
        link: inputImage
    });
    cardContainer.prepend(newPlace);
    formPlace.reset();
    placeSaveButton.classList.add('popup__button_disabled');
    placeSaveButton.setAttribute('disabled', true);
    closePopup(placePopup);
}

editLink.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(profilePopup);
});

addLink.addEventListener('click', () => openPopup(placePopup));
formProfile.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handleCardSubmit);
closeEditPopup.addEventListener('click', () => closePopup(profilePopup));
closeAddPopup.addEventListener('click', () => closePopup(placePopup));
closeImagePopup.addEventListener('click', () => closePopup(imagePopup));
profileOverlay.addEventListener('click', () => closePopup(profilePopup));
imageOverlay.addEventListener('click', () => closePopup(imagePopup));
placeOverlay.addEventListener('click', () => closePopup(placePopup));
render();