import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import CustomImage from '../../../decoration/customImage';

import playgroundLogo from '../../../../../public/images/yearInReview/2021/playground.png';
import discord from '../../../../../public/images/yearInReview/2021/discord.png';
import { DarkButton } from '../../../decoration/buttons';
import SquareField from '../../../decoration/squares';

const Playground: React.FC = () => {
  return (
    <>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-background', left: 0, bottom: 0 },
          { color: 'grey-background', right: 0, bottom: 0 },
          { color: 'grey-light', right: 0, top: 0 },
        ]}
      />
      <SectionContainer color="grey-background" className="text-grey md:pb-40">
        <div className="flex md:w-2/3 mx-auto gap-x-10">
          <div className="md:text-left md:w-3/4">
            <CustomImage
              src={playgroundLogo}
              alt=""
              layout="fixed"
              height={150}
              width={150}
            />
            <SectionHeader
              className="mt-5"
              header={['VH: Playground', 'launched']}
              startWithBoldFont
            />
            <div className="space-y-5">
              <p>
                We launched a open-source community available to the public
                called VH: Playground! Playground allows developers who
                don&apos;t have the time or specific skills to join the core
                Vegan Hacktivists team to still contribute to the movement,
                whether that be on our open source projects or their own!
              </p>
              <p>
                In short, we wanted to build and foster a community of vegan
                developers in order to support folks outside of our network - so
                far we&apos;ve attracted over 400 members, and counting!
              </p>
              <div className="mt-5 w-min mx-auto">
                <DarkButton
                  href="https://discord.gg/vw5HUX9HW5"
                  className="w-min font-semibold"
                >
                  Join the playground
                </DarkButton>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex-grow md:my-auto translate-y-1/2">
            <CustomImage src={discord} alt="" />
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Playground;
