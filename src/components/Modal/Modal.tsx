// import classNames from 'classnames/bind';
// import CloseIcon from '@mui/icons-material/Close';

// import Styles from './Modal.module.scss';

// const cx = classNames.bind(Styles);

// const Modal = ({ setCloseModal }: { setCloseModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
//   const closeModal = (event) => {
//     event.stopPropagation();
//     setCloseModal(false);
//   };

//   return (
//     <>
//       <div onClick={closeModal} className={cx('overlay')} />
//       <div className={cx('modal')}>
//         <div className={cx('close-button')} onClick={closeModal}>
//           <CloseIcon />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Modal;

import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';

import Styles from './Modal.module.scss';

import Button from 'src/components/Button/Button';

interface ButtonItem {
  title: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: React.CSSProperties;
  variant: 'primary' | 'secondary' | 'terthiary';
  isDisabled?: boolean;
}

interface ModalProps {
  modalTitle: string;
  children: React.ReactNode;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  buttons?: ButtonItem[];
}

const cx = classNames.bind(Styles);

const Modal = ({ modalTitle, children, setCloseModal, buttons }: ModalProps): JSX.Element => {
  const closeModal = (event) => {
    event.stopPropagation();
    setCloseModal(false);
  };

  return (
    <>
      <div onClick={closeModal} className={cx('overlay')} />
      <div className={cx('content-container')}>
        <div className={cx('content-header')}>
          <div className={cx('content-header-title')}>{modalTitle}</div>
          <div className={cx('close-button')} onClick={closeModal}>
            <CloseIcon />
          </div>
        </div>
        <div className={cx('content-header-divider')} />
        <div className={cx('content')}>{children}</div>
        <div className={cx('content-buttons')}>
          {buttons?.map((item) => (
            <Button
              key={item.title}
              type={item.type}
              style={item.style}
              variant={item.variant}
              handleClick={item.handleClick}
              isDisabled={item.isDisabled}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modal;
