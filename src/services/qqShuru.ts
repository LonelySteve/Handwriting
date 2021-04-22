import { Service } from ".";
import { RecognitionResult } from "../abstract";

const regex = /QQShuru\.HWPanel\.ajax_callback\((.*)\)/;

function convertResponseJson(jsonText: string): RecognitionResult {
  const data = JSON.parse(jsonText);
  return {
    characters: data.cand,
    assocWords: data.asso,
  };
}

export function getQQShuruService(url: string): Service {
  //
  return function (data) {
    const xmlHttp = new XMLHttpRequest();

    const trackStr = data.map((per) => per.flat().toString()).join(",eb,");

    xmlHttp.open("GET", `${url}?track_str=${trackStr}&cmd=0`, true);

    const promise = new Promise<RecognitionResult>((resolve, reject) => {
      xmlHttp.onloadend = function (ev) {
        if (this.readyState === 4 && this.status === 200) {
          try {
            resolve(convertResponseJson(regex.exec(this.responseText)[1]));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(xmlHttp);
        }
      };
    });

    xmlHttp.send();

    return promise;
  };
}
