import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import {getCookie, setCookie} from '../../utils/cookies';
import CloseIcon from '../icons/Close';
const url = `https://intoarchive.us10.list-manage.com/subscribe/post?u=9bd39516fc90953444187ec01&amp;id=28f3b05610&amp;f_id=0053c8e5f0`;

const CustomForm = ({status, message, onValidated}: any) => {
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    email.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  useEffect(() => {
    if (status === 'success') {
      clearFields();
      setCookie('newsletter', 'hidden');
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    if (getCookie('newsletter') !== 'hidden') {
      setTimeout(() => {
        setShow(true);
      }, 4000);
    }
  }, []);

  const clearFields = () => {
    setEmail('');
  };

  const onClose = () => {
    setCookie('newsletter', 'hidden');
    setShow(false);
  };

  return (
    <div
      className={clsx(
        'fixed bottom-0 right-0  z-40 transition-all duration-500',
        show ? 'translate-x-none' : 'translate-x-full',
      )}
    >
      <div className=" m-3">
        <div
          className={clsx(
            'relative w-full max-w-md rounded-md bg-theme p-6 text-white',
          )}
        >
          {status !== 'success' && (
            <button className="absolute right-0 top-0 p-3" onClick={onClose}>
              <CloseIcon fill="white" />
            </button>
          )}
          <form
            className={clsx('relative  w-full  text-white')}
            onSubmit={(e) => handleSubmit(e)}
          >
            {status !== 'success' ? (
              <h3 className="mb-2 text-lg">INTO Updates?</h3>
            ) : (
              <h3 className="text-lg">THANK YOU FOR SUBSCRIBING!</h3>
            )}
            {status !== 'success' && (
              <p>Sign up today and get 10% off your next order!</p>
            )}

            {status === 'error' && (
              <div
                className="my-2"
                dangerouslySetInnerHTML={{__html: message}}
              />
            )}
            {/* {status === 'success' && (
        <div
          className="mc__alert mc__alert--success"
          dangerouslySetInnerHTML={{__html: message}}
        />
      )} */}

            {status !== 'success' ? (
              <div className="mt-6 flex gap-3">
                <div className="flex-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    className="h-full w-full rounded-sm border border-b border-white border-opacity-20 bg-transparent p-2 text-white transition-all placeholder:text-white hover:border-opacity-100 focus:border-opacity-100 focus:outline-none"
                    placeholder="your@email.com"
                    required
                    autoFocus
                  />
                </div>

                {/*Close button appears if form was successfully sent*/}

                {status !== 'sending' ? (
                  <button
                    type="submit"
                    className="btn-primary"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                ) : (
                  <button type="submit" className="btn-secondary" disabled>
                    Sending
                  </button>
                )}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

const MailchimpForm = () => {
  return (
    <div className="mc__form-container">
      <MailchimpSubscribe
        url={url}
        render={({subscribe, status, message}) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default function Newsletter() {
  return <MailchimpForm />;
}
