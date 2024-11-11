export const CommonUtil = {
  sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}