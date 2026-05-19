import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ReferenceField } from './ReferenceField.props';

export type AuthorItemFields = {
  personProfileImage?: ImageField;
  personFirstName: Field<string>;
  personLastName: Field<string>;
  personJobTitle?: Field<string>;
  personBio?: Field<string>;
  personLinkedIn?: LinkField;
};

export type AuthorReferenceField = ReferenceField & {
  fields: AuthorItemFields;
};
