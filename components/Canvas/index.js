import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider  } from 'reactflow';
import {create} from "zustand"
import {shallow} from "zustand/shallow"
import { styles } from "./styles.js"
import useSWR from "swr"

// variables and Store Callbacks mus be outside of component
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Map Name' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Parent' },
    position: { x: 100, y: 100 },
    parentNode: "1"
  },
  {
    id: '3',
    data: { label: 'Parent' },
    position: { x: -100, y: 100 },
    parentNode: "1"
  },
  {
    id: '4',
    data: { label: 'child' },
    position: { x: 0, y: 50 },
    parentNode: "2",
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'child' },
    position: { x: 0, y: 50 },
    parentNode: "3"
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '1', target: '3' },
]

const [firstElement] = initialNodes


function setType(array){
  array.first()
} 



const canvasStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
}));

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});



export default function Canvas() {

  const user = "Gblur"

  const url = `https://api.github.com/users/${user}/repos`


  const {edges, nodes, onNodesChange, onEdgesChange, onConnect} = canvasStore(selector, shallow)
  
  const {data, isLoading, error} = useSWR(url)
  // GET {node_id, name: repo, }
  console.log(data)
  
  if(isLoading) return <h1>isLoading...</h1>

  return (
    <ReactFlowProvider>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView >
        <Background style={{background:  styles["color-bg"]}} />
        <Controls />
        </ReactFlow>
    </ReactFlowProvider>
  )
}
