import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ClassNameMap, createStyles, makeStyles } from "@mui/styles";
import { SecurityDetails } from "./utils/apis";

const useStyles = makeStyles(() =>
    createStyles({
        dataGridContainer: {
            height: 700,
            width: "100%"
        }
    })
);

type DataTableProps = {
    securityDetailsList: SecurityDetails[];
};

interface TableRowData extends SecurityDetails {
    id: number;
}

export default function DataTable(props: DataTableProps) {
    const classes: ClassNameMap = useStyles();

    // we're doing this because this project is using the AirBnb eslint standards
    const { securityDetailsList } = props;

    const buildTableColumns = React.useCallback(
        // eslint-disable-next-line no-shadow
        (securityDetailsList: SecurityDetails[]): GridColDef[] =>
            Object.keys(securityDetailsList[0]).map(
                (securityDetailsKey: string): GridColDef => ({
                    field: securityDetailsKey,
                    headerName: securityDetailsKey,
                    flex: 1
                })
            ),
        [securityDetailsList]
    );

    const buildRowData = React.useCallback(
        (securityDetails: SecurityDetails[]): TableRowData[] =>
            securityDetails.map(
                (securityDetail: SecurityDetails, index: number): TableRowData => ({
                    id: index,
                    ...securityDetail
                })
            ),
        [securityDetailsList]
    );

    return (
        <div className={classes.dataGridContainer}>
            <DataGrid
                rows={buildRowData(securityDetailsList)}
                columns={buildTableColumns(securityDetailsList)}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    );
}
