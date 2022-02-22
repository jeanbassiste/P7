import '../styles/Header.scss';
import logo from '../assets/icon-left-font-monochrome-white.svg';

function Header() {
    return (
        <div className="header">
          <img src={logo} alt="Groupomania" />
        </div>
          );
}

export default Header