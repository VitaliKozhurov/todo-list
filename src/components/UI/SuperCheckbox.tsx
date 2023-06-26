import { Checkbox } from "@mui/material";
import { ChangeEvent, FC } from "react";
type CheckBoxType = {
    checked: boolean;
    color:
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning"
        | "default";
    callback: (value: boolean) => void;
};
export const SuperCheckBox: FC<CheckBoxType> = ({
    checked,
    color,
    callback,
}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked);
    };
    return (
        <Checkbox checked={checked} color={color} onChange={onChangeHandler} />
    );
};
