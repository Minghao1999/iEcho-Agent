// Header.jsx

import { MdOutlineGroup } from 'react-icons/md';
import { SlSettings } from 'react-icons/sl';

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src="" alt="" />
      <div className="additional">
        <MdOutlineGroup className="icon" />
        <SlSettings className="icon" />
      </div>
    </div>
  );
}

export default Header;
