import { Text } from "vcc-ui";

import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";
import { Spacer } from "./Spacer";

import styles from "../../public/css/home.module.css";
import { PaginationDesktop } from "./PaginationDesktop";
import { PaginationMobile } from "./PaginationMobile";
import { useState } from "react";

export function Home() {
  const [selectCard, setSelectedCard] = useState(0);
  const { cars } = useCars();

  function onClickLeft() {
    let cardList = document.getElementById('card-list');
    let cardWidth = cardList?.firstElementChild?.clientWidth ?? 0;
    let cardListScrollLeft = cardList?.scrollLeft ?? 0;

    if (cardListScrollLeft >= (cardWidth + 24)) {
      cardList?.scrollTo({ left: cardListScrollLeft - (cardWidth + 24) });
    }
  }

  function onClickRight() {
    let cardList = document.getElementById('card-list');
    let cardListWidth = cardList?.clientWidth ?? 0;
    let cardWidth = cardList?.firstElementChild?.clientWidth ?? 0;
    let cardListScrollWidth = cardList?.scrollWidth ?? 0;
    let cardListScrollLeft = cardList?.scrollLeft ?? 0;

    if (cardListScrollWidth >= (cardListScrollLeft + cardListWidth + cardWidth + 24)) {
      cardList?.scrollTo({ left: cardListScrollLeft + ((cardWidth + 24)) })
    }
  }

  function onSelectCardMobile(index: number) {
    let cardList = document.getElementById('card-list');
    let cardWidth = cardList?.firstElementChild?.clientWidth ?? 0;

    cardList?.scrollTo({ left: (cardWidth + 24) * index })
    setSelectedCard(index);
  }

  return (
    <div className={styles.homeWrapper}>
      <Text variant="ootah" subStyle="emphasis" extend={{ marginTop: '32px', padding: '0 24px' }}>Our full range</Text>

      <Spacer size={32} />

      <div className={styles.cardsWrapper} id="card-list">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <Spacer size={32} />

      <PaginationDesktop onClickLeft={onClickLeft} onClickRight={onClickRight} />

      <PaginationMobile totalCards={cars.length} onSelectCard={onSelectCardMobile} selectedCard={selectCard} />
    </div>
  );
};
