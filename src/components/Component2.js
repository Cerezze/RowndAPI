import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRownd } from '@rownd/react';

function Component2() {
  return (
    <div>
      <Link to="/">App</Link>
      <p>Component2</p>
    </div>
  );
}

export default Component2;
