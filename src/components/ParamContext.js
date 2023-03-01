import { useRownd } from '@rownd/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ParamContext() {
  const {is_authenticated, user } = useRownd(); 
  console.log("USER::", user.data, is_authenticated);

  //This component is to set inital values in Rownd
  // Do not set anything here that is supposed to change 
  // without user intervention

  useEffect(()=>{
    if(is_authenticated){
        window.rownd.user.setValue('first_name', 'PiLLLskjhfn');
        window.rownd.user.setValue('age', 34);
    }
  }, [is_authenticated]);
  
  return (
    <div>
      <Link to="/">Or Click here to go back to home page</Link>
      <p>Check the API STORE</p>
    </div>
  );
}

export default ParamContext;