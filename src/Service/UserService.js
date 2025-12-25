import axios from "axios";

//Make a call Adduser endpoint
export const addUser = async (user) => {

    return await axios.post("http://localhost:8080/api/v1.0/admin/register", user,
        {headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}});

};

//Make a call DeleteUser endpoint
export const deleteUser = async (userId) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/admin/users/${userId}`,
        {headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
     
};

//Make a call fetchUsers endpoint
export const fetchUsers = async () => {
    return await axios.get(`http://localhost:8080/api/v1.0/admin/users`, 
        {headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
     
};

