
export interface TagListProps {
  visibility: boolean;
  query: string;
  currentOptionIndex: number;
  activeDescendant?: string;
  tags: string[];
  onTagClick: (option: string) => void;
}
