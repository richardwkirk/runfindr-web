export class Marker {
    lat: number;
    long: number;
    title: string;
    iconUrl: string;
    visited: boolean;
    priority = 1;

    static getIconUrl(visited: boolean): string {
        return visited ? '/assets/event_visited_balloon.png' : '/assets/event_balloon.png';
    }

    getPriority() {
        return this.visited ? 9 : 1;
    }

    setVisited(visited: boolean) {
        this.visited = visited;
        this.iconUrl = Marker.getIconUrl(visited);
        this.priority = this.getPriority();
    }
}
