import groq from 'groq';

import { IMAGE } from '../image';
import { LINK_EXTERNAL } from '../linkExternal';
import { LINK_INTERNAL } from '../linkInternal';
import { PRODUCT_HOTSPOT } from '../productHotspot';
import { PRODUCT_WITH_VARIANT } from '../productWithVariant';

export const MODULE_IMAGE = groq`
  image {
    ${IMAGE}
  },
  (variant == 'callToAction') => {
    callToAction {
      "link": links[0] {
        (_type == 'linkExternal') => {
          ${LINK_EXTERNAL}
        },
        (_type == 'linkInternal') => {
          ${LINK_INTERNAL}
        },
      },      
      title,
    }
  },      
  caption,
  (variant == 'productHotspots') => {
    productHotspots[] {
      _key,
      ${PRODUCT_HOTSPOT}
    }
  },
  (variant == 'productGrid') => {
    productGrid[] {
      _key,
      ...${PRODUCT_WITH_VARIANT}
    },
  },
  variant,
`;
