import {randomHash} from './randomHash'

export function loadScript(scriptURL:string,cache = true):void{
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = scriptURL+(cache?'':`?${randomHash()}`);
  head.appendChild(script);
}


