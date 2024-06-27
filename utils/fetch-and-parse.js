const axios = require('axios');
const nlp = require('compromise');
const fs = require('fs');

const foodItems = [
    'Asian', 'Gyro', 'Tacos', 'Pizzas', 'American', 'Fried Chicken', 'South American', 'Salad', 'Sandwich', 'Others'
  ];
const extractFoodItems =  (text) => {
  const doc = nlp(text);
  const foundItems = [];

  foodItems.forEach(item => {
    if (doc.has(item)) {
      foundItems.push(item);
    }
  });
  if (foundItems.length == 0) foundItems.push('Others');
  return foundItems;
};

const writeToJSON = (data) => {
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON string to a file
    fs.writeFile('public/foodtruck-info.json', jsonData, (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('Successfully wrote to file');
    }
    });
}
axios.get('https://data.sfgov.org/resource/rqzj-sfat.json')
  .then(response => {
    let data = response.data;
    data.forEach(item => {
        item.foodCategories = extractFoodItems(item.fooditems);
        // console.log(item.fooditems);
    });
    writeToJSON({foodtrcuks: data, categories: foodItems});
  })
  .catch(error => {
    console.error('There was an error making the request:', error);
  });
