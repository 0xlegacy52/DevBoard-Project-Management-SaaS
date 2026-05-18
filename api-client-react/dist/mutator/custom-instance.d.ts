export declare const customInstance: <T>({ url, method, params, data, headers, }: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: Record<string, unknown>;
    data?: unknown;
    headers?: Record<string, string>;
    signal?: AbortSignal;
}) => Promise<T>;
export default customInstance;
//# sourceMappingURL=custom-instance.d.ts.map