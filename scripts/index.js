let editLink = document.querySelector(".button-edit");
let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__close");
let popupOverlay = popup.querySelector(".popup__overlay");
let formElement = document.querySelector(".popup__content");
let nameInput = document.querySelector(".popup__input_type_name");
let descriptionInput = document.querySelector(".popup__input_type_description");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let submit = document.querySelector(".popup__button_type_save");

function open() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function close() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    close();
}

editLink.addEventListener('click', open);
popupCloseButton.addEventListener('click', close);
popupOverlay.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler);