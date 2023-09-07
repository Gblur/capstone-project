import React, { useState, useEffect } from "react";
import Canvas from "../../../components/Canvas";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import useStore from "../../../store";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import Stack from "@mui/material/Stack";
import modalControlsStore from "../../../store/modalControls";
import { useQuery } from "@apollo/client";
import GET_MAP_BY_ID from "../../../graphql/gql/getMapById.gql";
import useLocalStorageState from "use-local-storage-state";

const MapInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background: var(--color-bg-box-info);
  word-wrap: break-word;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const MapInfoBoxHead = styled.article`
  padding: 0 10px;
`;

const selector = (state) => ({
  loading: state.loading,
  map: state.map,
  nodes: state.nodes,
  edges: state.edges,
  fetchMap: state.fetchMap,
  fetchRepos: state.fetchRepos,
  repos: state.repos,
  post: state.post,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onNodeCreate: state.onNodeCreate,
  onGenerateNodes: state.onGenerateNodes,
  cloneMap: state.cloneMap,
  updateNodeType: state.updateNodeType,
  updateNodeLabel: state.updateNodeLabel,
  updateNodeStatus: state.updateNodeStatus,
});
export default function MapDetailsPage() {
  const {
    repos,
    fetchMap,
    map,
    fetchRepos,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeCreate,
    cloneMap,
    onGenerateNodes,
    onUpdateMap,
    updateNodeLabel,
    updateNodeType,
    updateNodeStatus,
  } = useStore(selector, shallow);

  const modal = modalControlsStore((state) => state);
  // const {data: session, status} = useSession();

  // const router = useRouter();
  // const {
  //   query: { id },
  // } = router;

  // const { data, loading, error } = useQuery(GET_MAP_BY_ID, {
  //   variables: {
  //     ID: id,
  //   },
  // });

  const [selectedItem] = useLocalStorageState("selectedItem");

  // TODO
  // mapById {edges: string, nodes: string} muessen geaendert werden
  // Die strings edges und nodes muessen zu validen Objecten konvertiert werden : Done!
  // Das onConnectEnd erstellt neue edges und nodes: mutiert clonedMap
  // jedes node und edge hat eigene Properties die geaendert werden muessen.

  useEffect(() => {
    if (selectedItem) {
      cloneMap({
        ...selectedItem,
        nodes: JSON.parse(selectedItem?.nodes),
        edges: JSON.parse(selectedItem?.edges),
      });
    }
  }, []);

  return (
    <main
      style={{
        height: `100vh`,
      }}
    >
      <MapInfoBox>
        <MapInfoBoxHead>
          <h3>{map?.name}</h3>
          <p>{map?.description}</p>
        </MapInfoBoxHead>
      </MapInfoBox>
      <section style={{ height: "65%" }}>
        <div
          style={{
            background: "rgba(244,244,244,0.9)",
            borderRadius: "6px 6px 0 0",
          }}
        >
          <Stack spacing={2}>
            <Button
              sx={{ borderRadius: "5px 5px 0 0" }}
              variant="contained"
              onClick={() => onUpdateMap(id)}
            >
              Save Map
            </Button>
          </Stack>
        </div>
        <Canvas
          nodes={map?.nodes}
          edges={map?.edges}
          onConnect={onConnect}
          onNodeCreate={onNodeCreate}
          fetchMap={fetchMap}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          map={map}
          id={map.id}
          repos={repos}
          modal={modal.modal}
          closeModal={modal.closeModal}
          openModal={modal.openModal}
          updateNodeLabel={updateNodeLabel}
          updateNodeType={updateNodeType}
          updateNodeStatus={updateNodeStatus}
        />
      </section>
    </main>
  );
}
