import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors, fonts, radius, spacing } from './tokens';
import { feedEvents, popularEvents, categories, cities, galleryCollections, detailEvent } from './data';
import { useAppFonts } from './webfont';
const { width: SCREEN_W } = Dimensions.get('window');
type Tab = 'home' | 'discover' | 'notifications' | 'chat';
type Screen = 'onboarding' | 'home' | 'discover' | 'detail' | 'create' | 'gallery' | 'notifications' | 'chat';
export default function App() {
    const [fontsLoaded] = useAppFonts();
    const [screen, setScreen] = React.useState<Screen>('onboarding');
    const [tab, setTab] = React.useState<Tab>('home');
    const [homeScrolled, setHomeScrolled] = React.useState(false);
    const [detailScrolled, setDetailScrolled] = React.useState(0);
    if (!fontsLoaded)
        return <View style={{ flex: 1, backgroundColor: colors.bg }}/>;
    const goTab = (t: Tab) => {
        setTab(t);
        setScreen(t);
    };
    const openDetail = () => { setScreen('detail'); setDetailScrolled(0); };
    const openCreate = () => setScreen('create');
    const openGallery = () => setScreen('gallery');
    return (<SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar style={screen === 'detail' ? 'light' : 'dark'}/>
        {screen === 'onboarding' && (<Onboarding onNext={() => goTab('home')}/>)}
        {screen === 'home' && (<HomeScreen scrolled={homeScrolled} onScroll={setHomeScrolled} onOpenDetail={openDetail} onOpenCreate={openCreate} onTab={goTab} activeTab={tab}/>)}
        {screen === 'discover' && (<DiscoverScreen onTab={goTab} activeTab={tab}/>)}
        {screen === 'detail' && (<DetailScreen scrollY={detailScrolled} onScroll={setDetailScrolled} onBack={() => goTab('home')}/>)}
        {screen === 'create' && (<CreateScreen onBack={() => goTab('home')} onOpenGallery={openGallery}/>)}
        {screen === 'gallery' && (<GallerySheet onClose={() => setScreen('create')}/>)}
        {screen === 'notifications' && (<NotificationsScreen onTab={goTab} activeTab={tab}/>)}
        {screen === 'chat' && (<ChatScreen onTab={goTab} activeTab={tab}/>)}
      </SafeAreaView>
    </SafeAreaProvider>);
}
function Onboarding({ onNext }: {
    onNext: () => void;
}) {
    const [panelOpen, setPanelOpen] = React.useState(false);
    return (<View style={styles.onboardRoot}>
      <View style={styles.promoWall}>
        {[0, 1, 2, 3, 4, 5, 6].map(i => (<View key={i} style={[styles.promoCard, {
                    left: (i * 67) % 320, top: (i * 90) % 500,
                    transform: [{ rotate: `${(i % 2 ? -3 : 3)}deg` }],
                }]}/>))}
        <View style={styles.onboardTextWrap}>
          <Text style={styles.lumaWordmark}>luma</Text>
          <Text style={styles.delightful}>Delightful</Text>
          <Text style={styles.delightful}>events</Text>
          <Text style={styles.startHere}>start here</Text>
        </View>
      </View>
      {!panelOpen ? (<View>
        <Text style={styles.pssst}>Pssst… the fun starts below</Text>
        <TouchableOpacity style={styles.downArrow} onPress={() => setPanelOpen(true)} accessibilityLabel="start here">
          <Text style={{ color: '#fff', fontSize: 28 }}>↓</Text>
        </TouchableOpacity>
        </View>) : (<View style={styles.loginSheet}>
          <View style={styles.grabber}/>
          <Text style={styles.loginSub}>
            Discover events, follow calendars and manage events you are going to.
          </Text>
          <TouchableOpacity style={styles.phoneBtn} accessibilityLabel="Continue with Phone" onPress={onNext}>
            <Text style={styles.phoneBtnText}>Continue with Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emailBtn}>
            <Text style={styles.emailBtnText}>Continue with Email</Text>
          </TouchableOpacity>
          <View style={styles.oauthRow}>
            <TouchableOpacity style={styles.oauthBtn} accessibilityLabel="Sign in with Google">
              <Text style={styles.oauthBtnText}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oauthBtn} accessibilityLabel="Sign in with a passkey">
              <Text style={styles.oauthBtnText}>👤🔑</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.terms}>
            By continuing, you agree to Luma's <Text style={{ textDecorationLine: 'underline' }}>Terms of Use</Text>
          </Text>
          <TouchableOpacity onPress={onNext}><Text style={{ height: 1 }}/></TouchableOpacity>
        </View>)}
    </View>);
}
function HomeScreen({ scrolled, onScroll, onOpenDetail, onOpenCreate, onTab, activeTab }: any) {
    return (<View style={styles.screen}>
      <View style={styles.homeHeader}>
        <TouchableOpacity style={styles.avatarWrap} accessibilityLabel="Profile">
          <View style={styles.avatarGrad}/>
        </TouchableOpacity>
        <Text style={styles.homeWordmark}>luma</Text>
        <TouchableOpacity accessibilityLabel="Settings"><Text style={styles.gear}>⚙</Text></TouchableOpacity>
      </View>
      <ScrollView onScroll={(e) => onScroll(e.nativeEvent.contentOffset.y > 200)} scrollEventThrottle={16}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Your Events</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}/>
          <View>
            <Text style={styles.emptyTitle}>No Upcoming Events</Text>
            <Text style={styles.emptySub}>Events you are hosting or going to will show up here.</Text>
          </View>
        </View>
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Picked for You</Text>
        <TouchableOpacity style={styles.filterRow}>
          <Text style={styles.filterLabel}>Nearby</Text>
          <Text style={styles.filterChevron}>⌄</Text>
        </TouchableOpacity>
        {feedEvents.map((ev, idx) => (<View key={ev.id}>
            <View style={styles.dateRow}>
              <Text style={styles.dateDay}>{ev.day}</Text>
              <Text style={styles.dateSep}> / </Text>
              <Text style={styles.dateWeekday}>{ev.weekday}</Text>
            </View>
            <TouchableOpacity style={styles.eventCard} onPress={onOpenDetail} accessibilityLabel={`${ev.title}, ${ev.time}, ${ev.location}, ${ev.hostLabel}`}>
              <View style={styles.feedCover}/>
              <View style={styles.feedInfo}>
                <Text style={styles.feedTitle} numberOfLines={2}>{ev.title}</Text>
                <Text style={styles.metaText} numberOfLines={1}>🕐 {ev.time} · 📍 {ev.location}</Text>
                <Text style={styles.feedHostLine} numberOfLines={1}>{ev.hostLabel}</Text>
              </View>
            </TouchableOpacity>
          </View>))}
        <View style={{ height: 120 }}/>
      </ScrollView>
      {!scrolled ? (<TouchableOpacity style={styles.createCapsule} onPress={onOpenCreate} accessibilityLabel="Create Event">
          <Text style={{ fontSize: 22, color: colors.ink }}>+</Text>
          <Text style={styles.createCapsuleText}>Create Event</Text>
        </TouchableOpacity>) : (<TouchableOpacity style={styles.createFab} onPress={onOpenCreate} accessibilityLabel="Create Event">
          <Text style={{ fontSize: 22, color: colors.ink }}>+</Text>
        </TouchableOpacity>)}
      <TabBar active={activeTab} onTab={onTab}/>
    </View>);
}
function DiscoverScreen({ onTab, activeTab }: any) {
    return (<View style={styles.screen}>
      <View style={styles.homeHeader}>
        <View style={styles.avatarGrad}/>
        <Text style={[styles.homeWordmark, { flex: 1 }]}>Discover</Text>
        <Text style={{ fontSize: 20, marginRight: 16 }}>📖</Text>
        <Text style={{ fontSize: 20 }}>🔍</Text>
      </View>
      <ScrollView>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>San Francisco</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <Text style={styles.subSection}>Popular Events</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
          {popularEvents.map(ev => (<View key={ev.id} style={styles.popularCard}>
              <View style={styles.popularCover}/>
              <Text style={styles.popularHost}>{ev.host}</Text>
              <Text style={styles.popularTitle}>{ev.title}</Text>
              <Text style={styles.metaText}>🕐 {ev.time}</Text>
              {ev.badge && (<View style={[styles.badge, { borderColor: ev.badgeColor }]}>
                  <Text style={[styles.badgeText, { color: ev.badgeColor }]}>{ev.badge}</Text>
                </View>)}
            </View>))}
        </ScrollView>
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl, paddingHorizontal: 16 }]}>Browse by Category</Text>
        <View style={styles.catGrid}>
          {categories.map(cat => (<View key={cat.name} style={styles.catChip}>
              <View style={[styles.catIcon, { borderColor: cat.color }]}>
                <View style={[styles.catGlyph, { backgroundColor: cat.color }]}/>
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
            </View>))}
        </View>
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl, paddingHorizontal: 16 }]}>Cities</Text>
        {cities.map(c => <Text key={c} style={styles.cityRow}>{c}</Text>)}
        <View style={{ height: 100 }}/>
      </ScrollView>
      <TabBar active={activeTab} onTab={onTab}/>
    </View>);
}
function DetailScreen({ scrollY, onScroll, onBack }: any) {
    const pinned = scrollY > 350;
    return (<View style={[styles.screen, { backgroundColor: colors.detailBgTop }]}>
      {pinned ? (<View style={styles.pinnedBar}>
          <TouchableOpacity accessibilityLabel="Back"><Text style={{ color: '#fff', fontSize: 20 }}>←</Text></TouchableOpacity>
          <Text style={[styles.pinnedTitle, { flex: 1 }]} numberOfLines={1}>{detailEvent.title}</Text>
          <TouchableOpacity accessibilityLabel="Share"><Text style={{ color: '#fff', fontSize: 20 }}>↗</Text></TouchableOpacity>
        </View>) : (<View style={styles.detailTopBar}>
          <TouchableOpacity onPress={onBack} accessibilityLabel="Back"><Text style={{ color: '#fff', fontSize: 28 }}>←</Text></TouchableOpacity>
          <TouchableOpacity accessibilityLabel="Share"><Text style={{ color: '#fff', fontSize: 24 }}>↗</Text></TouchableOpacity>
        </View>)}
      <ScrollView onScroll={(e) => onScroll(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16}>
        <View style={styles.heroCard}>
          <View style={styles.heroImage}/>
          <Text style={styles.featured}>Featured in San Francisco</Text>
        </View>
        <Text style={styles.detailTitle}>{detailEvent.title}</Text>
        <View style={styles.hostLine}>
          <View style={styles.hostDot}/>
          <Text style={styles.detailHost}>{detailEvent.host}</Text>
        </View>
        <Text style={styles.detailTime}>{detailEvent.time}</Text>
        <View style={styles.tripleRow}>
          <View style={styles.registerBtn}><Text style={styles.registerBtnText}>Register</Text></View>
          <View style={styles.ghostBtn}><Text style={styles.ghostBtnText}>↓ Contact</Text></View>
          <View style={styles.ghostBtn}><Text style={styles.ghostBtnText}>··· More</Text></View>
        </View>
        <Text style={styles.locationLabel}>Location</Text>
        <View style={styles.divider}/>
        <Text style={styles.locationName}>{detailEvent.locationName}</Text>
        <Text style={styles.locationAddr}>{detailEvent.locationAddress}</Text>
        <View style={styles.mapBlock}>
          <View style={styles.mapPin}/>
          <Text style={styles.mapLabel}>Tech Hub</Text>
        </View>
        <View style={styles.hostSection}>
          <Text style={styles.hostSectionTitle}>Host</Text>
          <Text style={styles.hostSectionContact}>Contact</Text>
        </View>
        <View style={styles.hostCard}>
          <View style={styles.bigAvatar}/>
          <View>
            <Text style={styles.hostNameBig}>{detailEvent.hostName}</Text>
            <Text style={styles.hostTitle}>{detailEvent.hostTitle}</Text>
          </View>
        </View>
        <Text style={styles.goingCount}>{detailEvent.goingCount} Going</Text>
        <View style={styles.attendeeRow}>
          <View style={[styles.smallAvatar, { backgroundColor: '#E87AA8' }]}/>
          <View style={[styles.smallAvatar, { backgroundColor: '#6BB85A' }]}/>
          <View style={[styles.smallAvatar, { backgroundColor: '#4A90D9' }]}/>
          <View style={[styles.smallAvatar, { backgroundColor: '#B87FD9' }]}/>
        </View>
        <Text style={styles.attendeeSummary}>{detailEvent.attendeeSummary}</Text>
        <Text style={[styles.sectionTitle, { color: '#fff', marginTop: spacing.xl }]}>About Event</Text>
        <View style={styles.divider}/>
        <Text style={styles.aboutText}>{detailEvent.about}</Text>
        <Text style={[styles.sectionTitle, { color: '#fff', marginTop: spacing.lg }]}>Event Details</Text>
        {detailEvent.details.map(d => (<View key={d.label} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{d.label}</Text>
            <Text style={styles.detailValue}>{d.value}</Text>
          </View>))}
        <View style={{ height: 100 }}/>
      </ScrollView>
    </View>);
}
function CreateScreen({ onBack, onOpenGallery }: any) {
    return (<View style={styles.screen}>
      <View style={styles.createHeader}>
        <TouchableOpacity onPress={onBack}><Text style={{ fontSize: 26 }}>←</Text></TouchableOpacity>
        <Text style={styles.createTitle}>Create Event</Text>
        <View style={styles.headerAvatar}/>
      </View>
      <ScrollView>
        <View style={styles.draftPill}>
          <Text style={styles.draftText}>↻ Restore draft?</Text>
          <Text style={styles.draftClose}>✕</Text>
        </View>
        <TouchableOpacity style={styles.coverPlaceholder} onPress={onOpenGallery} accessibilityLabel="Change cover">
          <View style={styles.coverChangeBtn}><Text style={{ color: '#fff', fontSize: 18 }}>🖼+</Text></View>
        </TouchableOpacity>
        <View style={styles.nameInput}>
          <Text style={styles.placeholder}>Event Name</Text>
        </View>
        <View style={styles.timelineCard}>
          <View style={styles.timelineRow}>
            <View style={styles.timelineDot}/>
            <Text style={styles.timelineLabel}>Start</Text>
            <View style={styles.chip}><Text style={styles.chipText}>Sun, Sep 20</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>12:00 AM</Text></View>
          </View>
          <View style={styles.timelineRow}>
            <View style={styles.timelineDot}/>
            <Text style={styles.timelineLabel}>End</Text>
            <View style={styles.chip}><Text style={styles.chipText}>Sun, Sep 20</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>1:00 AM</Text></View>
          </View>
        </View>
        <View style={styles.simpleInput}>
          <Text style={styles.placeholder}>📍 Choose Location</Text>
        </View>
        <View style={styles.simpleInput}>
          <Text style={styles.placeholder}>📄 Add Description</Text>
        </View>
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl, paddingHorizontal: 16 }]}>Ticketing</Text>
        <View style={styles.ticketingRow}>
          <Text style={styles.ticketingLabel}>🔒 Require Approval</Text>
          <View style={styles.toggleOff}/>
        </View>
        <View style={styles.simpleInput}>
          <Text style={styles.placeholder}>💰 Price: Free</Text>
        </View>
        <View style={{ height: 100 }}/>
      </ScrollView>
    </View>);
}
function GallerySheet({ onClose }: any) {
    return (<View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={styles.galleryHeader}>
        <TouchableOpacity onPress={onClose}><Text style={{ fontSize: 26 }}>←</Text></TouchableOpacity>
        <Text style={styles.gallerySearch}>Search cover images...</Text>
      </View>
      <View style={styles.catTabs}>
        <View style={[styles.catTab, styles.catTabActive]}>
          <Text style={styles.catTabIcon}>✨</Text>
          <Text style={[styles.catTabText, { color: colors.ink }]}>Suggested</Text>
        </View>
        <View style={styles.catTab}><Text style={styles.catTabIcon}>🎓</Text><Text style={styles.catTabText}>School</Text></View>
        <View style={styles.catTab}><Text style={styles.catTabIcon}>👻</Text><Text style={styles.catTabText}>Halloween</Text></View>
        <View style={styles.catTab}><Text style={styles.catTabIcon}>🎃</Text><Text style={styles.catTabText}>Thanksgiving</Text></View>
      </View>
      <ScrollView>
        <View style={styles.bigCollection}>
          <View style={styles.bigCollectionShade}/>
          <Text style={styles.bigCollectionTitle}>School</Text>
          <Text style={styles.bigCollectionCount}>21 Images</Text>
        </View>
        <View style={styles.waterfall}>
          {galleryCollections.map((c, i) => (<View key={c.name} style={styles.wfCard}>
              <View style={[styles.wfImage, { backgroundColor: ['#E89B3D', '#4A90D9', '#E87AA8'][i % 3] }]}/>
              <View style={styles.wfLabel}><Text style={styles.wfLabelText}>{c.name}</Text></View>
            </View>))}
        </View>
        <View style={{ height: 120 }}/>
      </ScrollView>
      <TouchableOpacity style={styles.chooseLibraryBtn}>
        <Text style={styles.chooseLibraryText}>Choose From Library</Text>
      </TouchableOpacity>
    </View>);
}
function NotificationsScreen({ onTab, activeTab }: any) {
    return (<View style={styles.screen}>
      <View style={styles.homeHeader}>
        <View style={styles.avatarGrad}/>
        <Text style={[styles.homeWordmark, { fontFamily: fonts.bold }]}>Notifications</Text>
      </View>
      <View style={styles.emptyCenter}>
        <View style={styles.notifIllustration}>
          <View style={styles.notifCardLine}/>
          <View style={styles.notifCardLine}/>
        </View>
        <Text style={styles.emptyBig}>No Notifications</Text>
        <Text style={styles.emptySmall}>Notifications about your events and friends will show up here.</Text>
      </View>
      <TabBar active={activeTab} onTab={onTab}/>
    </View>);
}
function ChatScreen({ onTab, activeTab }: any) {
    return (<View style={styles.screen}>
      <View style={styles.homeHeader}>
        <View style={styles.avatarGrad}/>
        <Text style={[styles.homeWordmark, { fontFamily: fonts.bold }]}>Chat</Text>
        <Text style={{ fontSize: 22 }}>✏️</Text>
      </View>
      <View style={styles.emptyCenter}>
        <View style={styles.chatIllustration}>
          <View style={styles.bubbleIn}><Text style={{ color: '#1A1A1A' }}>See you tomorrow!</Text></View>
          <View style={styles.bubbleOut}><Text style={{ color: '#fff' }}>Can't wait!!</Text></View>
        </View>
        <Text style={styles.emptyBig}>It's Quiet Here</Text>
        <Text style={styles.emptySmall}>Start a chat with your friends or others in your event.</Text>
        <TouchableOpacity style={styles.startChatBtn}>
          <Text style={styles.startChatText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
      <TabBar active={activeTab} onTab={onTab}/>
    </View>);
}
function TabBar({ active, onTab }: any) {
    const tabs: {
        key: Tab;
        icon: string;
        label: string;
    }[] = [
        { key: 'home', icon: '🏠', label: 'Home' },
        { key: 'discover', icon: '◈', label: 'Discover' },
        { key: 'notifications', icon: '♥', label: 'Notifications' },
        { key: 'chat', icon: '💬', label: 'Chat' },
    ];
    return (<View style={styles.tabBar}>
      {tabs.map(t => (<TouchableOpacity key={t.key} style={[styles.tabItem, active === t.key && styles.tabItemActive]} onPress={() => onTab(t.key)} accessibilityLabel={t.label}>
          <Text style={{ fontSize: 22, color: active === t.key ? colors.tabActiveInk : colors.tabInk }}>{t.icon}</Text>
          <Text style={[styles.tabLabel, { color: active === t.key ? colors.tabActiveInk : colors.tabInk }]}>{t.label}</Text>
        </TouchableOpacity>))}
    </View>);
}
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg, width: '100%', maxWidth: 430, alignSelf: 'center' },
    screen: { flex: 1, backgroundColor: colors.bg },
    onboardRoot: { flex: 1, backgroundColor: '#FDF0EC', overflow: 'hidden' },
    promoWall: { flex: 1, backgroundColor: 'linear-gradient(135deg,#FFE0E0 0%,#FFF3D6 50%,#D6F5E8 100%)' },
    promoCard: { position: 'absolute', width: 180, height: 220, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' },
    onboardTextWrap: { position: 'absolute', bottom: 120, left: 0, right: 0, alignItems: 'center' },
    lumaWordmark: { fontSize: 28, color: '#C7C7CC', marginBottom: 12, fontFamily: fonts.regular },
    delightful: { fontSize: 44, color: colors.ink, fontFamily: fonts.bold, lineHeight: 52 },
    startHere: { fontSize: 40, fontFamily: fonts.bold, color: colors.pinkStart },
    pssst: { position: 'absolute', bottom: 180, left: 0, right: 0, textAlign: 'center', fontSize: 14, color: colors.inkSecondary },
    downArrow: { position: 'absolute', bottom: 80, left: '50%', marginLeft: -40, width: 80, height: 80, borderRadius: 40, backgroundColor: colors.arrowPink, alignItems: 'center', justifyContent: 'center' },
    loginSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
    grabber: { width: 40, height: 5, backgroundColor: '#E5E5EA', borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
    loginSub: { fontSize: 16, color: colors.inkSecondary, textAlign: 'center', marginBottom: 20, lineHeight: 22 },
    phoneBtn: { backgroundColor: colors.black, borderRadius: 28, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
    phoneBtnText: { color: '#fff', fontSize: 17, fontFamily: fonts.semibold },
    emailBtn: { backgroundColor: colors.bgSubtle, borderRadius: 28, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
    emailBtnText: { color: colors.ink, fontSize: 17, fontFamily: fonts.medium },
    oauthRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    oauthBtn: { flex: 1, backgroundColor: colors.bgSubtle, borderRadius: 28, paddingVertical: 14, alignItems: 'center' },
    oauthBtnText: { fontSize: 16, fontFamily: fonts.medium, color: colors.ink },
    terms: { fontSize: 13, color: colors.inkSecondary, textAlign: 'center' },
    homeHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
    avatarWrap: { width: 40, height: 40 },
    avatarGrad: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'linear-gradient(135deg,#C8E6C9,#B39DDB)' },
    homeWordmark: { fontSize: 26, fontFamily: fonts.bold, color: colors.ink },
    gear: { fontSize: 24, marginLeft: 'auto' },
    sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 8 },
    sectionTitle: { fontSize: 24, fontFamily: fonts.bold, color: colors.ink, paddingHorizontal: 16 },
    viewAll: { fontSize: 16, color: colors.inkSecondary },
    emptyCard: { flexDirection: 'row', gap: 16, padding: 16, alignItems: 'center' },
    emptyIcon: { width: 72, height: 72, backgroundColor: colors.bgSubtle, borderRadius: 16 },
    emptyTitle: { fontSize: 18, color: colors.inkSecondary, fontFamily: fonts.medium },
    emptySub: { fontSize: 15, color: colors.inkSecondary, marginTop: 4, lineHeight: 20 },
    subSection: { fontSize: 22, color: colors.inkSecondary, paddingHorizontal: 16, marginTop: 4 },
    filterRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 4 },
    filterLabel: { fontSize: 22, color: colors.inkSecondary, fontFamily: fonts.medium },
    filterChevron: { fontSize: 22, color: colors.inkSecondary, marginLeft: 8 },
    dateRow: { flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 16, marginTop: 20, marginBottom: 8 },
    dateDay: { fontSize: 20, fontFamily: fonts.bold, color: colors.ink },
    dateSep: { fontSize: 20, color: colors.inkTertiary },
    dateWeekday: { fontSize: 20, color: colors.inkSecondary },
    eventCard: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 8 },
    feedCover: { width: 96, height: 96, borderRadius: 12, backgroundColor: '#E89B3D', padding: 8, justifyContent: 'flex-end' },
    feedInfo: { flex: 1 },
    hostRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    feedHostLine: { fontSize: 13, color: colors.inkSecondary, marginTop: 4 },
    hostDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#E89B3D' },
    hostName: { fontSize: 14, color: colors.inkSecondary },
    feedTitle: { fontSize: 18, fontFamily: fonts.semibold, color: colors.ink, marginTop: 4, lineHeight: 23 },
    metaRow: { flexDirection: 'row', gap: 16, marginTop: 8 },
    metaText: { fontSize: 14, color: colors.inkSecondary },
    createCapsule: { position: 'absolute', bottom: 100, right: 16, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.bgSubtle, borderRadius: 28, paddingVertical: 14, paddingHorizontal: 24 },
    createCapsuleText: { fontSize: 17, fontFamily: fonts.medium, color: colors.ink },
    createFab: { position: 'absolute', bottom: 100, right: 16, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' },
    popularCard: { width: 260, marginRight: 16, paddingVertical: 8 },
    popularCover: { width: 260, height: 160, borderRadius: 12, backgroundColor: '#4A90D9' },
    popularHost: { fontSize: 14, color: colors.inkSecondary, marginTop: 8 },
    popularTitle: { fontSize: 18, fontFamily: fonts.semibold, color: colors.ink, marginTop: 4 },
    badge: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginTop: 6 },
    badgeText: { fontSize: 13 },
    catGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, marginTop: 12 },
    catChip: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10 },
    catIcon: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
    catGlyph: { width: 12, height: 12, borderRadius: 6 },
    catName: { fontSize: 16, fontFamily: fonts.medium, color: colors.ink },
    cityRow: { fontSize: 16, color: colors.inkSecondary, paddingHorizontal: 16, paddingVertical: 6 },
    detailTopBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
    pinnedBar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'rgba(13,13,36,0.9)' },
    pinnedTitle: { color: '#fff', fontSize: 17, fontFamily: fonts.semibold },
    heroCard: { margin: 16, borderRadius: 20, overflow: 'hidden' },
    heroImage: { height: 280, backgroundColor: '#2A2A6E' },
    featured: { color: '#fff', textAlign: 'center', paddingVertical: 12, backgroundColor: 'rgba(0,0,0,0.3)', fontSize: 14 },
    detailTitle: { color: '#fff', fontSize: 30, fontFamily: fonts.bold, paddingHorizontal: 16, marginTop: 8, lineHeight: 36 },
    hostLine: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, marginTop: 12 },
    detailHost: { color: 'rgba(255,255,255,0.7)', fontSize: 15 },
    detailTime: { color: 'rgba(255,255,255,0.7)', fontSize: 16, paddingHorizontal: 16, marginTop: 8 },
    tripleRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 16 },
    registerBtn: { flex: 1, backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
    registerBtnText: { color: '#000', fontSize: 16, fontFamily: fonts.semibold },
    ghostBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
    ghostBtnText: { color: '#fff', fontSize: 16 },
    locationLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 16, paddingHorizontal: 16, marginTop: 20 },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginHorizontal: 16, marginVertical: 8 },
    locationName: { color: '#fff', fontSize: 22, fontFamily: fonts.semibold, paddingHorizontal: 16, marginTop: 8 },
    locationAddr: { color: 'rgba(255,255,255,0.7)', fontSize: 15, paddingHorizontal: 16, marginTop: 6, lineHeight: 20 },
    mapBlock: { margin: 16, height: 180, borderRadius: 16, backgroundColor: '#E8E4D8', overflow: 'hidden' },
    mapPin: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FF3B30', position: 'absolute', left: '45%', top: '40%' },
    mapLabel: { position: 'absolute', left: '20%', top: '42%', color: '#7B5EA7', fontSize: 16, fontFamily: fonts.medium },
    hostSection: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 16 },
    hostSectionTitle: { color: 'rgba(255,255,255,0.7)', fontSize: 16 },
    hostSectionContact: { color: 'rgba(255,255,255,0.7)', fontSize: 16 },
    hostCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, marginTop: 12 },
    bigAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#B87FD9' },
    hostNameBig: { color: '#fff', fontSize: 18, fontFamily: fonts.semibold },
    hostTitle: { color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 2 },
    goingCount: { color: 'rgba(255,255,255,0.6)', fontSize: 16, paddingHorizontal: 16, marginTop: 16 },
    attendeeRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 8, gap: -8 },
    smallAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: colors.detailBgTop },
    attendeeSummary: { color: 'rgba(255,255,255,0.6)', fontSize: 15, paddingHorizontal: 16, marginTop: 8, lineHeight: 20 },
    aboutText: { color: 'rgba(255,255,255,0.8)', fontSize: 15, paddingHorizontal: 16, marginTop: 8, lineHeight: 22 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 },
    detailLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 15 },
    detailValue: { color: '#fff', fontSize: 15, fontFamily: fonts.medium },
    createHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
    createTitle: { fontSize: 20, fontFamily: fonts.semibold, flex: 1 },
    headerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#B87FD9' },
    draftPill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.bgSubtle, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
    draftText: { fontSize: 14, color: colors.inkSecondary },
    draftClose: { fontSize: 14, color: colors.inkSecondary },
    coverPlaceholder: { height: 280, margin: 16, borderRadius: 20, backgroundColor: colors.bgSubtle, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 16 },
    coverChangeBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
    nameInput: { backgroundColor: '#fff', borderRadius: 28, padding: 20, marginHorizontal: 16, borderWidth: 1, borderColor: colors.border },
    placeholder: { fontSize: 17, color: colors.inputPlaceholder },
    timelineCard: { margin: 16, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 16 },
    timelineRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
    timelineDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: colors.inkTertiary },
    timelineLabel: { fontSize: 16, color: colors.inkSecondary, width: 50 },
    chip: { backgroundColor: colors.bgSubtle, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 },
    chipText: { fontSize: 15, fontFamily: fonts.medium, color: colors.ink },
    simpleInput: { backgroundColor: '#fff', borderRadius: 28, padding: 20, marginHorizontal: 16, marginTop: 12, borderWidth: 1, borderColor: colors.border },
    ticketingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16 },
    ticketingLabel: { fontSize: 16, color: colors.ink },
    toggleOff: { width: 52, height: 32, borderRadius: 16, backgroundColor: colors.bgSubtle, padding: 3 },
    galleryHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
    gallerySearch: { fontSize: 18, color: colors.inkTertiary, flex: 1 },
    catTabs: { flexDirection: 'row', paddingHorizontal: 16, gap: 20, borderBottomWidth: 1, borderBottomColor: colors.divider },
    catTab: { alignItems: 'center', paddingVertical: 12, gap: 4 },
    catTabActive: { borderBottomWidth: 2, borderBottomColor: colors.ink },
    catTabIcon: { fontSize: 18 },
    catTabText: { fontSize: 15, color: colors.inkSecondary },
    bigCollection: { margin: 16, height: 200, borderRadius: 20, backgroundColor: '#E89B3D', padding: 20, overflow: 'hidden' },
    bigCollectionShade: { position: 'absolute', right: 20, bottom: 20, width: 140, height: 140, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12 },
    bigCollectionTitle: { color: '#fff', fontSize: 22, fontFamily: fonts.bold },
    bigCollectionCount: { color: 'rgba(255,255,255,0.8)', fontSize: 15, marginTop: 4 },
    waterfall: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
    wfCard: { width: '47%' },
    wfImage: { height: 160, borderRadius: 12 },
    wfLabel: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: -8, alignSelf: 'center' },
    wfLabelText: { fontSize: 15, fontFamily: fonts.medium, color: colors.ink },
    chooseLibraryBtn: { position: 'absolute', bottom: 24, left: 16, right: 16, backgroundColor: '#1A1A1A', borderRadius: 28, paddingVertical: 18, alignItems: 'center' },
    chooseLibraryText: { color: '#fff', fontSize: 17, fontFamily: fonts.semibold },
    emptyCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
    notifIllustration: { width: 280, height: 200, backgroundColor: colors.bgSubtle, borderRadius: 24, marginBottom: 24 },
    notifCardLine: { height: 16, backgroundColor: colors.divider, margin: 16, borderRadius: 8 },
    chatIllustration: { width: 280, height: 180, marginBottom: 24 },
    bubbleIn: { alignSelf: 'flex-start', backgroundColor: colors.bgSubtle, borderRadius: 16, padding: 12, marginBottom: 8 },
    bubbleOut: { alignSelf: 'flex-end', backgroundColor: '#0A84FF', borderRadius: 16, padding: 12 },
    emptyBig: { fontSize: 28, fontFamily: fonts.bold, color: colors.ink, marginTop: 16 },
    emptySmall: { fontSize: 16, color: colors.inkSecondary, textAlign: 'center', marginTop: 12, lineHeight: 22 },
    startChatBtn: { backgroundColor: '#1A1A1A', borderRadius: 28, paddingHorizontal: 32, paddingVertical: 16, marginTop: 24 },
    startChatText: { color: '#fff', fontSize: 17, fontFamily: fonts.semibold },
    tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.divider, paddingVertical: 8, paddingBottom: 16 },
    tabItem: { flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 24 },
    tabItemActive: { backgroundColor: colors.tabActiveBg, marginHorizontal: 8 },
    tabLabel: { fontSize: 12, marginTop: 2 },
});
