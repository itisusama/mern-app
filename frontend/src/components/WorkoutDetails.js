import React from 'react'
import { useWorkoutContext } from "../hooks/useWorkoutContext"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext()

  const handleClick = async () =>{
    const response = await fetch("https://mernappbackend-production-e9cc.up.railway.app/api/workout/" + workout._id, {
      method: "DELETE"
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load(KG):</strong> {workout.load} </p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>❌</span>
    </div>
  )
}

export default WorkoutDetails
