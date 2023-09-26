import Image from "next/image";
import { Flex, Link, Row, Spacer, Text } from "vcc-ui";

import { Car } from "../types/car.interface";

import styles from "../../public/css/components/carCard.module.css";

interface CarCardProps {
  car: Car
}

export function CarCard({
  car: {
    id,
    bodyType,
    modelName,
    modelType,
    imageUrl,
  }
}: CarCardProps) {
  return (
    <div className={styles.cardWrapper}>
      <Text variant="columbus" subStyle="emphasis">{bodyType}</Text>

      <Flex
        extend={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '4px'
        }}
      >
          <Text variant="amundsen">{modelName}</Text>
          <Text variant="columbus" subStyle="standard">{modelType}</Text>
      </Flex>

      <Spacer />

      <Image src={imageUrl} alt={modelName} width={290} height={220} className={styles.cardImage} />

      <Spacer />

      <Flex>
        <Row align="center">
          <Link href={`${id}/learn/`} arrow="right">
            LEARN
          </Link>

          <Spacer size={4} />

          <Link href={`${id}/shop/`} arrow="right">
            SHOP
          </Link>
        </Row>
      </Flex>
    </div>
  );
}