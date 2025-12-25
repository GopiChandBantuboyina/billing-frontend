import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../Service/ItemService";
import toast from "react-hot-toast";
import "./ItemList.css";

const ItemList =  () => {

    const {items, setItems} = useContext(AppContext);

    const [searchTerm, setSearchTerm] = useState("");

    const filterItems = items.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })


    const removeItem = async(itemId) => {
        try
        {
            const resp = await deleteItem(itemId);

            if(resp.status === 204)
            {
                const updatedItems = items.filter(item => item.itemId !== itemId);
                setItems(updatedItems);
                toast.success("Item deleted");
            }
            else{
                toast.error("Unable to delete item");
            }

        }
        catch(error)
        {
            console.log(error);
            toast.error("unable to delete item");

        }
    }

    return (
        <div className="category-list-container" style={{height:'100vh', overflowY:'auto', overflowX:'hidden'}}>
            
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text" name="keyword" id="keyword" placeholder="Search by keyword" className="form-control" onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}/>

                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>

            <div className="row g-3 pe-2">
                {/* Use filterItems here to display items list */}
                {
                    filterItems.map((item, index) => (
                        <div className="col-12" key={index}>
                            <div className="card p-3 bg-dark">
                                <div className="d-flex align-items-center">
                                    <div style={{marginRight : "15px"}}>
                                        <img src={item.imgUrl} alt={item.name} className="item-image"></img>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1 text-white">{item.name}</h5>
                                        <p className="mb-0 text-white">
                                            Category : {item.categoryName}
                                        </p>
                                        <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                                            &#8377;{item.price}
                                        </span>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger btn-sm"
                                         onClick={() => removeItem(item.itemId)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ItemList;