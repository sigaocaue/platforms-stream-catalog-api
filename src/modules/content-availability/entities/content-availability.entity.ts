export class ContentAvailabilityEntity {
  streamingPlatformId: string;
  streamingContentId: string;
  entryDate: Date;
  exitDate?: Date;
  createdAt?: Date;
}
