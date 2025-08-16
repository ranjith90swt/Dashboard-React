import React, { useEffect, useState } from "react";
import { StatCard } from "../components/StatCard";
import { FaIndianRupeeSign } from "react-icons/fa6";
import CommonModal from "../components/CommonModal";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";

const UserDashboard = () => {
  const [isOpenModel, setIsOpenModal] = useState(false);
  const [errors, setErrors] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // console.log(`userid ${userId}`);
  const { data: beneficiaries, loading } = useFetch(
    `http://localhost:3001/beneficiaries?userId=${userId}`
  );

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const { data: userData, refetch } = useFetch(
    `http://localhost:3001/users/${userId}`
  );
  const accountBalance = userData?.balance;
  console.log(`Balance ${accountBalance}`);

  const UserStats = [
    {
      title: "Account Balance",
      prefix: <FaIndianRupeeSign />,
      value: accountBalance,
      color: "primary",
      bgclass: "stat-bg1",
      link: "",
      buttonLabel: "",
    },
    {
      title: "Send Money",
      value: "",
      prefix: "$",
      color: "primary",
      bgclass: "stat-bg2",
      link: "",
      buttonLabel: "",
      buttonOnClick: handleOpenModal,
    },
    // {
    //     title: "Total Transactions",
    //     value: 2245,
    //     color: "primary",
    //     bgclass: "stat-bg3",
    // },
    // {
    //     title: "Last transaction",
    //     value: 3045,
    //     color: "primary",
    //     bgclass: "stat-bg4",
    // },
  ];

  const [formData, setFormData] = useState({
    beneficiaryName: "",
    accountNumber: "",
    transferAmount: "",
  });

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "beneficiaryName" && Array.isArray(data)) {
      const selectedBene = beneficiaries.find(
        (b) => b.beneficiaryName === value
      );
      if (selectedBene) {
        setFormData((prev) => ({
          ...prev,
          accountNumber: selectedBene.accountNumber,
        }));
      }
    }
  };

  // Change handleBeneficiaryChange to work with SelectField option object
  // const handleBeneficiaryChange = (selectedOption) => {
  //   if (!selectedOption) return;

  //   const selectedBene = data.find((b) => b.id === selectedOption.value);
  //   if (selectedBene) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       beneficiaryName: selectedBene.beneficiaryName,
  //       accountNumber: selectedBene.accountNumber,
  //     }));
  //   }
  // };

  // Just keep a single handler for SelectField
  const handleBeneficiaryChange = (e) => {
    const selectedId = e.target.value;

    const selectedBene = beneficiaries.find(
      (b) => String(b.id) === String(selectedId)
    );

    if (selectedBene) {
      setFormData((prev) => ({
        ...prev,
        beneficiaryId: selectedBene.id,
        beneUserID: selectedBene.userId,
        beneficiaryName: selectedBene.beneficiaryName,
        accountNumber: selectedBene.accountNumber,
      }));
    }
  };

  const handleSendMoney = async () => {
    if (!formData.beneficiaryName) {
      alert("Select Beneficiary");
      return;
    }

    if (!formData.transferAmount) {
      setErrors("Enter amount");
      return;
    }

    const senderId = userId;
    const amount = Number(formData.transferAmount);

    try {
      // 1. Fetch sender
      const senderRes = await fetch(`http://localhost:3001/users/${senderId}`);
      const sender = await senderRes.json();

      // 2. Find receiver by account number
      const receiverRes = await fetch(
        `http://localhost:3001/users?accountNumber=${formData.accountNumber}`
      );
      const receiverData = await receiverRes.json();

      if (receiverData.length === 0) {
        alert("Receiver not found");
        return;
      }

      const receiver = receiverData[0];
      const receiverId = receiver.id;

      // 3. Check balance
      if (sender.balance < amount) {
        alert("Insufficient Balance");
        return;
      }

      // 4. Update balances
      const updatedSender = { ...sender, balance: sender.balance - amount };
      const updatedReceiver = {
        ...receiver,
        balance: receiver.balance + amount,
      };

      await Promise.all([
        fetch(`http://localhost:3001/users/${senderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: updatedSender.balance }),
        }),
        fetch(`http://localhost:3001/users/${receiverId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: updatedReceiver.balance }),
        }),
      ]);

      // 5. Save transactions (two entries: debit + credit)
      await Promise.all([
        fetch("http://localhost:3001/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: crypto.randomUUID(),
            userId: senderId,
            counterpartyId: receiverId,
            amount,
            transactionType: "debit",
            fromAccount: sender.accountNumber, // 👈 store directly
            toAccount: receiver.accountNumber,
            date: new Date().toISOString(),
          }),
        }),
        fetch("http://localhost:3001/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: crypto.randomUUID(),
            userId: receiverId,
            counterpartyId: senderId,
            amount,
            transactionType: "credit",
            fromAccount: sender.accountNumber, // 👈 store directly
            toAccount: receiver.accountNumber,
            date: new Date().toISOString(),
          }),
        }),
      ]);

      alert("Money transferred successfully ✅");
      refetch();
    } catch (err) {
      console.error("Transfer failed", err);
      alert("Error in transfer");
    }
  };

  return (
    <>
      <h2 className="page-title">User Dashboard</h2>

      <div className="row">
        {UserStats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3 col-sm-6">
            <StatCard
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              color={stat.color}
              bgclass={stat.bgclass}
              buttonOnClick={stat.buttonOnClick}
            />
          </div>
        ))}
      </div>

      <CommonModal
        id="sendMoney"
        title="Send Money"
        onClose={() => {
          setIsOpenModal(false);
        }}
        isOpen={isOpenModel}
      >
        <SelectField
          name="beneficiaryName"
          className="mb-3"
          id="selectBeneficiary"
          placeholder="Select Beneficiary"
          label=""
          options={(beneficiaries || []).map((bene) => ({
            id: bene.id,
            value: bene.id, // store ID in value
            label: bene.beneficiaryName, // display name
          }))}
          onChange={handleBeneficiaryChange}
        />

        <InputField
          name="accountNumber"
          value={formData.accountNumber}
          placeholder="Account Number"
          onChange={handleInputChange}
          readOnly
        />

        <InputField
          name="transferAmount"
          placeholder="Enter amount"
          value={formData.transferAmount}
          onChange={handleInputChange}
        />
        {errors ? <p className="text-danger">{errors}</p> : null}

        <Button
          label="Send"
          onClick={handleSendMoney}
          className="mt-4 mb-3 mx-auto d-flex"
        ></Button>
      </CommonModal>
    </>
  );
};

export default UserDashboard;

{
  /* 

        User Module 

        1.Dashboard

          .Bank Balance . Send Money .View Statement . 

        2.beneficiary list
           
          .add beneficiary
          .delete beneficiary
        
        3. My Transactions history


        Admin Module 

        1. 

        */
}
