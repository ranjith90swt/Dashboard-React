import React from "react";
import CommonTable from "../../components/CommonTable";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import formatDate from "../../constants/formateDate";

const UserTransactions = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const { data, loading, error, refetch } = useFetch(
    `http://localhost:3001/transactions?userId=${userId}`
  );

  console.log(data);

  const columns = [
    {
      header: "Date",
      accessor: "date",
      sortable: true,
      render: (row) => formatDate(row.date),
    },
    { header: "From", accessor: "fromAccount", sortable: true },
    { header: "To", accessor: "toAccount", sortable: true },
    { header: "Tranfer Amount", accessor: "amount", sortable: true },
    {
      header: "Transfer Type",
      accessor: "transactionType",
      sortable: true,
      render: (row) => (
        <span
          style={{ color: row.transactionType === "credit" ? "green" : "red" }}
        >
          {row.transactionType}
        </span>
      ),
    },
  ];
  return (
    <>
      <h2 className="page-title">Transactions History</h2>
      <Card>
        <CommonTable data={data} columns={columns} />
      </Card>
    </>
  );
};

export default UserTransactions;
