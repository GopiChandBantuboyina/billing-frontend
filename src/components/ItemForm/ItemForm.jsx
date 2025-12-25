import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addItem } from "../../Service/ItemService";

const ItemForm = () => {

  const {categories, items, setItems, setCategories} = useContext(AppContext);  

  const [image, setImage] = useState(false);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name : "",
    categoryId : "",
    price : "",
    description : "",

  });

  const onChangeHandler = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({...data, [name]: value }))


  }

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try{
      if(!image)
      {
        toast.error("Select image...");
        setLoading(false);
        return
      }

      const resp = await addItem(formData);
      if(resp.status === 201)
      {
        setItems([...items,resp.data])
        //TODO : update the category state
        setCategories(prev =>
          prev.map(cat =>
            cat.categoryId === data.categoryId
              ? { ...cat, items: cat.items + 1 }
              : cat
          )
        );

        toast.success("Item added successfully");
        setData({
          name:"",
          categoryId:"",
          description:"",
          price:""
        })
        setImage(false);
      }
      else
      {
        toast.error("Unable to add item");
      }

    }
    catch(e)
    {
      console.log(e);
      toast.error("unable to add item");


    }
    finally
    {
      setLoading(false);
    }


  }

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form onSubmit={onsubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48} style={{cursor:"pointer"}}/>
                  </label>

                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                    
                    
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    {" "}
                    Name{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item Name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="categoryId"
                    id="category"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                    required
                  >
                    <option value="">--SELECT CATEGORY--</option>
                    {
                      categories.map((category, index) => (
                        <option key={index} value={category.categoryId}>{category.name}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="&#8377;200.00"
                    onChange={onChangeHandler}
                    value={data.price}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    {" "}
                    Description{" "}
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Write content here.."
                    onChange={onChangeHandler}
                    value={data.description}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
