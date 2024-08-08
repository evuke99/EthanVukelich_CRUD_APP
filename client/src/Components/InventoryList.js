import React, { useEffect, useState } from "react";
import Axios from "axios";
import ItemModal from "./ItemModal";

const InventoryList = ({ update }) => {
  const [items, setItems] = useState([]);
  const [USER, setUSER] = useState("");
  const [updateState, setUpdateState] = useState(false);
  const [count, setCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("interval ran");
  //     setUpdateState((i) => count + 1);
  //   }, 500);
  //   return () => clearInterval(intervalId);
  // }, []);

  //   return () => {
  //     // Since useEffect dependency array is empty, this will be called only on unmount
  //     clearInterval(intervalId);
  //   };
  // });

  useEffect(() => {
    console.log("inventorylist use effect: ", update);
    let data = JSON.parse(localStorage.getItem("User"));
    let data1 = JSON.parse(localStorage.getItem("User"));
    let data2 = JSON.parse(localStorage.getItem("User"));
    let data3 = JSON.parse(localStorage.getItem("User"));
    // setUSER(data);
    console.log(data1);
    console.log(data2);
    console.log(data3);
    console.log(data);

    console.log("inventorylist use effect 2: ", update);
    const radioSelect = JSON.parse(localStorage.getItem("RADIO_SELECT"));
    let URL = "/api/inventory/getall";
    if (data != null && radioSelect === "USER_ITEMS") {
      const UserId = data._id;
      URL = `/api/inventory/getItem/${UserId}`;
    } else if (data != null && radioSelect === "ALL_ITEMS") {
      URL = "/api/inventory/getall";
    }
    Axios.get(URL)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, [update]);

  const toggleMoreInfo = () => {
    if (moreInfo) {
      setMoreInfo(false);
    } else {
      setMoreInfo(true);
    }
  };

  const toggleEdit = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
    toggleMoreInfo();
  };

  const handleSubmit = () => {
    toggleEdit();
  };

  const Card = ({ item, description }) => {
    if (editing) {
      return (
        <section
          key={item._id}
          className="card bg-base-300 text-white border shadow-lg"
        >
          <div className="card-body   ">
            <h2 className="card-title text-4xl ">
              <div className="input-box " contenteditable="true">
                {item.ItemName}
              </div>
              <div
                className=" input-box badge badge-secondary justify-end"
                contenteditable="true"
              >
                Qty: {item.Quantity}
              </div>
            </h2>
            <div className="input-box break-words" contenteditable="true">
              {description}
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={toggleEdit}>
                Submit
              </button>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section
          key={item._id}
          className="card bg-base-300 text-white border shadow-lg"
        >
          <div className="card-body   ">
            <h2 className="card-title text-4xl gap-5">
              <div className="">{item.ItemName}</div>
              <div className="badge badge-secondary" contenteditable="true">
                Qty: {item.Quantity}
              </div>
            </h2>

            <p className="break-words">{description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={toggleMoreInfo}>
                More Info
              </button>
              <button className="btn btn-primary" onClick={toggleEdit}>
                Edit
              </button>
              <button className="btn btn-primary">Delete</button>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-10 px-10 ">
      {console.log("InventoryList rendered")}
      {items.map((item) => {
        let description = "";
        console.log(moreInfo);
        if (item.Description.length <= 100 || moreInfo) {
          description = item.Description;
        } else {
          description = item.Description.substring(0, 100) + "...";
        }
        return (
          <Card item={item} description={description} />
          // <section key={item._id} className="card bg-primary text-white">
          //   <Card item={item} />
          //   <div className="card-body ">
          //     <h2 className="card-title">
          //       <div className="input-box">
          //         {item.ItemName} {item.Quantity}
          //       </div>
          //     </h2>
          //     <p className="break-words">{description}</p>
          //     <div className="card-actions justify-end">
          //       {/* <ItemModal Item={item} /> */}
          //     </div>
          //   </div>
          // </section>
        );
      })}
    </div>
  );
};

export default InventoryList;
