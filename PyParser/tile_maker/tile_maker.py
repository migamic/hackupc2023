import io
import requests
from PIL import Image
import math


def get_tile_coordinates(latitude, longitude, zoom):
    print('Computing coordinates for', latitude, longitude)
    x = math.floor((longitude + 180) / 360 * 2**zoom)
    y = math.floor((1 - math.log(math.tan(latitude * math.pi / 180) + 1 / math.cos(latitude * math.pi / 180)) / math.pi) / 2 * 2**zoom)
    return x, y

def get_tile_url(lon, lat, zoom):
    #return f"https://a.tile.openstreetmap.org/{zoom}/{x}/{y}.png"
    API_key = "HKlsavnOj0SpKzlEUbMe"
    lat_rad = math.radians(lat)
    x,y = get_tile_coordinates(lat, lon, zoom)
    return f"https://api.maptiler.com/maps/basic-v2/{zoom}/{x}/{y}.png?key=HKlsavnOj0SpKzlEUbMe"

def get_tile_image(x, y, zoom):
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0'
    }

    url = get_tile_url(x, y, zoom)
    print(url)
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Error downloading tile at {url}: {response.status_code} {response.reason}")
        return None
    try:
        image = Image.open(io.BytesIO(response.content))
        return image
    except (IOError, OSError) as e:
        print(f"Error opening tile at {url}: {str(e)}")
        return None


def get_map_image(center, zoom, size):
    lat, lon = center
    lat_rad = lat * (3.14159265358979323846 / 180.0)
    n = 2.0 ** zoom
    x = int((lon + 180.0) / 360.0 * n)
    y = int((1.0 - (math.log(math.tan(lat_rad) + (1 / math.cos(lat_rad))) / math.pi)) / 2.0 * n)
    tile_size = 256
    tiles_per_side = int(math.ceil(size / tile_size))
    image = Image.new("RGB", (size, size))
    for i in range(tiles_per_side):
        for j in range(tiles_per_side):
            print(f'Done {i},{j}')
            print(x, y, zoom)
            tile_image = get_tile_image(x + i, y + j, zoom)
            image.paste(tile_image, (i * tile_size, j * tile_size))
    return image

center = (41.3896233, 2.1619824)
zoom = 8
size = 512
image = get_map_image(center, zoom, size)
image.save("darkmap.png")

