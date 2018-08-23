import { MethodLogger } from './logger';
import { environment } from '../../../environments/environment';

interface LogParams {
  logEnd?: boolean;
  logArgs?: boolean;
}

const defaultMethodLoggerColor = `color: #10aaf0; font-weight: bold`;
function loggerNonProd(options: LogParams) {
  return function(target, key, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const functionName = key;
      if (options === undefined || (options && options.logArgs)) {
        MethodLogger.start(null, functionName, defaultMethodLoggerColor, args);
      } else {
        MethodLogger.start(null, functionName, defaultMethodLoggerColor);
      }

      const result = originalMethod.apply(this, args);
      if (options === undefined || (options && options.logEnd)) {
        MethodLogger.end(null, functionName, defaultMethodLoggerColor, result);
      }
      return result;
    };

    return descriptor;
  };
}

// NOTE: this need to be done in this way to avoid including "loggerNonProd()" in the production bundle - start
// WHEN LAZY LOADING IS USE (is out case): if the Logger Directive is user in a lazy module, even in in
// "Production" mode the method "loggerNonProd()" will be included in the module!!!
// In this case is recommended to run a pre-build script to replace in all TS files:
// "@LogClassMethods(...)" by "", then the logger will not be included in the production bundle

function loggerProd(options?: LogParams): any {
  return function(target, key, descriptor: PropertyDescriptor) {};
}
let loggerMethod: (options?: LogParams) => void = loggerProd; // (target, key, descriptor: PropertyDescriptor) => void = loggerNonProd;
if (!environment.production) {
  loggerMethod = loggerNonProd;
}
// NOTE: this need to be done in this way to avoid including "loggerNonProd()" in the production bundle - end

export function __LogMethod__(options?: LogParams): any {
  return loggerMethod(options);
}
