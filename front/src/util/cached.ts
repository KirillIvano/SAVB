import {Parameters, ReturnType} from './highOrder';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cached =
     <T extends (...args: any[]) => any>(
        func: T,
    ): ((...actualArgs: Parameters<T>) => ReturnType<T>) => {
         let value: ReturnType<T>;
         let isMemoized = false;

         return (...args: Parameters<T>) => {
             if (!isMemoized) {
                 value = func(...args);
                 isMemoized = true;
                 return value;
             }

             return value;
         };
     };
