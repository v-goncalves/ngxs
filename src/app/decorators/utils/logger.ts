function log(...args) {
  window.console.debug(...args);
}

export class MethodLogger {
  private static getColorAndFontFormat({ color, methodName }: { color: string; methodName: string }) {
    return `color: ${color}; font-weight: ${methodName === 'constructor' ? `bold; border: 1px solid ${color};` : 'normal'}`;
  }
  public static start(className: string, methodName: string, color: string, args?): void {
    const startLog = className ? `%c[${className} : ${methodName}] - Start` : `%c[${methodName}] - Start`;
    const colorValue = className ? this.getColorAndFontFormat({ color, methodName }) : color;
    // v => v !== undefined --> 'result' may not be defined
    log(...[`${startLog}${args && args.length ? `; Args: ` : '.'}`, colorValue, ...args].filter(v => v !== undefined));
  }
  public static end(className: string, methodName: string, color: string, result?: any): void {
    const logString = `%c[${className ? className + ' : ' : ''}${methodName}] - End${result !== undefined ? '; result: ' : '.'}`;
    const colorWithFormat = className ? this.getColorAndFontFormat({ color, methodName }) : color;
    log(...[logString, colorWithFormat, result].filter(v => v !== undefined)); // v => v !== undefined --> 'result' may not be defined
  }
}
