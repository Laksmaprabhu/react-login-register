import { useState, useEffect } from "react";
import axios from "axios";
const UserList = () => {

    const [data, setData] = useState([]);
const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get('http://localhost:5000/api/users/list',  {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data.message);
                setData(response.data.message);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[])
    return(
        <>
        <div>
            <ul>
     {data.map((item) => (
        <li>
            {item.name}     
        </li>
     ))}
      </ul>
      </div>
        </>
    )
}

export default UserList;