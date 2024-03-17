import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { FormattedMessage } from 'react-intl';
import { parse } from 'node-html-parser';

import { getContents } from '../../lib/cms';
import {
  getAllBlogSlugs,
  getBlogEntries,
  getBlogPreviewBySlug,
} from '../../lib/cms/helpers';
import ContentfulImage from '../../components/layout/contentfulImage';
import SquareField from '../../components/decoration/squares';
import Circle from '../../components/decoration/circle';
import BlogContentContainer, {
  Sidebar,
} from '../../components/layout/blog/blogPageLayout';
import SubtleBorder from '../../components/decoration/subtleBorder';
import SocialLinks from '../../components/layout/team/socialLinks';

import { useRouterLocale } from 'lib/translation/useRouterLocale';
import LocalizedContentfulPage from 'components/localization/LocalizedContentfulPage';
import LocalizedContentfulEntryField, {
  useLocalizedContentfulEntryField,
} from 'components/localization/LocalizedContentfulEntryField';
import LocalizedContentfulPageToggleButton from 'components/localization/LocalizedContentfulPageToggleButton';

import type { IBlogEntry, ITeamMember } from '../../types/generated/contentful';
import type { GetStaticPaths, GetStaticProps } from 'next';

interface BlogEntryProps {
  blog: IBlogEntry;
  otherBlogs: IBlogEntry[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await getAllBlogSlugs();

  return {
    paths: allSlugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params = {},
  preview = false,
}) => {
  const blog = await getEntryOrPreview(params.slug as string, preview);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  const otherBlogsToShow = 5;

  const otherBlogs = (await getBlogEntries(otherBlogsToShow + 1))
    .filter((entry) => entry.fields.slug !== params.slug)
    .slice(0, otherBlogsToShow);

  return {
    props: {
      blog,
      otherBlogs,
    },
    revalidate: 480,
  };
};

const getEntryOrPreview: (
  slug: string,
  preview: boolean,
) => Promise<IBlogEntry> = async (slug, preview) => {
  if (preview) {
    return await getBlogPreviewBySlug(slug);
  }

  return (
    await getContents({
      contentType: 'blogEntry',
      query: { slug },
      other: { include: 3 },
    })
  )[0] as IBlogEntry;
};

const Header: React.FC = () => {
  return (
    <div className='absolute w-full overflow-hidden -z-10'>
      <div className='relative z-10'>
        <Circle opacity={0.1} xAlign='left' yAlign='top' radius={16} />
        <Circle opacity={0.05} xAlign='right' yAlign='bottom' radius={11} />
      </div>
      <div className='relative bg-black h-36 lg:h-80' />
      <div className='z-20'>
        <SquareField
          squares={[
            // TODO tweak
            { color: 'white', size: 16, left: 0, bottom: 0 },
            { color: 'green', size: 32, left: 16, bottom: 0 },
            { color: 'yellow', size: 16, left: 0, top: 0 },
            { color: 'orange', size: 16, right: 32, bottom: 16 },
            { color: 'red', size: 32, right: 0, top: -16 },
            { color: 'white', size: 16, right: 32, bottom: 0 },
          ]}
          className='hidden md:block'
        />
      </div>
    </div>
  );
};

const BlogEntry: React.FC<BlogEntryProps> = ({ blog, otherBlogs }) => {
  const locale = useRouterLocale();

  const title = useLocalizedContentfulEntryField({
    contentfulId: blog?.sys.id ?? '',
    fieldId: 'title',
    contentType: 'blogEntry',
  });
  const excerpt = useLocalizedContentfulEntryField({
    contentfulId: blog?.sys.id ?? '',
    fieldId: 'excerpt',
    contentType: 'blogEntry',
  });

  const exerptText = useMemo(() => {
    return parse(excerpt).innerText;
  }, [excerpt]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const { author, featuredImage } = blog.fields;

  const date = new Date(blog.fields.publishDate || blog.sys.createdAt);

  return (
    <>
      <NextSeo
        title={title}
        description={exerptText.slice(0, 300)}
        openGraph={{
          title,
          type: 'article',
          article: {
            authors: [author?.fields?.name],
            modifiedTime: blog.sys.updatedAt,
            publishedTime: date.toISOString(),
            tags: blog.fields.tags?.map((tag) => tag.fields.name),
          },
          images: [
            {
              url: `https:${featuredImage.fields.file.url}`,
              height: featuredImage.fields.file.details.image?.height,
              width: featuredImage.fields.file.details.image?.width,
            },
          ],
        }}
        titleTemplate='%s | Vegan Hacktivists Blog'
      />
      <div>
        <Header />
        <LocalizedContentfulPage>
          <div className='mx-auto'>
            <div className='px-5 pt-20 mx-auto lg:w-3/5'>
              {featuredImage && (
                <div className='mx-auto border-2 border-white'>
                  <ContentfulImage
                    image={featuredImage}
                    alt=''
                    priority
                    className='w-full'
                  />
                </div>
              )}
            </div>
            <div className='mt-20'>
              <div className='w-3/4 mx-auto'>
                <LocalizedContentfulPageToggleButton className='w-fit mb-6' />
                <h1 className='text-5xl font-bold text-left break-words'>
                  <LocalizedContentfulEntryField
                    contentfulId={blog.sys.id}
                    fieldId='title'
                    contentType='blogEntry'
                  />
                </h1>
              </div>

              <div className='md:divide-y divide-grey-light'>
                <BlogContentContainer>
                  <div className='space-y-4 overflow-x-auto text-xl leading-relaxed text-left md:flex-grow'>
                    {author && (
                      <div>
                        <FormattedMessage
                          id='page.blog.section.blog-page-content.author'
                          defaultMessage='Written by <no-localization>{name}</no-localization>'
                          values={{
                            name: (
                              <span className='font-bold'>
                                {author.fields.name}
                              </span>
                            ),
                          }}
                        />{' '}
                        <span className='font-bold'>|</span>{' '}
                        <span>
                          {new Intl.DateTimeFormat(locale, {
                            month: 'long',
                            year: 'numeric',
                            day: 'numeric',
                          }).format(date)}
                        </span>
                      </div>
                    )}
                    <div className='divide-y lg:divide-none divide-grey-light'>
                      <div>
                        <div className='pb-10'>
                          <LocalizedContentfulEntryField
                            contentfulId={blog.sys.id}
                            fieldId='content'
                            contentType='blogEntry'
                          />
                        </div>
                      </div>
                      {author && (
                        <div className='pt-5 mx-auto lg:hidden'>
                          <AuthorCard author={author} />
                        </div>
                      )}
                    </div>
                  </div>

                  <Sidebar blogs={otherBlogs} />
                </BlogContentContainer>
                {author && (
                  <div className='hidden lg:block pt-5 ml-[12.5vw] w-3/4 xl:max-w-6xl'>
                    <AuthorCard author={author} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </LocalizedContentfulPage>
      </div>
    </>
  );
};

interface AuthorCardProps {
  author: ITeamMember;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const { image, name, description, socialLinks } = author.fields;

  return (
    <div className='w-full mx-auto mb-14 md:w-2/3 lg:w-full'>
      <div className='mb-10 text-3xl font-bold text-left text-grey-dark'>
        About the Author
      </div>
      <SubtleBorder className='flex flex-col lg:flex-row lg:items-center bg-grey-background'>
        {image && (
          <div className='aspect-square lg:h-64'>
            <ContentfulImage image={image} alt='' />
          </div>
        )}
        <div className='w-full h-full p-5 pt-8 pl-10 text-center lg:text-left'>
          <div className='pb-4 text-3xl font-bold'>{name}</div>
          {description && (
            <div className='text-xl'>
              <LocalizedContentfulEntryField
                contentfulId={author.sys.id}
                fieldId='description'
                contentType='teamMember'
              />
            </div>
          )}
          {socialLinks && (
            <div className='pt-5 md:ml-auto -px-5 md:w-fit'>
              <SocialLinks
                socialLinks={socialLinks.fields}
                className='justify-center'
                theme='dark'
              />
            </div>
          )}
        </div>
      </SubtleBorder>
    </div>
  );
};

export default BlogEntry;
