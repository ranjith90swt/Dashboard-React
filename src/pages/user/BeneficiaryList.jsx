import React, {useState} from "react";
import useFetch from "../../hooks/useFetch";
import CommonTable from "../../components/CommonTable";
import Card from "../../components/Card";
import Button from "../../components/Button";
import CommonModal from "../../components/CommonModal";
import InputField from "../../components/InputField";
import beneficiaryFormData from "../../data/beneficiary";
import { toast } from "react-toastify";

const BeneficiaryList = () => {
    const [addModal, setAddModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const {data, loading, error, refetch} = useFetch(`http://localhost:3001/beneficiaries?userId=${userId}`);
    console.log(data);
    console.log("Error", error);
   
    const [selectedBeneficiary, setSelectedBeneficiary] = useState();


    const columns = [
        {header: "ID", accessor: "id", sortable: true},
        {header: "Name", accessor: "beneficiaryName", sortable: true},
        {header: "Account Number", accessor: "accountNumber", sortable: true},
        {header: "Bank Name", accessor: "bankName", sortable: true},
        {header: "Status", accessor: "status", sortable: true},
        {header: "Action", accessor: "action",
            render: (row) =>{
                return(
                    <>
                        <button className='action-icon delete-icon' onClick={() => {
                            setSelectedBeneficiary(row)
                            setDeleteModal(true)
                        }}> Delete </button>
                    </>
                )
            }
        }
    ];

    const handleAddModal = () => {
        setAddModal(true);
    };

    const [formData, setFormData] = useState({
        userId: userId,
        beneficiaryName:'',
        bankName:'',
        accountNumber:'',
        status:'Active'


    })


   const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]:value,
        }))
    }

    const checkAccountExist = async (accountNumber) => {
        const res = await fetch(`http://localhost:3001/beneficiaries?accountNumber=${accountNumber}&userId=${userId}`);
        const data = await res.json();
        console.log(`data ${data}`);
        return data.length > 0;
    }

    // add beneficiary 
    const handleSubmit = async() =>{
        try {

            //validation 
            const newErrors = {}
            const nameRegex = /^[A-Za-z]+( [A-Za-z]+)?$/;
            const numberRegex = /^[0-9]+$/;


            if(!formData.beneficiaryName){
                newErrors.beneficiaryName = "Enter Name"
                console.log(`Enter Beneficiary Name`)
            }
            else if(!nameRegex.test(formData.beneficiaryName)){
                newErrors.beneficiaryName = "Enter String Only.."

            }

            if(!formData.bankName){
                newErrors.bankName = "Enter Bank Name"
            }
            else if(!nameRegex.test(formData.bankName)){
                newErrors.bankName = "Enter String only.."
            }

            if(!formData.accountNumber){
                newErrors.accountNumber = "Enter Account Number"
            }

            else if(!numberRegex.test(formData.accountNumber)){
                newErrors.accountNumber = "Numbers only allowed"
            }

            const exists = await checkAccountExist(formData.accountNumber);
            if(exists){
                newErrors.accountNumber = "Account Number already exists"
            }

            setErrors(newErrors);
            if(Object.keys(newErrors).length >0) {
              return 

            }

            const response = await fetch(`http://localhost:3001/beneficiaries`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData, userId}),
           })

           console.log(response);

           if(response.ok){
            const result = await response.json();
            //alert("added");
            toast.success("Added");
            setFormData({
                userID: '',
                beneficiaryName:'',
                bankName:'',
                accountNumber:'',
                status:''
            })
            
            setAddModal(false);
            refetch();
           }
            
        } catch (error) {
            
        }
    }

    //delete beneficiary
    const handleDelete = async () => {
        try {
            const deleteRes = await fetch(`http://localhost:3001/beneficiaries/${selectedBeneficiary.id}`, {
                method: 'DELETE'
            })

            if(!deleteRes.ok){
                throw new Error , 'Failed to delete'
            }

            console.log(`deleted ${deleteRes}`)
          
            toast.success('Beneficiary Deleted');
         
            setDeleteModal(false);
            setSelectedBeneficiary(null);
            refetch();
     
            


        } catch (error) {    
            console.error(error);
            toast.error('Error deleting beneficiary');

            
        }

    }






    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className="page-title">Beneficiary List</h2>
                <Button label="Add New" onClick={handleAddModal} />
            </div>
            {loading ? (
                <div>Loading..</div>
            ) : (
                <Card>
                    <CommonTable data={data} columns={columns} placeholder="Search by name" />
                </Card>
            )}

            <CommonModal
                id="AddBeneficiary"
                title="Add Beneficiary"
                isOpen={addModal}
                onClose={() => {
                    setAddModal(false);
                }}
                footer={
                    <>
                        <Button
                            label="Cancel"
                            onClick={() => {
                                setAddModal(false);
                            }}
                            variant="secondary"
                            size="sm"
                        />
                        <Button label="Save" variant="primary" size="sm" onClick={handleSubmit}/>

                    </>
                }
            >
               
                {
                  
                    beneficiaryFormData.map((list, index)=>(
                      
                    <div key={index} className="mb-3">
                      <InputField 
                      name={list.name}
                      placeholder={list.placeholder} 
                      className={list.className}
                      value= {formData[list.name]}
                      onChange={handleInputChange}
                      
                      />

                      {
                        errors[list.name] && (<p className="text-danger mt-0 text-small">{errors[list.name]}</p>)
                      }

                    </div> 
                    ))
                }
               




            </CommonModal>

            <CommonModal
              id="deleteBeneficiary"
              title="Confirm Delete Beneficiary"
              isOpen={deleteModal}
              onClose={() => setDeleteModal(false)}

              footer={
                <>
                <Button 
                  onClick={() => setDeleteModal(false)}

                  variant='secondary'
                  size='md'
                  label='Cancel'
                />
                <Button 
                  onClick={handleDelete}
                  variant='danger'
                  size='md'
                  label='Delete'
                >

                </Button>
                
                </>
              }
            >

                <p>
                    Are you sure you want to delete <strong>{selectedBeneficiary?.beneficiaryName}</strong>
                </p>

            </CommonModal>
        </>
    );
};

export default BeneficiaryList;
