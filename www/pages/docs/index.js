import Page from '../../components/page';
import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Container from '../../components/container';
import { MediaQueryConsumer } from '../../components/media-query';
import withPure from '../../components/hoc/pure';

import Markdown, { headings } from '../../components/docs/docs.mdx';
import Documentation, { components } from '../../components/docs/documentation';
import { SkipNavContent } from '@reach/skip-nav';

const Content = withPure(() => <Markdown components={components} />);

export default () => (
  <Page>
    <MediaQueryConsumer>
      {({ isMobile }) => (
        <Header
          height={{ desktop: 64, mobile: 64 + 32 }}
          shadow={!isMobile}
          defaultActive
        >
          <Navbar />
        </Header>
      )}
    </MediaQueryConsumer>
    <Container>
      <Documentation headings={headings}>
        <SkipNavContent />
        <Content />
      </Documentation>
    </Container>
  </Page>
);
