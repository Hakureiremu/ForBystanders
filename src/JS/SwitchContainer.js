import React from 'react';

const SwitchContainer = ({ showSignUp, toggleForm }) => {
  return (
    <div className="switch" id="switch-cnt">
      <div className="switch__circle"></div>
      <div className="switch__circle switch__circle--t"></div>
      {showSignUp ? (
        <div className="switch__container" id="switch-c1">
          <h2 className="switch__title title">Welcome Back !</h2>
          <p className="switch__description description">To keep connected with us please login with your personal info</p>
          <button className="switch__button button switch-btn" onClick={toggleForm}>
            SIGN IN
          </button>
        </div>
      ) : (
        <div className="switch__container" id="switch-c2">
          <h2 className="switch__title title">Hello Friend !</h2>
          <p className="switch__description description">Enter your personal details and start journey with us</p>
          <button className="switch__button button switch-btn" onClick={toggleForm}>
            SIGN UP
          </button>
        </div>
      )}
    </div>
  );
};

export default SwitchContainer;
