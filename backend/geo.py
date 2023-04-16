import json
import urllib.parse
import urllib.request

def postcode(lon, lat):
    base_url = 'https://nominatim.openstreetmap.org/reverse?'
    query_parameters = [
            ('lat', str(lat)), ('lon', str(lon)), ('format', 'json')
        ]
    try:
        url = f'{base_url}{urllib.parse.urlencode(query_parameters)}'
        request = urllib.request.Request(url)
        response = urllib.request.urlopen(request)
    
        print(json.loads(response.read().decode(encoding='utf-8'))['address']['postcode'])
    except:
        return

