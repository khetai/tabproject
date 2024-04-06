import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
    for (let i = 0; i < 12; i++) {
      data.push({
        Tarix: `Name ${i + 1}`,
        Nömrə: `Code ${i + 1}`,
        Əməliyyatnövü: `nov`,
        Status: `Odenilib`,
        Müştəri: `email${i + 1}@example.com`,
        VÖEN: `Voen ${i + 1}`,
        Müştərikodu: `Customer Code ${i + 1}`,
        ƏDVməbləği: `Contact ${i + 1}`,
      });
    }
  }, []);
  useEffect(() => {
    const calculatedCountPage = Math.ceil(data.length / 8);
    setCountpage(calculatedCountPage);
    const startIndex = (page - 1) * 8;
    const endIndex = startIndex + 8;
    setresult(data.slice(startIndex, endIndex));
  }, [page, status, date, number, code]);

  return result !== null ? (
    <>
      <div className={style.Table}>
        <ul className={style.TableHeada}>
          <li>Tarix</li>
          <li>Müştəri</li>
          <li>Müştəri kodu</li>
          <li>Mebleg</li>
          <li>Bank adi</li>
          <li>hesab nomresi</li>
          <li>tipi</li>
        </ul>
        <ul className={style.TableBody}>
          {result?.map((row, rowIndex) => (
            <li
              key={rowIndex}
              onClick={x => {
                handlOpenModal(true);
                setmobmodal(row);
              }}
            >
              {Object.values(row).map((value, columnIndex) => {
                return <span key={columnIndex}>{value}</span>;
              })}
            </li>
          ))}
        </ul>
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
