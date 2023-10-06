import Dashboard from "../../components/Dashboard";
import React, { useEffect, useState, useRef } from "react";
import CustomModal from "../../components/Modal";
import ProjectForm from "../../components/Form";
import modalControlsStore from "../../store/modalControls";
import { useQuery, useSubscription } from "@apollo/client";
import GET_MAPS_SORTED from "../../graphql/gql/sortMaps.gql";
import SUBSCRIPTION_POSTS from "../../graphql/gql/updatePost.gql";
import useLocalStorageState from "use-local-storage-state";

export default function MapsPage() {
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

  const { data, loading, error, subscribeToMore } = useQuery(GET_MAPS_SORTED);

  // const { data: subscription } = useSubscription(SUBSCRIPTION_POSTS);
  console.log(data?.map);
  const filteredMaps = data?.map.filter((item) =>
    item.name.toLowerCase().includes(searchString.toLowerCase())
  );

  // useEffect(() => {
  //   if (!loading && !maps.length) {
  //     // fetchMaps();
  //     setMaps(data.maps);
  //   }
  // }, []);

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIPTION_POSTS,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newPost;

        return Object.assign({}, prev, {
          orderByName: [newFeedItem, ...prev?.orderByName],
        });
      },
    });
    if (!selectedItem && !loading) {
      handleMapSelect(filteredMaps[0]);
    }
  }, [filteredMaps]);

  return (
    <main>
      <Dashboard
        setSearchString={setSearchString}
        data={filteredMaps}
        selectedItem={selectedItem}
        handleMapSelect={handleMapSelect}
        isloading={loading}
      />
      <CustomModal modal={modal} onClose={onClose}>
        <ProjectForm />
      </CustomModal>
    </main>
  );
}
