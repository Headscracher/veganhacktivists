// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IBlogEntryFields {
  /** slug */
  slug: string;

  /** title */
  title: string;

  /** excerpt */
  excerpt: Document;

  /** publishDate */
  publishDate?: string | undefined;

  /** content */
  content: Document;

  /** author */
  author: ITeamMember;

  /** featuredImage */
  featuredImage: Asset;

  /** tags */
  tags?: ITag[] | undefined;
}

export interface IBlogEntry extends Entry<IBlogEntryFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "blogEntry";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICodeBlockFields {
  /** content */
  content: Document;

  /** language */
  language: string;
}

export interface ICodeBlock extends Entry<ICodeBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "codeBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IDocsCategoryFields {
  /** slug */
  slug: string;

  /** name */
  name: string;

  /** order */
  order: number;

  /** color */
  color: string;

  /** sections */
  sections: IDocsSection[];
}

export interface IDocsCategory extends Entry<IDocsCategoryFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "docsCategory";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IDocsSectionFields {
  /** slug */
  slug: string;

  /** title */
  title: string;

  /** subsections */
  subsections?: IDocumentation[] | undefined;

  /** content */
  content?: Document | undefined;
}

export interface IDocsSection extends Entry<IDocsSectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "docsSection";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IDocumentationFields {
  /** slug */
  slug: string;

  /** title */
  title: string;

  /** content */
  content: Document;
}

export interface IDocumentation extends Entry<IDocumentationFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "documentation";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IMultipleValuesFields {
  /** name */
  name: string;

  /** values */
  values: string[];
}

export interface IMultipleValues extends Entry<IMultipleValuesFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "multipleValues";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IProjectFields {
  /** name */
  name: string;

  /** description */
  description: Document;

  /** image */
  image: Asset;

  /** team */
  team: ITeam;

  /** url */
  url: string;

  /** date */
  date: string;

  /** isFeatured */
  isFeatured: boolean;
}

export interface IProject extends Entry<IProjectFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "project";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISingleValuesFields {
  /** name */
  name: string;

  /** value */
  value: string;
}

export interface ISingleValues extends Entry<ISingleValuesFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "singleValues";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISocialLinksFields {
  /** twitter */
  twitter?: string | undefined;

  /** instagram */
  instagram?: string | undefined;

  /** facebook */
  facebook?: string | undefined;

  /** github */
  github?: string | undefined;

  /** website */
  website?: string | undefined;

  /** linkedIn */
  linkedIn?: string | undefined;

  /** activistHub */
  activistHub?: string | undefined;

  /** youtube */
  youtube?: string | undefined;

  /** email */
  email?: string | undefined;
}

export interface ISocialLinks extends Entry<ISocialLinksFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "socialLinks";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITagFields {
  /** slug */
  slug: string;

  /** name */
  name: string;
}

export interface ITag extends Entry<ITagFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "tag";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITeamFields {
  /** slug */
  slug: string;

  /** name */
  name: string;

  /** color */
  color: string;

  /** icon */
  icon: string;

  /** sprite */
  sprite?: Asset | undefined;

  /** isInactive */
  isInactive: boolean;
}

export interface ITeam extends Entry<ITeamFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "team";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITeamMemberFields {
  /** slug */
  slug: string;

  /** name */
  name: string;

  /** position */
  position: string;

  /** image */
  image?: Asset | undefined;

  /** team */
  team?: ITeam | undefined;

  /** Social Links */
  socialLinks?: ISocialLinks | undefined;

  /** type */
  type: "team" | "advisor" | "partner";

  /** description */
  description?: Document | undefined;

  /** isTeamLeader */
  isTeamLeader: boolean;

  /** isInactive */
  isInactive: boolean;
}

export interface ITeamMember extends Entry<ITeamMemberFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "teamMember";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "blogEntry"
  | "codeBlock"
  | "docsCategory"
  | "docsSection"
  | "documentation"
  | "multipleValues"
  | "project"
  | "singleValues"
  | "socialLinks"
  | "tag"
  | "team"
  | "teamMember";

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
