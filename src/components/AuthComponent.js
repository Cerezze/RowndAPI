import { useRownd } from '@rownd/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SignInOrLogIn() {

  const { is_authenticated, requestSignIn } = useRownd(); 

  useEffect(() => {
    if (!is_authenticated) {
      requestSignIn();
    }
  }, [is_authenticated]);

  return (
    <div>
      <h3>Please reload this page or Sign In using the bottom left tab</h3>
      <Link to="/">Or Click here to go back to home page</Link>
    </div>
  );
}

export default SignInOrLogIn;
