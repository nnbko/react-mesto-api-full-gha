
const InfoTooltip = ({ isOpen, onClose, src, text }) => {
    return (
        <div className={`popup ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__edit popup__container">
                <button className="popup__close" type="button" onClick={onClose} />
                <img src={src} alt={text} className="popup__image popup__tool" />
                <p className="popup__text">{text}</p>
            </div>
        </div>
    );
}
export default InfoTooltip;