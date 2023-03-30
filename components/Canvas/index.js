import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, useNodesState, useEdgesState, onNodeClick  } from 'reactflow';
import {create} from "zustand"
import {shallow} from "zustand/shallow"
import { styles } from "./styles.js"
import useSWR from "swr"
import { CircularProgress } from '@mui/material';
import {Modal, Box, Typography} from '@mui/material';
import { useImmer } from 'use-immer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Canvas({filter}) {
  
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
  const [open, setOpen] = useState(false)
  const [branchUrl, setbranchUrl] = useImmer("")
  const branchData = useSWR(branchUrl || "")

  let base = -150

  function handleNodeClick(event) {
    const currentNode = testnode.find(node => {
      return (node.id === event.target.getAttribute("data-id"))
    })
    if(currentNode?.branches){
      setbranchUrl(currentNode["branches"].replace("{/branch}", ""))
    }
    setOpen(!open)
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
  
  const filterData = filteredData(data, filter)
  
  function addChilds() {
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
                parent: "1",
                branches: item["branches_url"]
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
      addChilds()
      connectChilds()
      console.log(testnode)
      return () => {

      }
    }
  },[isLoading, filter])
  
  if(isLoading) return <CircularProgress />

  return (
    <>
    <ReactFlowProvider>
      <ReactFlow nodes={testnode} edges={testedge} onEdgesChange={onEdgesChange} onNodeClick={handleNodeClick} onNodesChange={onNodesChange}  fitView >
        <Background style={{background:  styles["color-bg"]}} />
        <Controls />
        </ReactFlow>
    </ReactFlowProvider>
    <Modal
        open={open}
        onClose={handleNodeClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
        </Typography>
        <ul>
            {branchData?.data && branchData.data.map(branch => {
              return <li key={branch.commit.sha}><a href={branch.commit.url} >{`link to ${branch.name}`}</a></li>
            })}
        </ul>
      </Box>
    </Modal>
    </>
    
  )
}
