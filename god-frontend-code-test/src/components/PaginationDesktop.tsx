import { IconButton } from "vcc-ui";

import styles from "../../public/css/components/paginationDesktop.module.css";

interface PaginationDesktopProps {
  onClickLeft: () => void;
  onClickRight: () => void;
}

export function PaginationDesktop({ onClickLeft, onClickRight }: PaginationDesktopProps) {
  return (
    <div className={styles.btnWrapper}>
      <IconButton
        variant="outline"
        aria-label="Esquerda"
        iconName="navigation-chevronback"
        onClick={onClickLeft}
      />

      <IconButton
        variant="outline"
        aria-label="Direita"
        iconName="navigation-chevronforward"
        onClick={onClickRight}
      />
    </div>
  );
}