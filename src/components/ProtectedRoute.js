import { useRownd } from '@rownd/react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const {is_authenticated} = useRownd();

    if (!is_authenticated) {
      return <Navigate to="/" replace />;
    }
  
    return props.children;
};

export default ProtectedRoute;