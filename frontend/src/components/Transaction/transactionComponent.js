import { useEffect, useState } from 'react';

export function TransactionComponent() {
    const [transactions, setTransactions] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await getAllTransactions({"id": localStorage.getItem("userId")});
    //         setOffers(response);
    //         setAllOffers(response);
    //     }
    //     fetchData();
    // }, []);
}
