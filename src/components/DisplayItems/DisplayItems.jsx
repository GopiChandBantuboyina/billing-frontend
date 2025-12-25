import { useContext, useState } from 'react';
import './DisplayItems.css'
import { AppContext } from '../../context/AppContext';
import Item from '../Item/Item';
import SearchBox from '../SearchBox/SearchBox';

const DisplayItems = ({selectedCategory}) => {
    const { items: itemsData } = useContext(AppContext);
    //changing name from items to itemsData

    const [searchText, setSearchText] = useState("");

    const filteredItems = itemsData.filter(item => {
        //we need to filter items based on category selected above and also search..
        // return item.name.toLowerCase().includes(searchText.toLowerCase());



        if(!selectedCategory) return true;
        return item.categoryId === selectedCategory;
    }).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div></div>
                    <div>
                        <SearchBox onSearch={setSearchText}/>
                    </div>
                
            </div>
            <div className="row g-3">
                {filteredItems.map((itemsData, index) => (
                    <div key={index} className='col-md-4 col-sm-6'>
                        <Item
                        
                        itemName={itemsData.name}
                        itemPrice={itemsData.price}
                        itemImage={itemsData.imgUrl}
                        itemId={itemsData.itemId}
                        
                        />

                    </div>
                ))}

            </div>
        </div>
    )
}

export default DisplayItems;