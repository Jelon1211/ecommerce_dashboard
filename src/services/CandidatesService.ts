import useAxios from "axios-hooks";

const useCandidatesService = () => {
  const useGetCandidate = () => {
    return useAxios(`/candidates/`);
  };

  const usePostCandidate = () => {
    return useAxios(
      {
        url: `/candidates/`,
        method: "POST"
      },
      {manual: true}
    );
  };

  const usePutCandidate = () => {
    return useAxios(
      {
        url: `/candidates/`,
        method: "PATCH"
      },
      {manual: true}
    );
  };

  const useDeleteCandidate = () => {
    return useAxios(
      { 
        method: "DELETE"
      },
      {manual: true}
    );
  };


  return { useGetCandidate, usePostCandidate, usePutCandidate, useDeleteCandidate };
};

export default useCandidatesService;
