import { FC, useState } from 'react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as ViewGridIcon } from 'assets/icons/view-grid.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { Button } from 'components/ui/atomic-components';
import { db } from 'data/db';
import { useQuery } from 'react-query';
import { CollectionsApi } from 'data/collections/api';
import { ListItem } from './ListItem';
import { CreateEditCollectionModal } from './CreateEditCollectionModal';

export const LeftIconsCollectionsNav: FC = () => {
  const { data: collections } = useQuery('collections', () =>
    CollectionsApi.findAll()
  );

  const [showCollectionModal, setShowCollectionModal] = useState(false);

  const toggleCollectionsModal = () => {
    setShowCollectionModal((state) => !state);
  };

  return (
    <>
      <div className="bg-black2 w-64 min-w-max flex-shrink-0">
        <div className="flex justify-end mt-5 mx-4">
          <Button
            icon={<PlusIcon />}
            type="text"
            onClick={toggleCollectionsModal}
          />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <ListItem name="All icons" icon={<ViewGridIcon />} />
          <ListItem name="All icons" icon={<HeartIcon />} />
        </div>

        <div className="mt-4">
          <div className="ml-4 text-base">Collections</div>
          <div className="flex flex-col gap-2 mt-2">
            {collections?.map((collection) => (
              <ListItem name={collection.name} key={collection.id} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Button
            onClick={() => {
              db.icons.clear();
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <CreateEditCollectionModal
        show={showCollectionModal}
        onClose={toggleCollectionsModal}
      />
    </>
  );
};
