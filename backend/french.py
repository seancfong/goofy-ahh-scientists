import json
import pandas as pd
import plotly.express as px
import plotly.io as pi
from pathlib import Path

l = [30, 7, 21, 12, 38, 39, 5, 31, 22, 48, 8, 16, 35, 44, 27, 33, 9, 4, 45, 23, 24, 49, 42, 46, 1, 3, 11, 10, 15, 20, 26, 13, 55, 50]
criminalLogsPath = Path.cwd()/'eng.csv'
df = pd.read_csv(criminalLogsPath)

def precinct_search(precinct, crime = None):
    if(crime == None):
        return len(df.loc[df['PDQ'] == precinct])
    else:
        return len(df.loc[(df['PDQ'] == precinct) & (df['CATEGORY'] == crime)])
tupl = []
for i in l:
    tupl.append((i, precinct_search(i)))
print(sorted(tupl, key=lambda x: x[1]))
