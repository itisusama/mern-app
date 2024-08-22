import React, { useEffect} from 'react'
import { useWorkoutContext } from "../hooks/useWorkoutContext"

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workout, dispatch } = useWorkoutContext()
    useEffect(()=>{
        fetch('http://localhost:3001/api/workout').then(response => response.json())
        .then(data => dispatch({type: 'SET_WORKOUTS', payload: data}))
        .catch(error => console.error(error))
    }, [])
  return (
    <div className='home'>
      <div className='workouts'>
        {
          workout && workout.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>
          ))
        }
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
