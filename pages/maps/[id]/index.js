import React, { useState, useEffect } from "react";
import Canvas from "../../../components/Canvas";
import "reactflow/dist/style.css";
import ReactFlow, { addEdge, useNodesState, useEdgesState } from "reactflow";
import { shallow } from "zustand/shallow";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import useStore from "../../../store";
import { useSession } from "next-auth/react";
import Stack from "@mui/material/Stack";
import modalControlsStore from "../../../store/modalControls";
import { trpc } from "../../../utils/trpc";
import nodeCreator from "../../../components/Canvas/hooks/nodeCreator";

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
  onUpdateMap: state.onUpdateMap,
  updateNodeType: state.updateNodeType,
  updateNodeLabel: state.updateNodeLabel,
  updateNodeStatus: state.updateNodeStatus,
  transferMapData: state.transferMapData,
});
export default function MapDetailsPage() {
  const {
    repos,
    fetchMap,
    fetchRepos,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeCreate,
    nodes,
    edges,
    transferMapData,
    onUpdateMap,
    updateNodeLabel,
    updateNodeType,
    updateNodeStatus,
  } = useStore(selector, shallow);

  const modal = modalControlsStore((state) => state.modal);
  const closeModal = modalControlsStore((state) => state.closeModal);
  const openModal = modalControlsStore((state) => state.openModal);

  const { data: session } = useSession();
  const [notionObject, setNotionObject] = useState(null);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data: mapById, status } = trpc.maps.byId.useQuery({ id });
  // const onUpdate = trpc.maps.onUpdate.subscribe();
  const addNode = trpc.maps.addNode.useMutation();

  function handleAddNode(parent, newId) {
    addNode.mutate({
      id,
      data: {
        nodes: JSON.stringify([
          ...JSON.parse(mapById.nodes),
          nodeCreator(parent, newId).node,
        ]),
        edges: JSON.stringify([
          ...JSON.parse(mapById.edges),
          nodeCreator(parent, newId).edge,
        ]),
      },
    });
  }

  async function handlePostToNotion(notionPost) {
    const response = await fetch("/api/notion/client", {
      method: "POST",
      body: JSON.stringify(notionPost),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await response.json();
    }
  }

  useEffect(() => {
    closeModal();
    transferMapData(mapById);
    // if (id) {
    // fetchMap(id);
    // if (map.mapType === "Repos" && !map.nodes.includes("child")) {
    //   fetchRepos(`/api/auth/github`);
    // }
    // }
  }, [mapById]);

  console.log(nodes);

  if (status !== "success") return <div>Loading...</div>;

  if (!router.isReady) return <CircularProgress />;

  return (
    <main
      style={{
        height: `100vh`,
      }}
    >
      <MapInfoBox>
        <MapInfoBoxHead>
          <h3>{mapById?.name}</h3>
          <p>{mapById?.description}</p>
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
          handlePostToNotion={handlePostToNotion}
          user={session?.user?.name}
          createNode={handleAddNode}
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          fetchMap={fetchMap}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          map={mapById}
          id={id}
          repos={repos}
          modal={modal}
          closeModal={closeModal}
          openModal={openModal}
          updateNodeLabel={updateNodeLabel}
          updateNodeType={updateNodeType}
          updateNodeStatus={updateNodeStatus}
        />
      </section>
    </main>
  );
}
