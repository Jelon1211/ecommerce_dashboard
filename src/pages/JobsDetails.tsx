import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckedListItem, IJobsresponse } from "../models/JobsTypes";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import useJobsDetailsService from "services/JobsDetailsService";
import { Header } from "components/Header";
import ContentWrapper from "./ContentWrapper/ContentWrapper";

const JobsDetails = () => {
  const { jobId } = useParams();
  const [JobIdResponseData, setEmployeeIdResponseData] =
    useState<IJobsresponse>(Object);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { useGetJobsDetails } = useJobsDetailsService();
  const [{ data, loading }] = useGetJobsDetails(jobId === undefined ? "0" : jobId.toString());

  const handleAxiosRequestDataJobId = () => {
    setEmployeeIdResponseData(data);
  };

  const loadInitialData = useCallback(() => {
    setIsLoading(loading);
    handleAxiosRequestDataJobId();
  }, [handleAxiosRequestDataJobId, loading]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
     <ContentWrapper>
<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Jobs Details" />
      <p className='text-gray-400'>This page was made using real api</p>
      <div className="w-full border-1">
        <div className="w-full bg-gray-100 p-2 mb-2">
          <h2>{JobIdResponseData.title}</h2>
          <p className="mx-3">{JobIdResponseData.date}</p>
        </div>
        <div className="grid grid-cols-[1fr] md:grid-cols-[3fr_2fr] gap-4">
        <div className="w-full bg-white rounded-3xl mx-2">
          <h3><strong>Date of start:</strong> {JobIdResponseData.date}</h3>
          <h3><strong>Short desctiption:</strong> {JobIdResponseData.shortDescription}</h3>
          <h3><strong>Long desctiption:</strong> {JobIdResponseData.longDescription}</h3>
        </div>
        <div className="w-full bg-gray-200 rounded-3xl px-2 py-2 flex">
          <img src={JobIdResponseData.logo} alt="" className="rounded-3xl"/>
        </div>
        </div>
      </div>
</div>
    </ContentWrapper>
      </>
  );
};

export default JobsDetails;
