import { useRownd } from '@rownd/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ParamContext() {
  const {is_authenticated, user } = useRownd(); 
  console.log("USER::", user.data, is_authenticated);

  if(user.data.mood !== obj){
    let obj = {
        cam: "jin",
        arr: [
            {
                jam: "cin"
            },
            {
                jam: "cin1"
            },
            {
                jam: "cin2"
            }
        ]
      };
  }

  useEffect(()=>{
    if(is_authenticated){
        window.rownd.user.setValue('first_name', 'PiLLLskjhfn');
        window.rownd.user.setValue('age', 34);
        window.rownd.user.setValue('mood', obj);
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