import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="dropdown-container">
      <div className="action" onClick={toggleDropdown}>
        <BsThreeDotsVertical color='red' />
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <div className="option" onClick={() => handleOptionClick('Auto')}>
            Auto
          </div>
          <div className="option" onClick={() => handleOptionClick('Manually')}>
            Manually
          </div>
        </div>
      )}
      <div className="selected-option">{selectedOption}</div>
    </div>
  );
};

export default Dropdown;
