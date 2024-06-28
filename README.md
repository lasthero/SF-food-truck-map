# San Francisco Food Truck Map
![GitHub deployments](https://img.shields.io/github/deployments/lasthero/sf-food-truck-map/production?logo=vercel&logoColor=white&label=vercel)

Lets' eat! In this repo I used [San Francisco's food truck open dataset](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data) to create markers/pin in Google map using [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) for each food truck's location and it's information such as food items and address info. I also used a simple Natural Language Processing tool [compromise](https://www.npmjs.com/package/compromise) to extract food categories from each food truck's food items so in the web page we can filter the food truck markers/pins by their categories. 
## Tech Stack
- I used [Nextjs](https://nextjs.org/) becasue of its performance and easy-to-use. This project was quickly setup with [create-next-app](https://www.npmjs.com/package/create-next-app) as a Nextjs app along with Typescript and Tailwind CSS.
- I used [Vercel](https://vercel.com/) for deploy becaue this is a Nextjs app and the integration is pretty seamless. 
## How to run this project locally
In order to run this project locally, you will need to have a `.env` file in the root directory of this project locally. In the `.env` file, it should have the following entries:
```
NEXT_PUBLIC_GMAP_API_KEY=<Google map API Key>
SF_FOODTRUCK_ENDPOINT=<End point of SF's food truck data>
```
You will need to create an Google Map API key and put the value in `NEXT_PUBLIC_GMAP_API_KEY` in order to use Google Map API. More details [here](https://lonare.medium.com/how-to-embed-google-maps-on-your-next-js-app-in-3-steps-ad3d26de96ec) on how to generate a Google Map API key.

The second entry `SF_FOODTRUCK_ENDPOINT` is optional. It is needed if you need to run the `fetch-data` script to refresh the food truck info json file, which is stored in the `/public` directory.
If you want to refresh the json data, run `npm run fetch-data` and the food truck json data will be updated.

To start the website locally, simply run `npm run dev` you should be able to load the page in your browser!
## Implementation Details
- Data processing: I wrote a javascript program in `utils/fetch-and-parse.js` to fetch food truck data from the end point. Then I used a Natural Language Porcessing to match each's food truck's food items with a predefined food categories. This is used to generate a checkbox list to filter food trucks in the map by food categories (e.g. Pizzas, Fried Chicken, etc). 
- Display food truck locations on the map: The processed josn data is used to create markers/pins for each food truck in the google map. For each food truck marker on the map a popup info window will be opened showing more detail information when the marker is clicked. The food category checkbox list is used to filter/refine the food truck list shown on the map.

## Tradeoffs and further improvements
- JSON Data is generated async, not real time: I made this choice becasue hitting the end point everytime we load the page is a performace hit and could be error prone in case the end point we rely on becomes unreliable. Therefore I created a separate process to fetch and process data then store it as a static json file to be served to the web page. Even though data isn't real time, I feel this is a more robust and self contain approach. Additionally, I was trying to incorporate this process into build process so data is refreshed every time it deploys on vercel unfortunately I couldn't get it to work because vercel's deploy platform is `ephemeral` meaning files generated during the build process won't be kept and accessible. We can solve this by putting the generated json file to cloud such as S3 bucket if I had more time. 
- The food category list is static. We can generate this list dynamically by training the language model for example. But I hard coded it for now due to the time constraint.
- The end point data can be furter sanitized and utilized: I observed that some entries seemed duplicated and it could be the schedule (food trucks often be at different locations depends on the days). So as a further improvement we can fetch food trucks that are currently opened based on their schedule information. Also there're entries showing the license status `EXPIRED` so further clarification is needed and we might not want to display those food trucks. 