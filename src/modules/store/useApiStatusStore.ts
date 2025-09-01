import { create } from 'zustand';

interface ApiStatusStore {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useApiStatusStore = create<ApiStatusStore>((set) => ({
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useApiStatusStore;
