import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRownd } from '@rownd/react';

function Component1() {

  return (
    <div>
      <Link to="/">App</Link>
      <p>Component1</p>
    </div>
  );
}

export default Component1;
