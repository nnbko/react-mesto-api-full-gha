import React from "react";
import PopupWithForm from './PopupWithForm';



export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="avatar"
            btnText="Сохранить"
            title="Обновить аватар">
            <input
                className="popup__holder popup__holder_input_src"
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                id="avatar"
                ref={avatarRef}
                required
            />
            <span className="popup__input-error avatar-error" />
        </PopupWithForm>
    )
}