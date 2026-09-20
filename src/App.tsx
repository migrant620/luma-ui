import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Platform, Switch, TextInput, } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Rect, Stop, Path as SvgPath, Path } from 'react-native-svg';
import { colors, fonts, spacing, radius, typeScale } from './tokens';
import { HomeIcon, DiscoverIcon, HeartIcon, ChatIcon, SettingsGear, MapIcon, SearchIcon, ClockIcon, PinIcon, ChevronRight, ChevronDown, BackArrow, ShareIcon, PlusIcon, CloseX, CalendarEmptyIcon, ImageAddIcon, LocationPinInput, DescriptionIcon, LockIcon, GoogleIcon, PasskeyIcon, CatFamily, CatTech, CatFood, CatBooks, CatGames, CatAI, CatRunning, } from './icons';
import { feedEvents, popularEvents, categories, detailEvent } from './data';
import { useAppFonts } from './webfont';
if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const fid = 'luma-font-face';
    if (!document.getElementById(fid)) {
        const style = document.createElement('style');
        style.id = fid;
        style.textContent = `
      html, body, #root {
        height: 100%;
        margin: 0;
        overflow: hidden;
        background: #ffffff;
      }
      html, body, #root, #root * {
        font-family: 'PlusJakartaSans', 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
    `;
        document.head.appendChild(style);
    }
}
if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const fid = 'luma-font-face';
    if (!document.getElementById(fid)) {
        const style = document.createElement('style');
        style.id = fid;
        style.textContent = `
      html, body, #root {
        height: 100%;
        margin: 0;
        overflow: hidden;
        background: #ffffff;
      }
      html, body, #root, #root * {
        font-family: 'PlusJakartaSans', 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
    `;
        document.head.appendChild(style);
    }
}
const webBg = (css: string) => (Platform.OS === 'web' ? ({ background: css } as any) : {});
const webTextGradient = (id: string) => Platform.OS === 'web'
    ? ({ backgroundImage: `linear-gradient(90deg,${colors.brandStart},${colors.brandEnd})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } as any)
    : {};
function StatusBar({ dark = false }: {
    dark?: boolean;
}) {
    const c = dark ? '#FFFFFF' : '#1A1A1A';
    return (<View style={[styles.statusBar, dark && { backgroundColor: 'transparent' }]}>
      <Text style={[styles.statusTime, { color: c }]}>11:19</Text>
      <View style={styles.statusIcons}>
        <Text style={{ color: c, fontSize: 13, fontWeight: '600', marginRight: 6 }}>G</Text>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2}>
          <Path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/>
        </Svg>
      </View>
      <View style={{ flex: 1 }}/>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Svg width={18} height={14} viewBox="0 0 24 18" fill={c}><SvgPath d="M12 3C7 3 2.5 5 0 8l2 2c2-2.5 6-4.5 10-4.5s8 2 10 4.5l2-2C21.5 5 17 3 12 3zm0 5c-3 0-5.5 1.2-7.5 3L6.5 13C8 11.5 10 10.5 12 10.5s4 1 5.5 2.5L19.5 11C17.5 9.2 15 8 12 8zm0 5c-1.5 0-3 .5-4 1.5L12 19l4-4.5c-1-1-2.5-1.5-4-1.5z"/></Svg>
        <Svg width={18} height={12} viewBox="0 0 24 16" fill={c}><SvgPath d="M2 14h4v2H2v-2zm5-3h4v5H7v-5zm5-3h4v8h-4V8zm5-4h4v12h-4V4z"/></Svg>
        <View style={{ width: 24, height: 12, borderWidth: 1.5, borderColor: c, borderRadius: 3, marginLeft: 2, padding: 1.5 }}>
          <View style={{ width: '80%', height: '100%', backgroundColor: c, borderRadius: 1 }}/>
        </View>
      </View>
    </View>);
}
function HomeIndicator() {
    return <View style={styles.homeIndicator}/>;
}
const promoCards = [
    { cover: require('../assets/covers/card-blue.png'), x: 0.78, y: 0.07, w: 0.34, h: 0.14, rot: 0.0 },
    { cover: require('../assets/covers/card-thanksgiving.png'), x: 0.52, y: 0.13, w: 0.33, h: 0.16, rot: 0.4 },
    { cover: require('../assets/covers/card-coffee.png'), x: 0.04, y: 0.21, w: 0.33, h: 0.15, rot: -0.4 },
    { cover: require('../assets/covers/card-coffee.png'), x: -0.07, y: 0.31, w: 0.22, h: 0.17, rot: -0.2 },
    { cover: require('../assets/covers/card-thanksgiving.png'), x: 0.40, y: 0.34, w: 0.42, h: 0.19, rot: 0.2 },
    { cover: require('../assets/covers/card-poker.png'), x: 0.73, y: 0.23, w: 0.27, h: 0.17, rot: 0.4 },
    { cover: require('../assets/covers/card-poker.png'), x: 0.72, y: 0.40, w: 0.29, h: 0.16, rot: 0.0 },
    { cover: require('../assets/covers/card-coffee.png'), x: 0.02, y: 0.47, w: 0.19, h: 0.13, rot: 0.0 },
];
function PromoBackground({ revealed = false }: {
    revealed?: boolean;
}) {
    const glowCss = 'radial-gradient(ellipse 90% 42% at 12% 3%, rgba(255,192,210,0.65), transparent 60%),' +
        'radial-gradient(ellipse 75% 40% at 48% 2%, rgba(254,226,192,0.70), transparent 60%),' +
        'radial-gradient(ellipse 90% 42% at 90% 3%, rgba(150,222,240,0.60), transparent 60%),' +
        'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 38%, rgba(255,255,255,0.92) 58%, #FFFFFF 72%)';
    return (<View style={StyleSheet.absoluteFill as any}>
      {Platform.OS === 'web' ? (<View style={[StyleSheet.absoluteFill as any, { background: glowCss } as any]}/>) : (<Svg width="100%" height="100%" style={StyleSheet.absoluteFill as any}>
          <Defs><SvgGradient id="pgv" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.promoYellow}/>
            <Stop offset="0.5" stopColor={colors.promoEnd}/>
            <Stop offset="1" stopColor="#FFFFFF"/>
          </SvgGradient></Defs>
          <Rect width="100%" height="100%" fill="url(#pgv)"/>
        </Svg>)}
      
      {promoCards.map((card, i) => (<View key={i} style={{
                position: 'absolute',
                left: `${card.x * 100}%`, top: `${card.y * 100}%`,
                width: `${card.w * 100}%`, height: `${card.h * 100}%`,
                transform: [{ rotate: `${card.rot}deg` }],
                borderRadius: 18,
                borderWidth: 2.5,
                borderColor: 'rgba(255,255,255,0.85)',
                backgroundColor: revealed ? 'rgba(255,255,255,0.25)' : 'rgba(215,215,220,0.35)',
                overflow: 'hidden',
                ...(Platform.OS === 'web' ? {
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
                } as any : {}),
            }}>
          {revealed && (<Image source={card.cover} style={{ position: 'absolute', width: '100%', height: '100%' } as any} resizeMode="cover"/>)}
        </View>))}
    </View>);
}
function DownArrow({ size = 28, color = '#fff' }: {
    size?: number;
    color?: string;
}) {
    return (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 5v14M5 12l7 7 7-7"/>
    </Svg>);
}
function PromoScreen({ onNext }: {
    onNext: () => void;
}) {
    const [panelOpen, setPanelOpen] = React.useState(false);
    const startGradient = Platform.OS === 'web'
        ? ({
            backgroundImage: 'linear-gradient(90deg,#DA60BF 0%,#F160A9 25%,#F65A90 45%,#F98872 70%,#F3AB5A 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        } as any)
        : {};
    return (<View style={styles.promoRoot}>
      <StatusBar />
      <PromoBackground revealed={panelOpen}/>
      <View style={styles.promoContent}>
        <View style={{ flex: 1 }}/>
        <Text style={styles.lumaWordmark}>luma<Text style={{ color: colors.inkLight }}>✦</Text></Text>
        <Text style={styles.delightful}>Delightful</Text>
        <Text style={styles.delightful}>events</Text>
        <Text style={[styles.startHereText, startGradient]}>start here</Text>
        <View style={{ height: 32 }}/>
        <TouchableOpacity onPress={() => setPanelOpen(true)} accessibilityLabel="start here" style={styles.downArrow}>
          {Platform.OS === 'web' ? (<View style={[styles.downArrowInner, {
                    background: `linear-gradient(135deg,${colors.btnStart},${colors.btnEnd})`,
                } as any]}>
              <DownArrow size={30}/>
            </View>) : (<View style={[styles.downArrowInner, { backgroundColor: colors.btnStart }]}>
              <DownArrow size={30}/>
            </View>)}
        </TouchableOpacity>
      </View>
      {panelOpen && (<View style={styles.loginOverlay}>
          <View style={styles.loginSheet}>
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
                <GoogleIcon size={26}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} accessibilityLabel="Sign in with a passkey">
                <PasskeyIcon size={26} color="#1A1A1A"/>
              </TouchableOpacity>
            </View>
            <Text style={styles.terms}>
              By continuing, you agree to Luma's <Text style={{ textDecorationLine: 'underline' }}>Terms of Use</Text>
            </Text>
          </View>
        </View>)}
      <HomeIndicator />
    </View>);
}
function ScidrBadge() {
    return (<View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFFFFF' }}/>
    </View>);
}
function AvatarStack() {
    const cols = ['#7EC8A0', '#C9A0E8', '#F0B890'];
    return (<View style={{ flexDirection: 'row', marginRight: 4 }}>
      {cols.map((col, i) => (<View key={i} style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: col, marginLeft: i === 0 ? 0 : -8, borderWidth: 2, borderColor: '#fff' }}/>))}
    </View>);
}
function BookBadge() {
    return (<View style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: '#5C8A2B', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>📖</Text>
    </View>);
}
function HomeScreen({ onOpenDetail }: {
    onOpenDetail: (id: string) => void;
}) {
    return (<View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <View style={styles.avatar}/>
        <Text style={styles.headerTitle}>luma<Text style={styles.sparkle}>✦</Text></Text>
        <View style={{ flex: 1 }}/>
        <SettingsGear size={26} color={colors.ink}/>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Events</Text>
          <View style={{ flex: 1 }}/>
          <Text style={styles.viewAll}>View All <ChevronRight size={18} color={colors.inkMuted}/></Text>
        </View>
        
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <CalendarEmptyIcon size={44} color="#D0D0D5"/>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.emptyTitle}>No Upcoming Events</Text>
            <Text style={styles.emptyDesc}>Events you are hosting or going to will show up here.</Text>
          </View>
        </View>

        <Text style={styles.pickedTitle}>Picked for You</Text>
        <TouchableOpacity style={styles.nearbyRow}>
          <Text style={styles.nearbyText}>Nearby</Text>
          <ChevronDown size={22} color={colors.inkMuted}/>
        </TouchableOpacity>

        {feedEvents.map((ev, i) => (<View key={ev.id}>
            <View style={styles.dateDivider}>
              <Text style={styles.dateBold}>{ev.dateLabel}</Text>
              <Text style={styles.dateSlash}> / </Text>
              <Text style={styles.dateDay}>{ev.dayLabel}</Text>
            </View>
            <TouchableOpacity style={styles.feedRow} onPress={() => onOpenDetail(ev.id)} accessibilityLabel={`${ev.title}, ${ev.time}, ${ev.location}, By ${ev.host}`}>
              <Image source={ev.cover} style={styles.feedCover as any}/>
              <View style={styles.feedBody}>
                <View style={styles.hostRow}>
                  {ev.hostKind === 'scidr' && <ScidrBadge />}
                  {ev.hostKind === 'avatars' && <AvatarStack />}
                  {ev.hostKind === 'book' && <BookBadge />}
                  {ev.hostKind === 'dot' && <View style={[styles.hostDot, { backgroundColor: ev.hostColor }]}/>}
                  <Text style={styles.hostName} numberOfLines={1}>{ev.host}{ev.hostKind === 'book' ? '  📚' : ''}</Text>
                </View>
                <Text style={styles.feedTitle} numberOfLines={2}>{ev.title}</Text>
                {ev.inlineMeta && ev.location ? (<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
                    <ClockIcon size={18}/>
                    <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.time}</Text>
                    <View style={{ width: 20 }}/>
                    <PinIcon size={18}/>
                    <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.location}</Text>
                  </View>) : (<>
                    <View style={styles.metaRow}>
                      <ClockIcon size={18}/>
                      <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.time}</Text>
                    </View>
                    {ev.location ? (<View style={styles.metaRow}>
                        <PinIcon size={18}/>
                        <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.location}</Text>
                      </View>) : null}
                  </>)}
              </View>
            </TouchableOpacity>
          </View>))}
      </ScrollView>
    </View>);
}
function DiscoverScreen({ onOpenDetail }: {
    onOpenDetail: (id: string) => void;
}) {
    const catIcons: Record<string, any> = {
        family: <CatFamily />, tech: <CatTech />, food: <CatFood />,
        books: <CatBooks />, games: <CatGames />, ai: <CatAI />, running: <CatRunning />,
    };
    return (<View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <View style={styles.avatar}/>
        <Text style={styles.headerTitle}>Discover</Text>
        <View style={{ flex: 1 }}/>
        <MapIcon size={26} color={colors.ink}/>
        <View style={{ width: 16 }}/>
        <SearchIcon size={26} color={colors.ink}/>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>San Francisco</Text>
          <View style={{ flex: 1 }}/>
          <Text style={styles.viewAll}>View All <ChevronRight size={18} color={colors.inkMuted}/></Text>
        </View>
        <Text style={styles.popularTitle}>Popular Events</Text>

        {popularEvents.map((ev) => (<TouchableOpacity key={ev.id} style={styles.popularRow} onPress={() => onOpenDetail(ev.id)}>
            <Image source={ev.cover} style={styles.popularCover as any}/>
            <View style={styles.popularBody}>
              <View style={styles.hostRow}>
                <View style={[styles.hostDot, { width: 18, height: 18, borderRadius: 9, backgroundColor: '#F0E6D8' }]}/>
                <Text style={styles.hostName} numberOfLines={1}>{ev.host}</Text>
                {ev.badge && (<View style={[styles.badge, { backgroundColor: ev.badge.bg }]}>
                    <Text style={[styles.badgeText, { color: ev.badge.color }]}>{ev.badge.label}</Text>
                  </View>)}
              </View>
              <Text style={styles.feedTitle} numberOfLines={2}>{ev.title}</Text>
              <View style={styles.metaRow}>
                <ClockIcon size={17}/>
                <Text style={styles.metaText}>{ev.time}</Text>
              </View>
            </View>
          </TouchableOpacity>))}

        <Text style={[styles.pickedTitle, { marginTop: 28 }]}>Browse by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
          {categories.map((cat) => (<View key={cat.id} style={styles.catChip}>
              {catIcons[cat.icon]}
              <Text style={styles.catLabel}>{cat.label}</Text>
            </View>))}
        </ScrollView>
      </ScrollView>
    </View>);
}
function DetailScreen({ onBack }: {
    onBack: () => void;
}) {
    return (<View style={styles.detailRoot}>
      <StatusBar dark/>
      <View style={styles.detailNav}>
        <TouchableOpacity style={styles.detailNavBtn} accessibilityLabel="Back" onPress={onBack}>
          <BackArrow size={26} color="#fff"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailNavBtn} accessibilityLabel="Share">
          <ShareIcon size={24} color="#fff"/>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        <View style={styles.detailCoverWrap}>
          <Image source={detailEvent.cover} style={styles.detailCover as any} resizeMode="cover"/>
        </View>
        <View style={styles.detailBody}>
          <Text style={styles.detailTitle}>{detailEvent.title}</Text>
          <View style={styles.hostRow}>
            <View style={{ width: 24, height: 24, borderRadius: 12, ...(Platform.OS === 'web' ? { background: 'linear-gradient(135deg,#FF6B35,#7B2FF7)' } as any : { backgroundColor: '#7B2FF7' }), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>C</Text>
            </View>
            <Text style={styles.detailHost}>{detailEvent.host} <ChevronRight size={18} color={colors.detailMuted}/></Text>
          </View>
          <Text style={styles.detailTime}>{detailEvent.time}</Text>

          
          <View style={styles.detailActions}>
            <View style={styles.detailAction}/>
            <View style={styles.detailAction}/>
            <View style={styles.detailAction}/>
            <View style={styles.detailAction}/>
          </View>

          <Text style={styles.detailSection}>Location</Text>
          <View style={styles.detailDivider}/>
          <Text style={styles.detailLocation}>{detailEvent.location}</Text>
          <Text style={styles.detailAddress}>{detailEvent.address}</Text>
        </View>
      </ScrollView>
    </View>);
}
function CreateScreen({ onBack }: {
    onBack: () => void;
}) {
    const [approval, setApproval] = React.useState(false);
    return (<View style={styles.createRoot}>
      <StatusBar />
      <View style={styles.createHeader}>
        <TouchableOpacity accessibilityLabel="Back" onPress={onBack}><BackArrow size={28} color={colors.ink}/></TouchableOpacity>
        <Text style={styles.createTitle}>Create Event</Text>
        <View style={{ flex: 1 }}/>
        <View style={styles.avatar}/>
        <ChevronDown size={20} color={colors.inkMuted}/>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View style={styles.restorePill}>
          <Text style={styles.restoreText}>↻ Restore draft?</Text>
          <CloseX size={18} color={colors.inkMuted}/>
        </View>
        
        <View style={styles.coverUpload}>
          <View style={styles.coverUploadBtn}>
            <ImageAddIcon size={22}/>
          </View>
        </View>
        
        <View style={styles.inputField}>
          <Text style={styles.placeholder}>Event Name</Text>
        </View>
        
        <View style={styles.timeCard}>
          <View style={styles.timeRow}>
            <View style={styles.timelineCol}>
              <View style={[styles.timeDot, { backgroundColor: colors.inkMuted }]}/>
              <View style={styles.timelineDashed}/>
              <View style={[styles.timeDot, { borderWidth: 2, borderColor: colors.inkMuted, backgroundColor: 'transparent' }]}/>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.timeLineRow}>
                <Text style={styles.timeLabel}>Start</Text>
                <View style={{ flex: 1 }}/>
                <View style={styles.datePill}><Text style={styles.datePillText}>Sun, Sep 20</Text></View>
                <View style={[styles.datePill, { marginLeft: 8 }]}><Text style={styles.datePillText}>12:00 AM</Text></View>
              </View>
              <View style={styles.timeHLine}/>
              <View style={styles.timeLineRow}>
                <Text style={styles.timeLabel}>End</Text>
                <View style={{ flex: 1 }}/>
                <View style={styles.datePill}><Text style={styles.datePillText}>Sun, Sep 20</Text></View>
                <View style={[styles.datePill, { marginLeft: 8 }]}><Text style={styles.datePillText}>1:00 AM</Text></View>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.inputFieldRow}>
          <LocationPinInput size={22}/>
          <Text style={[styles.placeholder, { marginLeft: 12 }]}>Choose Location</Text>
        </View>
        
        <View style={styles.inputFieldRow}>
          <DescriptionIcon size={22}/>
          <Text style={[styles.placeholder, { marginLeft: 12 }]}>Add Description</Text>
        </View>

        <Text style={[styles.ticketingTitle]}>Ticketing</Text>
        <View style={styles.approvalRow}>
          <LockIcon size={20}/>
          <Text style={[styles.placeholder, { marginLeft: 12, flex: 1 }]}>Require Approval</Text>
          <TouchableOpacity onPress={() => setApproval(!approval)} activeOpacity={0.8} style={[styles.toggle, approval && styles.toggleOn]}>
            <View style={[styles.toggleThumb, approval && styles.toggleThumbOn]}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <HomeIndicator />
    </View>);
}
function EmptyScreen({ title, desc, notif = false }: {
    title: string;
    desc: string;
    notif?: boolean;
}) {
    return (<View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <View style={styles.avatar}/>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.emptyStateWrap}>
        {notif ? (<Image source={require('../assets/covers/notif-empty.png')} style={styles.notifIllustration as any} resizeMode="contain"/>) : (<View style={styles.chatPlaceholder}>
            <ChatIcon size={64} color="#D0D0D5"/>
          </View>)}
        <Text style={styles.bigEmptyTitle}>{notif ? 'No Notifications' : 'No Messages'}</Text>
        <Text style={styles.bigEmptyDesc}>{desc}</Text>
      </View>
    </View>);
}
function TabBar({ active, onChange }: {
    active: string;
    onChange: (t: string) => void;
}) {
    const tabs = [
        { id: 'home', label: 'Home', icon: HomeIcon },
        { id: 'discover', label: 'Discover', icon: DiscoverIcon },
        { id: 'notif', label: 'Notifications', icon: HeartIcon },
        { id: 'chat', label: 'Chat', icon: ChatIcon },
    ];
    return (<View style={styles.tabBar}>
      {tabs.map((t) => {
            const I = t.icon;
            const isActive = active === t.id;
            return (<TouchableOpacity key={t.id} style={styles.tabItem} onPress={() => onChange(t.id)} activeOpacity={0.7}>
            <View style={[styles.tabIconWrap, isActive && styles.tabPillActive]}>
              <I size={26} color={isActive ? colors.ink : colors.inkSecondary} filled={isActive}/>
            </View>
            <Text style={[styles.tabLabel, { color: isActive ? colors.ink : colors.inkSecondary, fontWeight: isActive ? '600' : '500' }]}>{t.label}</Text>
          </TouchableOpacity>);
        })}
    </View>);
}
type Screen = 'promo' | 'main' | 'detail' | 'create';
export default function App() {
    const [loaded] = useAppFonts();
    const [screen, setScreen] = React.useState<Screen>('promo');
    const [tab, setTab] = React.useState('home');
    if (screen === 'promo')
        return <PromoScreen onNext={() => setScreen('main')}/>;
    if (screen === 'detail')
        return <DetailScreen onBack={() => setScreen('main')}/>;
    if (screen === 'create')
        return <CreateScreen onBack={() => setScreen('main')}/>;
    return (<View style={styles.appRoot}>
      {tab === 'home' && <HomeScreen onOpenDetail={() => setScreen('detail')}/>}
      {tab === 'discover' && <DiscoverScreen onOpenDetail={() => setScreen('detail')}/>}
      {tab === 'notif' && <EmptyScreen title="Notifications" desc="Notifications about your events and friends will show up here." notif/>}
      {tab === 'chat' && <EmptyScreen title="Chat" desc="Messages from your events and conversations will show up here."/>}
      <TabBar active={tab} onChange={setTab}/>
      <TouchableOpacity style={styles.createFab} accessibilityLabel="Create event" onPress={() => setScreen('create')} activeOpacity={0.85}>
        <PlusIcon size={23} color={colors.inkSecondary}/>
        <Text style={styles.createFabText}>Create Event</Text>
      </TouchableOpacity>
    </View>);
}
const styles = StyleSheet.create({
    appRoot: { flex: 1, backgroundColor: colors.white, maxWidth: 480, alignSelf: 'center', width: '100%', height: '100%', overflow: 'hidden' },
    screenRoot: { flex: 1, height: '100%', backgroundColor: colors.white },
    scroll: { flex: 1 },
    statusBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, height: 44, gap: 4 },
    statusTime: { fontSize: 15, fontWeight: '500' },
    statusIcons: { flexDirection: 'row', alignItems: 'center' },
    homeIndicator: { width: 134, height: 5, backgroundColor: '#1A1A1A', borderRadius: 3, position: 'absolute', bottom: 8, alignSelf: 'center' },
    promoRoot: { flex: 1, height: '100%', backgroundColor: '#FFFFFF', overflow: 'hidden' },
    promoContent: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 48, zIndex: 2, paddingHorizontal: 24,
    },
    lumaWordmark: { fontSize: 34, color: colors.inkLight, fontWeight: '400', letterSpacing: 0.5, marginBottom: 8 },
    delightful: { fontSize: 52, color: colors.inkStrong, fontWeight: '600', lineHeight: 62, textAlign: 'center' },
    startHereText: { fontSize: 52, fontWeight: '700', lineHeight: 62, textAlign: 'center' },
    downArrow: { marginTop: 28 },
    downArrowInner: {
        width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center',
        shadowColor: '#F65991', shadowOpacity: 0.35, shadowRadius: 16, shadowOffset: { width: 0, height: 6 },
    },
    loginOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 },
    loginSheet: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: '#fff', borderTopLeftRadius: 36, borderTopRightRadius: 36,
        paddingHorizontal: 24, paddingTop: 14, paddingBottom: 36,
        shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 24, shadowOffset: { width: 0, height: -4 },
    },
    grabber: { width: 56, height: 5, backgroundColor: '#E5E5E8', borderRadius: 3, alignSelf: 'center', marginBottom: 24 },
    loginSub: { fontSize: 22, color: colors.inkMuted, textAlign: 'center', lineHeight: 30, marginBottom: 28, fontWeight: '400' },
    phoneBtn: { backgroundColor: colors.btnBlack, borderRadius: 18, height: 68, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
    phoneBtnText: { color: '#fff', fontSize: 26, fontWeight: '500' },
    emailBtn: { backgroundColor: colors.btnGray, borderRadius: 18, height: 68, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
    emailBtnText: { color: colors.ink, fontSize: 26, fontWeight: '500' },
    oauthRow: { flexDirection: 'row', gap: 14 },
    oauthBtn: { flex: 1, height: 68, backgroundColor: colors.btnGray, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    terms: { fontSize: 20, color: colors.inkMuted, textAlign: 'center', marginTop: 22 },
    homeHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 14 },
    avatar: {
        width: 44, height: 44, borderRadius: 22,
        ...(Platform.OS === 'web' ? { background: 'linear-gradient(135deg,#B8D8FF 0%,#B8E8D8 45%,#D8C5F0 100%)' } as any : { backgroundColor: '#B8D8E8' }),
    },
    headerTitle: { fontSize: 32, fontWeight: '700', color: colors.ink },
    sparkle: { color: colors.ink, fontSize: 22, fontWeight: '700' },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 12 },
    sectionTitle: { fontSize: 26, fontWeight: '700', color: colors.ink },
    viewAll: { fontSize: 18, color: colors.inkMuted, fontWeight: '400', flexDirection: 'row' },
    pickedTitle: { fontSize: 26, fontWeight: '700', color: colors.ink, paddingHorizontal: 16, marginTop: 26 },
    popularTitle: { fontSize: 26, fontWeight: '500', color: colors.inkMuted, paddingHorizontal: 16, marginTop: 4 },
    emptyCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 16, gap: 14 },
    emptyIcon: { width: 120, height: 120, borderRadius: 20, backgroundColor: '#F5F5F7', alignItems: 'center', justifyContent: 'center' },
    emptyTitle: { fontSize: 22, fontWeight: '500', color: colors.inkMuted },
    emptyDesc: { fontSize: 18, color: colors.inkLight, marginTop: 4, lineHeight: 26 },
    nearbyRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 },
    nearbyText: { fontSize: 24, color: colors.inkMuted, fontWeight: '400' },
    dateDivider: { flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 16, marginTop: 20 },
    dateBold: { fontSize: 22, fontWeight: '600', color: colors.ink },
    dateSlash: { fontSize: 22, color: colors.inkMuted },
    dateDay: { fontSize: 22, color: colors.inkMuted },
    feedRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 12 },
    feedCover: { width: 120, height: 120, borderRadius: 14, backgroundColor: '#E8E8EC' },
    feedBody: { flex: 1, marginLeft: 14, justifyContent: 'flex-start' },
    hostRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    hostDot: { width: 20, height: 20, borderRadius: 10, marginRight: 8 },
    hostName: { fontSize: 16, color: colors.inkSecondary, fontWeight: '400' },
    feedTitle: { fontSize: 20, fontWeight: '600', color: colors.ink, lineHeight: 26, marginBottom: 4 },
    metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    metaText: { fontSize: 16, color: colors.inkMuted, marginLeft: 8 },
    popularRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.divider },
    popularCover: { width: 120, height: 120, borderRadius: 14, backgroundColor: '#E8E8EC' },
    popularBody: { flex: 1, marginLeft: 14 },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginLeft: 8 },
    badgeText: { fontSize: 13, fontWeight: '600' },
    catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 14, gap: 10 },
    catLabel: { fontSize: 18, fontWeight: '500', color: colors.ink },
    detailRoot: { flex: 1, height: '100%', backgroundColor: colors.detailBg, ...(Platform.OS === 'web' ? { background: 'linear-gradient(180deg,#0A0922 0%,#141228 60%,#1A1830 100%)' } as any : {}) },
    detailNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 52, paddingBottom: 10 },
    detailNavBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.13)', alignItems: 'center', justifyContent: 'center' },
    detailCoverWrap: { marginHorizontal: 15, marginTop: 4, borderRadius: 24, overflow: 'hidden' as const },
    detailCover: { width: '100%', height: 350, backgroundColor: '#1a1a2e' },
    featuredBar: { backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 10, alignItems: 'center' },
    featuredText: { color: '#fff', fontSize: 15, fontWeight: '500' },
    detailBody: { paddingHorizontal: 18, marginTop: 22 },
    detailTitle: { fontSize: 30, fontWeight: '700', color: colors.detailText, lineHeight: 38 },
    detailHost: { fontSize: 18, color: colors.detailMuted, marginLeft: 8 },
    detailTime: { fontSize: 18, color: colors.detailMuted, marginTop: 8 },
    detailActions: { flexDirection: 'row', gap: 12, marginTop: 24 },
    detailAction: { flex: 1, height: 86, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 18 },
    detailSection: { fontSize: 18, fontWeight: '600', color: colors.detailMuted, marginTop: 28 },
    detailDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 10 },
    detailLocation: { fontSize: 22, fontWeight: '500', color: colors.detailText },
    detailAddress: { fontSize: 18, color: colors.detailMuted, marginTop: 4, lineHeight: 26 },
    createRoot: { flex: 1, height: '100%', backgroundColor: colors.bgGray },
    createHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
    createTitle: { fontSize: 26, fontWeight: '600', color: colors.ink },
    restorePill: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECECEE', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, gap: 10, marginTop: 8 },
    restoreText: { fontSize: 17, color: colors.inkMuted },
    coverUpload: { height: 280, backgroundColor: '#EDEEEF', borderRadius: 16, marginTop: 16, position: 'relative' },
    coverUploadBtn: {
        position: 'absolute', right: 16, bottom: 16, width: 48, height: 48, borderRadius: 24,
        backgroundColor: colors.btnBlack, alignItems: 'center', justifyContent: 'center',
    },
    inputField: { backgroundColor: '#fff', borderRadius: 24, height: 64, justifyContent: 'center', paddingHorizontal: 20, marginTop: 16 },
    inputFieldRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 24, height: 64, paddingHorizontal: 20, marginTop: 12 },
    placeholder: { fontSize: 22, color: colors.inkPlaceholder },
    timeCard: { backgroundColor: '#fff', borderRadius: 28, marginTop: 12, paddingHorizontal: 18, paddingVertical: 14 },
    timeRow: { flexDirection: 'row' },
    timelineCol: { width: 24, alignItems: 'center', paddingTop: 14 },
    timeLineRow: { flexDirection: 'row', alignItems: 'center', height: 56 },
    timeHLine: { height: 1, backgroundColor: '#EEEEEF', marginLeft: 4 },
    timeDot: { width: 14, height: 14, borderRadius: 7 },
    timelineDashed: { width: 0, height: 30, borderLeftWidth: 2, borderLeftColor: '#C4C4C9', borderStyle: 'dashed', marginVertical: 2 },
    timeLabel: { fontSize: 20, color: colors.inkMuted },
    datePill: { backgroundColor: '#F4F4F6', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 },
    datePillText: { fontSize: 18, fontWeight: '500' },
    ticketingTitle: { fontSize: 20, color: colors.inkMuted, marginTop: 24, marginBottom: 8 },
    approvalRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 28, height: 72, paddingHorizontal: 22 },
    toggle: { width: 60, height: 36, borderRadius: 18, backgroundColor: '#D6D6DB', justifyContent: 'center', paddingHorizontal: 3 },
    toggleOn: { backgroundColor: '#1A1A1A' },
    toggleThumb: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff' },
    toggleThumbOn: { alignSelf: 'flex-end' },
    emptyStateWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
    notifIllustration: { width: 280, height: 220 },
    chatPlaceholder: { marginBottom: 20 },
    bigEmptyTitle: { fontSize: 28, fontWeight: '600', color: colors.inkSecondary, marginTop: 20 },
    bigEmptyDesc: { fontSize: 19, color: colors.inkLight, textAlign: 'center', marginTop: 12, lineHeight: 28 },
    tabBar: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        flexDirection: 'row', backgroundColor: colors.tabBar,
        paddingTop: 10, paddingBottom: 22,
    },
    tabItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 8 },
    tabIconWrap: { width: 64, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
    tabPillActive: { backgroundColor: '#E3E4E6' },
    tabLabel: { fontSize: 14, marginTop: 1 },
    createFab: {
        position: 'absolute', right: 18, bottom: 104, flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#EFEFF1', borderRadius: 26, paddingHorizontal: 22, paddingVertical: 13,
        shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 14, shadowOffset: { width: 0, height: 4 },
        elevation: 5, zIndex: 30,
    },
    createFabText: { fontSize: 19, fontWeight: '500', color: colors.inkSecondary, marginLeft: 9 },
});
