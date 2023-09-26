import { Text } from "vcc-ui";

import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";
import { Spacer } from "./Spacer";

import styles from "../../public/css/home.module.css";

export function Home() {
  const { cars } = useCars();

  return(
    <div className={styles.homeWrapper}>
      <Text variant="ootah" subStyle="emphasis" extend={{ marginTop: '32px' }}>Our full range</Text>

      <Spacer size={32} />

      <div className={styles.cardsWrapper}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};
