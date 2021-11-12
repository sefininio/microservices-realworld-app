import React, { useEffect, useState } from 'react';
import { ArticleItem } from '../../components';
import { useGetArticleFeed, useGetArticles } from '../../hooks';
import {
  setArticleFeedAction,
  setArticlesAction
} from '../../store/articleSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  StyledHome,
  StyledTabButton,
  StyledTabContent,
  StyledTabSelector
} from './home.styled';

type TabType = 'global' | 'feed';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const [activeTab, setActiveTab] = useState<TabType>('global');
  const { articles } = useAppSelector((state) => state.article);
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [
    { data: articleData, loading: articleLoading },
    refetchArticles,
  ] = useGetArticles();
  const [
    { data: feedData, loading: feedLoading },
    refetchFeed,
  ] = useGetArticleFeed();

  useEffect(() => {
    if (articleData) {
      dispatch(setArticlesAction(articleData));
    }
  }, [articleData, dispatch]);

  useEffect(() => {
    if (isUserLoggedIn) {
      refetchFeed();
    }
  }, [isUserLoggedIn, refetchFeed]);

  useEffect(() => {
    if (feedData) {
      dispatch(setArticleFeedAction(feedData));
    }
  }, [feedData, dispatch]);

  const tabSelect = (tab: TabType) => {
    setActiveTab(tab);
  };

  if (articleLoading || feedLoading) {
    return null;
  }
  // selected={activeTab === 'global'}

  return (
    <StyledHome>
      <StyledTabSelector>
        <StyledTabButton
          onClick={() => tabSelect('global')}
          selected={activeTab === 'global'}
        >
          Global
        </StyledTabButton>
        <StyledTabButton
          onClick={() => tabSelect('feed')}
          selected={activeTab === 'feed'}
        >
          Feed
        </StyledTabButton>
      </StyledTabSelector>
      {activeTab === 'global' && (
        <StyledTabContent>
          {articleData.map((article) => (
            <ArticleItem article={article} key={article._id.toString()} />
          ))}
        </StyledTabContent>
      )}
      {activeTab === 'feed' && (
        <StyledTabContent>
          {feedData.map((article) => (
            <ArticleItem article={article} key={article._id.toString()} />
          ))}
        </StyledTabContent>
      )}
    </StyledHome>
  );
}

export default Home;
