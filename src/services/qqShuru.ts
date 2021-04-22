import { Service } from ".";
import { RecognitionResult } from "../abstract";

const regex = /QQShuru\.HWPanel\.ajax_callback\((.*)\)/;

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
            const resultMatches = regex.exec(this.responseText);

            if (resultMatches) {
              const result = JSON.parse(resultMatches[1]);
              resolve({
                characters: result.cand,
                assocWords: result.asso,
              });
            } else {
              // 直接尝试转换响应文本
              const response = JSON.parse(this.responseText);
              // 检查 ret
              if (response.ret) {
                throw new Error(`qqShuru ret: ${response.ret}`);
              } else {
                throw new Error(`qqShuru response: ${response}`)
              }
            }
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
