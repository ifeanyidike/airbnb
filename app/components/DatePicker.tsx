import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";
import ClickOutside from "./ClickOutside";

type Props = {
  open: boolean;
  setOpen: (e: boolean) => void;
  customTop?: string;
};
const DatePicker = ({ open, setOpen, customTop }: Props) => {
  return (
    <ClickOutside handleClick={() => setOpen(false)}>
      <div
        className={`absolute z-20 bg-white max-[420px]:left-0 left-0 w-full h-72 ${
          customTop || "top-[180px]"
        } rounded-xl h-fit p-5 shadow-lg ring-1 ring-gray-600 ring-opacity-5 max-[420px]:w-full w-[90%]`}
      >
        <Datetime
          dateFormat="YYYY-MM-DD"
          timeFormat={false}
          input={false}
          isValidDate={(current) => moment().isSameOrBefore(current)}
        />
      </div>
    </ClickOutside>
  );
};

export default DatePicker;
