import styles from "../../public/css/components/spacer.module.css";

interface SpacerProps {
  size?: number,
}

export function Spacer({ size = 4 }: SpacerProps) {
  return (
    <div className={styles.spacer} style={{ height: `${size}px`}} />
  );
}