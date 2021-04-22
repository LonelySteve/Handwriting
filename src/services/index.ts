import { HandwritingData, RecognitionResult } from "../abstract";

export type Service = (data: HandwritingData) => Promise<RecognitionResult>;
