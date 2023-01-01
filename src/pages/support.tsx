import React from 'react';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';

import HeartLogo from '../../public/images/support/heart-icon.png';
import PatreonLogo from '../../public/images/support/patreon-logo.png';
import PayPalLogo from '../../public/images/support/paypal-logo.png';
import heroBackground from '../../public/images/support/VH-pig2-hero-nocircles.jpg';
import heroTagline from '../../public/images/support/VH-support-hero-text.png';
import { ExternalLinkButton } from '../components/decoration/buttons';
import CustomImage from '../components/decoration/customImage';
import Hero from '../components/decoration/hero';
import Sprite, { chicken, pig } from '../components/decoration/sprite';
import SquareField from '../components/decoration/squares';
import { PlainHeader } from '../components/decoration/textBlocks';
import JoinOurTeam from '../components/layout/support/joinOurTeam';
import PatreonSupporters from '../components/layout/support/patreonSupporters';
import ProgressBar from '../components/layout/support/progressBar';
import { getPatreonFundig, getPatrons } from '../lib/patreon';
import CustomLink from '../components/decoration/link';
import { pixelHeart } from '../images/separators';
import DonationCard from '../components/layout/support/donationCard';
import Crypto from '../components/layout/support/crypto';

import type { GetStaticProps } from 'next';

const HERO_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, bottom: 0 },
  { color: 'pink', size: 24, left: 16, bottom: 0 },
  { color: 'green', size: 16, lwft: 0, top: 0 },

  { color: 'yellow', size: 32, right: 0, top: -16 },
  { color: 'yellow', size: 16, right: 32, bottom: 16 },
  { color: 'white', size: 16, right: 32, bottom: 0 },
];

const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="px-10 mx-auto mb-20 text-xl md:w-3/4">{children}</p>
);

