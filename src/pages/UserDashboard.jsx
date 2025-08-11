import React, { useState } from "react";
import {StatCard} from "../components/StatCard";
import {FaIndianRupeeSign} from "react-icons/fa6";
import CommonModal from "../components/CommonModal";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

const UserDashboard = () => {

    const [isOpenModel, setIsOpenModal] = useState(false);

    const handleOpenModal = () =>{
        setIsOpenModal(true)
    }
    
    const handleSendMoney = () =>{
        
    }

    const UserStats = [
        {
            title: "Account Balance",
            prefix: <FaIndianRupeeSign />,
            value: 1240,
            color: "primary",
            bgclass: "stat-bg1",
            link:"",
            buttonLabel:"",
        },
        {
            title: "Send Money",
            value: '',
            prefix: "$",
            color: "primary",
            bgclass: "stat-bg2",
            link:"",
            buttonLabel:"",
            buttonOnClick: handleOpenModal
        },
        {
            title: "Total Transactions",
            value: 2245,
            color: "primary",
            bgclass: "stat-bg3",
        },
        {
            title: "Last transaction",
            value: 3045,
            color: "primary",
            bgclass: "stat-bg4",
        },
    ];

  

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
                            buttonOnClick= {stat.buttonOnClick}
                        />
                    </div>
                ))}
            </div>

            <CommonModal
              id="sendMoney"
              title="Send Money"
              onClose={() => {
                setIsOpenModal(false)

              }}
              isOpen={isOpenModel}
            >
            <SelectField 
            className="mb-3"
            id='selectBeneficiary'
            placeholder="Select Beneficiary"
            label=''
            options={[
                {value:"Bene 1", label:"Bene 1"},
                {value:"Bene 1", label:"Bene 1"},
                {value:"Bene 1", label:"Bene 1"}
            ]}
            >

            </SelectField>
            <InputField placeholder="Enter amout"/>

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
