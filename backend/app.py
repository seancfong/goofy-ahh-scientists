import json
import pandas as pd
import plotly.express as px
import plotly.io as pi
from pathlib import Path
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

l = [30, 7, 21, 12, 38, 39, 5, 31, 22, 48, 8, 16, 35, 44, 27, 33, 9, 4, 45, 23, 24, 49, 42, 46, 1, 3, 11, 10, 15, 20, 26, 13, 55, 50]
criminalLogsPath = Path.cwd()/'eng.csv'
df = pd.read_csv(criminalLogsPath)

geojsonPath = Path.cwd()/'limitespdq.geojson' 
geojson = json.load(open(geojsonPath, "r"))


@app.route('/hello', methods=['GET'])
@cross_origin()
def hello():
    jsonResp = {'jack': 4098, 'sape': 4139}
    print(jsonify(jsonResp))
    return jsonify(jsonResp)

@app.route('/precinct_search/<precinct>')
def precinct_search(precinct, crime = None):
    if(crime == None):
        return len(df.loc[df['PDQ'] == precinct])
    else:
        return len(df.loc[(df['PDQ'] == precinct) & (df['CATEGORY'] == crime)])

@app.route('/crime_search/<crime>')
def crime_search(crime, precinct = None):
    if(precinct == None):
        return len(df.loc[df['CATEGORY'] == crime])
    else:
        return len(df.loc[(df['PDQ'] == precinct) & (df['CATEGORY'] == crime)])

@app.route('/common_crime')
def common_crime():
    x = ['BREAKING AND ENTERING', 'MISCHIEF', 'THEFT FROM/TO A MOTOR VEHICLE', 'ROBBERY', 'MOTOR VEHICLE THEFT', 'MURDER RESULTING IN DEATH']
   
    d = dict()
    for y in l:
        b = []
        for i in x:
            b.append((i, len(df.loc[(df['PDQ'] == y) & (df['CATEGORY'] == i)])))
            
        d[y] = sorted(b, key = lambda x: x[1], reverse = True)[0]
    return d

@app.route('/create_map')
def create_map():
    #creates map of all districts and their total number of crimes
    d = {'PDQ': [], 'Count' : []}
    for i in l:
        d['PDQ'].append(i)
        d['Count'].append(df['PDQ'].value_counts()[i])
    totalcrimes = pd.DataFrame(d)
    fig = px.choropleth_mapbox(totalcrimes, geojson=geojson, 
                           color = "Count", 
                           locations="PDQ", featureidkey="properties.PDQ",
                           center={'lat': 45.508888, 'lon': -73.689931}, 
                           mapbox_style="dark", 
                           zoom=9,
                           opacity=.6,
                           color_continuous_scale=px.colors.sequential.YlOrRd,
                           )


    # fig.update_traces(hovertemplate="Precinct [%{location}]<br>Total Crimes: %{z}<br>")
    fig.update_traces(hovertemplate="", hoverinfo="none")
    fig.update_layout(coloraxis_colorbar_x=1)

    return pi.to_json(fig)
    
@app.route('/create_graph')
def make_graph():
    criminalLogsPath = Path.cwd()/'eng.csv'
    df = pd.read_csv(criminalLogsPath)

    yrs = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    dt = dict({'Years': ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'], 'Crimes Committed': []})
    for i in yrs:
        dt['Crimes Committed'].append(len(df.loc[df['DATE'].str.contains(i)]))
    
    d = pd.DataFrame.from_dict(dt)
    fig = px.bar(d, x='Years', y='Crimes Committed', color='Crimes Committed', color_continuous_scale=px.colors.sequential.OrRd)

    return pi.to_json(fig)


if __name__ == '__main__':
    app.run(port=8000, debug=True)