import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import styled from "styled-components";
import { Gap } from "..";
import QRCode from "qrcode.react";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TitleFont = styled.div`
  font-family: Epilogue;
  font-size: 24px;
  line-height: 36px;
  color: #171a1fff;
  font-weight: 800;
`;
const ValueFont = styled.div`
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #171a1fff;
`;
const Button = styled.div`
  width: 120px;
  height: 36px;
  padding: 0 12px;
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
  :hover {
    color: #ffffffff;
    background: #644fdcff;
  }
  :active {
    color: #ffffffff;
    background: #4d35d7ff;
  }
`;
const GrayButton = styled.div`
  width: 120px;
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #565e6cff;
  background: #f3f4f6ff;
  opacity: 1;
  border: none;
  border-radius: 4px;
  :hover {
    color: #565e6cff;
    background: #dee1e6ff;
  }
  :active {
    color: #565e6cff;
    background: #cfd2daff;
  }
`;
interface Props {
  visible: boolean;
  setVisible: Fuction;
  message: string;
}
export const Modal = ({ visible, setVisible, message }: Props) => {
  return (
    <Dialog
      open={visible}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setVisible(false)}
    >
      <div
        className="flex flex-col items-center"
        style={{ width: "300px", height: "auto" }}
      >
        <Gap height={18} />
        <QRCode
          value={message} // ????????????????????????
          size={270} // ??????????????????
          fgColor="#000000" // ??????????????????
        />
        <Gap height={30} />
        <ValueFont>????????????DAO Space NFT Pass</ValueFont>
        <ValueFont>??????66????????????72????????? ????</ValueFont>
        <ValueFont>??????????????????????????? ????</ValueFont>
        <Gap height={10} />
        <div className="flex justify-center">
          <GrayButton onClick={() => setVisible(false)}>????????????</GrayButton>
          {/* <Gap width={16} /> */}
          {/* <Button onClick={() => setVisible(false)}>??????</Button> */}
        </div>
        <Gap height={20} />
      </div>
    </Dialog>
  );
};
