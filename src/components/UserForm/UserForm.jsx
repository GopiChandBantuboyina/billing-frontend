import { useState } from "react";
import { addUser } from "../../Service/UserService";
import toast from "react-hot-toast";

const UserForm = ({setUsers}) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email : "",
        password : "",
        role : "ROLE_USER"
    });

    const onChangeHandler = (e) => {
        const name = e.target.name 
        const value = e.target.value


        setData((data) => ({...data, [name] : value}));


    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            //make an API call addUSer
            const response = await addUser(data);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            toast.success("User registered successfully");
            setData({
                name:"",
                email:"",
                password:"",
                role:"ROLE_USER"
            })
        }
        catch (error) {
            const status = error.response ? error.response.status : null;
            const message = error.response?.data?.message || "Error occurred while adding user";

            if (status === 409) {
                toast.error(message); // duplicate user
            } 
            else if (status === 401) {
                toast.error("Unauthorized! Please log in first.");
                // Optional: redirect to login page
                // navigate("/login");
            } 
            else if (status === 403) {
                toast.error("Access denied! You don’t have permission to perform this action.");
            } 
            else {
                toast.error(message);
            }
        }

        finally
        {
            setLoading(false);
        }
    }


    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label"> Name </label>
                                <input type="text" name="name" id="name" className="form-control" placeholder="John Doe"
                                value={data.name}
                                onChange={onChangeHandler}
                                required/>
                                
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label"> Email </label>
                                <input type="email" name="email" id="email" className="form-control" placeholder="yourname@example.com"
                                value={data.email}
                                onChange={onChangeHandler}
                                required/>
                                
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label"> Password </label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="********"
                                value={data.password}
                                onChange={onChangeHandler}
                                required/>
                                
                            </div>

                            
                            <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "Loading..." : "Save"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm;