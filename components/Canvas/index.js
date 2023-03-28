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
    },
  ]

  const initialEdge = []


  const {data, isLoading} = useSWR(url)
  const [testnode, setTestNode] = useState(initialNode)
  const [testedge, setTestEdge] = useState(initialEdge)

  let base = -150

  function pushNodes(filter) {
    const filtedData = data.filter(item => {
      if(filter){
        return item.language === filter
      } 
      return item
    })
    filtedData.forEach(item => {
        initialNode.push(
            {
              id: item["node_id"],  
              data: { label: item.name },
              position: { x: filtedData.length > 10 ? 0 : base += 200, y: filtedData.length > 10 ? base += 100 : 100},
              parent: "1"
            }
        )
        initialEdge.push(
          {
            id: item["node_id"],
            source: "1",
            target: item["node_id"],
            animated: true,
          }
        ) 

    })
    setTestNode(initialNode)
    setTestEdge(initialEdge)
  }

  useEffect(() => {
    if(!isLoading){
      console.log(initialNode)
      pushNodes("HTML")
    }
  },[isLoading])

  // const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setTestNode((nds) => applyNodeChanges(changes, nds)),
    [setTestNode]
  );

  const onEdgesChange = useCallback(
    (changes) => setTestEdge((eds) => applyEdgeChanges(changes, eds)),
    [setTestEdge]
  );
  
  if(isLoading) return <h1>isLoading...</h1>

  return (
    <ReactFlowProvider>
      <ReactFlow nodes={testnode} edges={testedge} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange}  fitView >
        <Background style={{background:  styles["color-bg"]}} />
        <Controls />
        </ReactFlow>
    </ReactFlowProvider>
  )
}
