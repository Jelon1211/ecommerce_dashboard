import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICandidatesResponse } from "models/CandidatesTypes";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import useCandidatesDetailsService from "services/CandidatesDetailsService";
import { Header } from "components/Header";
import ContentWrapper from "./ContentWrapper/ContentWrapper";

const CandidatesDetails = () => {
  const { candidateId } = useParams();
  const [candidateIdResponseData, setCandidateIdResponseData] =
  useState<ICandidatesResponse>(Object);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { useGetCandidatesDetails } = useCandidatesDetailsService();
  const [{ data, loading }] = useGetCandidatesDetails(candidateId === undefined ? "0" : candidateId.toString());

  const handleAxiosRequestDataCandidateId = useCallback(() => {
    setCandidateIdResponseData(data);
  },[data])

  const loadInitialData = useCallback(async () => {
    setIsLoading(loading);
    handleAxiosRequestDataCandidateId();
  }, [handleAxiosRequestDataCandidateId, loading]);

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
          <h2>{candidateIdResponseData.name}</h2>
          <p className="mx-3">{candidateIdResponseData.date}</p>
        </div>
        <div className="grid grid-cols-[1fr] md:grid-cols-[3fr_2fr] gap-4">
        <div className="w-full bg-white rounded-3xl mx-2">
          <h3><strong>Date of start:</strong> {candidateIdResponseData.date}</h3>
          <h3><strong>Short desctiption:</strong> {candidateIdResponseData.shortDescription}</h3>
          <h3><strong>Long desctiption:</strong> {candidateIdResponseData.longDescription}</h3>
        </div>
        <div className="w-full bg-gray-200 rounded-3xl px-2 py-2 flex justify-center">
          <img src={candidateIdResponseData.logo} alt="" className="rounded-3xl"/>
        </div>
        </div>
      </div>
    </div>
    </ContentWrapper>
      </>
  );
};
export default CandidatesDetails;