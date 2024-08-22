import React, { useEffect, useState} from 'react'
import { useWorkoutContext } from "../hooks/useWorkoutContext"

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workout, dispatch } = useWorkoutContext();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`https://mernappbackend-production-e9cc.up.railway.app/api/workout?page=${page}&limit=6`)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SET_WORKOUTS', payload: data.workouts });
                setTotalPages(data.totalPages); // Set total pages for pagination
            })
            .catch(error => console.error(error));
    }, [page]); // Refetch data when page changes
    return (
      <div className='home'>
          <div className='workouts'>
              {workout && workout.map((workout) => (
                  <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>
          <div className='workout-form'>
              <WorkoutForm />
          </div>
          <div className='pagination'>
              <button 
                  onClick={() => setPage(page => Math.max(page - 1, 1))} 
                  disabled={page === 1}
              >
                  Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button 
                  onClick={() => setPage(page => Math.min(page + 1, totalPages))} 
                  disabled={page === totalPages}
              >
                  Next
              </button>
          </div>
      </div>
  );
}

export default Home
