import React, { useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import EnhancedTable from "./Table";
import { styles } from "../Canvas/styles";
import { Icon } from "../Icons";
import ReactFlow, { Background, Controls } from "reactflow";
import { nodeTypes } from "../Node/customNode";
import { router } from "next/router";
import { trpc } from "../../utils/trpc";
import "reactflow/dist/style.css";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const ProjectListContainer = styled.section`
  display: block;
  border: 1px solid var(--color-dashboard-border);
  border-radius: 4px;
  padding: 10px;
  min-height: 250px;
  background: rgba(255, 255, 255, 0.9);
`;

const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
  min-height: 80px;
  max-height: 120px;
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
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 4px;
`;

const ProjectListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  scale: 1;
  margin: 10px;
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

// const Table = styled.section`
// 	display: table;
// 	height: 100%;
// 	width: 100%;
// 	border: 2px solid var(--color-dashboard-border);
// 	padding: 20px;
// `;

export default function Dashboard({
  data,
  map,
  selectedItem,
  handleMapSelect,
  handleDelete,
  loading,
}) {
  const { data: mapById, status } = trpc.maps.byId.useQuery({
    id: selectedItem?.id,
  });

  return (
    <DashboardContainer>
      <ProjectListContainer>
        <h2>Project list</h2>
        <hr />
        {data && !loading ? (
          <ProjectList>
            {data.length > 0 ? (
              data.map((item) => {
                return (
                  <ProjectListItem
                    className={selectedItem?.id === item.id ? "selected" : ""}
                    key={item.id}
                    onClick={() => handleMapSelect(item, item.id)}
                  >
                    <a>{item.name}</a>
                    <span>
                      <Icon.EditIcon
                        onClick={() => {
                          router.push(`/maps/${item.id}`);
                        }}
                        color="primary"
                      />
                      <Icon.DeleteIcon
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                        color="error"
                      />
                    </span>
                  </ProjectListItem>
                );
              })
            ) : (
              <ProjectListItem>No Entry</ProjectListItem>
            )}
          </ProjectList>
        ) : (
          <CircularProgress />
        )}
      </ProjectListContainer>
      <InformationContainer>
        <EnhancedTable map={mapById} />
        <MapPreview>
          <>
            {mapById && (
              <ReactFlow
                nodes={JSON.parse(mapById.nodes)}
                edges={JSON.parse(mapById.edges)}
                nodeTypes={nodeTypes}
                fitView
              >
                <Background style={{ background: styles["color-bg"] }} />
                <Controls />
              </ReactFlow>
            )}
          </>
        </MapPreview>
      </InformationContainer>
    </DashboardContainer>
  );
}
