import styles from "./ListGroup.module.css";

export default function ListGroup({
    courseName,
    professorName,
    reviewContent,
    averageRating,
    reviewCount,
  }) {
    return (
      <div className={styles["list-box"]}>
        <div className={styles["text-container"]}>
          <div className={styles["course-name"]}>{courseName}</div>
  
          <div className={styles["professor-name"]}>{professorName}</div>
  
          <div className={styles["latest-review"]}>
            <span>Latest review :</span>
            <p> {reviewContent}</p>
          </div>
        </div>
  
        <div className={styles["rating-container"]}>
          <div className={styles["average-rating"]}>{averageRating}</div>
          <div className={styles["based-on"]}>Based on</div>
          <div className={styles["review-count"]}>{reviewCount} reviews</div>
        </div>
      </div>
    );
  }
  