import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import './accordian.scss';

const Accordion = props => {
  const [setActive, setActiveState] = useState('');
  const [setRotate, setRotateState] = useState('accordion__icon');

  const content = useRef(null);

  const toggleAccordion = e => {
    e.preventDefault();
    e.stopPropagation();
    setActiveState(setActive === '' ? 'active' : '');
    setRotateState(
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
    );
  };

  const accordionBtnClassNames = classnames('accordion', { active: setActive });
  const accordionContentClassNames = classnames('accordion__content', {
    active: setActive,
  });

  return (
    <div className="accordion__section">
      <button className={accordionBtnClassNames}>
        <p className="accordion__title">{props.title}</p>
        {props.icon && (
          <img
            onClick={toggleAccordion}
            src={props.icon}
            alt={props.title}
            className={`${setRotate}`}
            width={25}
          />
        )}
      </button>
      <div ref={content} className={accordionContentClassNames}>
        <div className="accordion__text">{props.children}</div>
      </div>
    </div>
  );
};

export default Accordion;
