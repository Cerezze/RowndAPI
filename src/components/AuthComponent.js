import { useRownd } from '@rownd/react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SignInOrLogIn() {
  const { user, is_authenticated, requestSignIn } = useRownd(); 
  
  useEffect(() => {
    if (!is_authenticated) {
      requestSignIn();
    }
  }, [is_authenticated]);

  return (
    <div>
      <h3>Please reload this page or Sign In using the bottom left tab</h3>
      <Link to="/">Or Click here to go back to home page</Link>
      <p>----------------------------------------------------------------</p>
      <Navigate replace to="/usertest"/>
    </div>
  );
}

export default SignInOrLogIn;
