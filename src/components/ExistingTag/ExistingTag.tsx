import searchIcon from '../../assets/search.svg';
import { ExistingTagProps } from './ExistingTag.interface';
import styles from './ExistingTag.module.scss'

const ExistingTag = ({ query, tag }: ExistingTagProps) => {
  
    const getStyledTag = (tag: string, query: string) => {
    const queryIndex = tag.toLowerCase().indexOf(query.toLowerCase());
    if (queryIndex === -1) {
      return <span>{tag}</span>;
    }

    const matchedQuery = tag.slice(queryIndex, queryIndex + query.length);
    const afterQuery = tag.slice(queryIndex + query.length);

    return (
      <>
        <span className={styles.Content_container_search_query}>{matchedQuery}</span>
        <span className={styles.Content_container_search_tag}>{afterQuery}</span>
      </>
    );
  };

  return (
    <div className={styles.Content}>
      <div className={styles.Content_icon}>
        <img src={searchIcon} alt="search icon" />
      </div>
      <div className={styles.Content_container}>
        <div className={styles.Content_container_search}>
            <span>{getStyledTag(tag, query)}</span>
        </div>
        <div className={styles.Content_container_subtext}>Most searched for</div>
      </div>
    </div>
  );
};
export default ExistingTag;
