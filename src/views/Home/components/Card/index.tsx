import React, { useState } from "react";
import { Gap } from "@/components";
import ClickAwayListener from "@mui/base/ClickAwayListener";

export const Card = () => {
  const [open, setOpen] = useState(false);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}
    >
      <div
        className="flex mt-8 w-full flex-col transition-height shadow-lg"
        onClick={() => setOpen(true)}
        style={{
          borderRadius: "8px",
          width: "327px",
          height: open ? "489px" : "240px",
          paddingBottom: "80px",
        }}
      >
        <img
          src="src/assets/images/nft.jpg"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          style={{
            height: "160px",
            width: "100%",
            borderRadius: "8px 8px 0px 0px",
          }}
        ></img>
        <div className="flex justify-between w-full px-3 py-2 items-center">
          <div className="flex flex-col">
            <div className="small-medium-font">DAO SPACE</div>
            <Gap height={3} />
            <div className="flex">
              <img
                src="src/assets/images/position.png"
                width="20px"
                height="20px"
              />
              <Gap width={2} />
              <div className="normal-font">大理床单厂</div>
            </div>
          </div>
          <div className="border-wrap flex justify-center items-center">月</div>
        </div>
      </div>
    </ClickAwayListener>
  );
};
