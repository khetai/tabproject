import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CustomerReport from "./CustomerReport";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import Select2Take from "../../../Components/Select/Select2Take";

const Paginations = ({ voen, name, load, setLoad, hasLoan, search }) => {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState();
  const [db, setDb] = useState();
  const [take, setTake] = useState(25);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Client/GetClientsBalance?page=${page}&take=${take}&voenOrPasswordNumber=${
            voen ?? ""
          }&clientCode=${name ?? ""}&hasLoan=${search.hasLoan}`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          setDb(res.result.data);
          setCountpage(res.result.totalPage);
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
      setLoad(false);
    };

    fetchData();
  }, [page, take, voen, name, hasLoan, load]);
  const handleChange = (event, value) => {
    setPage(Number(value));
  };
  return db ? (
    <>
      <table className={style.table}>
        <thead className={style.TableHeada}>
          <tr>
            <th>№</th>
            <th>Müştəri kodu</th>
            <th>VÖEN/Passport</th>
            <th>Ad</th>
            <th>Balans</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody className={style.TableBody}>
          {db.length > 0 ? (
            db?.map((x, i) => {
              return (
                <CustomerReport
                  key={i}
                  page={page}
                  nom={i}
                  take={take}
                  data={x}
                />
              );
            })
          ) : (
            <tr>
              <td>Məlumat yoxdur</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={style.paginate}>
        <div className={style.PaginationSelect}>
          <Select2Take onChange={e => setTake(e.value)} value={take} />
        </div>
        <Stack spacing={2}>
          <Pagination
            count={countpage}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  ) : (
    <>
      <Loader />
    </>
  );
};

export default Paginations;
