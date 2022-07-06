type MConsole = {
    log(...data: any): void,
    error(...data: any[]): void,
    warn(...data: any[]): void,
    clear(): void,
    read(): string,
    table(tabularData?: any, properties?: string[]): void
}