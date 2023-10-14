import { useEffect, useState } from "react";
import axios from "axios";

import { Car } from "../types/car.interface";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    axios.get("/api/cars")
      .then(response => {
        setCars(response.data)
      })
      .catch(err => console.error(err));
  }, []);

  return {
    cars
  };
}