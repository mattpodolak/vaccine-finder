import { Info } from '@/atoms/Info';
import { useState, createRef } from 'react';
import { createPopper } from '@popperjs/core';

export const Pill = ({ text, infoText }) => {
  const [tooltip, setTooltip] = useState(false);
  const btnRef = createRef();
  const tooltipRef = createRef();

  const openTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: 'bottom',
    });
    setTooltip(true);
  };

  const closeTooltip = () => {
    setTooltip(false);
  };
  return (
    <div className="flex items-center mt-2 w-max" ref={btnRef}>
      <div
        className={
          (infoText ? 'cursor-pointer ' : '') +
          'px-2 py-1 flex items-center justify-center w-max rounded-xl bg-blue-300 text-gray-50'
        }
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
      >
        <div className="flex col justify-center">
          <span className="text-sm leading-none">{text}</span>
        </div>
        {/* <div className={infoText ? 'ml-1' : 'hidden'}>
          <Info tw_color="text-white" w={4} h={4} />
        </div> */}
      </div>
      <div
        className={
          (tooltip && infoText ? '' : 'hidden ') +
          'bg-one-normal text-white text-sm leading-none px-2 py-1 ml-3 rounded-sm'
        }
        role="tooltip"
        id="tooltip"
        ref={tooltipRef}
      >
        {infoText}
        <div id="arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};
