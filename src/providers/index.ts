import { HandwritingData, RecognitionResult } from "../abstract";
import { getQQShuruProvider } from "./qqShuru";

export type FunctionalServiceProvider = (
  data: HandwritingData,
  callback: (result?: RecognitionResult, error?: Error) => any
) => any;

export type ServiceProvider =
  | { type: string; url: string }
  | FunctionalServiceProvider;

export function toFunctionalServiceProvider({
  type,
  url,
}: {
  type: string;
  url: string;
}) {
  switch (type) {
    case "qqShuru":
      return getQQShuruProvider(url);
    default:
      break;
  }
}
