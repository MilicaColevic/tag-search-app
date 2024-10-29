import { useEffect, useRef, useState } from 'react';
import TagList from '../TagList/TagList';
import { availableTags } from './TagSearch.utils';
import styles from './TagSearch.module.scss';

const TagSearch = () => {
  const [matchingTags, setMatchingTags] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(-1);
  const [tags, setTags] = useState<string[]>([]);
  const [searchedValue, setSearchedValue] = useState<string>('');
  const dropdownDivRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let newOptionIndex = currentOptionIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentOptionIndex === matchingTags.length - 1) {
          // Do nothing if already on last option
          return;
        }
        newOptionIndex = currentOptionIndex === -1 ? 0 : currentOptionIndex + 1;
        setCurrentOptionIndex(newOptionIndex);
        if (!isOpen) {
          setTags([matchingTags[newOptionIndex]]);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentOptionIndex === 0) {
          // Do nothing if already on first option
          newOptionIndex = currentOptionIndex;
        } else {
          newOptionIndex = currentOptionIndex - 1;
        }
        setCurrentOptionIndex(newOptionIndex);
        if (!isOpen) {
          setTags([matchingTags[newOptionIndex]]);
        }
        break;
      case 'Enter':
        if (currentOptionIndex !== -1) {
          handleItemClick(matchingTags[currentOptionIndex]);
        }
        if (!isOpen && matchingTags) {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setCurrentOptionIndex(-1);
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setSearchedValue(searchedValue + ' ');
        } else {
          setTags([matchingTags[currentOptionIndex]]);
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   setSearchedValue(query);
  //   // if(query){
  //   //   const filteredTags = availableTags.filter((tag) => tag.toLocaleLowerCase().startsWith(query.toLowerCase()));
  //   //   if (filteredTags.length > 0) {
  //   //     setMatchingTags(filteredTags);
  //   if (query.startsWith('#')) {
  //     const searchQuery = query.substring(1).toLowerCase();
  //     const filteredTags = availableTags
  //       .filter((tag) => tag.toLowerCase().startsWith(searchQuery))
  //       .map((tag) => `#${tag}`);
  //     if (filteredTags.length > 0) {
  //     setMatchingTags(filteredTags);
  //     } else {
  //       setMatchingTags([]);
  //     }
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchedValue(value);

    const tagArray = value.split(' ').filter((tag) => tag.startsWith('#'));
    console.log('tagArray', tagArray);
    setTags(tagArray);

    // Logic to find matching tags based on the last tag
    const lastTag = tagArray[tagArray.length - 1]?.substring(1); // Remove '#' from last tag
    if (lastTag) {
      // Implement your tag filtering logic here
      const filteredTags = availableTags.filter((tag) => tag.startsWith(lastTag));
      setMatchingTags(filteredTags);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // const handleItemClick = (tag: string) => {
  //   setSelectedTag(tag);
  //   setIsOpen(false);
  //   setCurrentOptionIndex(-1);
  // };
  const handleItemClick = (tag: string) => {
    setTags((prev) => [...prev, tag]);

    console.log('tag', tag);

    setSearchedValue((prev) => prev.replace(/#\S*$/, `#${tag} `));

    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchedValue('');
    setTags([]);
    setMatchingTags([]);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log('searchedValue', searchedValue);
  }, [searchedValue]);

  useEffect(() => {
    console.log('tags', tags);
  }, [tags]);

  return (
    <div className={styles.TagSearch}>
      <label htmlFor="tag-search" className={styles.TagSearch_label}>
        Enter your tag
      </label>
      <div className={styles.TagSearch_InputContainer}>
        <div className={styles.TagSearch_InputContainer_wrapper}>
          <input
            id="tag-search"
            value={searchedValue}
            onChange={handleInputChange}
            placeholder="Type # to search for tags..."
            className={styles.TagSearch_InputContainer_wrapper_input}
            autoComplete="off"
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-owns="tags-list"
            aria-haspopup="listbox"
          />
          {searchedValue && (
            <button onClick={handleClear} className={styles.TagSearch_InputContainer_wrapper_clearButton}>
              ×
            </button>
          )}
        </div>
        {isOpen && searchedValue && (
          <div ref={dropdownDivRef} className={styles.TagSearch_InputContainer} role="listbox" id="tags-list">
            <TagList
              query={searchedValue}
              tags={matchingTags}
              visibility={isOpen}
              onTagClick={handleItemClick}
              currentOptionIndex={currentOptionIndex}
            />
          </div>
        )}
        {tags.length > 0 && (
          <div className={styles.TagSearch_InputContainer_selectedTag}>
            <span>Selected Tags: </span>
            {tags.map((tag, index) => (
              <span key={index} className="selected-tag__value">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default TagSearch;
