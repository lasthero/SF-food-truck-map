'use client'
import { useState, useEffect } from 'react';
import MapComponent from './map-component';
import type { foodTruckItem } from './map-component';



type foodCategoryCheckbox = {
    id: number,
    label: string,
    checked: boolean,
}


const FoodTruckMap = ({categories, foodtruckInfo }:{categories: string[], foodtruckInfo: foodTruckItem[] }) => {
  const [checkboxes, setCheckboxes] = useState(categories.map((item: string, idx: number) => ({id: idx, label: item, checked: false})));
  const [filteredFoodtruckInfo, setFilteredFoodtruckInfo] = useState<foodTruckItem[]>([]);

  const findCheckedFoodtruck = (foodtruckInfo: foodTruckItem[], checkboxes: foodCategoryCheckbox[]) => {
    let checkedCategories = checkboxes.filter(chk => chk.checked);
    return foodtruckInfo.filter(item => item.categories.some(cat => checkedCategories.some(checked => checked.label == cat)));
  };

  useEffect(() => {
    setFilteredFoodtruckInfo(findCheckedFoodtruck(foodtruckInfo, checkboxes));
  }, [checkboxes]);

  const handleCheckboxChange = (id: number) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  };

  
  
  return (
    
      <div className="flex max-w-screen mx-auto px-4">
          <div className='max-w-40'>
          {checkboxes.map((item: foodCategoryCheckbox) =>
                <div key={item.id}>
                    <input id={`checkbox-${item.id}`} type="checkbox" checked={item.checked} 
                        onChange={() => handleCheckboxChange(item.id)} />
                    <label htmlFor={`checkbox-${item.id}`}>{item.label}</label>
                </div>
              )}
          </div>
          <MapComponent data={filteredFoodtruckInfo} />
      </div>
  );
};


export default FoodTruckMap;
