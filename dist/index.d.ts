import { BaseClient } from './clients/BaseClient';
import { AutoPostOptions } from './typings';
export declare function InfinityAutoPoster(auth: string, client: any, options?: AutoPostOptions): BaseClient;
export { DJSClient } from './clients/DJSClient';
export { ErisClient } from './clients/ErisClient';
export default InfinityAutoPoster;
