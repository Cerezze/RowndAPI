import { useEffect, useState } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { useRownd } from '@rownd/react';

function App() {
  const { is_authenticated, signOut, user } = useRownd(); 

  const SignOutHandler = () => {
    signOut();
  }

  console.log(user.data);

  return (
    <div>
      <Link to="/component1">Component1</Link>
      {is_authenticated?<Link to="/component2">Component2</Link>:null}
      {is_authenticated?<Link to="/component3">Component3</Link>:null}
      <Link to="/usertest">TEST</Link>
      {is_authenticated?<p onClick={SignOutHandler}>SignOut</p>: <Link to="/authcomponent">Login</Link>}
      <p>App</p>
    </div>
  );
}

export default App;
