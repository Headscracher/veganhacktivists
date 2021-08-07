// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

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

export interface ITeamFields {
  /** name */
  name: string;

  /** color */
  color: string;

  /** icon */
  icon: string;

  /** sprite */
  sprite?: Asset | undefined;
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

export type CONTENT_TYPE = "socialLinks" | "team" | "teamMember";

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
