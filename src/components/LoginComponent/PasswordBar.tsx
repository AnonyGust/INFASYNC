import React, { useState } from 'react';

type PasswordBarProps = {
  password: string;
}

const PasswordBar: React.FC<PasswordBarProps> = ({ password }) => {
  const [barColor, setBarColor] = useState('');
  const [barWidth, setBarWidth] = useState('0%');

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }
    return strength;
  }

  const updateBar = (password: string) => {
    const strength = calculatePasswordStrength(password);
    switch (strength) {
      case 1:
        setBarColor('red');
        setBarWidth('33%');
        break;
      case 2:
        setBarColor('orange');
        setBarWidth('66%');
        break;
      case 3:
      case 4:
        setBarColor('green');
        setBarWidth('100%');
        break;
      default:
        setBarColor('');
        setBarWidth('0%');
    }
  }

  React.useEffect(() => {
    updateBar(password);
  }, [password]);

  return (
    <div className="password-bar-container">
      <div className="password-bar" style={{ backgroundColor: barColor, width: barWidth }} />
    </div>
  );
}

export default PasswordBar;
