import useAxios from "axios-hooks";

const useCandidatesDetailsService = () => {
  const useGetCandidatesDetails = (id: string) => {
    return useAxios(`/candidates/${id}`);
  };

  return { useGetCandidatesDetails };
};

export default useCandidatesDetailsService;
