import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import s from "./AddItemForm.module.css";
import Button from "@mui/material/Button/Button";
import { styled } from "@mui/system";

type AddItemFormPropsType = {
    title: string;
    onAddItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(
    ({ title, onAddItem }) => {
        const [inputState, setInputState] = useState<string>("");
        const [error, setError] = useState<string | null>(null);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            error && setError(null);
            setInputState(e.currentTarget.value);
        };
        const onAddItemHandler = () => {
            if (inputState.trim()) {
                onAddItem(inputState);
                setInputState("");
            } else {
                setError("Field can not be empty");
            }
        };
        const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.code === "Enter") {
                onAddItemHandler();
            }
        };

        return (
            <div className={s.body}>
                <Box className={s.box}>
                    <TextField
                        size={"small"}
                        variant="outlined"
                        value={inputState}
                        error={!!error}
                        label={error}
                        placeholder={title}
                        onChange={onChangeHandler}
                        onKeyDown={onPressEnter}
                    />
                    <CustomButton onClick={onAddItemHandler}>
                        {"+"}
                    </CustomButton>
                </Box>
            </div>
        );
    }
);

const CustomButton = styled(Button)({
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    color: "white",
    padding: "1px",
    minWidth: "40px",
    marginLeft: "10px",
    fontWeight: 700,
    fontSize: 22,
});
