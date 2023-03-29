import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, useNodesState, useEdgesState, onNodeClick  } from 'reactflow';
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
  const [testnode, setTestNode, onNodesChange] = useNodesState(initialNode)
  const [testedge, setTestEdge, onEdgesChange] = useEdgesState(initialEdge)

  let base = -150

  function handleNodeClick(event) {
    console.log(event.currentTarget)
  }

  function filteredData(data, filter) {
    if(data) {
      return data.filter(item => {
        if(filter){
          return item.language === filter
        } 
        return item
      })
    }
  }

  const filterData = filteredData(data, "HTML")

  function addChilds(initialNode) {
    // map through initialNode and update the state by adding new elements to array
    
    setTestNode(
      [
        ...initialNode,
        ...filterData.map(item => {
          return (
              {
                id: item["node_id"],  
                data: { label: item.name },
                position: { x: filterData.length > 10 ? 0 : base += 200, y: filterData.length > 10 ? base += 100 : 100},
                parent: "1"
              }
            ) 
          }
        )
      ]
    )
  }

  function connectChilds() {
    setTestEdge(
      [
        ...filterData.map(item => {
          return {
            id: item["node_id"],
            source: "1",
            target: item["node_id"],
            animated: true,
          }
        })
      ]
    )
  }

  useEffect(() => {
    if(!isLoading){
      console.log(data)
      addChilds(testnode)
      connectChilds()
      console.log(testnode)
      return () => {

      }
    }
  },[isLoading])
  
  if(isLoading) return <h1>isLoading...</h1>

  return (
    <ReactFlowProvider>
      <ReactFlow nodes={testnode} edges={testedge} onEdgesChange={onEdgesChange} onNodeClick={handleNodeClick} onNodesChange={onNodesChange}  fitView >
        <Background style={{background:  styles["color-bg"]}} />
        <Controls />
        </ReactFlow>
    </ReactFlowProvider>
  )
}
