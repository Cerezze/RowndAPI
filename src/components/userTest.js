import { useRownd } from '@rownd/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTest() {
//const { user, requestSignIn } = useRownd(); 

  console.log("USER::", rownd.user);

  rownd.user.setValue('first_name', 'Alice');
  

  return (
    <div>
      <h3>ERROR HERE</h3>
      <Link to="/">Or Click here to go back to home page</Link>
    </div>
  );
}

export default UserTest;