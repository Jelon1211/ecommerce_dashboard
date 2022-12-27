import useAxios from "axios-hooks";

const useJobsService = () => {
  const useGetJobs = () => {
    return useAxios(`/jobs/`);
  };

  const usePostJobs = () => {
    return useAxios(
      {
        url: `/jobs/`,
        method: "POST"
      },
      {manual: true}
    );
  };

  const usePutJobs = () => {
    return useAxios(
      {
        url: `/jobs/`,
        method: "PATCH"
      },
      {manual: true}
    );
  };

  const useDeleteJobs = () => {
    return useAxios(
      {
        method: "DELETE"
      },
      {manual: true}
    );
  };


  return { useGetJobs, usePostJobs, usePutJobs, useDeleteJobs};
};

export default useJobsService;
