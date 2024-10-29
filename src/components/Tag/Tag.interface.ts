export interface TagProps {
  tag?: string;
  query: string;
  selectId?: string;
  onTagClick: (tag: string) => void;
}