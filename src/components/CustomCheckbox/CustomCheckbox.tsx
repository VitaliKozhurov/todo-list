import { Checkbox } from "@mui/material";
import React from "react";
import { ChangeEvent, FC } from "react";
type CheckBoxType = {
    checked: boolean;
    disabled:boolean;
    color:
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning"
        | "default";
    callback: (status: boolean) => void;
};
export const CustomCheckbox: FC<CheckBoxType> = React.memo(
    ({ checked, color,disabled, callback }) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            callback(e.currentTarget.checked);
        };
        return (
            <Checkbox
                checked={checked}
                color={color}
                onChange={onChangeHandler}
                disabled={disabled}
            />
        );
    }
);
