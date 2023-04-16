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
        return len(df.loc[(df['PDQ'] == precinct) & (df['Category'] == crime)])

@app.route('/crime_search/<crime>')
def crime_search(crime, precinct = None):
    if(precinct == None):
        return len(df.loc[df['Category'] == crime])
    else:
        return len(df.loc[(df['PDQ'] == precinct) & (df['Category'] == crime)])

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
                           center={'lat': 45.508888, 'lon': -73.561668}, 
                           mapbox_style="carto-positron", 
                           zoom=9,
                           opacity=.5,
                           color_continuous_scale=px.colors.sequential.Peach,
                           )

    
    # fig.update_layout(margin={"r":10,"t":10,"l":10,"b":100})

    return pi.to_json(fig)
    
if __name__ == '__main__':
    app.run(port=8000, debug=True)