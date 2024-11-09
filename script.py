import pandas as pd
import requests
import io

# Make requests to get the CSV files
csv1_response = requests.get("https://raw.githubusercontent.com/datasets/s-and-p-500-companies/refs/heads/main/data/constituents.csv").content
csv2_response = requests.get("https://raw.githubusercontent.com/datasets/nasdaq-listings/master/data/nasdaq-listed.csv").content
                  
# Define the header mappings
header_mapping_file1 = { 'Security': 'Security_Name' } # 'Security' column in csv1 will be renamed to 'Security_Name'
header_mapping_file2 = {'Security Name': 'Security_Name'} # 'Security Name' column in csv2 will be renamed to 'Security_Name'

# Read and transform the CSV files
df1 = pd.read_csv(io.StringIO(csv1_response.decode('utf-8')))
df1.rename(columns=header_mapping_file1, inplace=True)

df2 = pd.read_csv(io.StringIO(csv2_response.decode('utf-8')))
df2.rename(columns=header_mapping_file2, inplace=True)

# Combine the DataFrames on common columns
combined_df = pd.concat([df1, df2], ignore_index=True)

# Drop duplicates, keeping the first occurrence (from csv1)
combined_df.drop_duplicates(subset='Security_Name', keep='first', inplace=True)

# Sort the DataFrame by 'Symbol'
combined_df.sort_values(by='Symbol', inplace=True)

# Save the combined DataFrame to a new CSV file
combined_df.to_csv('combined_file.csv', index=False)

