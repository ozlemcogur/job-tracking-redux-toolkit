import React, { useEffect } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import  { setError, setJob } from '../redux/jobSlice'
import Loading from '../components/Loading'
import RefreshButton from '../components/RefreshButton'
import Filter from '../components/Filter'


const JobList = () => {
  const dispatch = useDispatch()
  const state = useSelector((store)=>store)
  console.log(state)

  const fetchData=() => {
    axios.get("http://localhost:4000/jobs")
    .then((res)=> dispatch(setJob(res.data)))
    .catch(()=>dispatch(setError()))
  }

  useEffect(()=>{
    fetchData()

  },[])
  return (
    <div className='list-page'>
      <Filter/>
    <h3 className='job-count'>
      Bulunan ({state.jobs.length}) iş arasından ({state.jobs.length}) tane görüntüleniyor
    </h3>
    <section className='job-list'>
      {!state.initialized && <Loading/>}
      {state.initialized && !state.isError ? 
      (
        state.jobs.map((job)=><Card key={job.id} job= {job} />)
        )
        :<div className='error-msg'><span>Üzgünüz bir hata oluştu </span><RefreshButton handleClick = {()=>fetchData()}/> </div> }
    </section>

      
    </div>
  )
}

export default JobList
