import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider  } from 'reactflow';
import {create} from "zustand"
import {shallow} from "zustand/shallow"
import { styles } from "./styles.js"

// variables and Store Callbacks mus be outside of component
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    data: { label: 'Default' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 250, y: 250 },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
]

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

  const {edges, nodes, onNodesChange, onEdgesChange, onConnect} = canvasStore(selector, shallow)

  return (
    <ReactFlowProvider>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView >
        <Background style={{background:  styles["color-bg"]}} />
        <Controls />
        </ReactFlow>
    </ReactFlowProvider>
  )
}
