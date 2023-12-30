export default function PopupWithForm({ name, title, children, isOpen, onClose, btnText, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__edit">
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save" type="submit" id={`${name}-save-button`}>
            {btnText}
          </button>
        </form>
      </div>
    </div>
  )
}