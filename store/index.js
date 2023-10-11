import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import nodeCreator from "../components/Canvas/hooks/nodeCreator";
import nodeGenerator from "../components/Canvas/hooks/nodeGenerator";
import {
  addEdge,
  addNode,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";

const handleUpdateData = async (node, id) => {
  const response = await fetch(`/api/maps/${id}`, {
    method: "PUT",
    body: JSON.stringify(node),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    await response.json();
  }
};

const handleDelete = async (id, update) => {
  try {
    const response = await fetch(`/api/maps`, {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await response.json();
      update();
    } else {
      console.error("Failed to delete data");
    }
  } catch (error) {
    console.error(error);
  }
};

const useStore = create((set, get) => {
  return {
    loading: true,
    map: {},
    maps: [],
    nodes: [],
    edges: [],
    repos: [],
    onNodesChange: (changes) => {
      set({
        map: {
          ...get().map,
          nodes: applyNodeChanges(changes, get().map.nodes),
        },
      });
    },
    onEdgesChange: (changes) => {
      set({
        map: {
          ...get().map,
          edges: applyEdgeChanges(changes, get().map.edges),
        },
      });
    },
    onConnect: (connection) => {
      set({
        map: {
          ...get().map,
          edges: addEdge(connection, get().map.edges),
        },
      });
    },

    onNodeCreate: (parent, id) => {
      set({
        map: {
          ...get().map,
          nodes: [...get().map.nodes, nodeCreator(parent, id).node],
          edges: [...get().map.edges, nodeCreator(parent, id).edge],
        },
      });
    },
    onGenerateNodes: (data) => {
      set({
        nodes: [
          ...get().nodes,
          ...nodeGenerator(data).addChilds(get().nodes[0].id),
        ],
        edges: [
          ...get().edges,
          ...nodeGenerator(data).connectChilds(get().nodes[0].id),
        ],
      });
    },
    updateMap: async () => {
      
    },
    cloneMap: (map) => {
      set({ map });
    },
    updateNodeLabel: (nodeId, label) => {
      set({
        map: {
          ...get().map,
          nodes: get().map.nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, label };
            }

            return node;
          }),
        },
      });
    },
    updateNodeType: (nodeId, type) => {
      set({
        map: {
          ...get().map,
          nodes: get().map.nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, nodeType: type };
            }

            return node;
          }),
        },
      });
    },
    updateNodeStatus: (nodeId, status) => {
      set({
        map: {
          ...get().map,
          nodes: get().map.nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, status };
            }

            return node;
          }),
        },
      });
    },
  };
});

export default useStore;
