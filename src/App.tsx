import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { makeStyles, ClassNameMap, createStyles } from "@mui/styles";
import doSearch, { SecurityDetails } from "./utils/apis";
import DataTable from "./Table";

const useStyles = makeStyles(() =>
    createStyles({
        searchBar: {
            width: "100%",
            marginTop: "10px"
        },
        button: {
            height: "100%"
        }
    })
);

function App() {
    const classes: ClassNameMap = useStyles();
    const [securityName, setSecurityName] = React.useState<string>("");
    const [exchangeCode, setExchangeCode] = React.useState<string>("US");
    const [searchResults, setSearchResults] = React.useState<SecurityDetails[]>();

    return (
        <>
            <div className={classes.searchBar}>
                <TextField
                    label="Security"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        setSecurityName(event.target.value);
                    }}
                    variant="outlined"
                    value={securityName}
                />
                <TextField
                    label="Exchange Code"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        setExchangeCode(event.target.value);
                    }}
                    variant="outlined"
                    value={exchangeCode}
                />
                <Button
                    onClick={async () => {
                        setSearchResults(await doSearch(securityName, exchangeCode));
                    }}
                    variant="contained"
                    disabled={!securityName && !exchangeCode}
                    className={classes.button}
                >
                    Submit
                </Button>
            </div>
            {searchResults?.length ? <DataTable securityDetailsList={searchResults} /> : "No results found!"}
        </>
    );
}

export default App;
