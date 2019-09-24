import React from 'react';
import ButtonUI from '@material-ui/core/Button';
import TicketIcon from '../../resources/images/icons/ticket.png';

const Button = ({ text, bgc, color, link }) => {
  return (
    <ButtonUI
      href={link}
      variant="contained"
      size="small"
      style={{
        background: bgc,
        color
      }}
    >
      <img
        src={TicketIcon}
        className="iconImage"
        alt="icon_button"
      ></img>
      {text}
    </ButtonUI>
  );
}

export default Button;