import { TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type SearchProps = {
    value: string;
    setQuery: Dispatch<SetStateAction<string>>;
};

export function Search({ value, setQuery }: SearchProps) {
    return (
        <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="Search"
            label="Search"
            variant="outlined"
            value={value}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
