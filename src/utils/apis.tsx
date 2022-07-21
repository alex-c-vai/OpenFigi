import axios, { AxiosInstance } from "axios";

/* 
    We are running a local Python Tornado server to work around CORS.
    Our Tornado server will just redirect our requests to openfigi, will change the request headers for us.
*/
const openfigiAxiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 5000,
    headers: {
        "Content-Type": "text/json"
    }
});

export type SecurityDetails = {
    figi: string;
    name: string;
    ticker: string;
    exchCode: string;
    compositeFIGI: string;
    securityType: string;
    marketSector: string;
    shareClassFIGI: string;
    securityType2: string;
    securityDescription: string;
};

export type SearchResponse = {
    data: SecurityDetails[];
};

export type SearchRequest = {
    securityName: string;
    exchangeCode: string;
};

export default async function doSearch(securityName: string, exchangeCode: string) {
    const response = await openfigiAxiosInstance.post<SearchRequest, { data: SearchResponse }>("/search", {
        securityName,
        exchangeCode
    });
    return response.data.data;
}
