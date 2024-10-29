import { NewTagProps } from './Newtag.interface';
import styles from './NewTag.module.scss';

const NewTag = ({ query }: NewTagProps) => {
  return (
    <div className={styles.TextContainer}>
      <span className={styles.TextContainer_query}>Search for {query}</span>
    </div>
  );
};
export default NewTag;
