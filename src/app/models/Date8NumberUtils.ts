export class Date8NumberUtils
{
    public static now() : number {
        const date = new Date(Date.now());
        return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    }
}