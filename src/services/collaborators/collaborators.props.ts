export interface Collaborator {
  email: string | null;
  firebaseUid: string;
  name: string;
  provider: string;
  active: boolean;
  photo?: string;
}

export type GetCollaboratorsResponse = Collaborator[];
