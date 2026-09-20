export interface FeedEvent {
    id: string;
    cover: any;
    host: string;
    hostColor: string;
    hostKind: 'dot' | 'scidr' | 'avatars' | 'book';
    title: string;
    time: string;
    location?: string;
    inlineMeta?: boolean;
    dateLabel: string;
    dayLabel: string;
}
export interface PopularEvent {
    id: string;
    cover: any;
    host: string;
    hostIcon: string;
    title: string;
    time: string;
    badge?: {
        label: string;
        color: string;
        bg: string;
    };
}
export interface Category {
    id: string;
    label: string;
    icon: string;
}
export const feedEvents: FeedEvent[] = [
    {
        id: 'backtoschool',
        cover: require('../assets/covers/cover-backtoschool.png'),
        host: 'SCIDR',
        hostColor: '#E8E8EC',
        hostKind: 'scidr',
        title: 'Back-to-School ConsumerInno Pop-up',
        time: '11:30 AM',
        location: 'White Memorial Fountain',
        dateLabel: 'September 22',
        dayLabel: 'Tuesday',
    },
    {
        id: 'warehouse',
        cover: require('../assets/covers/cover-warehouse.png'),
        host: 'Aggie Cheung, Kirstie Lee, Lauren Sh…',
        hostColor: '#E8D5F0',
        hostKind: 'avatars',
        title: 'Joint Warehouse Sale — The Little Red House × YUZU × A Jar of Pickl…',
        time: '11:00 AM',
        location: 'Baylands',
        inlineMeta: true,
        dateLabel: 'September 26',
        dayLabel: 'Saturday',
    },
    {
        id: 'readpark',
        cover: require('../assets/covers/cover-readpark.png'),
        host: 'Read in the Park - Bay Area',
        hostColor: '#5C8A2B',
        hostKind: 'book',
        title: 'Read in the Park',
        time: '3:00 PM',
        location: '',
        dateLabel: 'September 28',
        dayLabel: 'Monday',
    },
];
export const popularEvents: PopularEvent[] = [
    {
        id: 'maum',
        cover: require('../assets/covers/cover-maum.png'),
        host: 'Maum Market',
        hostIcon: 'M',
        title: 'Maum Market SF',
        time: 'Tomorrow, 11:00 AM',
    },
    {
        id: 'waymo',
        cover: require('../assets/covers/cover-waymo.png'),
        host: 'South Park Comm…',
        hostIcon: 'W',
        title: '-1 to Waymo with Dmitri Dolgov',
        time: 'Mon 2:30 PM',
        badge: { label: 'Near Capacity', color: '#D97706', bg: '#FEF3C7' },
    },
    {
        id: 'codex',
        cover: require('../assets/covers/cover-codex.png'),
        host: 'Codex SF',
        hostIcon: 'C',
        title: 'Codex Community Meetup - San Francisco',
        time: 'Tue 6:00 PM',
        badge: { label: 'Waitlist Open', color: '#2563EB', bg: '#EFF6FF' },
    },
];
export const categories = [
    { id: 'family', label: 'Family', icon: 'family' },
    { id: 'tech', label: 'Tech', icon: 'tech' },
    { id: 'food', label: 'Food & Drink', icon: 'food' },
    { id: 'books', label: 'Books', icon: 'books' },
    { id: 'games', label: 'Games', icon: 'games' },
    { id: 'ai', label: 'AI', icon: 'ai' },
    { id: 'running', label: 'Running', icon: 'running' },
];
export const detailEvent = {
    cover: require('../assets/covers/cover-thinkingai.png'),
    title: 'ThinkingAI Agentic Growth Summit 2026',
    host: 'The AI Collective',
    time: 'Mon, Sep 28, 12:00 – 4:00 PM',
    location: 'Computer History Museum',
    address: '1401 N Shoreline Blvd, Mountain View, CA 94043, USA',
    about: 'Join us for the ThinkingAI Agentic Growth Summit 2026, bringing together leaders, builders and researchers in the agentic AI space. The afternoon features keynote talks, fireside conversations and hands-on demos from teams shipping production AI agents.',
};
