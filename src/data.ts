export interface FeedEvent {
    id: string;
    cover: any;
    host: string;
    hostColor: string;
    hostKind: 'none' | 'scidr' | 'avatars' | 'book' | 'ai' | 'gear' | 'white';
    title: string;
    time: string;
    location?: string;
    inlineMeta?: boolean;
    price?: string;
    dateLabel: string;
    dayLabel: string;
}
export interface PopularEvent {
    id: string;
    cover: any;
    host: string;
    hostMark: 'maum' | 'southpark' | 'flower';
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
        host: 'Aggie Cheung, Kirstie Lee, Lauren Shun',
        hostColor: '#E8D5F0',
        hostKind: 'avatars',
        title: 'Joint Warehouse Sale — The Little Red House × YUZU × A Jar of Pickles x Fractal Flora',
        time: '11:00 AM',
        location: 'Baylands',
        inlineMeta: true,
        dateLabel: 'September 26',
        dayLabel: 'Saturday',
    },
    {
        id: 'readpark',
        cover: require('../assets/covers/cover-readpark.png'),
        host: 'Read in the Park - Bay Area 📚',
        hostColor: '#5C8A2B',
        hostKind: 'book',
        title: 'Read in the Park - South Bay 📚',
        time: '3:00 PM',
        location: 'Sunnyvale West',
        inlineMeta: true,
        dateLabel: 'September 26',
        dayLabel: 'Saturday',
    },
    {
        id: 'gamemarket',
        cover: require('../assets/covers/cover-gamemarket.png'),
        host: 'Game Market West',
        hostColor: '#E8E8EC',
        hostKind: 'none',
        title: 'Game Market West: Fall 2026',
        time: '10:00 AM',
        location: 'Guildhouse',
        inlineMeta: true,
        dateLabel: 'September 27',
        dayLabel: 'Sunday',
    },
    {
        id: 'thinkingai',
        cover: require('../assets/covers/cover-thinkingai.png'),
        host: 'The AI Collective',
        hostColor: '#7B2FF7',
        hostKind: 'ai',
        title: 'ThinkingAI Agentic Growth Summit 2026',
        time: '12:00 PM',
        location: 'Computer History Museum',
        dateLabel: 'September 28',
        dayLabel: 'Monday',
    },
    {
        id: 'techweek',
        cover: require('../assets/covers/cover-techweek.png'),
        host: 'Open Source for AI',
        hostColor: '#4A6B8A',
        hostKind: 'gear',
        title: 'SF Tech Week Agent Day',
        time: '12:00 PM',
        location: '135 Constitution Dr',
        inlineMeta: true,
        dateLabel: 'October 9',
        dayLabel: 'Friday',
    },
    {
        id: 'sudochoir',
        cover: require('../assets/covers/cover-sudochoir.png'),
        host: 'Find A Cappella, Freya Zheng',
        hostColor: '#E8E8EC',
        hostKind: 'white',
        title: '拾度合唱团 Sudo Choir 两周年专场音乐会',
        time: '4:00 PM',
        location: 'Valley Presbyterian Church',
        price: '$29.99',
        dateLabel: 'October 11',
        dayLabel: 'Sunday',
    },
    {
        id: 'bayarea-swap',
        cover: require('../assets/covers/cover-readpark.png'),
        host: 'Bay Area Swap',
        hostColor: '#E8D5F0',
        hostKind: 'none',
        title: 'Bay Area Plant & Book Swap',
        time: '1:00 PM',
        location: 'San Mateo',
        inlineMeta: true,
        dateLabel: 'October 12',
        dayLabel: 'Monday',
    },
];
export const popularEvents: PopularEvent[] = [
    {
        id: 'maum',
        cover: require('../assets/covers/cover-maum.png'),
        host: 'Maum Market',
        hostMark: 'maum',
        title: 'Maum Market SF',
        time: 'Tomorrow, 11:00 AM',
    },
    {
        id: 'waymo',
        cover: require('../assets/covers/cover-waymo.png'),
        host: 'South Park Commons',
        hostMark: 'southpark',
        title: '-1 to Waymo with Dmitri Dolgov',
        time: 'Mon 2:30 PM',
        badge: { label: 'Near Capacity', color: '#D89D1F', bg: '#F5E6C7' },
    },
    {
        id: 'codex',
        cover: require('../assets/covers/cover-codex.png'),
        host: 'Codex SF',
        hostMark: 'flower',
        title: 'Codex Community Meetup - San Francisco',
        time: 'Tue 6:00 PM',
        badge: { label: 'Waitlist Open', color: '#3780ED', bg: '#D4E3FB' },
    },
];
export const categories = [
    { id: 'family', label: 'Family', icon: 'family', track: -0.65 },
    { id: 'tech', label: 'Tech', icon: 'tech', track: -0.50 },
    { id: 'food', label: 'Food & Drink', icon: 'food', track: -0.68 },
    { id: 'music', label: 'Music', icon: 'books', track: -0.50 },
    { id: 'books', label: 'Books', icon: 'books', track: -1.13 },
    { id: 'games', label: 'Games', icon: 'games', track: -1.21 },
    { id: 'ai', label: 'AI', icon: 'ai', track: -0.25 },
    { id: 'running', label: 'Running', icon: 'running', track: -0.45 },
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
