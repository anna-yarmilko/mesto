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
}

function closePopup(evt) {
    evt.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
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
    place.value = '';
    link.value = '';
    closePopup(placePopup);
}

editLink.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(profilePopup);
});

addLink.addEventListener('click', () => openPopup(placePopup));
closeEditPopup.addEventListener('click', () => closePopup(profilePopup));
closeAddPopup.addEventListener('click', () => closePopup(placePopup));
closeImagePopup.addEventListener('click', () => closePopup(imagePopup));
formProfile.addEventListener('submit', handleFormSubmit);
formPlace.addEventListener('submit', handleCardSubmit);
render();