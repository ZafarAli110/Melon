type UpperAndLowerCase<T extends string> = Uppercase<T> | Lowercase<T>;

declare type HttpMethod = UpperAndLowerCase<"get"> | UpperAndLowerCase<"post">
  | UpperAndLowerCase<"patch"> | UpperAndLowerCase<"delete"> | UpperAndLowerCase<"head">
  | UpperAndLowerCase<"options">;

declare interface HttpResponse {
    body: string;
    headers: Record<string, any>;
    latency: number;
    statusCode: number;
    ok: boolean;
    json<T>(): T;
    text(): string;
}

declare interface HttpRequest {
    query: Record<string, any>;
    body: string;
    headers: Record<string, any>;
    values: Record<string, any>;
    method: string;
    url: string;
}

declare interface HttpComposedResponse {
    status: number;
    response: string;
    headers: string;
}

declare interface HttpEndpoint {
    route: string;
    method: string;
    callback: Function;
}

declare type HttpCallbackFunction = 
    (request?: HttpRequest) => string | number | boolean | bigint | Array<any>  | HttpComposedResponse;

declare type HttpAsyncCallbackFunction = 
    (request?: HttpRequest) => 
        Promise<number> | 
        Promise<boolean> |
        Promise<bigint> |
        Promise<string> |
        Promise<Array<any>> |
        Promise<HttpComposedResponse>;

declare type EndpointFunction = (
    route: string, 
    callback: HttpCallbackFunction | HttpAsyncCallbackFunction
) => void

declare interface HttpApplication {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    getEndpoints: () => HttpEndpoint[];
    get: EndpointFunction;
    post: EndpointFunction;
    delete: EndpointFunction;
    patch: EndpointFunction;
    put: EndpointFunction;
    options: EndpointFunction;
    head: EndpointFunction;
    listen: (port: number, host?: string) => void;
    run: () => never;
}
