import React from 'react'
import Canvas from '../../components/Canvas'
import 'reactflow/dist/style.css';
import { useRouter } from 'next/router';

export default function MapDetailsPage() {

  const router = useRouter()
  const { 
    query: { id },
    push
  } = router

  return (
    <div style={{height: `calc(100vh - 150px)`}}>
      <h2>Mapname</h2>
      <Canvas />
    </div>
  )
}
