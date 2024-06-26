
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';



const CarDetails = (car) => {

    const {carid}= useParams();
    const [users,setUsers] =useState([]);
    const[itemData,setItemData] = useState([])
    const [clicking,setclikcing] = useState(0);



    /// by using the count to the perticular car

    const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);


  //to get the data from the query of luxurious car
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8888/car?type=luxurious');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

//   const toggleStatus = (car) => {
      
//     const newStatus = car.status === 'NotBooked' ? 'Booked' : 'Booked';
//       axios.put(`http://localhost:8888/car/${car.id}`, { ...car, status: newStatus })
//       .then(() => {
//         setItemData(itemData.map(item => item.id === car.id ? { ...item, status: newStatus } : item));
//       })
//       .catch((error) => {
//         console.error('There was an error updating the status!', error);
//       });
   
// };

  
  const handleAddOne =  (car) => {
    const newStatus = sessionStorage.getItem("user")
    const newcount = 1
      axios.put(`http://localhost:8888/car/${car.id}`, { ...car, user: newStatus })
      axios.put(`http://localhost:8888/car/${car.id}`, { ...car, count: newcount })
      .then(() => {
        setItemData(itemData.map(item => item.id === car.id ? { ...item, user: newStatus } : item));
      })
      .catch((error) => {
        console.error('There was an error updating the status!', error);
      });
      const updatedCars = cars.map(car => {
        if (car.carid === carid) {
          return { ...car, count: 1 }; // Set count to 1 for the clicked car
        }
        return car;
      });
   
    // const updatecount = 1;
  
    // try {
    //   const response =  axios.put(`http://localhost:8888/car/${carid}`, { count: updatecount });
    //   console.log("Status updated successfully");
    //   window.alert(`Status updated successfully for car ${carid}`);
    //   // Optionally update local state or UI to reflect the change
    // } catch (error) {
    //   console.error('Error updating status:', error);
    //   // Handle specific error cases if needed
    //   if (error.response && error.response.status === 404) {
    //     window.alert(`Car with id ${carid} not found.`);
    //   } else {
    //     window.alert('Failed to update status. Please try again later.');
    //   }
    // }
    // to display the car items in it
    

      

      setCars(updatedCars);

      // const carToUpdate = updatedCars.find(car => car.carid === carid);
      // await fetch(`http://localhost:8888/car/${carid}`, {
      //   method: 'PUT', // Update existing car using PUT
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(carToUpdate),
      // });
  };

    // fratching the car items this use effect was do 
    useEffect(()=>{
        featchCarItens() 
    },[])




    // fratching the userdetails items this use effect was do
    useEffect(()=>{
        UserDetails()
    },[])


    // by using the car = database name ?type= keyword , and = (value of the car item)
    const featchCarItens = () =>{
        axios.get("http://localhost:8888/car?type=luxurious").then((referance)=>{
            // setCarItems(referance.data)
            console.log(referance.data)
        }).catch((error)=>{})
    }
    const UserDetails = () =>{
        axios.get("http://localhost:8888/user").then((referance)=>{
          setUsers(referance.data)
            console.log(referance.data)
        }).catch((error)=>{})
    }

    // this below section was put the user id into the car database 

    // const handleButtonClick = (carId, userId) => {
    //   // Find the user to update
    //   const userToUpdate = users.find(user => user.id === userId);
    
    //   if (!userToUpdate) {
    //     console.error(`User with id ${userId} not found.`);
    //     return;
    //   }
    
    //   // Find the car to associate
    //   const carToAdd = cars.find(car => car.carid === carId);
    
    //   if (!carToAdd) {
    //     console.error(`Car with id ${carId} not found.`);
    //     return;
    //   }
    
    //   // Update user's cars array with the new car id
    //   const updatedUser = {
    //     ...userToUpdate,
    //     cars: [...userToUpdate.cars, carId]
    //   };
    
    //   // // PUT request to update user data with new car id
    //   // axios.put(`http://localhost:5000/users/${userId}`, updatedUser)
    //   //   .then(response => {
    //   //     console.log(`Car ${carId} added to user ${userId} successfully.`);
    //   //     // Optionally update local state or UI to reflect the changed
    //   //     setUsers(users.map(user => user.id === userId ? updatedUser : user));
    //   //   })
    //   //   .catch(error => {
    //   //     console.error('Error updating user data:', error);
    //   //     // Handle error, show error message, etc.
    //   //   });
    // };
    //end of the code

  return  <>

        {/* by using the session storage method for getting the username */}

  
        <div className="container mt-5">
      <div className="row">
        {
        
        cars.map((val, index) => (
            <div key={val.id}  className="col-lg-4 col-md-4 col-sm-6">
            <div className="card mb-3" id='card'>
              <img src={val.carimage} className="card-img-top" alt={val.name} style={{height:"300px"}} />
              <div className="card-body">
                <h5 className="card-title">{val.carname}</h5>
                <p className="card-text">CarRank: <strong> {val.carrank} </strong> type: <strong> {val.drivingtype} </strong>model : <strong> {val.carmodel}</strong></p>
                <p style={{alignItems:"right"}} className='float-right'>addning car:<strong> {val.count} </strong></p>
                <button key={users.id} onClick={() => handleAddOne(val)} className="btn btn-primary float-left">{val.price} Only/-  </button> 
              </div>  
              
            </div>
          </div>))}
      </div>
    </div>
    

        </>
        

        }
export default CarDetails