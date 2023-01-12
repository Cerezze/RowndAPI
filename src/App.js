import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRownd } from '@rownd/react';

function App() {
  const { is_authenticated, signOut } = useRownd(); 

  const SignOutHandler = () => {
    signOut();
  }

  return (
    <div>
      <Link to="/component1">Component1</Link>
      {is_authenticated?<Link to="/component2">Component2</Link>:null}
      <Link to="/usertest">TEST</Link>
      {is_authenticated?<p onClick={SignOutHandler}>SignOut</p>: <Link to="/authcomponent">Login</Link>}
      <p>App</p>
    </div>
  );
}

export default App;
