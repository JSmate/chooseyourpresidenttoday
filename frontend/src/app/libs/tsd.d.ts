declare module 'angular-ui-bootstrap' {}

declare module 'angular-toastr' {}

declare module 'satellizer' {}

declare var ON_TEST;

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};