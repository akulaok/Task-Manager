import type { RootState } from "../../../../app/store";


export const getIsModalOpen = (state: RootState) => state.modal.isOpen;
