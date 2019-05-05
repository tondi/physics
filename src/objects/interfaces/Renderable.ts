export interface Renderable {
    render(ctx: CanvasRenderingContext2D, ...args: any[]): void;
}