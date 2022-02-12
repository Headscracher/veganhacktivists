import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Newsletter from './newsletter';
import { useCookies } from 'react-cookie';

const NewsletterPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['newsletter']);

  useEffect(() => {
    const userHasSignedUp = cookies['newsletter'];

    let timeoutHandle: NodeJS.Timeout;
    if (userHasSignedUp === undefined) {
      timeoutHandle = setTimeout(() => {
        setOpen(true);
      }, 60 * 1000);
    }

    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, []);

  if (cookies['newsletter'] !== undefined) {
    return null;
  }

  const onChange = (signedUp: boolean) => {
    setOpen(false);
    setCookies('newsletter', signedUp, {
      path: '/',
      sameSite: 'strict',
      maxAge: signedUp ? 60 * 60 * 24 * 360 * 10 : 60 * 60 * 24 * 14, // 10 years or 2 weeks
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onChange(false);
      }}
    >
      <Newsletter onChange={onChange} showCancelButton />
    </Modal>
  );
};

export default NewsletterPopup;
