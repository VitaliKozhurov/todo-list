import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import { FilterValuesType } from "../../state/todoListReducer/todolists-reducer";
import { FC } from "react";
import React from "react";

type TaskFilterType = {
    filter: FilterValuesType;
    onChange: (value: FilterValuesType) => void;
};

export const TasksFilter: FC<TaskFilterType> = React.memo(
    ({ filter, onChange }) => {
        const onChangeSelect = (e: SelectChangeEvent<FilterValuesType>) => {
            const filterValue = e.target.value as FilterValuesType;
            onChange(filterValue);
        };

        return (
            <Select
                value={filter}
                onChange={onChangeSelect}
                style={{ width: "100%" }}
                size="small"
            >
                <MenuItem value={"all"}>All tasks</MenuItem>
                <MenuItem value={"active"}>Active tasks</MenuItem>
                <MenuItem value={"completed"}>Completed tasks</MenuItem>
            </Select>
        );
    }
);
