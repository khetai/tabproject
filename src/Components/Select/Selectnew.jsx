import { useState, useRef, useEffect } from "react";
import "./Selecn.css";
import ModalSelect from "../Modal/ModalSelect";
import { useDispatch, useSelector } from "react-redux";
import { changeToast } from "../../Store/auth";
import usePrivate from "../../Services/useAxiosPrivate2";

function Selectnew({
  value = 0,
  name,
  handleChange,
  type = null,
  url,
  itemname,
  itemId,
  width,
  height,
  searchName,
  double = true,
}) {
  const { sendRequest } = usePrivate();
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [val, setValue] = useState({
    id: value,
    text: "",
  });
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [items, setItems] = useState([]);

  const handlechangeval = (id, text) => {
    console.log(id);
    console.log(text);
    setValue({ id: id, text: text });
    setOpen(false);
  };
  const items1 = [
    {
      id: 1,
      text: "baki",
    },
    {
      id: 2,
      text: "Quba",
    },
    {
      id: 3,
      text: "Qusar",
    },
    {
      id: 4,
      text: "Beyleqan",
    },
    {
      id: 5,
      text: "Salyan",
    },
    {
      id: 6,
      text: "Gence",
    },
    {
      id: 7,
      text: "Masalli",
    },
  ];
  const handleChange1 = e => {
    setValue({ id: null, text: e.target.value });
    setFocus(true);
    fetchData();
  };
  const handleToggleFocus = () => {
    if (!focus) {
      setFilteredItems([]);
    }
    if (val.id === null || val.id === 0) {
      setValue({ id: null, text: "" });
    } // Reset filtered items when opening the dropdown
    setFocus(!focus);
  };
  const handleClickOutside = event => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setFocus(false);
    }
  };
  const fetchData = async () => {
    console.log(`${url}?take=${10}&${searchName}=${val.text}`);
    try {
      const res = await sendRequest(
        "GET",
        `${url}?take=${10}&${searchName}=${val.text}`,
        null
      );
      if (!res.isSuccess) {
        dispatch(
          changeToast({ loading: false, type: false, message: res.message })
        );
      } else {
        if (items.length == 0) {
          setItems(
            res.result.data.map(item => {
              console.log(`${itemId}Id`);
              console.log(`${itemname}Name`);
              console.log(item);
              return {
                id: item[`${itemId}Id`],
                text: item[`${itemname}Name`],
              };
            })
          );
        } else {
          console.log("filter");
          setFilteredItems(
            res.result.data.map(item => {
              return {
                id: item[`${itemId}Id`],
                text: item[`${itemname}Name`],
              };
            })
          );
          if (res.result.data.length > 0) {
            const uniqueItems = res.result.data
              .map(item => {
                // Check if the clientId already exists in items
                if (
                  !items.find(
                    existingItem =>
                      existingItem[`${itemname}Id`] === item[`${itemname}Id`]
                  )
                ) {
                  return {
                    id: item[`${itemId}Id`],
                    text: item[`${itemname}Name`],
                  };
                }
              })
              .filter(item => item != null); // Filter out undefined values

            // Filter out duplicates and add only unique items to the items state
            const filteredItems = uniqueItems.filter(
              (item, index, self) =>
                index ===
                self.findIndex(t => t.id === item.id && t.text === item.text)
            );

            console.log("uniq", filteredItems);
            setItems([...items, ...filteredItems]);
          }
        }
      }
    } catch (err) {
      console.error(err);
      dispatch(
        changeToast({ loading: false, type: false, message: err.message })
      );
    }
  };
  useEffect(() => {
    fetchData();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleKeyDown = e => {
    // Check if the key pressed is Page Up (33) or Page Down (34)
    if (e.keyCode === 33 || e.keyCode === 34) {
      e.preventDefault(); // Prevent default behavior of scrolling the page
      const list = e.currentTarget;
      const listItemHeight = list.firstChild.clientHeight; // Assuming all list items have the same height

      // Calculate the number of items to scroll based on the visible area
      const visibleItemCount = Math.floor(list.clientHeight / listItemHeight);

      // Calculate the scroll amount
      const scrollAmount =
        e.keyCode === 33
          ? -listItemHeight * visibleItemCount
          : listItemHeight * visibleItemCount;

      // Scroll the list
      list.scrollTop += scrollAmount;
    }
  };

  return (
    <div className="mb-3" style={{ position: "relative" }} ref={inputRef}>
      <div className="select2">
        <input
          style={{ color: "#3e9cd9 !important" }}
          type="text"
          onChange={handleChange1}
          value={val.text}
          placeholder="Seçin..."
          onClickCapture={e => {
            handleToggleFocus();
          }}
          // onKeyDown={handleKeyDown}
          onKeyPress={e => {
            if (e.key === "Enter") {
              setValue(filteredItems[0]);
              handleChange({
                value: filteredItems[0].id,
                name: name,
              });
              setFocus(!focus);
            }
          }}
        />
        <div className="sl_icons">
          <svg
            style={val.text !== "" ? { display: "block" } : { display: "none" }}
            className="fa-x"
            onClick={e => {
              setValue({ id: null, text: "" });
            }}
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            class="css-tj5bde-Svg"
          >
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
          </svg>
          {/* <i className="fa-solid fa-x"></i> */}
          <svg
            onClick={e => {
              handleToggleFocus();
            }}
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            class="css-tj5bde-Svg"
            className="fa-chevron-down"
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
          {/* <i
            className="fa-solid fa-chevron-down"
            onClick={handleToggleFocus}
          ></i> */}
        </div>
        <div className={focus ? "open_ul" : "select_close"}>
          <ul onKeyDown={handleKeyDown}>
            {/* <li onClick={() => setValue("Seçin")}>Seçin</li> */}
            {filteredItems.length === 0
              ? items?.map(item => (
                  <li
                    key={item.id}
                    onClick={() => {
                      setValue(item);
                      handleChange({
                        value: item.id,
                        name: name,
                      });
                      setFocus(false);
                    }}
                    className={val.id === item.id ? "selectedItem" : ""}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        setValue(item);
                        handleChange({
                          value: item.id,
                          name: name,
                        });
                        setFocus(!focus);
                        alert("SDsda ");
                      }
                    }}
                  >
                    {item.text}
                  </li>
                ))
              : filteredItems.map(item => (
                  <li
                    key={item.id}
                    propId={item.id}
                    onClick={() => {
                      setValue(item);
                      handleChange({
                        value: item.id,
                        name: name,
                      });
                      setFocus(false);
                    }}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        setValue(item);
                        handleChange({
                          value: item.id,
                          name: name,
                        });
                        setFocus(!focus);
                      }
                    }}
                  >
                    {item.text}
                  </li>
                ))}
          </ul>
          <div
            className="Viewmore"
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <span>Hamisina bax</span>
            <img
              src="/icons/setting.svg"

              // onClick={() => setOpen(true)}
            ></img>
          </div>
        </div>
      </div>
      <ModalSelect
        setOpen={setOpen}
        open={open}
        type={type}
        height={height}
        width={width}
        setVal={handleChange}
        funcval={double ? handlechangeval : null}
      />
    </div>
  );
}
export default Selectnew;
