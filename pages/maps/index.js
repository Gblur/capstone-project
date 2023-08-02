import Dashboard from "../../components/Dashboard";
import React, { useEffect, useState, useRef } from "react";
import CustomModal from "../../components/Modal";
import ProjectForm from "../../components/Form";
import useStore from "../../store";
import modalControlsStore from "../../store/modalControls";
import { shallow } from "zustand/shallow";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";

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
  const { data: mapdata, status } = trpc.maps.all.useQuery();
  const loading = status == "loading";

  const { fetchMap, deleteMap, map, nodes, edges, getMap } = useStore(
    selector,
    shallow
  );
  const modal = modalControlsStore((state) => state.modal);
  const onClose = modalControlsStore((state) => state.closeModal);
  const [selectedItem, setSelectedItem] = useState(null);
  function handleMapSelect(id) {
    setSelectedItem(id);
    getMap(id);
  }

  useEffect(() => {
    if (!selectedItem && !loading) {
      handleMapSelect(mapdata[0], mapdata[0]._id);
    }
  }, [loading]);

  return (
    <main>
      <Dashboard
        data={mapdata}
        map={map}
        nodes={nodes}
        edges={edges}
        selectedItem={selectedItem}
        handleMapSelect={handleMapSelect}
        handleDelete={deleteMap}
        loading={loading}
      />
      <CustomModal modal={modal} onClose={onClose}>
        <ProjectForm />
      </CustomModal>
    </main>
  );
}
