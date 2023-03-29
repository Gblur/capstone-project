import React, { useState } from 'react'
import Canvas from '../../components/Canvas'
import 'reactflow/dist/style.css';
import { useRouter } from 'next/router';
import { Modal } from '@mui/system';
import Filter from '../../components/Canvas/filter';

export default function MapDetailsPage() {

  const [filter, setFilter] = useState("HTML")

  const router = useRouter()
  const { 
    query: { id },
    push
  } = router

  console.log(filter)

  function handleFilter(filter) {
    setFilter(filter)
  }

  return (
    <div style={{height: `calc(100vh - 250px)`}}>
      <h2>Mapname</h2>
      <Filter setFilterValue={handleFilter}/>
      <Canvas filter={filter}/>
    </div>
  )
}
