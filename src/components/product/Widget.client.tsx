import clsx from 'clsx';

import {Link, ProductPrice, useProductOptions} from '@shopify/hydrogen';

import {hasMultipleProductOptions} from '../../utils/productOptions';
import AddToWishlist from './buttons/AddToWishlist.client';
import SelectedVariantAddToCartButton from './buttons/SelectedVariantAddToCart.client';
// import SelectedVariantBuyNowButton from './buttons/SelectedVariantBuyNow.client';
import ProductOptions from './options/ProductOptions.client';
import {useState} from 'react';
import type {ProductWithNodes, SanityProductPage} from '../../types';
type Props = {
  sanityProduct: SanityProductPage;
  storefrontProduct: ProductWithNodes;
};
function ProductPrices({
  storefrontProduct,
}: {
  storefrontProduct: ProductWithNodes;
}) {
  const {selectedVariant} = useProductOptions();

  if (!storefrontProduct || !selectedVariant) {
    return null;
  }

  if (storefrontProduct.variants.nodes[0].priceV2.amount === '0.0') {
    return <div></div>;
  }

  if (selectedVariant.availableForSale) {
    return (
      <div>
        <ProductPrice
          data={storefrontProduct}
          priceType="compareAt"
          variantId={selectedVariant.id}
        />
        <ProductPrice data={storefrontProduct} variantId={selectedVariant.id} />
      </div>
    );
  } else {
    return (
      <s>
        <ProductPrice
          data={storefrontProduct}
          priceType="compareAt"
          variantId={selectedVariant.id}
        />
        <ProductPrice data={storefrontProduct} variantId={selectedVariant.id} />
      </s>
    );
  }
}

