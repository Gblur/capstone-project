import Dashboard from "../../components/Dashboard";
import React, { useEffect, useState, useRef } from "react";
import CustomModal from "../../components/Modal";
import ProjectForm from "../../components/Form";
import useStore from "../../store";
import modalControlsStore from "../../store/modalControls";
import { shallow } from "zustand/shallow";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import DateRange from "@mui/icons-material/DateRange";
import CircularProgress from "@mui/material/CircularProgress";
import client from "../../lib/apollo-client.js";
import GET_MAPS_SORTED from "../../graphql/gql/sortMaps.gql";
import useLocalStorageState from "use-local-storage-state";

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

  const [maps, setMaps] = useState([]);
  const modal = modalControlsStore((state) => state.modal);
  const onClose = modalControlsStore((state) => state.closeModal);
  const [selectedItem, setSelectedItem] = useLocalStorageState("selectedItem", {
    defaultValue: "",
  });
  const [searchString, setSearchString] = useState("");

  function handleMapSelect(item) {
    setSelectedItem(item);
  }

  const { data, loading, error } = useQuery(GET_MAPS_SORTED, {
    variables: {
      input: {
        name: "asc",
      },
    },
  });

  const filteredMaps = data?.orderByName.filter((item) =>
    item.name.toLowerCase().includes(searchString.toLowerCase())
  );
  // useEffect(() => {
  //   if (!loading && !maps.length) {
  //     // fetchMaps();
  //     setMaps(data.maps);
  //   }
  // }, []);

  useEffect(() => {
    if (!selectedItem && !loading) {
      handleMapSelect(filteredMaps[0]);
    }
  }, [filteredMaps]);

  return (
    <main>
      <input onChange={(e) => setSearchString(e.target.value)} />
      <Dashboard
        data={filteredMaps}
        map={map}
        selectedItem={selectedItem}
        handleMapSelect={handleMapSelect}
        handleDelete={deleteMap}
        isloading={loading}
      />
      <CustomModal modal={modal} onClose={onClose}>
        <ProjectForm />
      </CustomModal>
    </main>
  );
}
