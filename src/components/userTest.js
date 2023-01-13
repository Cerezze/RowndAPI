import { useRownd } from '@rownd/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTest() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [clicked, setclicked] = useState(false);
  const { user, requestSignIn } = useRownd(); 

  //console.log("USER::", window.rownd.user);

  const numberHandler = (e) =>{
    e.preventDefault();
    setPhoneNumber(e.target.value);
  }

  const nameHandler = (e) =>{
    e.preventDefault();
    setFirstName(e.target.value);
  }

  const clickHandler = () =>{
    if(firstName != null){
      setclicked(true);
    }
  }

  useEffect(()=>{
    if (clicked == true) {
      window.rownd.user.setValue('first_name', firstName);
    }
  }, []);
  
  return (
    <div>
      <Link to="/">Or Click here to go back to home page</Link>
      <input onChange = {nameHandler} value={firstName}/>
      <button onClick={clickHandler}>Click To finish with Email</button>
    </div>
  );
}

export default UserTest;