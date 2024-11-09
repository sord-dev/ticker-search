## Idea

- Using open datasets, aggregate as many up to date csv files containing stock ticker and company names to collate a list large list of them to query.
- Using this list, then utilzing the search to find information on the individual companies, specifically around earnings dates, and *potentially* the resultant revaluation of that company's stock.

### Reasoning/Requirements

- I can't remember when all these damn companies post their earnings...
- I'd like to create a watch-list of them to see if their recently posted earnings
    - Are they positive or negative?
    - Have they effected the stock price, if so, how?
- I'd like to be notified if there are upcoming earnings to be posted

## Resources

### Stock Tickers (http://datahub.io/docs/core-data)

- [data/constituents.csv](https://github.com/datasets/s-and-p-500-companies/blob/main/data/constituents.csv)
    - [raw](https://raw.githubusercontent.com/datasets/s-and-p-500-companies/refs/heads/main/data/constituents.csv)
- [data/nasdaq-listed-symbols.csv](https://github.com/datasets/nasdaq-listings/blob/main/data/nasdaq-listed.csv)
    - [raw](https://raw.githubusercontent.com/datasets/nasdaq-listings/master/data/nasdaq-listed.csv)
- [NASDAQ FTP Option](https://quant.stackexchange.com/a/9643)

### Earnings Calandar Data

- [Earnings Calandar API](https://api-ninjas.com/api/earningscalendar)
- [Earnings Calandar API (Detailed)](https://www.dolthub.com/repositories/post-no-preference/earnings)


### Aggregation of CSV Files

Can be acheved through many methods from initial research, python and pandas seems to be the best bet.
We need to handle for *different headers in each file*, to identify each different dataset's individual columns and normalizing them.

Refer to [script.py](./script.py)

### Hosting Options

- Azure [(est £1.40 p/m)](https://azure.com/e/a66ceffd3a0a4f629c2e51b67c01abd7)
  - Azure Function - Python, Storage Account, MongoDB Atlas
  - [IaC available (kind of)](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
  - [Quickstart: Create a function in Azure with Python using Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-python#deploy-the-project-to-azure)
  - [Deploy Azure Functions with Terraform - Max Ivanov](https://www.maxivanov.io/deploy-azure-functions-with-terraform/)

- Render [(est £12-£14 p/m)](https://render.com/pricing#static-sites)
  - Web Service, PostgreSQL
  - [IaC available](https://docs.render.com/blueprint-spec)

## Application Design

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