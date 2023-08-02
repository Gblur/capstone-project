import React, { useState, useEffect } from "react";
import Canvas from "../../../components/Canvas";
import "reactflow/dist/style.css";
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
});
export default function MapDetailsPage() {
  const {
    nodes,
    edges,
    repos,
    fetchMap,
    fetchRepos,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeCreate,
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

  const editTask = trpc.maps.edit.useMutation({
    async onMutate({ id, data }) {
      await utils.todo.all.cancel();
      const allTasks = utils.todo.all.getData();
      if (!allTasks) {
        return;
      }
      utils.todo.all.setData(
        undefined,
        allTasks.map((t) =>
          t.id === id
            ? {
                ...t,
                ...data,
              }
            : t
        )
      );
    },
  });

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
    // if (id) {
    // fetchMap(id);
    // if (map.mapType === "Repos" && !map.nodes.includes("child")) {
    //   fetchRepos(`/api/auth/github`);
    // }
    // }
  }, [mapById?.id]);

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
          nodes={JSON.parse(mapById?.nodes)}
          edges={JSON.parse(mapById?.edges)}
          onConnect={onConnect}
          onNodeCreate={() => {
            onNodeCreate();
          }}
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
