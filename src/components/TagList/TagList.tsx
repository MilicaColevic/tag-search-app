import { useEffect, useRef } from 'react';
import Tag from '../Tag/Tag';
import { TagListProps } from './TagList.interface';
import styles from './TagList.module.scss';

const TagList = ({ tags, query, visibility, activeDescendant, currentOptionIndex, onTagClick }: TagListProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (listRef.current) {
      const focusedOption = optionRefs.current[currentOptionIndex];
      if (focusedOption) {
        const listEl = listRef.current;
        listEl.scroll({
          top: focusedOption.offsetTop - listEl.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [currentOptionIndex]);

  const renderTags = () => {
    if (tags.length > 0) {
      return tags.map((tag, index) => (
        <li
          className={`${styles.Tag_list__option} ${currentOptionIndex === index ? styles.Tag_list__option__focused : ''}`}
          key={tag}
          ref={(el) => {
            optionRefs.current[index] = el;
          }}
        >
          <Tag tag={tag} query={query} onTagClick={onTagClick} />
        </li>
      ));
    } else if (query) {
      return (
        <li className={styles.Tag_list__option__focused}>
          <Tag query={query} onTagClick={onTagClick} />
        </li>
      );
    }
  };

  return (
    <ul
      className={`${styles.Tag_list} ${visibility ? styles.Tag_list__visible : styles.Tag_list__hidden}`}
      role="listbox"
      ref={listRef}
      aria-activedescendant={activeDescendant}
      tabIndex={currentOptionIndex !== -1 ? 0 : -1}
    >
      {renderTags()}
    </ul>
  );
};

export default TagList;