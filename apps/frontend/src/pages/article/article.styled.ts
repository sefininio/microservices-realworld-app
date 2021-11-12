import styled from 'styled-components';

const StyledArticle = styled.div`
  margin: 16px;
`;

const StyledArticleContent = styled.div`
  display: flex;
  margin: 32px;
`;

const StyledArticleBody = styled.div`
  flex: 16 0 auto;
  display: contents;
`;

const StyledArticleSidebar = styled.div`
  flex: 1 0 auto;
  margin-left: 8rem;
  display: flex;
  flex-direction: column;
`;

const StyledArticleTags = styled.div``;

const StyledArticleAuthor = styled.div`
  background-color: rgba(200, 200, 200, 0.5);
  padding: 1rem;
  border-radius: 10px;
`;

export {
  StyledArticle,
  StyledArticleAuthor,
  StyledArticleContent,
  StyledArticleBody,
  StyledArticleSidebar,
  StyledArticleTags,
};
