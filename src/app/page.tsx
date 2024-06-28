import fs from 'fs';
import path from 'path';
import FoodTruckMap from '@/components/foodstruck-map';
import type { foodTruckItem } from '@/components/map-component';

const readDataFromJson = () => {
  const filePath = path.join(process.cwd(), 'public', 'foodtruck-info.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return data;
}

export default function Home() {
  const data = readDataFromJson();
  const processedFoodtruckInfo: foodTruckItem[] = data.foodtrcuks.map((item: any) => {

    return {
      id: item.objectid,
      applicant: item.applicant,
      fooditems: item.fooditems,
      locationdescription: item.locationdescription,
      location: {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)},
      categories: item.foodCategories,
    }

  });

  return (
      <FoodTruckMap  categories={data.categories} foodtruckInfo={processedFoodtruckInfo} />
  );
}
