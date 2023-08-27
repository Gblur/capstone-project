import Dashboard from "../../components/Dashboard";
import React, { useEffect, useState, useRef } from "react";
import CustomModal from "../../components/Modal";
import ProjectForm from "../../components/Form";
import useStore from "../../store";
import modalControlsStore from "../../store/modalControls";
import { shallow } from "zustand/shallow";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { DateRange } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import client from "../../lib/apollo-client.js";
import GET_MAPS from "../../graphql/gql/getmaps.gql";

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
  const [selectedItem, setSelectedItem] = useState();
  function handleMapSelect(item) {
    setSelectedItem(item);
  }

  const { data, loading, error } = useQuery(GET_MAPS);

  // useEffect(() => {
  //   if (!loading && !maps.length) {
  //     // fetchMaps();
  //     setMaps(data.maps);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!selectedItem && !loading) {
  //     handleMapSelect(mapdata[0], mapdata[0]._id);
  //   }
  // }, [selectedItem]);

  return (
    <main>
      <Dashboard
        data={data?.maps}
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
