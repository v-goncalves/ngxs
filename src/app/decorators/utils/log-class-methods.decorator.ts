import { MethodLogger } from './logger';
import { environment } from '../../../environments/environment';

const logDefaults = {
  methodEnd: true,
  args: true
};

interface LogParams {
  blackList?: string[];
  logEnd?: boolean;
  logArgs?: boolean;
}

// used to class category color for logging, e.g. Component, Service, Pipe, etc.
class ClassCategory {
  static colorTypes = {
    component: '#182aff',
    service: '#ff9018',
    directive: '#864052',
    pipe: '#867540',
    guard: '#a02bb8',
    default: '#707070'
  };

  private static isOfType(className: string, type: string): boolean {
    return typeof className === 'string' && className.toLowerCase().endsWith(type);
  }

  private static isComponent(className: string): boolean {
    return typeof className === 'string' && this.isOfType(className, 'component');
  }

  private static isService(className: string): boolean {
    return typeof className === 'string' && this.isOfType(className, 'service');
  }

  private static isDirective(className: string): boolean {
    return typeof className === 'string' && this.isOfType(className, 'directive');
  }

  private static isPipe(className: string): boolean {
    return typeof className === 'string' && this.isOfType(className, 'pipe');
  }

  private static isGuard(className: string): boolean {
    return typeof className === 'string' && this.isOfType(className, 'guard');
  }

  static getColor({ className }: { className: string }): string {
    if (this.isComponent(className)) {
      return this.colorTypes.component;
    } else if (this.isService(className)) {
      return this.colorTypes.service;
    } else if (this.isDirective(className)) {
      return this.colorTypes.directive;
    } else if (this.isPipe(className)) {
      return this.colorTypes.pipe;
    } else if (this.isGuard(className)) {
      return this.colorTypes.guard;
    } else {
      return this.colorTypes.default;
    }
  }
}

// function loggerNonProd(
//   target,
//   { blackList, logEnd, logArgs }: LogParams = { blackList: [], logEnd: logDefaults.methodEnd, logArgs: logDefaults.args }
// ): void {
//   const className = target.name;
//   const color = ClassCategory.getColor({ className: className });

//   for (const fn in target.prototype) {
//     if (typeof fn === 'string' && !fn.endsWith('$') && !blackList.includes(fn) && typeof target.prototype[fn] === 'function') {
//       const originalFn = target.prototype[fn];
//       target.prototype[fn] = function(...args) {
//         const finalArgs = logArgs && args && args.length ? args : undefined;
//         MethodLogger.start(className, fn, color, finalArgs);
//         const result = originalFn && originalFn.apply(this, args);
//         if (logEnd) {
//           MethodLogger.end(className, fn, color, logArgs ? result : undefined);
//         }
//         return result;
//       };
//     }
//   }

//   // save a reference to the original constructor
//   const original = target;

//   // a utility function to generate instances of a class
//   function newInstanceFromDefaultConstructor(constructor, ...args) {
//     // 'firstArgument' -> does not make much sense, but is the name assumed by the first element in the console
//     const firstArgument: any = function() {
//       return constructor.apply(this, ...args);
//     };
//     firstArgument.prototype = constructor.prototype;
//     return new firstArgument();
//   }

//   // the new constructor behaviour
//   const newConstructor: any = function(...args) {
//     const finalArgs = logArgs && args && args.length ? args : undefined;
//     MethodLogger.start(className, 'constructor', color, finalArgs);

//     const newInstance = newInstanceFromDefaultConstructor(original, args);
//     if (logEnd) {
//       MethodLogger.end(className, 'constructor', color);
//     }
//     return newInstance;
//   };

//   // copy prototype so intanceof operator still works
//   newConstructor.prototype = original.prototype;

//   // Copy Injectable metadata
//   if (original && original.ngInjectableDef) {
//     newConstructor.ngInjectableDef = original.ngInjectableDef;
//   }

//   // return new constructor (will override original)
//   return newConstructor;
// }

function loggerNonProd(
  target,
  { blackList, logEnd, logArgs }: LogParams = { blackList: [], logEnd: logDefaults.methodEnd, logArgs: logDefaults.args }
): void {
  const original = target;

  // a utility function to generate instances of a class
  function construct(constructor, args) {
    const c: any = function() {
      return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
  }

  // the new constructor behavior
  const f: any = function(...args) {
    const color = ClassCategory.getColor({ className: target.name });
    const finalArgs = logArgs && args && args.length ? args : undefined;
    MethodLogger.start(target.name, 'constructor', color, finalArgs);
    // console.log('======> ' + original.name);
    return construct(original, args);
  };

  // copy prototype so instanceof operator still works
  f.prototype = original.prototype;
  // Copy Injectable metadata
  if (original && original.ngInjectableDef) {
    f.ngInjectableDef = original.ngInjectableDef;
  }

  // return new constructor (will override original)
  return f;
}

function loggerProd(): void {}

// NOTE: this need to be done in this way to avoid including "loggerNonProd()" in the production bundle - start
// WHEN LAZY LOADING IS USE (is out case): if the Logger Directive is user in a lazy module, even in in
// "Production" mode the method "loggerNonProd()" will be included in the module!!!
// In this case is recommended to run a pre-build script to replace in all TS files:
// "@LogClassMethods(...)" by "", then the logger will not be included in the production bundle
let logger: (target?: any, options?: any) => void = loggerProd;
if (!environment.production) {
  logger = loggerNonProd;
}
export function __LogClassMethods__(options?: LogParams): ClassDecorator {
  return function(target: any) {
    return logger(target, options);
  };
}
// NOTE: this need to be done in this way to avoid including "loggerNonProd()" in the production bundle - end
