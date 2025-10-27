import styles from './BackToTopBtn.module.css'

function BackToTopBtn({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  
  return (
    <button
      type="button"
      data-testid="back-to-top-btn" 
      onClick={onClick}
      className={styles.btn}>
        Back To Top
    </button>
  )
}

export default BackToTopBtn