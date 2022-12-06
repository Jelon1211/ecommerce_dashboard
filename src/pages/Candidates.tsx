
import { Button, Header } from '../components/index';
import { useStateContext } from '../contexts/ContextProvider';


import { DeleteOutlined, Edit, VisibilityOutlined } from "@mui/icons-material";
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
  const [{ data, loading }] = useGetCandidate();
  const [, executeDelete] = useDeleteCandidate();

  const {changeCurrentPage, changePerPage, paginatedData, currentPage, perPage} = usePagination(candidatesResponseData)

  const handleAxiosDelete = async (id: number) => {
    try{
      executeDelete({
        url: `/candidates/${id}`,
        data: id,
      })
      setCandidatesResponseData(candidatesResponseData.filter((candidatesResponseData) => {
        return candidatesResponseData.id !== id}))
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

  const onClose = () => {
    setIsModalAddCandidateOpen(false);
    setIsModalEditCandidateOpen(false);
  };

  const deleteClickIcon = (id: number) => {
    handleAxiosDelete(id);
  };

  const handleDeleteChecked = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "delete") {
      for (let element of isSingleCandidateCheck) {
        if (element.isChecked) {
          handleAxiosDelete(element.id);
        }
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
        id: parameter.id,
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
      <Header category="Page" title="Employees" />
      <p className='text-gray-400'>This page was made using real api</p>
      
      <div className="border-1 overflow-x">
        <div className="flex flex-col md:flex-row items-center bg-gray-100 p-2 mb-2">
          <select
            className="bg-gray-100 order-2 md:order-1 w-fit py-2"
            disabled={checkDisabled}
            value={""}
            onChange={handleDeleteChecked}
          >
            <option value="">Action</option>
            <option value="delete">Delete</option>
          </select>
          <input
            className="bg-gray-100 p-0 md:pl-3 py-2 md:ml-12 order-1 md:order2 text-center"
            type="text"
            placeholder="Search job"
            onChange={handleSearchQueryChange}
          />
          <div className="ml-0 md:ml-auto order-3 md:order-3" onClick={() => setIsModalAddCandidateOpen(true)}>
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
                <tr key={item.id} className="">
                  <td className="flex justify-center my-3">
                    {/* <input
                      id={`${item.id}`}
                      className="w-4 h-4"
                      type="checkbox"
                      onChange={() => toggleIndividualCheck(item.id)}
                      checked={
                        isSingleCandidateCheck.find(
                          (checkedItem) => checkedItem.id === item.id
                        )?.isChecked
                      }
                    /> */}
                  </td>
                  <td className="text-center">
                    <Link to={`/candidates/${item.id}`}>
                      <span className="my-3">{item.name}</span>
                    </Link>
                  </td>
                  <td className=""><span className='flex justify-center'>{item.date}</span></td>
                  <td className="flex justify-center mt-2">
                    <DeleteOutlined
                      className="cursor-pointer"
                      onClick={() => deleteClickIcon(item.id)}
                      style={{color: currentColor}}
                    />
                    <Link to={`/candidates/${item.id}`}>
                      <VisibilityOutlined style={{color: currentColor}} className="mx-3" />
                    </Link>
                    <Edit style={{color: currentColor}} className="cursor-pointer" onClick={() => {setModalEditId(item.id) 
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
    </ContentWrapper>
  );
};