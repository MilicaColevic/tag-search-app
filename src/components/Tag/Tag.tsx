import { TagProps } from './Tag.interface';
import styles from './Tag.module.scss';
import ExistingTag from '../ExistingTag/ExistingTag';
import NewTag from '../NewTag/NewTag';

const Tag = ({ tag, query, onTagClick }: TagProps) => {
  const handleClick = () => {
    onTagClick(tag ?? query);
  };

  return (
    <div onClick={handleClick} role="option" className={styles.Tag} tabIndex={-1} id={`tag-option-${tag}`}>
      {/* {tag} */}
      <button role="button" type="button">
        <div className={styles.Tag_container}>
          {tag ? (
           <ExistingTag query={query} tag={tag}/>
          ) : (
            <NewTag query={query} />
          )}
        </div>
      </button>
    </div>
  );
};
export default Tag;
