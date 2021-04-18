import { FunctionalComponent } from 'preact';
import { memo, useMemo } from 'preact/compat';
import { useDataLayer } from '../context/DataLayer';

import Image from './Image';

interface Props {
  data: Post;
  'data-testid'?: string;
}

const avatarSize = 28;

const ListItem: FunctionalComponent<Props> = ({ data, 'data-testid': testId }) => {
  const { settings } = useDataLayer();
  const { language = 'en' } = settings || {};
  const { id, title, authorName, createdAt } = data;

  const when = useMemo(() => {
    const date = new Date(createdAt);
    return new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  }, [createdAt, language]);

  return (
    <li data-testid={testId} className="list-item">
      <h4 className="list-item-title">{title}</h4>
      <span className="list-item-date">{when}</span>
      <div className="list-item-content">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam officia sed, consequatur iusto quas repellat
          repellendus excepturi?
        </p>
      </div>
      <div className="list-item-author">
        <span>{authorName}</span>
        <Image
          alt={authorName}
          src={`https://i.pravatar.cc/${avatarSize * 2}?img=${id}`}
          width={avatarSize}
          height={avatarSize}
        />
      </div>
    </li>
  );
};

export default memo(ListItem);