const Support: React.FC<{ patrons: string[]; patreonFunding: number }> = ({
  patrons,
  patreonFunding,
}) => {
  const intl = useIntl();

  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.support.next-seo.title',
          defaultMessage: 'Support Us',
        })}
      />
      <Hero
        imageBackground={heroBackground}
        tagline={{
          image: heroTagline,
          alt: intl.formatMessage({
            id: 'page.support.section.hero.image-alt',
            defaultMessage: 'You are their voice',
          }),
        }}
        alignment="left"
      />
      <SquareField
        squares={HERO_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="px-10">
        <PlainHeader
          header={intl.formatMessage({
            id: 'page.support.section.support-us.header.title',
            defaultMessage: 'Support Us',
          })}
        >
          <FormattedMessage
            id="page.support.section.support-us.header.content"
            defaultMessage="With your gift, we can make a greater impact and change the world for our animal friends."
          />
        </PlainHeader>
        <Paragraph>
          <FormattedMessage
            id="page.support.section.support-us.introduction"
            defaultMessage="We are a vegan volunteer team that builds technology for organizations and individual activists in the animal protection movement. If you believe in the work we do and would like to support us, please consider making a donation."
          />
        </Paragraph>
      </div>
      <div className="mx-auto my-16 md:w-fit">
        <div className="flex flex-wrap items-end justify-center gap-10 mb-5">
          <DonationCard
            color="blue"
            image={PayPalLogo}
            title={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.0.title',
              defaultMessage: 'PayPal',
            })}
            buttonText={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.0.button-label',
              defaultMessage: 'donate',
            })}
            buttonHref="https://paypal.me/davidvanbeveren"
          >
            <FormattedMessage
              id="page.support.section.support-us.donation-card.0.content"
              defaultMessage="For one-time, smaller donations"
            />
          </DonationCard>
          <DonationCard
            color="orange"
            image={PatreonLogo}
            title={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.1.title',
              defaultMessage: 'Patreon',
            })}
            buttonText={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.1.button-label',
              defaultMessage: 'become a patron',
            })}
            buttonHref="https://www.patreon.com/veganhacktivists"
            large
          >
            <FormattedMessage
              id="page.support.section.support-us.donation-card.1.content"
              defaultMessage="Become a monthly supporter for as little as $5 a month"
            />
          </DonationCard>
          <DonationCard
            color="green"
            image={HeartLogo}
            title={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.2.title',
              defaultMessage: 'Other',
            })}
            buttonText={intl.formatMessage({
              id: 'page.support.section.support-us.donation-card.2.button-label',
              defaultMessage: 'contact us',
            })}
            buttonHref="mailto:hello@veganhacktivists.org"
          >
            <FormattedMessage
              id="page.support.section.support-us.donation-card.2.content"
              defaultMessage="For larger donations (US tax-deductible)"
            />
          </DonationCard>
        </div>
        <div className="">
          <Crypto />
        </div>
      </div>

      <Paragraph>
        <FormattedMessage
          id="page.support.section.support-us.subtitle"
          defaultMessage="We prefer a <bold>monthly donation via Patreon</bold> as that gives us the most stability every month, but we also accept one-time donations via PayPal. If you would like to make a larger contribution of $1,000 or more (thank you!), please <contact-link>contact us</contact-link> for other payment methods and tax deduction via our fiscal sponsor."
          values={{
            bold: (chunks) => <span className="font-bold">{chunks}</span>,
            'contact-link': (chunks) => (
              <CustomLink href="mailto:hello@veganhacktivists.org">
                {chunks}
              </CustomLink>
            ),
          }}
        />
      </Paragraph>
      <Sprite image={pig} pixelsLeft={1} pixelsRight={1} />
      <div className="py-16 bg-grey-darker">
        <h2 className="mb-8 text-4xl font-bold text-white">
          <FormattedMessage
            id="page.support.section.donation-goals.title"
            defaultMessage="Monthly Patreon Goals"
          />
        </h2>
        <Paragraph>
          <span className="text-white">
            <FormattedMessage
              id="page.support.section.donation-goals.introduction"
              defaultMessage="See our Patreon goals below, and help us grow and be more effective!"
            />
          </span>
        </Paragraph>
        <ProgressBar currentAmount={patreonFunding} goal={5000} />
        <div className="flex justify-center mt-16">
          <ExternalLinkButton
            href="https://www.patreon.com/veganhacktivists"
            className="font-mono text-xl font-bold text-white"
            capitalize={false}
          >
            <div className="px-4">
              <FormattedMessage
                id="page.support.section.donation-goals.cta-label"
                defaultMessage="Donate Now"
              />
            </div>
          </ExternalLinkButton>
        </div>
      </div>
      <SquareField
        squares={[
          { color: 'gray-background', size: 16, bottom: 0, left: 0 },
          { color: 'gray-background', size: 16, bottom: 0, right: 0 },
          { color: 'white', size: 16, top: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <div className="px-10 pt-10 pb-20 mx-auto bg-gray-background">
        <CustomImage
          src={pixelHeart.src}
          width={pixelHeart.width / 3}
          height={pixelHeart.height / 3}
          alt="Our community"
        />

        <h2 className="mb-8 text-4xl font-bold">
          <FormattedMessage
            id="page.support.section.thank-you.title"
            defaultMessage="Thank You"
          />
        </h2>
        <Paragraph>
          <FormattedMessage
            id="page.support.section.thank-you.introduction"
            defaultMessage="We want to take a moment to thank the people below for their support—for those who have awarded us grants or contributed donations, whether one-time or recurring. We are grateful for your belief in our vision and support for our work."
          />
        </Paragraph>
        <PatreonSupporters patrons={patrons} />
      </div>
      <SquareField
        squares={[
          { color: 'white', size: 16, top: 0, left: 0 },
          { color: 'grey-light', size: 16, bottom: 0, left: 0 },
          { color: 'grey-light', size: 16, bottom: 0, right: 0 },
        ]}
        className="hidden md:block"
      />
      <JoinOurTeam />
      <Sprite image={chicken} pixelsLeft={2} pixelsRight={0} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [patrons, patreonFunding] = await Promise.all([
    getPatrons(),
    getPatreonFundig('USD'),
  ]);

  return {
    props: {
      patrons,
      patreonFunding,
    },
    revalidate: 480,
  };
};

export default Support;
