import useAxios from "axios-hooks";

const useJobsDetailsService = () => {
  const useGetJobsDetails = (id: string) => {
    return useAxios(`/jobs/${id}`);
  };

  return { useGetJobsDetails };
};

export default useJobsDetailsService;
