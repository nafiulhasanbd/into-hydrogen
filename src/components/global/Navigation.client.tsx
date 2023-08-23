import {Link} from '@shopify/hydrogen';

import type {SanityMenuLink} from '../../types';
/**
 * A server component that defines the navigation for a web storefront
 */
type Props = {
  menuLinks: SanityMenuLink[];
};

export default function Navigation({menuLinks}: Props) {
  const onShopClick = (e) => {
    if (window.location.pathname.includes('/collections/all')) {
      const $clearBtn = document.querySelector('.ais-ClearRefinements-button');
      if ($clearBtn) {
        $clearBtn.click();
      }
    }
  };
  return (
    <div className="hidden gap-4 md:flex">
      <Link onClick={onShopClick} to={'/collections/all'}>
        Shop
      </Link>
      <Link to={'/editorials'}>Editorials</Link>
      <Link to={'/collections/rentals'}>Rentals</Link>
    </div>
  );
}
