import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, BEARER_TOKEN } from "./config";
import queryString from "query-string";

export function useBusinessSearch(term, location) {
  const [businesses, setBusinesses] = useState([]);
  const [amountResults, setAmountResults] = useState();
  const [searchParams, setSearchParams] = useState({ term, location });

  useEffect(() => {
    setBusinesses([]);
    const query = queryString.stringify(searchParams);

    axios
      .get(`${API_BASE_URL}${"/businesses/search"}?${query}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          Origin: "localhost",
          withCredentials: true,
        },
      })
      .then((response) => {
        const resp = response?.data;
        setBusinesses(resp?.businesses);
        setAmountResults(resp?.total);
      });
  }, [searchParams]);
  return [businesses, amountResults, searchParams, setSearchParams];
}
