import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import s from "./AddItemForm.module.css";
import Button from "@mui/material/Button/Button";
import { useDispatch } from "react-redux";

type AddItemFormPropsType = {
    title: string;
};

export const AddItemForm: FC<AddItemFormPropsType> = ({ title }) => {
    const [inputState, setInputState] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setInputState(e.currentTarget.value);
    };

    return (
        <div className={s.body}>
            <Box className={s.box}>
                <TextField
                    label="Todo list title..."
                    variant="outlined"
                    className={s.inputField}
                    onChange={onChangeHandler}
                />
                <Button className={s.btn} variant="contained">
                    {title}
                </Button>
            </Box>
        </div>
    );
};
