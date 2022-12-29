
import { Button, Header } from '../components/index';
import { useStateContext } from '../contexts/ContextProvider';


import { DeleteOutlined, Edit, VisibilityOutlined, DeleteForever } from "@mui/icons-material";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import useCandidatesService from "../services/CandidatesService";
import {usePagination} from "../components/Hooks/usePagination";
import { CheckedCandidatesListItem, ICandidatesResponse } from 'models/CandidatesTypes';
import AddCandidateModal from 'components/Modals/CandidatesModals/AddCandidateModal';
import EditCandidateModal from 'components/Modals/CandidatesModals/EditCandidateModal';
import ContentWrapper from './ContentWrapper/ContentWrapper';

export const Candidates = () => {
  const { currentColor } = useStateContext();

  const [isModalAddCandidateOpen, setIsModalAddCandidateOpen] = useState<boolean>(false);
  const [isModalEditCandidateOpen, setIsModalEditCandidateOpen] = useState<boolean>(false);
  const [modalEditId, setModalEditId] = useState<number>(1);
  const [searchBarInputText, setSearchBarInputText] = useState<string>("");
  const [candidatesResponseData, setCandidatesResponseData] = useState<ICandidatesResponse[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [isSingleCandidateCheck, setIsSingleCandidateCheck] = useState<CheckedCandidatesListItem[]>([]);
  const [checkDisabled, setCheckDisabled] = useState<boolean>(true);
  const [numberChecked, setNumberChecked] = useState<number>(0);

  const { useGetCandidate, useDeleteCandidate } = useCandidatesService();
  const [{ data, loading }, refetch] = useGetCandidate();
  const [, executeDelete] = useDeleteCandidate();

  const {changeCurrentPage, changePerPage, paginatedData, currentPage, perPage} = usePagination(candidatesResponseData)

  const handleAxiosDelete = async (id: number) => {
    const idDelte = {id}
    try{
     await executeDelete({
        // url: `/candidates/${id}`,
        url: `/candidates/`,
        data: idDelte,
      })
      setCandidatesResponseData((current) => current.filter(responseData => !(responseData._id === id)));
  }
    catch(err){console.log(err);}
  };

  const handleAxiosSettingResponseDataAsArray = () => {
    setCandidatesResponseData(Object.keys(data || {}).map((key) => data[key]));
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarInputText(e.target.value.toLowerCase());
    changePerPage(e.target.value === "" ? 10 : 100);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    changeCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    changePerPage(parseInt(event.target.value));
  };

  const toggleIndividualCheck = (id: number) => {
    setIsSingleCandidateCheck(
      isSingleCandidateCheck.map((item) => {
        if (item.id === id) return { ...item, isChecked: !item.isChecked };
        else return item;
      })
    );
  };

  const selectAllCandidatesOffers = (value: boolean) => {
    setCheckedAll(!checkedAll);
    setIsSingleCandidateCheck((prevState) => {
      return prevState.map((item: CheckedCandidatesListItem) => ({
        ...item,
        isChecked: value,
      }));
    });
  };

  const onClose = async () => {
    await refetch();
    setIsModalAddCandidateOpen(false);
    setIsModalEditCandidateOpen(false);
  };

  const deleteClickIcon = (id: number) => {
    handleAxiosDelete(id);
  };

  const handleDeleteChecked = async (event: React.MouseEvent<HTMLDivElement>) => {
      for (let element of isSingleCandidateCheck) {
        if (element.isChecked) {
         await handleAxiosDelete(element.id);
        }
      }
  };

  const loadInitialData = useCallback( () => {
    handleAxiosSettingResponseDataAsArray();
  }, [loading]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleIndividualCheck = useCallback(() => {
    setIsSingleCandidateCheck(
      candidatesResponseData.map((parameter: ICandidatesResponse) => ({
        id: parameter._id,
        isChecked: false,
      }))
    );
  }, [candidatesResponseData]);

  useEffect(() => {
    handleIndividualCheck();
  }, [handleIndividualCheck]);

  const handleModalAdd = useCallback(() => {
    handleAxiosSettingResponseDataAsArray();
  }, []);

  useEffect(() => {
    handleModalAdd();
  }, [handleModalAdd, isModalAddCandidateOpen]);

  const handleCheckAllState = useCallback(() => {
    setCheckedAll(isSingleCandidateCheck.every((item: CheckedCandidatesListItem) => item.isChecked));
  }, [isSingleCandidateCheck]);

  const handleActionState = useCallback(() => {
    const allValueFalse = isSingleCandidateCheck.every(
      element => !element.isChecked
    );
    allValueFalse ? setCheckDisabled(true) : setCheckDisabled(false);
  }, [isSingleCandidateCheck]);

  const handleCountingRows = useCallback(() => {
    const countChecked = isSingleCandidateCheck.filter(
      value => value.isChecked
    ).length;
    setNumberChecked(countChecked);
  }, [isSingleCandidateCheck]);

  useEffect(() => {
    handleCountingRows();
    handleActionState();
    handleCheckAllState();
  }, [isSingleCandidateCheck, handleActionState, handleCheckAllState, handleCountingRows]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ContentWrapper>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Candidates" />
      <p className='text-gray-400'>This page was made using real api</p>
      <div className="overflow-x-auto">
      <div className="border-1 overflow-x min-w-max">
        <div className="flex flex-row items-center bg-gray-100 p-2 mb-2 justify-between">          
        <div className='xl:ml-2' onClick={handleDeleteChecked}>
          <DeleteForever style={{color: `${checkDisabled ? "#999999" : "#000"}`, cursor: `${checkDisabled ? "default" : "pointer"}`}}/>
          </div>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 shadow-sm rounded-md focus:outline-none p-0 mx-5 md:pl-3 py-2 md:ml-12 w-full text-center focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm max-w-xs" 
            placeholder="Search for job title" 
            type="text" 
            onChange={handleSearchQueryChange}
            />
          <div className="ml-0 md:ml-auto" onClick={() => setIsModalAddCandidateOpen(true)}>
          <Button
              color="white"
              bgColor={currentColor}
              text="Add new candidate"
              borderRadius="10px"
            />
          </div>
        </div>
        <table className="w-full">
          <tbody>
            <tr className="p-4">
              <th className="pb-5 pt-2">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  onChange={(event) =>
                    selectAllCandidatesOffers(event.target.checked)
                  }
                  checked={checkedAll}
                />
              </th>
              <th className="pb-5 pt-2">POSITION</th>
              <th className="pb-5 pt-2">DATE</th>
              <th className="pb-5 pt-2">ACTIONS</th>
            </tr>
            {paginatedData
              .filter(
                (element: ICandidatesResponse) =>
                  searchBarInputText === "" ||
                  element.name
                    .toLocaleLowerCase()
                    .includes(searchBarInputText.toLocaleLowerCase())
              )
              .map((item: ICandidatesResponse) => (
                <tr key={item._id} className="hover:bg-gray-200">
                  <td className="flex justify-center my-3">
                    <input
                      id={`${item._id}`}
                      className="w-4 h-4"
                      type="checkbox"
                      onChange={() => toggleIndividualCheck(item._id)}
                      checked={
                        isSingleCandidateCheck.find(
                          (checkedItem) => checkedItem.id === item._id
                        )?.isChecked
                      }
                    />
                  </td>
                  <td className="text-center">
                    <Link to={`/candidates/${item._id}`}>
                      <span className="flex justify-center">{item.name}</span>
                    </Link>
                  </td>
                  <td className="text-center">
                    <Link to={`/candidates/${item._id}`}>
                    <span className='flex justify-center'>{new Date(item.date).toDateString()}</span>
                    </Link>
                  </td>
                  <td className="flex justify-center mt-2">
                    <DeleteOutlined
                      className="cursor-pointer"
                      onClick={() => deleteClickIcon(item._id)}
                      style={{color: currentColor}}
                    />
                    <Link to={`/candidates/${item._id}`}>
                      <VisibilityOutlined style={{color: currentColor}} className="mx-3" />
                    </Link>
                    <Edit style={{color: currentColor}} className="cursor-pointer" onClick={() => {setModalEditId(item._id) 
           setIsModalEditCandidateOpen(true)}}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <AddCandidateModal open={isModalAddCandidateOpen} onClose={onClose} />
        {isModalEditCandidateOpen ? <EditCandidateModal open={isModalEditCandidateOpen} onClose={onClose} id={modalEditId} /> : <></>}
        <div className="flex items-center justify-between">
          <p className='mx-5'>{numberChecked} rows selected</p>
          <TablePagination
            component="div"
            count={candidatesResponseData.length}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={perPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      </div>
    </div>
    </ContentWrapper>
  );
};