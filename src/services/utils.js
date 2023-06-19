
/* 
  I had to create functions to handle the local Caching strategy in vanilla javascript.
  Typescript kept on throwing errors about the types when converting using JSON.parse().
 */

export function getStoredStackOverflowResponse(){
  const storedStackExchangeResponse = JSON.parse(
    localStorage.getItem("users"));
    return storedStackExchangeResponse
}

export function getPageSizeCache(){
  const pageSizeCache = JSON.parse(
    localStorage.getItem("pageSizeCache"));
    return pageSizeCache
}

export function cacheStackOverflowResponse(data, pageSizeCache){
  localStorage.setItem("users", JSON.stringify(data));
  localStorage.setItem("pageSizeCache", JSON.stringify(pageSizeCache));
}