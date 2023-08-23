import SearchIcon from '../icons/Search';
import {useSearchUI} from './SearchUIProvider.client';

type Props = {
  onClick?: () => void;
};

/**
 * A client component that defines the behavior when a user toggles a cart
 */
export default function SearchToggle({onClick}: Props) {
  const {isSearchOpen, toggleSearch} = useSearchUI();

  return (
    <button
      aria-expanded={isSearchOpen}
      aria-controls="search"
      onClick={() => {
        toggleSearch();
        onClick?.();
      }}
      aria-label="search"
    >
      <span className="hidden md:inline">Search</span>
      <span className="inline md:hidden">
        <SearchIcon />
      </span>
    </button>
  );
}
