import {create} from "zustand";

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => {
	return {
		modal: false,
		openModal: () => {
			set({
				modal: true,
			});
		},
		closeModal: () => {
			set({
				modal: false,
			});
		},
	};
});

export default useStore;
