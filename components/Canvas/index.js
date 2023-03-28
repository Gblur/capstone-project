import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider  } from 'reactflow';
import {create} from "zustand"
import {shallow} from "zustand/shallow"
import { styles } from "./styles.js"
import useSWR from "swr"

export default function Canvas() {
  
  const user = "Gblur"
  const url = `https://api.github.com/users/${user}/repos`
  const initialNode = [{
    id: '1',
    type: 'input',
    data: { label: 'Map Name' },
    position: { x: 250, y: 25 },
  }]

  const {data, isLoading} = useSWR(url)
  const [testnode, setTestNode] = useState(initialNode)

  function generateLabels(data) {
    if(data){
      return data.filter(item => {
        return item.language === "HTML"
      })
    }
  }

  let base = 50
  useEffect(() => {
    if(!isLoading){
      if(data.length > 10){
      generateLabels(data).forEach(item => {
        base += 100;

        initialNode.push(
            {
              id: item["node_id"],  
              data: { label: item.name },
              position: { x: 0, y: base },
              parent: "1"
            }
          ) 
        })
      }
     console.log(initialNode)
     setTestNode(initialNode)
    }
  },[isLoading])

  // const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setTestNode((nds) => applyNodeChanges(changes, nds)),
    [setTestNode]
  );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );
  // const {data, isLoading, error} = useSWR(url)
  // GET {node_id, name: repo, }
  
  if(isLoading) return <h1>isLoading...</h1>

  return (
    <ReactFlowProvider>
      <ReactFlow nodes={testnode} onNodesChange={onNodesChange}  fitView >
        <Background style={{background:  styles["color-bg"]}} />
        <Controls />
        </ReactFlow>
    </ReactFlowProvider>
  )
}
