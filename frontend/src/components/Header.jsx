import logo from '../images/logo.svg';
export default function Header({ children }) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="лого"
            />
            <div className='header__auth'>
                {children}
            </div>
        </header>
    )
}