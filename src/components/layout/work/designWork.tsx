import { Player } from '@lottiefiles/react-lottie-player';
import { FormattedMessage, useIntl } from 'react-intl';

import VSLogoLottieFile from '../../../../public/lottiefiles/VS_logoAnim_Minimal.json';

import SquareField from 'components/decoration/squares';
import { DarkButton, LightButton } from 'components/decoration/buttons';
import { SectionHeader } from 'components/decoration/textBlocks';

const TOP_DECORATION_SQUARES = [{ color: 'grey', size: 16, right: 0, top: 0 }];

const DesignWork: React.FC = () => {
  const intl = useIntl();

  const visitVioletStudiosButtonLabel = intl.formatMessage({
    id: 'page.our-work.section.design-work.button.label',
    defaultMessage:
      'Visit <no-localization>violetstudios.org</no-localization>',
  });

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='flex flex-col-reverse md:flex-row text-left'>
        <div className='basis-full md:basis-1/2 bg-[#171919] md:bg-[#DDDDDD] text-white md:text-black flex justify-center md:justify-end pb-32 md:pb-0'>
          <div className='flex-grow max-w-4xl flex justify-center px-10'>
            <div className='md:py-36 lg:w-[27.25rem]'>
              <SectionHeader header={'Our <b>Design Work</b>'} stackEntries />
              <div className='text-lg pt-8 pb-4'>
                <FormattedMessage
                  id='page.our-work.section.design-work.content'
                  defaultMessage='Our sister organization, <highlight><no-localization>Violet Studios</no-localization></highlight>, provides design services at no charge for animal advocates and organizations. Whether it’s branding, document design, web design, or other high-impact areas of design, we’re here to help vegan organizations look sharp, build trust, increase reputation, and unite people.'
                  values={{
                    highlight: (chunk) => (
                      <span className='underline font-bold'>{chunk}</span>
                    ),
                  }}
                />
              </div>
              <div className='text-center mt-8'>
                <DarkButton
                  capitalize={false}
                  className='hidden md:block'
                  href='https://violetstudios.org/'
                  newTab
                >
                  {visitVioletStudiosButtonLabel}
                </DarkButton>
                <LightButton
                  capitalize={false}
                  className='md:hidden'
                  href='https://violetstudios.org/'
                  newTab
                >
                  {visitVioletStudiosButtonLabel}
                </LightButton>
              </div>
            </div>
          </div>
        </div>

        <div className='basis-full md:basis-1/2 bg-[#171919] flex justify-center md:justify-start pt-20 pb-10 md:py-0'>
          <div className='flex-grow max-w-3xl flex items-center justify-center'>
            <Player
              autoplay
              loop
              src={VSLogoLottieFile}
              className='w-3/5 md:w-[290px]'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignWork;
