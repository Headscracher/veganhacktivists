import React from 'react';
import Hero from '../../components/decoration/hero';

import {
  FirstSubSection,
  SubSection,
} from '../../components/decoration/textBlocks';
import { HighlightBlock } from '../../components/layout/yearInReview/highlightBlock';
import CustomImage from '../../components/decoration/customImage';
import { NextSeo } from 'next-seo';
import { YearInReviewHeader } from '../../components/layout/yearInReview/layout';
import CustomLink from '../../components/decoration/link';

// images imports
import heroBackground from '../../../public/images/yearInReview/2021/2021-hero.jpg';
import heroTagline from '../../../public/images/yearInReview/2021/2021-type.png';
import pixelHeart from '../../../public/images/VH_PixelHeart.png';
// import pixelFlower from '../../../public/images/VH_PixelFlower.png';
// import pixelStar from '../../../public/images/VH_PixelStar.png';
// import pixelPig from '../../../public/images/VH_PixelPig.png';
import avocadoIcon from '../../../public/images/people/teamIcons/icon-avo.png';
import peachIcon from '../../../public/images/people/teamIcons/icon-peach.png';
import mangoIcon from '../../../public/images/people/teamIcons/icon-mango.png';
import watermelonIcon from '../../../public/images/people/teamIcons/icon-wmelon.png';
import sweetPotatoIcon from '../../../public/images/people/teamIcons/icon-spotato.png';
import FeedbackAndTesting from '../../components/layout/yearInReview/2021/feedbackAndTesting';
import CommunityGrowth from '../../components/layout/yearInReview/2021/communityGrowth';

// interface YearInReviewProps {}

const YearInReview2021: React.FC = () => {
  return (
    <>
      <NextSeo title="2021 in Review" />
      <YearInReviewHeader
        year={2021}
        hero={
          <Hero
            imageBackground={heroBackground}
            tagline={{
              image: heroTagline,
              alt: '2020 year in review',
            }}
            alignment="left"
            classNameMapping={{
              container: 'bg-center',
            }}
          />
        }
      />

      <CustomImage
        src={pixelHeart.src}
        height={pixelHeart.height / 3}
        width={pixelHeart.width / 3}
        alt=""
      />
      <SubSection
        header="We explored a lot this year"
        headerSize="3xl"
        contentSize="2xl"
      >
        This year, instead of focusing on experimental proejcts, we refined our
        goals and built projects that focused primarily in filling existing gaps
        in our movement. We grew more meaningful partnerships and we greatly
        improved our branding, design team, and services offered. We&apos;re
        excited to show you what we&apos;ve done below!
      </SubSection>

      <div>
        <HighlightBlock
          borderColor="magenta"
          headerStart="We launched"
          headerBold="eight new projects"
          headerEnd="for the movement"
        >
          <b>Four of which were unique ideas of our own!</b> We were also lucky
          enough to work on projects with Sehati Animal Sanctuary, Animal
          Alliance Asia, Vegan Japan Consulting, and many more!
        </HighlightBlock>
        <HighlightBlock
          borderColor="yellow"
          headerStart="We"
          headerBold="expanded our advisory team"
          headerEnd="of vegan experts"
        >
          <b>We&apos;re so thankful to have more advisors to lean on</b> such as
          Katie from Animal Equality, Chris from APEX Advocacy, Tessa from the
          Pollination Project, and Casey from Faunalytics! To browse more of our
          advisors, <CustomLink href="/people/advisors">click here!</CustomLink>
        </HighlightBlock>
        <HighlightBlock
          borderColor="green"
          headerStart="We expanded with"
          headerBold="5 new teams"
          headerEnd="in just 6 months"
        >
          <b>More teams, more impact!</b> We&apos;re so happy to announce the
          growth of our community with 5 new amazing teams! Please welcome Team
          Avocado, Team Mango, Team Watermelon, and Team Sweet Potato.
        </HighlightBlock>
        <div className="flex flex-row md:w-1/2 mx-auto">
          {[
            avocadoIcon,
            peachIcon,
            mangoIcon,
            watermelonIcon,
            sweetPotatoIcon,
          ].map((icon) => (
            <div key={icon.src}>
              <CustomImage src={icon} alt={icon.src} height={250} width={250} />
            </div>
          ))}
        </div>
      </div>
      <FeedbackAndTesting />
      <CommunityGrowth />
      <div className="h-40" />
    </>
  );
};

export default YearInReview2021;
