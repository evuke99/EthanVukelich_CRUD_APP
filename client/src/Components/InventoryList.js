import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const InventoryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/inventory/getall")
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        else return res.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  }, []);

  return (
    <div
      data-theme="dark"
      className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-10 px-10"
    >
      {items.map((item) => {
        let description = "";
        if (item.Description.length <= 100) {
          description = item.Description;
        } else {
          description = item.Description.substring(0, 100) + "...";
        }
        return (
          <section key={item._id} className="card bg-primary text-white">
            <div className="card-body ">
              <h2 className="card-title">
                {item.ItemName} {item.Quantity}
              </h2>
              <p className="break-words">{description}</p>
              <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default InventoryList;
