import json
import pandas as pd
import plotly.express as px
import plotly.io as pi
from pathlib import Path

def make_graph(df):
    yrs = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    dt = dict({'Years': ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'], 'Crimes Committed': []})
    for i in yrs:
        dt['Crimes Committed'].append(len(df.loc[df['DATE'].str.contains(i)]))
    
    d = pd.DataFrame.from_dict(dt)
    fig = px.bar(d, x='Years', y='Crimes Committed')
    fig.show()
    return 
criminalLogsPath = Path.cwd()/'eng.csv'
df = pd.read_csv(criminalLogsPath)
make_graph(df)