import React, { useState, useEffect } from "react";
import { Gap } from "@/components";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import styled from "styled-components";
import { signMessage } from "@wagmi/core";
import axios from "axios";
import { useAccount, useContractRead } from "wagmi";
import { ERC721Interface } from "@/ABI/ERC721";
import { Modal } from "@/components/Common/Modal";
const instance = axios.create({
  baseURL: "https://api.daospace.one",
  timeout: 300000,
  headers: { "X-Custom-Header": "foobar" },
});
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
  tokenId: number;
}
export const Card = ({ tokenId }: Props) => {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const activated = useContractRead({
    addressOrName: "0xce6685530FbA7cC34538149B2278e213Ce73FcDa",
    contractInterface: ERC721Interface,
    functionName: "activated",
    args: tokenId,
  });
  const expires = useContractRead({
    addressOrName: "0xce6685530FbA7cC34538149B2278e213Ce73FcDa",
    contractInterface: ERC721Interface,
    functionName: "expires",
    args: tokenId,
  });
  console.log(Number(activated.data), Number(expires.data));
  useEffect(() => {
    if (activated.data && expires.data) {
      setStartDate(new Date(Number(activated.data) * 1000));
      setEndDate(new Date(Number(expires.data) * 1000));
    }
  }, [activated.data, expires.data]);
  console.log(startDate, endDate);
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
            <div className="small-medium-font">DAO SPACE #{tokenId}</div>
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
                <TitleFont>开卡时间</TitleFont>
                <Gap height={8} />
                <ValueFont>
                  {" "}
                  {startDate ? `${startDate.toLocaleDateString()}` : ""}
                </ValueFont>
              </div>
              <div className="flex flex-col">
                <TitleFont>有效时间</TitleFont>
                <Gap height={8} />
                <ValueFont>
                  {" "}
                  {endDate ? `${endDate.toLocaleDateString()}` : ""}
                </ValueFont>
              </div>
            </div>
            <Gap height={18} />
            <Divider />
            <Gap height={24} />
            <div className="flex w-full justify-end">
              <Button
                onClick={async () => {
                  const sig = await signMessage({
                    message: "Open DAO SPACE with token " + tokenId,
                  });
                  console.log(sig);
                  let formdata = new FormData();
                  formdata.append("signature", sig);
                  formdata.append("address", address);
                  formdata.append(
                    "text",
                    "Open DAO SPACE with token " + tokenId
                  );
                  formdata.append("pass_id", tokenId);
                  const res = await instance.post(
                    "/v1/signature_check",
                    formdata
                  );
                  console.log(res, "aaa");
                  setMessage(res.data);
                  setVisible(true);
                }}
              >
                开门
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        <Modal visible={visible} setVisible={setVisible} message={message} />
      </div>
    </ClickAwayListener>
  );
};
