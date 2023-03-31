import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import LensIcon from '@mui/icons-material/Lens';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


const Node = styled.div`
  padding: 10px 20px;
  border-radius: 5px;
  background: ${props => props.background};
  color: black;
  border: 1px dashed ${(props) => (props.selected ? "orange" : "black")};

  .react-flow__handle {
    background: blue;
    width: 15px;
    height: 7px;
    border-radius: 0px;
  }
`;

const MainNode = ({ selected, data }) => {
  return (
    <>
    <Node  selected={selected}>
      <Handle type="target" position={Position.Top} />
        <div>
          {data.label}
        </div>
      <Handle type="source" position={Position.Bottom} />
    </Node>
    </>
  );
};

const ChildNode = ({ selected, data }) => {
  return (
    <>
    <Node background={data.background} selected={selected}>
      <Handle type="target" position={Position.Top} />
        <div>
          {data.label}
        </div>
        <i >
          {data.status}
          <LensIcon fontSize='8px' color="primary"/>
        </i>
      <Handle type="source" position={Position.Bottom} />
    </Node>
    </>
  );
};


export const nodeTypes = {
  parent: memo(MainNode),
  child: memo(ChildNode),
};