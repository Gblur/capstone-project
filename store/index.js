import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";
import nodeCreator from "../components/Canvas/hooks/nodeCreator";
import nodeGenerator from "../components/Canvas/hooks/nodeGenerator";
import {addEdge, addNode, applyNodeChanges, applyEdgeChanges} from "reactflow";
import {v4 as uuidv4} from "uuid";

const handleUpdateData = async (node, id) => {
  const response = await fetch(`/api/maps/${id}`, {
    method: "PUT",
    body: JSON.stringify(node),
    headers: {"Content-Type": "application/json"},
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
      headers: {"Content-Type": "application/json"},
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

const initialNodes = (label) => [
  {
    id: uuidv4(),
    type: "parent",
    data: {
      label: label,
      background: "var(--color-node-parent-bg)",
      type: "root",
      status: "unknown",
    },
    position: {x: 250, y: 25},
  },
];
const initialEdge = [];

const useStore = create((set, get) => {
  return {
    loading: true,
    map: {},
    maps: [],
    nodes: [],
    edges: [],
    repos: [],
    filterMaps: (searchString) => {
      set({
        maps: get().maps.filter((map) => {
          return map.name.includes(searchString);
        }),
      });
    },
    fetchMaps: async () => {
      const response = await fetch("/api/maps");
      if (response.ok) {
        const data = await response.json();
        set({
          maps: data,
        });
        set({loading: false});
      }
    },
    fetchMap: async (id) => {
      if (!get().loading) {
        const response = await fetch(`/api/maps/${id || get().maps[0]._id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            set((prev) => ({
              ...prev,
              map: data,
              nodes: JSON.parse(data?.nodes),
              edges: JSON.parse(data?.edges),
            }));
          }
        }
      }
    },
    getMap: (id) => {
      if (!get().loading && get().maps) {
        const filteredMap = [...get().maps].find((map) => map._id === id);
        console.log(filteredMap);
        if (filteredMap) {
          set((prev) => ({
            ...prev,
            map: filteredMap,
            edges: JSON.parse(filteredMap?.edges),
            nodes: JSON.parse(filteredMap?.nodes),
          }));
        }
      }
    },
    fetchRepos: async (url) => {
      set({loading: true});
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      set({loading: false});
      get().onGenerateNodes(data.data);
      set({repos: data.data});
    },
    createMap: async (data, router, user) => {
      const date = new Date(Date.now());
      const options = {day: "numeric", month: "long", year: "numeric"};
      const formattedDate = date.toLocaleDateString("de-DE", options);
      const newObject = {
        ...data,
        date: formattedDate,
        user: user,
        nodes: JSON.stringify(
          initialNodes(data.mapType === "Repos" ? "Repos" : "Root")
        ),
        edges: JSON.stringify(initialEdge),
      };
      const response = await fetch(`/api/maps`, {
        method: "POST",
        body: JSON.stringify(newObject),
        headers: {"Content-Type": "application/json"},
      });
      if (response.ok) {
        const {_id} = await response.json();
        router.push(`/maps/${_id}`);
      }
    },
    deleteMap: (id) => {
      handleDelete(id, get().fetchMaps);
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },

    onNodeCreate: (parent, id) => {
      set({
        nodes: [...get().nodes, nodeCreator(parent, id).node],
        edges: [...get().edges, nodeCreator(parent, id).edge],
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
    onUpdateMap: async (id) => {
      handleUpdateData(
        {
          ...get().map,
          nodes: JSON.stringify(get().nodes),
          edges: JSON.stringify(get().edges),
        },
        id
      );
    },
    updateNodeLabel: (nodeId, label) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = {...node.data, label};
          }

          return node;
        }),
      });
    },
    updateNodeType: (nodeId, type) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = {...node.data, nodeType: type};
          }

          return node;
        }),
      });
    },
    updateNodeStatus: (nodeId, status) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = {...node.data, status};
          }

          return node;
        }),
      });
    },
  };
});

mountStoreDevtool("store1", useStore);

export default useStore;
