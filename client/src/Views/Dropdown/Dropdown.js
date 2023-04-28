import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {selectedOption}
        <i className={`fas fa-caret-${isOpen ? 'up' : 'down'}`} />
      </div>
      <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((option) => (
          <li key={option} onClick={() => selectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;