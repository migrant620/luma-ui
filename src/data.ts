export type FeedEvent = {
    id: string;
    day: string;
    weekday: string;
    cover: string;
    hostLabel: string;
    title: string;
    time: string;
    location: string;
};
export const feedEvents: FeedEvent[] = [
    {
        id: 'e1',
        day: 'September 22',
        weekday: 'Tuesday',
        cover: 'cover01',
        hostLabel: 'By SCIDR',
        title: 'Back-to-School ConsumerInno Pop-up',
        time: '11:30 AM',
        location: 'White Memorial Fountain',
    },
    {
        id: 'e2',
        day: 'September 26',
        weekday: 'Saturday',
        cover: 'cover02',
        hostLabel: 'By Aggie Cheung, Kirstie Lee, Lauren Shun',
        title: 'Joint Warehouse Sale — The Little Red House × YUZU × A Jar of Pickles',
        time: '11:00 AM',
        location: 'Baylands',
    },
    {
        id: 'e3',
        day: 'September 28',
        weekday: 'Monday',
        cover: 'cover05',
        hostLabel: 'By The AI Collective',
        title: 'ThinkingAI Agentic Growth Summit 2026',
        time: '12:00 PM',
        location: 'Computer History Museum',
    },
    {
        id: 'e4',
        day: 'September 29',
        weekday: 'Tuesday',
        cover: 'cover03',
        hostLabel: 'By Read in the Park - Bay Area',
        title: 'Read in the Park - South Bay',
        time: '3:00 PM',
        location: 'Sunnyvale West',
    },
];
export type PopularEvent = {
    id: string;
    cover: string;
    host: string;
    title: string;
    time: string;
    badge?: string;
    badgeColor?: string;
};
export const popularEvents: PopularEvent[] = [
    { id: 'p1', cover: 'cover04', host: 'SF Tech Meetup', title: 'Founders Mixer SF', time: 'Tomorrow, 11:00 AM' },
    { id: 'p2', cover: 'cover05', host: 'Night Owl Events', title: 'Neon City Social', time: 'Mon 7:00 PM', badge: 'Near Capacity', badgeColor: '#FF9500' },
    { id: 'p3', cover: 'cover01', host: 'Design Collective', title: 'Design Systems Meetup', time: 'Tue 6:30 PM', badge: 'Waitlist Open', badgeColor: '#007AFF' },
];
export const categories = [
    { name: 'Family', icon: 'family', color: '#B87FD9' },
    { name: 'Tech', icon: 'tech', color: '#4A90D9' },
    { name: 'Food & Drink', icon: 'food', color: '#E89B3D' },
    { name: 'Books', icon: 'books', color: '#D4B83A' },
    { name: 'Games', icon: 'games', color: '#B8865A' },
    { name: 'AI', icon: 'ai', color: '#E87AA8' },
    { name: 'Running', icon: 'running', color: '#6BB85A' },
];
export const cities = ['New York', 'Los Angeles', 'Seattle', 'London', 'Boston'];
export type GalleryCategory = {
    name: string;
    count: number;
    cover: string;
};
export const galleryCollections: GalleryCategory[] = [
    { name: 'Suggested', count: 21, cover: 'gallery01' },
    { name: 'School', count: 18, cover: 'gallery02' },
    { name: 'Halloween', count: 12, cover: 'gallery03' },
    { name: 'Thanksgiving', count: 9, cover: 'gallery01' },
    { name: 'Holiday', count: 15, cover: 'gallery02' },
    { name: 'Retro', count: 11, cover: 'gallery03' },
];
export const detailEvent = {
    title: 'ThinkingAI Agentic Growth Summit 2026',
    host: 'The AI Collective',
    time: 'Mon, Sep 28, 12:00 – 4:00 PM',
    locationName: 'Computer History Museum',
    locationAddress: '1401 N Shoreline Blvd, Mountain View, CA 94043, USA',
    goingCount: 538,
    attendeeSummary: 'Your name here and 534 more',
    hostName: 'The AI Collective',
    hostTitle: 'Event Host',
    about: `Join builders, researchers, and operators for a full day on agentic AI growth. Talks, panels, and hands-on demos across tooling, evaluation, and go-to-market strategy. Lunch and coffee provided.`,
    details: [
        { label: 'Date', value: 'Monday, September 28, 2026' },
        { label: 'Time', value: '12:00 – 4:00 PM Pacific' },
        { label: 'Location', value: 'Computer History Museum, Mountain View' },
        { label: 'Price', value: 'Free' },
    ],
};
