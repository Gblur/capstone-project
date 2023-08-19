import Dashboard from "../../components/Dashboard";
import React, { useEffect, useState, useRef } from "react";
import CustomModal from "../../components/Modal";
import ProjectForm from "../../components/Form";
import useStore from "../../store";
import modalControlsStore from "../../store/modalControls";
import { shallow } from "zustand/shallow";
import { useSession } from "next-auth/react";
import { useLazyQuery, useQuery } from "@apollo/client";
import GET_MAPS from "../../graphql/gql/getmaps.graphql";
import { DateRange } from "@mui/icons-material";

const selector = (state) => {
  return {
    maps: state.maps,
    map: state.map,
    fetchMap: state.fetchMap,
    fetchMaps: state.fetchMaps,
    deleteMap: state.deleteMap,
    nodes: state.nodes,
    edges: state.edges,
    loading: state.loading,
    getMap: state.getMap,
  };
};

export default function MapsPage() {
  const { fetchMap, deleteMap, map, nodes, edges, getMap } = useStore(
    selector,
    shallow
  );

  const [maps, setMaps] = useState(null);
  const modal = modalControlsStore((state) => state.modal);
  const onClose = modalControlsStore((state) => state.closeModal);
  const [selectedItem, setSelectedItem] = useState();
  function handleMapSelect(item, id) {
    setSelectedItem(item);
    getMap(id);
  }

  const fetchMaps = async () => {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query getmaps {
          maps {
            id
            name
            nodes
            edges
          }
        }`,
      }),
    });
    const { data } = await response.json();
    setMaps(data?.maps);
  };

  useEffect(() => {
    if (!maps) {
      fetchMaps();
    }
  }, []);

  // useEffect(() => {
  //   if (!selectedItem && !loading) {
  //     handleMapSelect(mapdata[0], mapdata[0]._id);
  //   }
  // }, [loading]);

  // const {data: session} = useSession();
  // const maps = useQuery(GET_MAPS);

  // console.log(maps);

  return (
    <main>
      <Dashboard
        data={maps}
        map={map}
        nodes={nodes}
        edges={edges}
        selectedItem={selectedItem}
        handleMapSelect={handleMapSelect}
        handleDelete={deleteMap}
        isloading={false}
      />
      <CustomModal modal={modal} onClose={onClose}>
        <ProjectForm />
      </CustomModal>
    </main>
  );
}
