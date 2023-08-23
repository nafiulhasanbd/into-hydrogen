import clsx from 'clsx';
import {Fragment} from 'react';
import {ClearRefinements} from 'react-instantsearch-hooks-web';
// @ts-expect-error incompatibility with node16 resolution
import {Dialog, Transition} from '@headlessui/react';

import CloseIcon from '../icons/Close';
import {useFilterUI} from './FilterUIProvider.client';

/**
 * A client component that contains the merchandise that a customer intends to purchase, and the estimated cost associated with the cart
 */

export default function FilterDialog({children, filtersLength = 0}: any) {
  const {isFilterOpen, closeFilter} = useFilterUI();

  return (
    <Transition show={isFilterOpen} unmount={false}>
      <Dialog unmount={false} onClose={closeFilter}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}
        >
          <div
            aria-hidden="true"
            className="  fixed inset-0 z-40 bg-white bg-opacity-50"
          />
        </Transition.Child>

        {/* Panel */}
        <Transition.Child
          unmount={false}
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom=" -translate-y-full "
          enterTo=" translate-y-0"
          leave="ease-in-out duration-500"
          leaveFrom=" -translate-y-full  "
          leaveTo="-translate-y-full  "
        >
          <div className="fixed inset-0 z-40 overflow-y-auto  ">
            <Dialog.Panel
              className={clsx(
                'fixed  top-0 left-0 right-0 bottom-0 z-40 flex h-auto w-full flex-col overflow-y-auto rounded-md md:left-auto md:bottom-auto md:mt-12',
                '',
              )}
            >
              <div className="relative mb-24 rounded-md border border-gray bg-white    backdrop-blur-md md:mx-6 md:bg-opacity-70">
                <div className="container flex flex-col justify-between">
                  <FilterHeader />
                  <div className="mb-12">{children}</div>
                  <FilterFooter filtersLength={filtersLength} />
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

function FilterHeader() {
  const {closeFilter} = useFilterUI();
  return (
    <div className=" flex items-center justify-between py-4">
      <h4>Filter </h4>
      <button type="button" onClick={closeFilter}>
        <CloseIcon />
      </button>
    </div>
  );
}

function FilterFooter({filtersLength}: {filtersLength: number}) {
  const {closeFilter} = useFilterUI();

  return (
    <div className="mobile-filter-actions sticky bottom-0 flex gap-3 bg-white py-4 md:hidden">
      <ClearRefinements
        className="flex-1"
        translations={{
          resetButtonText: 'Clear',
        }}
      />

      <button
        disabled={filtersLength === 0 ? true : false}
        onClick={closeFilter}
        className="btn-primary flex-1"
      >
        Apply ({filtersLength})
      </button>
    </div>
  );
}
