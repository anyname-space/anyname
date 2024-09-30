import { create } from 'zustand';
import { INITIAL_VALUE } from '../constants/nameStore';

const useBillingStore = create<NameStore>((set) => ({
  ...INITIAL_VALUE,
  setCategories: (categories) => set({ categories }),
  setGenders: (genders) => set({ genders }),
  setNameTypes: (nameTypes) => set({ nameTypes }),
}));

export default useBillingStore;
