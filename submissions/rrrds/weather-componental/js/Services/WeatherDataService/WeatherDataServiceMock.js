import IWeatherDataService from './IWeatherDataService';

const mockCurrent = {
  coord: {
    lon: -0.13,
    lat: 51.51
  },
  weather: [
    {
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10d'
    }
  ],
  base: 'stations',
  main: {
    temp: 6.14,
    pressure: 1003,
    humidity: 70,
    temp_min: 4,
    temp_max: 8.33
  },
  visibility: 10000,
  wind: {
    speed: 5.7,
    deg: 240
  },
  rain: {
    '1h': 0.76
  },
  clouds: {
    all: 0
  },
  dt: 1551777031,
  sys: {
    type: 1,
    id: 1414,
    message: 0.0073,
    country: 'GB',
    sunrise: 1551767817,
    sunset: 1551808073
  },
  id: 2643743,
  name: 'London',
  cod: 200
};

const mockForecast = {
  cod: '200',
  message: 0.0077,
  cnt: 40,
  list: [
    {
      dt: 1551787200,
      main: {
        temp: 10.13,
        temp_min: 10.13,
        temp_max: 10.32,
        pressure: 1003.71,
        sea_level: 1003.71,
        grnd_level: 996.36,
        humidity: 67,
        temp_kf: -0.19
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d'
        }
      ],
      clouds: {
        all: 20
      },
      wind: {
        speed: 5.21,
        deg: 233
      },
      rain: {},
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-05 12:00:00'
    },
    {
      dt: 1551798000,
      main: {
        temp: 9.94,
        temp_min: 9.94,
        temp_max: 10.09,
        pressure: 1003.35,
        sea_level: 1003.35,
        grnd_level: 995.92,
        humidity: 67,
        temp_kf: -0.15
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 5.81,
        deg: 218.001
      },
      rain: {
        '3h': 0.395
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-05 15:00:00'
    },
    {
      dt: 1551808800,
      main: {
        temp: 8.26,
        temp_min: 8.26,
        temp_max: 8.36,
        pressure: 1002.16,
        sea_level: 1002.16,
        grnd_level: 994.57,
        humidity: 89,
        temp_kf: -0.1
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 4.59,
        deg: 195
      },
      rain: {
        '3h': 2.195
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-05 18:00:00'
    },
    {
      dt: 1551819600,
      main: {
        temp: 9.01,
        temp_min: 9.01,
        temp_max: 9.06,
        pressure: 1000.94,
        sea_level: 1000.94,
        grnd_level: 993.56,
        humidity: 92,
        temp_kf: -0.05
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 100
      },
      wind: {
        speed: 5.01,
        deg: 191.5
      },
      rain: {
        '3h': 0.5975
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-05 21:00:00'
    },
    {
      dt: 1551830400,
      main: {
        temp: 8.52,
        temp_min: 8.52,
        temp_max: 8.52,
        pressure: 998.61,
        sea_level: 998.61,
        grnd_level: 991.23,
        humidity: 95,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 6.81,
        deg: 187.503
      },
      rain: {
        '3h': 2.255
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-06 00:00:00'
    },
    {
      dt: 1551841200,
      main: {
        temp: 7.93,
        temp_min: 7.93,
        temp_max: 7.93,
        pressure: 994.11,
        sea_level: 994.11,
        grnd_level: 986.69,
        humidity: 94,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 7.52,
        deg: 189.5
      },
      rain: {
        '3h': 2.225
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-06 03:00:00'
    },
    {
      dt: 1551852000,
      main: {
        temp: 9.89,
        temp_min: 9.89,
        temp_max: 9.89,
        pressure: 990.47,
        sea_level: 990.47,
        grnd_level: 983.11,
        humidity: 95,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 8.22,
        deg: 198.504
      },
      rain: {
        '3h': 2.9
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-06 06:00:00'
    },
    {
      dt: 1551862800,
      main: {
        temp: 11.49,
        temp_min: 11.49,
        temp_max: 11.49,
        pressure: 990.3,
        sea_level: 990.3,
        grnd_level: 983.03,
        humidity: 94,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 7.27,
        deg: 215.502
      },
      rain: {
        '3h': 0.405
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-06 09:00:00'
    },
    {
      dt: 1551873600,
      main: {
        temp: 11.98,
        temp_min: 11.98,
        temp_max: 11.98,
        pressure: 989.1,
        sea_level: 989.1,
        grnd_level: 981.76,
        humidity: 92,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 76
      },
      wind: {
        speed: 6.26,
        deg: 202.002
      },
      rain: {
        '3h': 0.105
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-06 12:00:00'
    },
    {
      dt: 1551884400,
      main: {
        temp: 12.16,
        temp_min: 12.16,
        temp_max: 12.16,
        pressure: 986.74,
        sea_level: 986.74,
        grnd_level: 979.4,
        humidity: 96,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 6.86,
        deg: 196.5
      },
      rain: {
        '3h': 0.94
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-06 15:00:00'
    },
    {
      dt: 1551895200,
      main: {
        temp: 11.01,
        temp_min: 11.01,
        temp_max: 11.01,
        pressure: 985.62,
        sea_level: 985.62,
        grnd_level: 978.37,
        humidity: 96,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 6.68,
        deg: 203.5
      },
      rain: {
        '3h': 0.725
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-06 18:00:00'
    },
    {
      dt: 1551906000,
      main: {
        temp: 10.13,
        temp_min: 10.13,
        temp_max: 10.13,
        pressure: 984.77,
        sea_level: 984.77,
        grnd_level: 977.43,
        humidity: 95,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 6.86,
        deg: 201
      },
      rain: {
        '3h': 1.815
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-06 21:00:00'
    },
    {
      dt: 1551916800,
      main: {
        temp: 7.46,
        temp_min: 7.46,
        temp_max: 7.46,
        pressure: 985.26,
        sea_level: 985.26,
        grnd_level: 977.84,
        humidity: 96,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 36
      },
      wind: {
        speed: 6.01,
        deg: 236.503
      },
      rain: {
        '3h': 0.065
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-07 00:00:00'
    },
    {
      dt: 1551927600,
      main: {
        temp: 5.5,
        temp_min: 5.5,
        temp_max: 5.5,
        pressure: 986.24,
        sea_level: 986.24,
        grnd_level: 978.82,
        humidity: 95,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 68
      },
      wind: {
        speed: 6.12,
        deg: 261.506
      },
      rain: {
        '3h': 0.015000000000001
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-07 03:00:00'
    },
    {
      dt: 1551938400,
      main: {
        temp: 4.85,
        temp_min: 4.85,
        temp_max: 4.85,
        pressure: 988.08,
        sea_level: 988.08,
        grnd_level: 980.63,
        humidity: 92,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: {
        all: 36
      },
      wind: {
        speed: 6.36,
        deg: 261.501
      },
      rain: {},
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-07 06:00:00'
    },
    {
      dt: 1551949200,
      main: {
        temp: 5.76,
        temp_min: 5.76,
        temp_max: 5.76,
        pressure: 990.6,
        sea_level: 990.6,
        grnd_level: 983.17,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d'
        }
      ],
      clouds: {
        all: 36
      },
      wind: {
        speed: 7.61,
        deg: 256.006
      },
      rain: {},
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-07 09:00:00'
    },
    {
      dt: 1551960000,
      main: {
        temp: 7.37,
        temp_min: 7.37,
        temp_max: 7.37,
        pressure: 992.02,
        sea_level: 992.02,
        grnd_level: 984.54,
        humidity: 76,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 68
      },
      wind: {
        speed: 9.67,
        deg: 253.503
      },
      rain: {
        '3h': 0.004999999999999
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-07 12:00:00'
    },
    {
      dt: 1551970800,
      main: {
        temp: 7.82,
        temp_min: 7.82,
        temp_max: 7.82,
        pressure: 992.54,
        sea_level: 992.54,
        grnd_level: 985.1,
        humidity: 71,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 88
      },
      wind: {
        speed: 10.32,
        deg: 256
      },
      rain: {
        '3h': 0.075000000000001
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-07 15:00:00'
    },
    {
      dt: 1551981600,
      main: {
        temp: 6.93,
        temp_min: 6.93,
        temp_max: 6.93,
        pressure: 996.18,
        sea_level: 996.18,
        grnd_level: 988.73,
        humidity: 78,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 9.11,
        deg: 284.502
      },
      rain: {
        '3h': 0.855
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-07 18:00:00'
    },
    {
      dt: 1551992400,
      main: {
        temp: 6.53,
        temp_min: 6.53,
        temp_max: 6.53,
        pressure: 1001.68,
        sea_level: 1001.68,
        grnd_level: 994.14,
        humidity: 77,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 80
      },
      wind: {
        speed: 7.36,
        deg: 297.5
      },
      rain: {
        '3h': 0.575
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-07 21:00:00'
    },
    {
      dt: 1552003200,
      main: {
        temp: 5.92,
        temp_min: 5.92,
        temp_max: 5.92,
        pressure: 1005.64,
        sea_level: 1005.64,
        grnd_level: 998.03,
        humidity: 77,
        temp_kf: 0
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n'
        }
      ],
      clouds: {
        all: 68
      },
      wind: {
        speed: 5.72,
        deg: 294.007
      },
      rain: {},
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-08 00:00:00'
    },
    {
      dt: 1552014000,
      main: {
        temp: 5.25,
        temp_min: 5.25,
        temp_max: 5.25,
        pressure: 1008.3,
        sea_level: 1008.3,
        grnd_level: 1000.64,
        humidity: 77,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: {
        all: 36
      },
      wind: {
        speed: 4.82,
        deg: 293.503
      },
      rain: {},
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-08 03:00:00'
    },
    {
      dt: 1552024800,
      main: {
        temp: 3.72,
        temp_min: 3.72,
        temp_max: 3.72,
        pressure: 1010.61,
        sea_level: 1010.61,
        grnd_level: 1002.9,
        humidity: 82,
        temp_kf: 0
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n'
        }
      ],
      clouds: {
        all: 0
      },
      wind: {
        speed: 3.82,
        deg: 285.501
      },
      rain: {},
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-08 06:00:00'
    },
    {
      dt: 1552035600,
      main: {
        temp: 6.04,
        temp_min: 6.04,
        temp_max: 6.04,
        pressure: 1012.85,
        sea_level: 1012.85,
        grnd_level: 1005.1,
        humidity: 75,
        temp_kf: 0
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      clouds: {
        all: 0
      },
      wind: {
        speed: 3.12,
        deg: 268.502
      },
      rain: {},
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-08 09:00:00'
    },
    {
      dt: 1552046400,
      main: {
        temp: 9.43,
        temp_min: 9.43,
        temp_max: 9.43,
        pressure: 1012.86,
        sea_level: 1012.86,
        grnd_level: 1005.38,
        humidity: 69,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d'
        }
      ],
      clouds: {
        all: 44
      },
      wind: {
        speed: 3.46,
        deg: 237
      },
      rain: {},
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-08 12:00:00'
    },
    {
      dt: 1552057200,
      main: {
        temp: 9.9,
        temp_min: 9.9,
        temp_max: 9.9,
        pressure: 1011.54,
        sea_level: 1011.54,
        grnd_level: 1004.06,
        humidity: 60,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 88
      },
      wind: {
        speed: 5.56,
        deg: 223.501
      },
      rain: {
        '3h': 0.010000000000002
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-08 15:00:00'
    },
    {
      dt: 1552068000,
      main: {
        temp: 8.7,
        temp_min: 8.7,
        temp_max: 8.7,
        pressure: 1009.81,
        sea_level: 1009.81,
        grnd_level: 1002.26,
        humidity: 65,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 6.36,
        deg: 216.002
      },
      rain: {
        '3h': 0.14
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-08 18:00:00'
    },
    {
      dt: 1552078800,
      main: {
        temp: 8.11,
        temp_min: 8.11,
        temp_max: 8.11,
        pressure: 1007.39,
        sea_level: 1007.39,
        grnd_level: 999.84,
        humidity: 84,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 6.96,
        deg: 204.5
      },
      rain: {
        '3h': 1.19
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-08 21:00:00'
    },
    {
      dt: 1552089600,
      main: {
        temp: 8.72,
        temp_min: 8.72,
        temp_max: 8.72,
        pressure: 1003.16,
        sea_level: 1003.16,
        grnd_level: 995.57,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 7.36,
        deg: 206.004
      },
      rain: {
        '3h': 2.37
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-09 00:00:00'
    },
    {
      dt: 1552100400,
      main: {
        temp: 9.14,
        temp_min: 9.14,
        temp_max: 9.14,
        pressure: 1001.98,
        sea_level: 1001.98,
        grnd_level: 994.52,
        humidity: 83,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 6.22,
        deg: 255.5
      },
      rain: {
        '3h': 0.4
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-09 03:00:00'
    },
    {
      dt: 1552111200,
      main: {
        temp: 8.95,
        temp_min: 8.95,
        temp_max: 8.95,
        pressure: 1000.84,
        sea_level: 1000.84,
        grnd_level: 993.44,
        humidity: 88,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 5.65,
        deg: 252.503
      },
      rain: {
        '3h': 0.39
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-09 06:00:00'
    },
    {
      dt: 1552122000,
      main: {
        temp: 9.29,
        temp_min: 9.29,
        temp_max: 9.29,
        pressure: 1001.85,
        sea_level: 1001.85,
        grnd_level: 994.37,
        humidity: 91,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 76
      },
      wind: {
        speed: 7.75,
        deg: 264.502
      },
      rain: {
        '3h': 0.63
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-09 09:00:00'
    },
    {
      dt: 1552132800,
      main: {
        temp: 9.31,
        temp_min: 9.31,
        temp_max: 9.31,
        pressure: 1004.66,
        sea_level: 1004.66,
        grnd_level: 997.04,
        humidity: 80,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 80
      },
      wind: {
        speed: 9.93,
        deg: 264.5
      },
      rain: {
        '3h': 0.19
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-09 12:00:00'
    },
    {
      dt: 1552143600,
      main: {
        temp: 8.72,
        temp_min: 8.72,
        temp_max: 8.72,
        pressure: 1008.96,
        sea_level: 1008.96,
        grnd_level: 1001.52,
        humidity: 68,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 76
      },
      wind: {
        speed: 9.51,
        deg: 276.002
      },
      rain: {
        '3h': 0.13
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-09 15:00:00'
    },
    {
      dt: 1552154400,
      main: {
        temp: 7.6,
        temp_min: 7.6,
        temp_max: 7.6,
        pressure: 1011.41,
        sea_level: 1011.41,
        grnd_level: 1003.84,
        humidity: 61,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 12
      },
      wind: {
        speed: 8.12,
        deg: 279.503
      },
      rain: {
        '3h': 0.09
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-09 18:00:00'
    },
    {
      dt: 1552165200,
      main: {
        temp: 6.39,
        temp_min: 6.39,
        temp_max: 6.39,
        pressure: 1012.1,
        sea_level: 1012.1,
        grnd_level: 1004.4,
        humidity: 62,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: {
        all: 36
      },
      wind: {
        speed: 4.51,
        deg: 253.5
      },
      rain: {},
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-09 21:00:00'
    },
    {
      dt: 1552176000,
      main: {
        temp: 6.22,
        temp_min: 6.22,
        temp_max: 6.22,
        pressure: 1009.66,
        sea_level: 1009.66,
        grnd_level: 1002.19,
        humidity: 76,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 4.23,
        deg: 220.003
      },
      rain: {
        '3h': 0.12
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-10 00:00:00'
    },
    {
      dt: 1552186800,
      main: {
        temp: 6.5,
        temp_min: 6.5,
        temp_max: 6.5,
        pressure: 1002.18,
        sea_level: 1002.18,
        grnd_level: 994.67,
        humidity: 92,
        temp_kf: 0
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 92
      },
      wind: {
        speed: 7.07,
        deg: 189.505
      },
      rain: {
        '3h': 3.65
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-10 03:00:00'
    },
    {
      dt: 1552197600,
      main: {
        temp: 8.2,
        temp_min: 8.2,
        temp_max: 8.2,
        pressure: 994.14,
        sea_level: 994.14,
        grnd_level: 986.76,
        humidity: 94,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      clouds: {
        all: 32
      },
      wind: {
        speed: 8.76,
        deg: 246.005
      },
      rain: {
        '3h': 1.39
      },
      sys: {
        pod: 'n'
      },
      dt_txt: '2019-03-10 06:00:00'
    },
    {
      dt: 1552208400,
      main: {
        temp: 7.33,
        temp_min: 7.33,
        temp_max: 7.33,
        pressure: 989.6,
        sea_level: 989.6,
        grnd_level: 982.13,
        humidity: 84,
        temp_kf: 0
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 76
      },
      wind: {
        speed: 12.01,
        deg: 224.004
      },
      rain: {
        '3h': 0.080000000000002
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2019-03-10 09:00:00'
    }
  ],
  city: {
    id: 2643743,
    name: 'London',
    coord: {
      lat: 51.5085,
      lon: -0.1258
    },
    country: 'GB',
    population: 1000000
  }
};

class WeatherDataServiceMock extends IWeatherDataService {
  load(cityName = '') {
    setTimeout(this.dataLoaded.bind(this), 1300);
  }

  dataLoaded() {
    if (this.cbCurrent) {
      mockCurrent.main.temp += 1;

      this.cbCurrent(mockCurrent);
    }

    if (this.cbForecast) {
      this.cbForecast(mockForecast);
    }
  }

  getCurrentWeather() {
    return mockCurrent;
  }

  getWeatherForecast() {
    return mockForecast;
  }

  subscribeForCurrentWeather(cb) {
    this.cbCurrent = cb;
  }

  subscribeForForecastWeather(cb) {
    this.cbForecast = cb;
  }
}

export const weatherDataServiceMock = new WeatherDataServiceMock();
