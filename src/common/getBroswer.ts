export function getBroswer():string{
 if("ActiveXObject" in window){
    return "IE";
 }
 if(navigator.userAgent.indexOf("Firefox")!==-1){
    return "Firefox";
 }
 if(navigator.userAgent.indexOf("Chrome")!==-1){
    return "Chrome";
 }
 if(navigator.userAgent.indexOf("Safari")!==-1){
    return "Safari";
 }
 return ""
}
