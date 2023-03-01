import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRownd } from '@rownd/react';

/* THE CURRENT STATE OF THIS COMPONENT

This component needs to be rewritten so that it interacts with Rownd Auth. The problem here is that
Rownd is Asynchronous in nature where as the native storage functions are Synchronous. I reccomend
trying to find a way set all values into the Rownd object once the user is done with the component
interactions. I was trying to use the useEffect CleanUp function.*/

function Component2() {
  const {is_authenticated, user} = useRownd();
  const [u, setUser] = useState({});
  const [cb, setChallengeBucket] = useState({});
  const [dayTasks, setDayTasks] = useState([]);
  const [cBL, setChallengeBucketLength] = useState(0);
  const [time, setTime] = useState();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(()=>{
    if(user.data.mood !== null && user.data.referral_code !== null){
      setUser({...user.data.mood});
      setChallengeBucket({...user.data.referral_code});
      setDayTasks([...user.data.mood.dayTasks]);
      setChallengeBucketLength(user.data.referral_code.arr.length);
    }
    const interval = setInterval(() => {
        var now = new Date().getTime();
        var distance = user.data.mood.continousTimer - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(distance < 0){
          setTimer();
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
        }else{
          setDays(days);
          setHours(hours);
          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return ()=> clearInterval(interval);
  }, [time]);

  //this function sets the timer. It is called above in set Interval.
  //this function will run the unlockNextDay function for each interval of time
    const setTimer = () =>{
    let uO = user.data.mood;
    let newTime = +new Date + 10000;
    uO.continousTimer = newTime;
    window.rownd.user.setValue('mood', uO);
    setTime(newTime);
    //unlockNextDay(JSON.parse(localStorage.getItem('user')).challengeOneDays.incrementCounter);
    unlockNextDay(user.data.mood.incrementCounter);
  }

  //gets one random task from the challenge bucket.
  //because this method mutates the challenge Bucket, therefore it is required to be copied
  //and related to a user.
  const getOneRandomTask = (i) =>{
      let chalBuck = cb.arr;
      let randomNumber = Math.floor(Math.random() * 6);
      let uO = u;
      let filteredArr = chalBuck.filter((i, index)=>{
        return index === randomNumber;
      });

      uO.dayTasks[i].taskName = filteredArr[0].taskName;
      uO.dayTasks[i].lockStatus = 'active';

      //localStorage.setItem('user', JSON.stringify(user));
      window.rownd.user.setValue('mood', uO);
      setDayTasks([...uO.dayTasks]);
     
      const firstArr = chalBuck.slice(0, chalBuck.indexOf(chalBuck[randomNumber]));
      const secondArr = chalBuck.slice(chalBuck.indexOf(chalBuck[randomNumber]) + 1);
      chalBuck = [...firstArr, ...secondArr];

      let cbObj = user.data.referral_code;

      cbObj.arr = chalBuck;

      //localStorage.setItem("challengeBucket", JSON.stringify(chalBuck));
      window.rownd.user.setValue('referral_code', cbObj);

      setChallengeBucket(cbObj);
      setChallengeBucketLength(prevState => prevState - 1);
  }

  //runs onClick to finish a task
  const finishTaskHandler = (i) =>{
    let uO = u;

    uO.dayTasks[i].lockStatus = 'Finished';
    window.rownd.user.setValue('mood', uO);
    setDayTasks([...uO.dayTasks]);
  }

  // function to unlock the next day and make it active
  const unlockNextDay = (i) =>{
    let uO = user.data.mood;
    uO.dayTasks[i].lockStatus = 'unlock';
    i++;
    uO.incrementCounter = i;
    window.rownd.user.setValue('mood', uO);
    setDayTasks([...uO.dayTasks]);
  }

  return (
    <div>
      {/*<button onClick = {() =>unlockNextDay(increment)}>unlockNextDay</button>*/}
      {dayTasks.map(i => {
        return (
          <div key={Math.random()}>
            <span>
             Day {i.day}
            </span>
            <button onClick={()=>getOneRandomTask(i.day - 1)} 
            disabled = {i.lockStatus === "locked" || 
            i.lockStatus === "active" || 
            i.lockStatus === "Finished"?true: false}>
             {i.lockStatus}
            </button>
            <span>
             {i.taskName}
            </span>
            {i.taskName !== '' && i.lockStatus !== 'Finished'? <button onClick = {()=>finishTaskHandler(i.day - 1)}>Finish</button> : null}
          </div>
        )
      })}
      {days+" "+hours+" "+minutes+" "+seconds}
      {/*<button onClick={setTimer}>Set Timer</button>*/}
    </div>
  );
}

export default Component2;
