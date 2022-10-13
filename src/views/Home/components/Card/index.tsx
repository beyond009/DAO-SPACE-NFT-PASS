import React, { useState } from "react";
import { Gap } from "@/components";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import styled from "styled-components";
const Divider = styled.div`
  width: 100%;
  border-width: 1px;
  border-color: #bcc1caff;
  border-style: solid;
`;
const TitleFont = styled.div`
  font-weight: 500;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #171a1fff;
`;
const ValueFont = styled.div`
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #171a1fff;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #ffffffff;
  background: #7d6ce2ff;
  opacity: 1;
  border: none;
  border-radius: 4px;
  width: 102px;
  height: 36px;

  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.6;
  }
`;
interface Props {
  setVisible: Fuction;
}
export const Card = ({ setVisible }: Props) => {
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
        }}
      >
        <img
          src="./nft.jpg"
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
              <img src="./position.png" width="20px" height="20px" />
              <Gap width={2} />
              <div className="normal-font">大理床单厂</div>
            </div>
          </div>
          <div className="border-wrap flex justify-center items-center">月</div>
        </div>
        {open ? (
          <div className="flex flex-col items-center px-3">
            <Gap height={15} />
            <Divider />
            <Gap height={18} />
            <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full px-2">
              <div className="flex flex-col">
                <TitleFont>类型</TitleFont>
                <Gap height={8} />
                <ValueFont>月卡</ValueFont>
              </div>
              <div className="flex flex-col">
                <TitleFont>状态</TitleFont>
                <Gap height={8} />
                <ValueFont>有效</ValueFont>
              </div>
              <div className="flex flex-col">
                <TitleFont>卡面</TitleFont>
                <Gap height={8} />
                <ValueFont>NFT Pass研发组</ValueFont>
              </div>
              <div className="flex flex-col">
                <TitleFont>开卡时间</TitleFont>
                <Gap height={8} />
                <ValueFont>2022/10/13</ValueFont>
              </div>
            </div>
            <Gap height={18} />
            <Divider />
            <Gap height={24} />
            <div className="flex w-full justify-end">
              <Button onClick={() => setVisible(true)}>开门</Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </ClickAwayListener>
  );
};
