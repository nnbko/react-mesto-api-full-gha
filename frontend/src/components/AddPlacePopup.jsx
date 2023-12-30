import React from "react";
import PopupWithForm from './PopupWithForm';



export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);


  const handleAddName = e => {
    setName(e.target.value);
  }

  const handleAddLink = e => {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="Addplace"
      btnText="Создать"
      title="Новое место">
      <input
        className="popup__holder popup__holder_input_name"
        type="text"
        name="name"
        placeholder="Название"
        id="input-img-title"
        minLength={2}
        maxLength={30}
        onChange={handleAddName}
        value={ name || ""}
        required
      />
      <span className="popup__input-error input-img-title-error" />
      <input
        className="popup__holder popup__holder_input_src"
        type="url"
        name="link"
        placeholder="Ссылка"
        id="input-link"
        onChange={handleAddLink}
        value={ link || ""}
        required
      />
      <span className="popup__input-error input-link-error" />
    </PopupWithForm>
  )
}