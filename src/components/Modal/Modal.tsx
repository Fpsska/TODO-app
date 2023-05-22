import React, { RefObject } from 'react';

import ReactDom from 'react-dom';

import './modal.scss';

// /. imports

interface propTypes {
    children: JSX.Element;
    isModalVisible: boolean;
    setModalVisibleStatus: (arg: boolean) => void;
    modalRef: RefObject<HTMLDivElement>;
}

// /. interfaces

const Modal: React.FC<propTypes> = props => {
    const { children, isModalVisible, setModalVisibleStatus, modalRef } = props;

    return isModalVisible
        ? ReactDom.createPortal(
              <div
                  className="modal"
                  ref={modalRef}
              >
                  <button
                      className="modal__button modal__button--close"
                      aria-label="close modal"
                      onClick={() => setModalVisibleStatus(false)}
                  >
                      <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.11639 7.99994L2.55833 12.558L3.44222 13.4419L8.00027 8.88382L12.5583 13.4419L13.4422 12.558L8.88416 7.99994L13.4422 3.44188L12.5583 2.558L8.00027 7.11605L3.44222 2.558L2.55833 3.44188L7.11639 7.99994Z"
                              fill=""
                          />
                      </svg>
                  </button>
                  <div className="modal__wrapper">{children}</div>
              </div>,
              document.getElementById('portal') as HTMLElement
          )
        : null;
};

export default Modal;
