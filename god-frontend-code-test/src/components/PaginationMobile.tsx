import styles from "../../public/css/components/paginationMobile.module.css";

interface PaginationMobileProps {
  totalCards: number;
  selectedCard: number;
  onSelectCard: (index: number) => void;
}

export function PaginationMobile({ totalCards, selectedCard, onSelectCard }: PaginationMobileProps) {

  return (
    <div className={styles.btnWrapper}>
      {Array.from({ length: totalCards }).map((_, i) => (
        <button key={i} onClick={() => onSelectCard(i)} className={styles.btn} style={{ backgroundColor: i === selectedCard ? 'rgba(0, 0, 0, 0.96)' : '' }} />
      ))}
    </div>
  );
}