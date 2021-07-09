import { faInstagram, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export interface ButtonProps {
  linkUrl?: string;
  label?: string;
  style?: string;
}

const BaseButton: React.FC<ButtonProps> = ({ linkUrl, children }) => {
  
  return linkUrl
    ? <Link href={linkUrl} passHref>
        {children}
      </Link>
    : <button type="submit">
        {children}
      </button>
};

// TODO: define what a submit should look like
const SubmitButton: React.FC<ButtonProps> = (props) => {
  
  return (
    <BaseButton {...props}></BaseButton>
  );

};

//TODO: define light button classes

const LightButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  
  return (
    <BaseButton {...props}>
      <a>
          <div className="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
              {children}
          </div>
      </a>
    </BaseButton>
  );
};

//TODO: define dark button classes

const DarkButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  
  return (
      <BaseButton {...props}>
          <a>
              <div className="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
                  {children}
              </div>
          </a>
      </BaseButton>
  );
};

const ExternalLinkButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  
  return (
    <BaseButton {...props}>
      <a>
          <div className="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
              {children}
          </div>
      </a>
    </BaseButton>
  );
};

const IconButton: React.FC<ButtonProps> = ({children, style, ...props}) => {

  return (
    <BaseButton {...props}>
        <a {...props}>
          {children}
        </a>
    </BaseButton>
  );
};

const PatreonButton: React.FC<ButtonProps> = ({children, ...props}) => {
  
    return (
      <IconButton {...props} style="bg-white hover:bg-strawberry text-grey hover:text-white rounded-full px-1 py-2 mx-2">
        <FontAwesomeIcon size="2x" fixedWidth icon={faPatreon} />
      </IconButton>
    );
};

const InstagramButton: React.FC<ButtonProps> = ({children, ...props}) => {
  
    return (
      <IconButton {...props} style="bg-white hover:bg-strawberry text-grey hover:text-white rounded-full px-1 py-2 mx-2">
        <FontAwesomeIcon size="2x" fixedWidth icon={faInstagram} />
      </IconButton>
    );
};

export { ExternalLinkButton, SubmitButton, PatreonButton, InstagramButton };