function ProductAccordion() {
  const [active, setActive] = useState(0);
  return (
    <div className="accordion overflow-hidden rounded-md border border-gray">
      {/* 1 */}
      <div
        aria-expanded={active === 1 ? 'true' : 'false'}
        aria-controls="accordion-arrow-icon-body-1"
        className={clsx(' border-b border-gray bg-white')}
      >
        <h2>
          <button
            onClick={() => setActive(1)}
            className="
       
        rounded-none
        relative
        flex
        w-full
        items-center
        border-0 bg-white py-4
        px-4
        text-left
        text-xs
        font-bold
        transition
        focus:outline-none
      "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Shipping Information
          </button>
        </h2>
        <div
          className={clsx(
            active === 1 ? 'max-h-48' : 'max-h-0',
            ' overflow-hidden bg-white transition-all duration-300',
          )}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="px-4 pb-8">
            Items are uniquely sourced from Canada, United States or Japan.
            Depending on the location of these items, it will take anywhere
            between 2-8 business days for your item(s) to ship.
          </div>
        </div>
      </div>
      {/* 2 */}
      <div
        aria-expanded={active === 2 ? 'true' : 'false'}
        aria-controls="accordion-arrow-icon-body-1"
        className={clsx(' border-b border-gray bg-white')}
      >
        <h2>
          <button
            onClick={() => setActive(2)}
            className="
       
        rounded-none
        relative
        flex
        w-full
        items-center
        border-0 bg-white py-4
        px-4
        text-left
        text-xs
        font-bold
        transition
        focus:outline-none
      "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Return information
          </button>
        </h2>
        <div
          className={clsx(
            active === 2 ? 'max-h-48' : 'max-h-0',
            ' overflow-hidden bg-white transition-all duration-300',
          )}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="px-4 pb-8">
            All sales are final, and there are no returns or exchanges unless an
            item has been misinterpreted and shown in a video or a photo format
            via email.
          </div>
        </div>
      </div>
      {/* 3 */}
      <div
        aria-expanded={active === 3 ? 'true' : 'false'}
        aria-controls="accordion-arrow-icon-body-1"
        className={clsx('   bg-white')}
      >
        <h2>
          <button
            onClick={() => setActive(3)}
            className="
       
        rounded-none
        relative
        flex
        w-full
        items-center
        border-0 bg-white py-4
        px-4
        text-left
        text-xs
        font-bold
        transition
        focus:outline-none
      "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Rental Inquiry
          </button>
        </h2>
        <div
          className={clsx(
            active === 3 ? 'max-h-48' : 'max-h-0',
            ' overflow-hidden bg-white transition-all duration-300',
          )}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="px-4 pb-8">
            Rentals can be made with the button above. Rental Services are only
            available for New York City, Los Angeles, and Toronto. For more
            information, please contact: press@intoarchive.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductWidget({
  sanityProduct,
  storefrontProduct,
}: Props) {
  const {selectedVariant} = useProductOptions();
  const multipleProductOptions = hasMultipleProductOptions(
    storefrontProduct.options,
  );

  const availableForSale = selectedVariant?.availableForSale;

  if (!selectedVariant) {
    return null;
  }

  const condition = storefrontProduct?.condition?.value
    ? JSON.parse(storefrontProduct?.condition?.value)
    : null;
  const era = storefrontProduct.era?.value;
  return (
    <div className="grid grid-flow-row gap-6">
      <div>
        {/* Sale */}
        {availableForSale && selectedVariant?.compareAtPriceV2 && (
          <span>Sale</span>
        )}

        {/* Vendor */}
        {storefrontProduct?.vendor && (
          <span className="mb-1 block text-xxs font-bold">
            {storefrontProduct.vendor}
          </span>
        )}

        {/* Title */}
        {storefrontProduct?.title && <h1>{storefrontProduct.title}</h1>}

        <div className="flex gap-2">
          {/* Prices */}
          <ProductPrices storefrontProduct={storefrontProduct} />

          {/* Sold out */}
          {!availableForSale && <span>Sold out</span>}
        </div>

        {/* Product options */}
        {/* {multipleProductOptions && (
          <ProductOptions
            customProductOptions={sanityProduct.customProductOptions}
          />
        )} */}
      </div>

      {/* Product actions */}
      <div className="grid grid-flow-row gap-2">
        {storefrontProduct.variants?.nodes[0]?.priceV2?.amount !== '0.0' ? (
          <div className="grid grid-flow-row gap-2">
            <SelectedVariantAddToCartButton />
          </div>
        ) : (
          <a
            href={`mailto:press@intoarchive.com?subject=Rental Inquiry: ${storefrontProduct.title}`}
            className="btn-secondary"
            title="Inquire to rent"
          >
            Inquire to rent
          </a>
        )}

        {/* <AddToWishlist item={storefrontProduct} /> */}
        {/* <button className="btn-secondary">Add to Wishlist</button> */}
      </div>

      <div className="grid grid-flow-row gap-4 divide-y divide-gray rounded-md border border-gray p-4">
        <div className="grid grid-flow-row gap-2">
          <h2 className="text-xs font-bold">Background</h2>
          <div
            className="rte "
            dangerouslySetInnerHTML={{
              __html: storefrontProduct.descriptionHtml,
            }}
          ></div>
        </div>

        {era && (
          <div className="grid grid-flow-row gap-2 pt-4">
            <h2 className="text-xs font-bold">Era</h2>
            <div className="flex items-center">
              <Link
                to={`/collections/all?shopify_products[refinementList][meta.product.era][0]=${era}`}
                className="btn-tertiary"
              >
                {era}
              </Link>
            </div>
          </div>
        )}

        {condition && (
          <div className="grid grid-flow-row gap-2 pt-4">
            <h2 className="text-xs font-bold">Condition</h2>
            <div className="flex items-center">
              <Link
                to={`/collections/all?shopify_products[refinementList][meta.product.condition][0]=${condition.value}`}
                className="btn-tertiary"
              >
                {condition.value}
              </Link>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-start gap-1 pt-4">
          {storefrontProduct.vendor && (
            <Link
              to={`/collections/all?shopify_products[refinementList][vendor][0]=${storefrontProduct.vendor}`}
              className="btn-primary"
            >
              {storefrontProduct.vendor}
            </Link>
          )}
          {storefrontProduct.options[0]?.values[0] &&
            storefrontProduct.options[0].name !== 'Title' && (
              <Link
                to={`/collections/all?shopify_products[refinementList][options.color][0]=${storefrontProduct.options[0].values[0]}`}
                className="btn-tertiary"
                data-color={storefrontProduct.options[0].values[0]}
              >
                {storefrontProduct.options[0].values[0]}
              </Link>
            )}
          {storefrontProduct.options[1]?.values[0] &&
            storefrontProduct.options[1].name !== 'Title' && (
              <Link
                to={`/collections/all?shopify_products[refinementList][options.material][0]=${storefrontProduct.options[1].values[0]}`}
                className="btn-tertiary"
              >
                {storefrontProduct.options[1].values[0]}
              </Link>
            )}
        </div>
      </div>

      <ProductAccordion />
      {/* <SelectedVariantBuyNowButton /> */}
    </div>
  );
}
