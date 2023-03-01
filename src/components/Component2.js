import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRownd } from '@rownd/react';

function Component2() {
  const {is_authenitcated, user} = useRownd();
  const [questionObject, setQuestionObject] = useState({});
  const [answersArray, setAnswersArray] = useState([]);
  const [toNextQuestion, seToNextQuestion] = useState(false);
  const [challengeBucket, setChallengeBucket] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState(8);

  useEffect(()=>{
    let qObj = {
      questionItself: 1,
      questionArray:[
      {
        qName: 'Option 1',
        selectStatus: false
      },{
        qName: 'Option 2',
        selectStatus: false
      },{
        qName: 'Option 3',
        selectStatus: false
      },{
        qName: 'Option 4',
        selectStatus: false
      },
    ]};
    
    setQuestionObject({...qObj});
  }, []);

  const selectAnswerHandler = (i) => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;
    let aArr = answersArray;

    if(qObj.questionItself < numOfQuestions){
      qArr[i].selectStatus = true;

      let x = 0;

      while(x < qArr.length){
        if(x !== i){
          qArr[x].selectStatus = false;
        }

        x++;
      }

      qObj.questionArray = qArr;

      let aObj = {
        questionItself: qObj.questionItself,
        answer: i + 1
      };

      aArr[qObj.questionItself - 1] = aObj;

      setAnswersArray([...aArr]);
      setQuestionObject({...qObj});
      seToNextQuestion(true);
    }
  } 

  const nextHandler = () => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;
    let aArr = answersArray;

    if(qObj.questionItself === aArr.length){
      qObj.questionItself++;
      let x = 0;

      while(x < qArr.length){
        qArr[x].selectStatus = false;
        x++;
      }

      setQuestionObject({...qObj});
      seToNextQuestion(false);
    }else{
      qObj.questionItself++;

      let gotNum = aArr[qObj.questionItself - 1].answer - 1;

      qArr[gotNum].selectStatus = true;

      let x = 0;

      while(x < qArr.length){
        if(x !== gotNum){
          qArr[x].selectStatus = false;
        }

        x++;
      }

      qObj.questionArray = qArr;

      setQuestionObject({...qObj});
      seToNextQuestion(true);
    }
  }

  const backHandler = () => {
    let qObj = questionObject;
    let qArr = questionObject.questionArray;
    let aArr = answersArray;

    if(qObj.questionItself > 1){
      qObj.questionItself--;

      let gotNum = aArr[qObj.questionItself - 1].answer - 1;

      qArr[gotNum].selectStatus = true;

      let x = 0;

      while(x < qArr.length){
        if(x !== gotNum){
          qArr[x].selectStatus = false;
        }

        x++;
      }

      qObj.questionArray = qArr;

      setQuestionObject({...qObj});
      seToNextQuestion(true);
    }
  }

  const calculateChallengeBucket = () =>{
    let aArr = answersArray;

    console.log(aArr);

    let sum = 0;

    aArr.forEach(i => {
      sum += (i.answer * 25);
    });

    console.log(sum/aArr.length);

    let quo = sum/aArr.length;
    let ans = '';

    if((quo > 0) && (quo <= 25)){
      ans = 'Bucket 1';
    }else if ((quo > 26) && (quo <= 50)){
      ans = 'Bucket 2';
    }else if ((quo > 51) && (quo <= 75)){
      ans = 'Bucket 3';
    }else{
      ans = 'Bucket 4';
    }

    console.log(ans);

    let chalBuck = {
      arrName: ans,
      arr: [
      {
          id: 1,
          taskName:'task1'
      },
      {
          id: 2,
          taskName:'task2'
      },
      {
          id: 3,
          taskName:'task3'
      },
      {
          id: 4,
          taskName:'task4'
      },
      {
          id: 5,
          taskName:'task5'
      },
      {
          id: 6,
          taskName:'task6'
      },
      {
          id: 7,
          taskName:'task7'
      },
      {
          id: 8,
          taskName:'task8'
      },
      {
          id: 9,
          taskName:'task9'
      }
  ]};

    let obj = {
      incrementCounter: 0,
      continousTimer: -1,
      dayTasks: [
            {
                day: 1,
                lockStatus: "unlock",
                taskName: ""
            },
            {
                day: 2,
                lockStatus: "locked",
                taskName: ""
            },
            {
                day: 3,
                lockStatus: "locked",
                taskName: ""
            }, 
            {
                day: 4,
                lockStatus: "locked",
                taskName: ""
            },
            {
                day: 5,
                lockStatus: "locked",
                taskName: ""
            },
            {
                day: 6,
                lockStatus: "locked",
                taskName: ""
            },
            {
                day: 7,
                lockStatus: "locked",
                taskName: ""
            }
        ]
    }
    window.rownd.user.setValue('mood', obj);
    window.rownd.user.setValue('referral_code', chalBuck);
  }

  //console.log(challengeBucket);

  return (
    <div className="App">
      <Link to="/">Or Click here to go back to home page</Link>
      {questionObject.questionItself < numOfQuestions?<p>Question {questionObject.questionItself} of {numOfQuestions - 1}: 1 or 2 
      questions per week</p>: null}

      {
        questionObject.questionArray && questionObject.questionItself < numOfQuestions?questionObject.questionArray.map((i, index) => {
          return (
            <div key ={Math.random()}>
              <button onClick={()=>selectAnswerHandler(index)}
                style={i.selectStatus?{backgroundColor: "red"}:{backgroundColor:"grey"}}>
                {i.qName}
              </button>
            </div>
          )
        }):null
      }
      {
        questionObject.questionItself === numOfQuestions?answersArray.map(i =>{
          return (<div key={Math.random()}>
            <p>question{i.questionItself}: {i.answer}</p>
          </div>);
        }):null
      }
      <button onClick={backHandler}>Back</button>
      {questionObject.questionItself < numOfQuestions?<button onClick={nextHandler} 
      disabled={toNextQuestion?false: true}>Next</button>: 
      <button onClick={calculateChallengeBucket}>Submit</button>}
    </div>
  );
}

export default Component2;
