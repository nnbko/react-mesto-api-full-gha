import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';



export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        if(currentUser){
        setName(currentUser.name);
        setDescription(currentUser.about);}
    }, [currentUser,isOpen]);

    const handleNameChange = e => {
        setName(e.target.value);
    };

    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name="profile"
            onSubmit={handleSubmit}
            btnText="Сохранить"
            title="Редактировать профиль"
        >
            <input
                className="popup__holder popup__holder_name_text"
                type="text"
                name="name"
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                id="profile"
                onChange={handleNameChange}
                value={name || ""}
                required
            />
            <span className="popup__input-error profile-error" />
            <input
                className="popup__holder popup__holder_job_text"
                type="text"
                name="about"
                id="about"
                placeholder="Описание"
                minLength={2}
                maxLength={200}
                onChange={handleDescriptionChange}
                value={description || ""}
                required
            />
            <span className="popup__input-error description-error" />
        </PopupWithForm>


    )
}