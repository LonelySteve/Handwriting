import { FunctionalServiceProvider } from ".";
import { RecognitionResult } from "../abstract";

const regex = /QQShuru\.HWPanel\.ajax_callback\((.*)\)/;

function convertResponseJson(jsonText: string): RecognitionResult {
  const data = JSON.parse(jsonText);
  return {
    characters: data.cand,
    assocWords: data.asso,
  };
}

export function getQQShuruProvider(url: string): FunctionalServiceProvider {
  //
  return function (data, callback) {
    const xmlHttp = new XMLHttpRequest();

    const trackStr = data.map((per) => per.flat().toString()).join(",eb,");

    xmlHttp.open("GET", `${url}?track_str=${trackStr}&cmd=0`, true);

    xmlHttp.onloadend = function (ev) {
      if (this.readyState === 4 && this.status === 200) {
        try {
          callback(convertResponseJson(regex.exec(this.responseText)[1]));
        } catch (error) {
          callback(null, error);
        }
      } else {
        callback(null);
      }
    };

    xmlHttp.send();
  };
}
