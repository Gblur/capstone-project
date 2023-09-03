import React, { useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import EnhancedTable from "./Table";
import { styles } from "../Canvas/styles";
import { Icon } from "../Icons";
import ReactFlow, { Background, Controls } from "reactflow";
import { nodeTypes } from "../Node/customNode";
import { router } from "next/router";
import Canvas from "../Canvas";
import "reactflow/dist/style.css";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const ProjectListContainer = styled.section`
  display: block;
  border: 1px solid var(--color-dashboard-border);
  border-radius: 4px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
`;

const ProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  overflow-y: auto;
`;

const InformationContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MapPreview = styled.div`
  display: block;
  min-height: 500px;
  border: 1px solid var(--color-dashboard-border);
  overflow: hidden;
  border-radius: 4px;
`;

const ProjectListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  cursor: pointer;
  scale: 1;
  margin: 5px;
  transition: ease-in-out 200ms;
  box-shadow: 0 0 3px #000;
  &:hover {
    background: var(--color-hover-item);
  }
  &.selected {
    background: var(--color-background-item);
    box-shadow: 0 0 8px #000;
    scale: 1.02;
  }
`;

export default function Dashboard({
  data,
  selectedItem,
  handleMapSelect,
  isloading,
}) {
  return (
    <DashboardContainer>
      <ProjectListContainer>
        <h2>Project list</h2>
        <hr />
        {!isloading ? (
          <ProjectList>
            {data?.length ? (
              data?.map((item) => {
                return (
                  <ProjectListItem
                    className={selectedItem?.id === item.id ? "selected" : ""}
                    key={item.id}
                    onClick={() => handleMapSelect(item, item.id)}
                  >
                    <a>{item.name}</a>
                    {selectedItem.name === item.name && (
                      <span>
                        <Icon.EditIcon
                          onClick={() => {
                            router.push(`/maps/${item.id}`);
                          }}
                          color="primary"
                        />
                        <Icon.DeleteIcon
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          color="error"
                        />
                      </span>
                    )}
                  </ProjectListItem>
                );
              })
            ) : (
              <ProjectListItem>No Entries found</ProjectListItem>
            )}
          </ProjectList>
        ) : (
          <CircularProgress />
        )}
      </ProjectListContainer>
      <InformationContainer>
        <EnhancedTable map={selectedItem} />
        <MapPreview>
          <>
            <ReactFlow
              nodes={selectedItem ? JSON.parse(selectedItem.nodes) : []}
              edges={selectedItem ? JSON.parse(selectedItem.edges) : []}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background style={{ background: styles["color-bg"] }} />
              <Controls />
            </ReactFlow>
          </>
        </MapPreview>
      </InformationContainer>
    </DashboardContainer>
  );
}
