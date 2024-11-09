## Stock Earnings Tracker

### Overview
This project aims to track earnings dates for a list of stocks and notify users of recently released earnings. It leverages various data sources and tools to aggregate information and provide a user-friendly interface.

### Data Sources
* **Stock Tickers:**
  - S&P 500: [https://github.com/datasets/s-and-p-500-companies](https://github.com/datasets/s-and-p-500-companies)
  - Nasdaq-Listed: [https://github.com/datasets/nasdaq-listings](https://github.com/datasets/nasdaq-listings)
* **Earnings Calendar Data:**
  - API Ninjas Earnings Calendar API: [https://api-ninjas.com/api/earningscalendar](https://api-ninjas.com/api/earningscalendar)
  - Dolthub Earnings Calendar: [https://www.dolthub.com/repositories/post-no-preference/earnings](https://www.dolthub.com/repositories/post-no-preference/earnings)

### Data Aggregation and Processing
1. **Data Collection:**
   - Fetch data from the specified sources.
   - Handle different CSV formats and potential data inconsistencies.
2. **Data Cleaning and Normalization:**
   - Clean and preprocess the data to ensure consistency.
   - Normalize data to a common format.
3. **Data Storage:**
   - Store the aggregated data in a suitable format (e.g., CSV, database).

### Application Design
1. **User Interface:**
   - A web-based interface to visualize the earnings calendar.
   - User profiles to manage watchlists and notifications.
2. **Backend Logic:**
   - Scheduled tasks to fetch and process data.
   - API endpoints to serve data to the frontend.
   - Notification system to alert users about upcoming or recently released earnings.

### Technical Stack
* **Frontend:** React or Vue.js
* **Backend:** Python (Flask or Django) or Node.js
* **Database:** PostgreSQL or MongoDB
* **Cloud Platform:** Azure or AWS
* **Data Processing:** Pandas, NumPy

### Deployment
* **Azure:**
  - Azure Functions for serverless execution.
  - Azure Storage Account for data storage.
  - Azure App Service for web application deployment.
* **Render:**
  - Web Service and PostgreSQL for backend.
  - Static Site for frontend.

### Future Improvements
* **Enhanced Notifications:** More granular notifications, including email and SMS.
* **Sentiment Analysis:** Analyze news articles and social media to gauge market sentiment.
* **Machine Learning:** Predict stock price movements based on earnings and other factors.
* **Integration with Trading Platforms:** Direct integration with popular trading platforms.


### Code Flow

1. A scheduled job aggregates all ticker & company name info into a main csv
2. Csv is either processed into a db, or stored in blob storage
3. Csv information is loaded into backend service to then be checked and displayed on front end**¹**
4. User requests for information on specific tickers
5. We utilize an external earnings calandar api to display the information of the tickers

**¹** - This checking consists of reviewing user's watch-listed tickers and providing a notification if there was an update in the past 3 days they had not previously aknowledged.
  
Example notification:
```json
{ "user_id": 122, "ak": false, "ticker": "TLSA", "actual_revenue": 25182000000, "estimated_revenue": 25468371161 }
```

### Earnings Calandar

- Would like a full calandar view of all watched tickers (can toggle)
- A list of all comapanies on the date selected **and** an option to click to that individual event

![https://markets.businessinsider.com/earnings-calendar](https://i.ibb.co/HpgBZqS/Screenshot-1.png)
![https://www.qualtrim.com earnings-calendar](https://i.ibb.co/vBt380D/Screenshot-1.png)


### General theme

- If we can get more information about the individual stock from other places then even better
![https://www.qualtrim.com/](https://www.qualtrim.com/assets/landing/watchlist.png)
![https://www.qualtrim.com/](https://www.qualtrim.com/assets/landing/splash-img.png)

**To get started:**
1. Clone this repository.
2. Set up the required environment (Python, Node.js, etc.).
3. Install dependencies using `pip install -r requirements.txt`.
4. Configure the data sources and API keys.
5. Run the data aggregation script.
6. Deploy the frontend and backend applications.
