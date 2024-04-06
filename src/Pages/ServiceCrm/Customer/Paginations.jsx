import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
const data = [];
const Paginations = (status, date, number, code) => {
  const [isOpen, toggle] = useState(false);
  const [result, setresult] = useState([]);
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState();
  const [mobValue, setmobmodal] = useState();
  function handlOpenModal(open) {
    toggle(open);
    console.log(mobValue);
  }
  const handleChange = (event, value) => {
    setPage(Number(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`https://localhost:7257/api/Inspector/ClientList?page=${page}`)
          .then(res => {
            setresult(res.data.data);
            console.log(res.data);
            setCountpage(res.data.totalPage);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.error(err);
        // dispatch(changeNot({ type: err.isSuccess, message: err.message }));
      }
    };

    fetchData();
  }, [page]);

  return result !== null ? (
    <>
      <div className={style.Table}>
        <table>
          <thead className={style.TableHeada}>
            <tr>
              <th>Ad</th>
              <th>VÖEN/Pasport</th>
              <th>Müştəri kodu</th>
              {/* <th>Fəaliyyət növü</th>
              <th>Şəhər</th>
              <th>Hüquqi ünvan</th>
              <th>Faktiki ünvan</th>
              <th>İndeks</th>
              <th>Telefon:</th>
              <th>Sayt</th>
              <th>E-mail</th>
              <th>Direktorun S.A.A</th>
              <th>Layihə rəhbəri S.A.A</th>
              <th>Bank</th>
              <th>VÖEN (bank)</th>
              <th>Kodu</th>
              <th>M/h</th>
              <th>H/h</th>
              <th>SWIFT</th> */}
            </tr>
          </thead>
          <tbody className={style.TableBody}>
            {result?.map((row, rowIndex) => (
              <tr
                key={row.clientId}
                onClick={x => {
                  handlOpenModal(true);
                  setmobmodal(row);
                }}
              >
                <td>
                  <div className={style.TableBodyFirstTd}>
                    {row.clientFullName}
                  </div>
                </td>
                <td>
                  <div>{row.clientVoenorPassportNo}</div>
                </td>
                <td>
                  <div className={style.TableBodyLastTd}>{row.clientCode}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={style.paginate}>
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
    <>Loading</>
  );
};

export default Paginations;
