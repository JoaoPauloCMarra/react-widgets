import { FunctionalComponent } from 'preact';
import React, { memo, useEffect } from 'preact/compat';

import { useDataContext } from '../context/DataContext';
import ListItem from './ListItem';
import Loading from './Loading';
import Error from './Error';

interface Props {
  onClose?: () => void;
  'data-testid'?: string;
}

const List: FunctionalComponent<Props> = ({ 'data-testid': testId }) => {
  const { translate, updatePosts, postsLoading, posts = [] } = useDataContext();

  useEffect(() => {
    updatePosts();
  }, [updatePosts]);

  return (
    <div className="list-wrapper center gradient-bg" data-testid="list-widget">
      {postsLoading && (
        <div className="list-content">
          <Loading />
        </div>
      )}
      {!postsLoading && posts.length === 0 && (
        <div className="list-content">
          <Error text={translate('EMPTY_LIST')} />
        </div>
      )}
      {!postsLoading && posts.length > 0 && (
        <ul className="list-content" data-testid={testId}>
          {React.Children.toArray(posts?.map((data: Post) => <ListItem data={data} />))}
        </ul>
      )}
    </div>
  );
};

export default memo(List);
