import moment, { unix } from "moment";

//Calculation to convert kelvins to celsuis
export const kelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
};

// Air quality ratings
export const airQualityInfo = [
    {
        rating: 10,
        description: "excellent",
      },
      {
        rating: 20,
        description: "good",
      },
      {
        rating: 30,
        description: "satisfactory",
      },
      {
        rating: 40,
        description: "fair",
      },
      {
        rating: 50,
        description: "moderate",
      },
      {
        rating: 60,
        description: "moderate",
      },
      {
        rating: 70,
        description: "poor",
      },
      {
        rating: 80,
        description: "poor",
      },
      {
        rating: 90,
        description: "very poor",
      },
      {
        rating: 100,
        description: "very poor",
      },
]


// Converting unix to time
export const unixToTime = (unix: number, timezone: number) => {
  return moment.unix(unix).utcOffset(timezone / 60).format("HH:mm A")
};
