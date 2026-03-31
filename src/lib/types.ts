export interface APIResponse {
    success:    boolean;
    statusCode: number;
    error?:      string;
    message:    string;
    timestamp:  Date;
    data?:       any;
}
