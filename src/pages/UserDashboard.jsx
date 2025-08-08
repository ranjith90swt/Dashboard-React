import React from "react";
import {StatCard} from "../components/StatCard";
import {FaIndianRupeeSign} from "react-icons/fa6";

const UserDashboard = () => {
    const UserStats = [
        {
            title: "Account Balance",
            prefix: <FaIndianRupeeSign />,
            value: 1240,
            color: "primary",
            bgclass: "stat-bg1",
        },
        {
            title: "Send Money",
            value: 3240,
            prefix: "$",
            color: "primary",
            bgclass: "stat-bg2",
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
                        />
                    </div>
                ))}
            </div>
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
