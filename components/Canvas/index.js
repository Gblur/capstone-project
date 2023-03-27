import React from 'react'
import ReactFlow, { Background, Controls } from 'reactflow';
import {styles} from "./styles.js"

export default function Canvas() {
  
  return (
      <ReactFlow>
        <Background style={{background:  styles["color-bg"]}}/>
        <Controls />
      </ReactFlow>
  )
}
