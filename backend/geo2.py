import geopy
import pandas as pd
from geopy.point import Point
import math

def get_zipcode(df, geolocator):
    
    if not math.isnan(df['LATITUDE']) and not math.isnan(df['LONGITUDE']):
        location = geolocator.reverse(Point(df['LATITUDE'], df['LONGITUDE']))
        return location.raw['address']['postcode']
    else:
        return "NA"

geolocator = geopy.Nominatim(user_agent='jlorenzidev@gmail.com')

df = pd.read_csv('eng.csv')
df.insert(8, column="ZIPCODE", value=None)
df['ZIPCODE'] = df.apply(get_zipcode, axis=1, geolocator=geolocator)
df.to_csv('zipcodes.csv', index=False)
