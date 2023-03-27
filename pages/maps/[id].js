import React from 'react'
import Canvas from '../../components/Canvas'
import 'reactflow/dist/style.css';
import { useRouter } from 'next/router';

export default function MapDetailsPage() {

  const router = useRouter()
  const { 
    query: {id},
    push
  } = router



  return (
    <div style={{height: '100vh'}}>
      <Canvas />
    </div>
  )
}
