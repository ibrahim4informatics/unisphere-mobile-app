const timeFormat = (timestamp: string) => {
    const time = new Date(timestamp).getTime();
    const now = new Date().getTime();
    const diffMs = now - time;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) return `${diffSeconds}s`;
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 365) return `${diffDays}d`;
    return `${diffYears}y`;
}
export default timeFormat;