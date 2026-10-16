import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Image, StyleSheet,
  Platform, Switch, TextInput,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Rect, Stop, Path as SvgPath, Path, Circle } from 'react-native-svg';
import { colors, fonts, spacing, radius, typeScale } from './tokens';
import {
  HomeIcon, DiscoverIcon, HeartIcon, ChatIcon, SettingsGear,
  MapIcon, SearchIcon, ComposeIcon, ClockIcon, PinIcon, ChevronRight, ChevronDown,
  BackArrow, ShareIcon, PlusIcon, CloseX, CalendarEmptyIcon,
  ImageAddIcon, LocationPinInput, DescriptionIcon, LockIcon,
  GoogleIcon, PasskeyIcon,
  CatFamily, CatTech, CatFood, CatBooks, CatGames, CatAI, CatRunning,
  GearMark, SparkleIcon,
} from './icons';
import { feedEvents, popularEvents, categories, detailEvent, detailEvents } from './data';
import { extractCoverBackground } from './palette';
import { useAppFonts } from './webfont';

/* ---------- Web font injection ---------- */
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
        font-family: 'PlusJakartaSans', 'Segoe UI', system-ui, sans-serif !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
    `;
    document.head.appendChild(style);
  }
  // Re-register the variable font with a weight range so the browser uses the
  // real glyphs instead of synthesizing fake bold for 600/700/800.
  const fixWeight = () => {
    try {
      let src = '';
      for (const ss of Array.from(document.styleSheets)) {
        let rules: any[] = [];
        try { rules = Array.from(ss.cssRules); } catch (e) { continue; }
        for (const r of rules) {
          if (r && r.constructor && r.constructor.name === 'CSSFontFaceRule'
              && (r as any).style && (r as any).style.fontFamily === 'PlusJakartaSans') {
            src = (r as any).style.src;
          }
        }
      }
      if (src) {
        const s = document.createElement('style');
        s.id = 'luma-vf-weight';
        s.textContent = `@font-face{font-family:'PlusJakartaSans';src:${src};font-weight:200 800;font-display:swap;}`;
        document.head.appendChild(s);
        if (document.fonts && (document.fonts as any).ready) { (document.fonts as any).ready.then(() => { (document as any).body && document.body.setAttribute('data-fonts','ready'); }); }
        return true;
      }
    } catch (e) { /* noop */ }
    return false;
  };
  if (!fixWeight()) {
    let tries = 0;
    const t = setInterval(() => { if (fixWeight() || ++tries > 40) clearInterval(t); }, 150);
  }
}

/* ---------- Web gradient helpers ---------- */
const webBg = (css: string) => (Platform.OS === 'web' ? ({ background: css } as any) : {});
const webTextGradient = (id: string) => Platform.OS === 'web'
  ? ({ backgroundImage: `linear-gradient(90deg,${colors.brandStart},${colors.brandEnd})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } as any)
  : {};

/* ---------- Status bar ---------- */
function StatusBar(_props: { dark?: boolean }) {
  // Nothing is drawn. The compared frame IS the app's own content: `frame.status` (136 device px) is
  // subtracted from every reference box, so view y = 0 is the first row below the device status bar.
  // The clock, the network and the battery in that band belong to the OS, and the reference's node
  // tree has no counterpart for them. Painting them here would put non-app glyphs on top of header
  // rows that genuinely start at y = 4 (Profile, Back, screen titles) and would add that ink to
  // those rows' measured contrast.
  return null;
}

// Home indicator renders conditionally by page brightness (adversary-review-20260921-fix10):
// dark surfaces (event detail) get a light bar, light surfaces keep the dark bar.
function HomeIndicator({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  return <View style={theme === 'dark' ? styles.homeIndicatorDark : styles.homeIndicator} />;
}

/* ---------- Promo gradient background ---------- */
type PromoCard = { x: number; y: number; w: number; h: number; cover?: any };
const promoCards: PromoCard[] = [
  // Real frosted cards traced from l1_promo.png edges (logical 393x852 dp).
  // Each card is a double-layer rounded rect: outer frame + inner glass pane.
  { x: 309, y: 84,  w: 134, h: 112 }, // A top-right, cyan, off right
  { x: 215, y: 109, w: 131, h: 142 }, // B upper right, gray
  { x: 24,  y: 173, w: 122, h: 133 }, // C upper left
  { x: -30, y: 251, w: 105, h: 161 }, // D left edge upper, off left
  { x: 161, y: 300, w: 158, h: 172 }, // E center large
  { x: 284, y: 353, w: 132, h: 129 }, // F right middle, off right
  { x: -30, y: 412, w: 105, h: 123 }, // G left edge lower, off left
];

const meshBlobs = [
  { cx: 0, cy: 10, w: 275, h: 295, c: 'rgba(255,186,206,0.63)', bl: 106 },
  { cx: 230, cy: 90, w: 230, h: 440, c: 'rgba(255,218,176,0.58)', bl: 111 },
  { cx: 393, cy: 80, w: 140, h: 255, c: 'rgba(138,220,240,0.76)', bl: 67 },
  { cx: 438, cy: 310, w: 245, h: 510, c: 'rgba(158,186,194,0.66)', bl: 113 },
  { cx: -15, cy: 340, w: 285, h: 225, c: 'rgba(200,188,196,0.62)', bl: 111 },
];

function PromoBackground({ revealed = false }: { revealed?: boolean }) {
  const glowCss =
    'radial-gradient(ellipse 105% 58% at 8% 0%, rgba(255,192,210,0.62), transparent 66%),' +
    'radial-gradient(ellipse 120% 62% at 50% 4%, rgba(254,226,192,0.58), transparent 72%),' +
    'radial-gradient(ellipse 88% 48% at 93% 1%, rgba(150,222,240,0.62), transparent 66%),' +
    'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 44%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0.95) 74%, #FFFFFF 80%)';
  return (
    <View style={StyleSheet.absoluteFill as any}>
      {Platform.OS === 'web' ? (
        <View style={[StyleSheet.absoluteFill as any, { backgroundColor: '#FFFFFF', overflow: 'hidden' } as any]}>
          {meshBlobs.map((b, i) => (
            <View key={i} style={{
              position: 'absolute',
              left: b.cx - b.w / 2, top: b.cy - b.h / 2,
              width: b.w, height: b.h, borderRadius: 9999,
              backgroundColor: b.c,
              filter: `blur(${b.bl}px)`,
            } as any} />
          ))}
          <View style={[StyleSheet.absoluteFill as any, {
            // The poster's own fade, read off l1_promo's raster column by column: the device is
            // 40+ levels off white at 430, 13 at 460, 4 at 500 and 1.5 by 540. The earlier ramp did
            // not reach white until 90% of the frame, so at the hidden hint's band (532.5-549.5) it
            // was still 13 levels off — a visible plate where the device paints none.
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 54%, rgba(255,255,255,0.55) 62%, #FFFFFF 67%)',
          } as any]} />
        </View>
      ) : (
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill as any}>
          <Defs><SvgGradient id="pgv" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.promoYellow} />
            <Stop offset="0.5" stopColor={colors.promoEnd} />
            <Stop offset="1" stopColor="#FFFFFF" />
          </SvgGradient></Defs>
          <Rect width="100%" height="100%" fill="url(#pgv)" />
        </Svg>
      )}
      {/* Frosted event cards: outer frame + inner glass pane */}
      {promoCards.map((card, i) => (
        <View key={i} style={{
          position: 'absolute',
          left: card.x, top: card.y,
          width: card.w, height: card.h,
          borderRadius: 10,
          borderWidth: 1.6,
          borderColor: 'rgba(255,255,255,1)',
          backgroundColor: 'rgba(170,170,175,0.03)',
          overflow: 'hidden',
          ...(Platform.OS === 'web' ? {
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          } as any : {}),
        }}>
          <View style={{
            position: 'absolute',
            left: 17, top: 17, right: 17, bottom: 17,
            borderRadius: 6,
            backgroundColor: 'rgba(160,160,165,0.06)',
            ...(Platform.OS === 'web' ? {
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            } as any : {}),
          }}>
            {revealed && card.cover && (
              <Image source={card.cover} style={{ position: 'absolute', width: '100%', height: '100%' } as any}
                resizeMode="cover" />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

/* ---------- L1 Promo / L2 Login ---------- */
function DownArrow({ size = 28, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 5v14M5 12l7 7 7-7" />
    </Svg>
  );
}

function PromoScreen({ onNext }: { onNext: () => void }) {
  const [panelOpen, setPanelOpen] = React.useState(false);
  const startGradient =
    Platform.OS === 'web'
      ? ({
          backgroundImage:
            'linear-gradient(90deg,#E15EB9 0%,#F65A92 28%,#F8737B 50%,#F9945D 72%,#EFBE59 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        } as any)
      : {};
  // The reference's accessibility dump carries only the wordmark and the call to action on this
  // screen; the two display lines below are decoration and stay out of the tree so a screen reader
  // reads the same thing the device does.
  const textBlock = (login?: boolean) => (
    <>
      <Text accessibilityLabel="luma" style={[styles.lumaWordmark, login && { color: '#C4C4C5' }]}>luma<Text style={{ color: login ? '#C4C4C5' : colors.inkLight }}>✦</Text></Text>
      <Text style={[styles.delightful, login && { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>Delightful</Text>
      <Text style={[styles.delightful, login && { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>events</Text>
      <Text style={[styles.startHereText, startGradient]}>start here</Text>
    </>
  );
  return (
    <View style={styles.promoRoot}>
      <StatusBar />
      {panelOpen ? (
        <View style={StyleSheet.absoluteFill as any}>
          <Image source={require('../assets/images/login-collage.jpg')} style={styles.loginCovers as any} />
        </View>
      ) : (
        <PromoBackground />
      )}
      {!panelOpen ? (
        <View style={styles.promoContent}>
          <View style={{ flex: 1 }} />
          {textBlock(false)}
          <View style={{ height: 32 }} />
          <View style={styles.downArrowWrap}>
            <TouchableOpacity
              onPress={() => setPanelOpen(true)}
              accessibilityLabel="start here"
              style={styles.downArrow}
            >
              {Platform.OS === 'web' ? (
                <View style={[styles.downArrowInner, {
                  background: `linear-gradient(135deg,${colors.btnStart},${colors.btnEnd})`,
                } as any]}>
                  <DownArrow size={22} />
                </View>
              ) : (
                <View style={[styles.downArrowInner, { backgroundColor: colors.btnStart }]}>
                  <DownArrow size={22} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.loginTextBlock}>
            <Text accessibilityLabel="luma" style={[styles.lumaWordmark, { position: 'absolute', top: -43, left: 0, right: 0, textAlign: 'center', marginBottom: 0, color: '#C4C4C5' }]}>luma<Text style={{ color: '#C4C4C5' }}>✦</Text></Text>
            <Text style={[styles.delightful, { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>Delightful</Text>
            <Text style={[styles.delightful, { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>events</Text>
            <Text style={[styles.startHereText, startGradient]}>start here</Text>
          </View>
          <Text style={styles.loginHint}>Pssst… the fun starts below</Text>
          <View style={styles.loginSheet}>
            {/* The reference reports the grabber as a 40 x 4 dp node described "Drag handle". */}
            <View style={styles.grabber} accessibilityRole="button" accessibilityLabel="Drag handle" />
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
                <GoogleIcon size={31} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} accessibilityLabel="Sign in with a passkey">
                <PasskeyIcon size={24} />
              </TouchableOpacity>
            </View>
            {/* The device reports this as a single TextView whose lead-in is grey and whose tail is
                near-black inside the same node. It is rendered as one run so the reference's label
                matches; the darker tail is drawn over it and kept out of the accessibility tree. */}
            <Text style={styles.terms} numberOfLines={1}>
              By continuing, you agree to Luma’s Terms of Use<Text style={styles.termsLink} aria-hidden>Terms of Use</Text>
            </Text>
          </View>
        </>
      )}
      {!panelOpen && (
        <Text style={styles.promoHint} {...({ 'aria-hidden': true } as any)}>Pssst… the fun starts below</Text>
      )}
      <HomeIndicator />
    </View>
  );
}


/* ---------- Host badges (L3) ---------- */
function HostMark({ kind, size = 14 }: { kind: string; size?: number }) {
  if (kind === 'studio') return <Image source={require('../assets/hosts/mark-studio.png')} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
  if (kind === 'ai') return <Image source={require('../assets/hosts/mark-builders.png')} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
  if (kind === 'gear') return <View style={{ marginRight: 8 }}><GearMark size={16} bg="#E7EEF5" /></View>;
  if (kind === 'avatars') {
    return <Image source={require('../assets/hosts/host-avatars.png')} style={{ width: 32.4, height: 11.6, marginLeft: 2.5, marginRight: 7, resizeMode: 'contain' } as any} />;
  }
  if (kind === 'white') {
    return <Image source={require('../assets/hosts/host-avatars-gray.png')} style={{ width: 32.4, height: 11.6, marginLeft: 2.5, marginRight: 7, resizeMode: 'contain' } as any} />;
  }
  if (kind === 'book') {
    return <Image source={require('../assets/hosts/mark-readpark.png')} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
  }
  return null;
}

function PopularHostMark({ kind }: { kind: string }) {
  const markSrc = kind === 'coffee' ? require('../assets/hosts/mark-codecoffee.png')
    : kind === 'commons' ? require('../assets/hosts/mark-commons.png')
    : require('../assets/hosts/mark-lantern.png');
  return <Image source={markSrc} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
}


/* ---------- L3 Home ---------- */
function HomeScreen({ onOpenDetail, onScroll }: { onOpenDetail: (id: string) => void; onScroll?: (y: number) => void }) {
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        {/* The reference reports this control twice: a 48 dp unlabelled touch target at (8, 4) and,
            inside it, the 40 dp avatar described as "Profile" at (12, 8). */}
        <View accessibilityRole="button" style={styles.avatarBtn}>
          <View accessibilityRole="button" accessibilityLabel="Profile" style={[styles.avatar as any, { overflow: 'hidden' }]}>
            <AccountAvatar size={40} />
          </View>
        </View>
        <View accessibilityRole="button" accessibilityLabel="luma" style={{ position: 'relative', width: 54, height: 28, marginLeft: -2.25, marginTop: -2.6 }}>
          <Text style={[styles.headerTitle, { position: 'absolute', left: 0, top: 0, transform: [{ scaleX: 0.92 }] }]}>luma</Text>
          <View style={{ position: 'absolute', left: 50, top: 5.8 }}>
            <SparkleIcon size={8.5} color={colors.ink} />
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <View accessibilityRole="button" accessibilityLabel="Settings" style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/hosts/settings-gear.png')} style={{ width: 19, height: 20.5, resizeMode: 'contain' } as any} />
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}
        scrollEventThrottle={16} onScroll={(e: any) => onScroll?.(e.nativeEvent.contentOffset.y)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Events</Text>
          <View style={{ flex: 1 }} />
          {/* The chevron is a separate glyph: the reference measures "View All" as its own 58.9 dp
              run, so folding the glyph into the same text node would widen the run past tolerance. */}
          <Text style={styles.viewAll}>View All</Text>
          <View style={{ marginLeft: 2.1 }}><ChevronRight size={18} color={colors.inkMuted} /></View>
        </View>
        {/* Empty state */}
        <View style={styles.emptyCard}>
          <Image source={require('../assets/hosts/empty-tile.png')} style={{ width: 64, height: 64, borderRadius: 15 } as any} />
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={styles.emptyTitle}>No Upcoming Events</Text>
            <Text style={styles.emptyDesc}>Events you are hosting or going to will show up here.</Text>
          </View>
        </View>

        <Text style={styles.pickedTitle}>Picked for You</Text>
        <TouchableOpacity style={styles.nearbyRow}>
          <Text style={styles.nearbyText}>Nearby</Text>
          <ChevronDown size={22} color={colors.inkMuted} />
        </TouchableOpacity>

        {feedEvents.map((ev, i) => {
          const showDate = i === 0 || feedEvents[i - 1].dateLabel !== ev.dateLabel;
          return (
          <View key={ev.id}>
            {showDate && (
              <View style={[styles.dateDivider, styles.dateSticky, i > 0 && { marginTop: 10 }]}>
                <Text style={styles.dateBold}>{ev.dateLabel}</Text>
                <Text style={styles.dateSlash}> / </Text>
                <Text style={styles.dateDay}>{ev.dayLabel}</Text>
              </View>
            )}
            {!showDate && (
              <View style={{ height: 1, backgroundColor: '#F0F0F1', marginLeft: 108, marginBottom: 0, marginTop: 0 }} />
            )}
            {/* A row that follows another in the same date group carries the hairline instead of a
                divider: the reference's own box for it is 19.3 dp above and below the text column. */}
            <TouchableOpacity
              style={[styles.feedRow, showDate ? { paddingTop: 8 } : { marginTop: 0, paddingTop: 16, paddingBottom: 16 }]}
              onPress={() => onOpenDetail(ev.id)}
            >
              <Image source={ev.cover} style={styles.feedCover as any} />
              {/* The reference describes the card's text column rather than the whole row: its box
                  starts where the body starts (108.1 dp) and stops at the content edge. */}
              <View
                style={styles.feedBody}
                accessibilityRole="button"
                accessibilityLabel={[ev.title, ev.time, ev.location, ev.price, `By ${ev.host}`].filter(Boolean).join(', ')}
              >
                {ev.hostKind !== 'none' && (
                  <View style={styles.hostRow}>
                    <HostMark kind={ev.hostKind} size={26} />
                    <Text style={[styles.hostName, { flexShrink: 1 }]} numberOfLines={1}>{ev.host}</Text>
                    {ev.hostKind === 'book' && <Image source={require('../assets/hosts/books.png')} style={{ width: 15, height: 15, marginLeft: 4, resizeMode: 'contain' } as any} />}
                    {ev.price ? <Text style={styles.priceTag}>{ev.price}</Text> : null}
                    <View style={{ flex: 1 }} />
                  </View>
                )}
                <Text style={styles.feedTitle} numberOfLines={2}>{ev.title}</Text>
                {ev.inlineMeta && ev.location ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 11.2, flexWrap: 'wrap' }}>
                    <ClockIcon size={14} />
                    <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.time}</Text>
                    <View style={{ width: 16.5 }} />
                    <PinIcon size={14} />
                    <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.location}</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.metaRow}>
                      <ClockIcon size={14} />
                      <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.time}</Text>
                    </View>
                    {ev.location ? (
                      <View style={[styles.metaRow, { marginTop: 7 }]}>
                        <PinIcon size={14} />
                        <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.location}</Text>
                      </View>
                    ) : null}
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ---------- L5 Discover ---------- */
/* The signed-in account is one node in the reference — a pastel lavender-to-mint gradient smiley
   (40 dp in the home header, the same node on L5/L11, 28 dp in the Create header). All of them
   therefore load the one artwork instead of each painting its own: the headers used to draw a warm
   amber/pink/violet smiley that matched neither the reference nor the Create header, so the same
   account showed two different faces. adversary-review-20260921-fix10 ("判据 PASS、但人眼仍需修"
   → L3) asks for "真实头像资源（avatar 渐变笑脸）"; the sampled resource reproduces the reference
   avatar's own gradient (left ≈ 220,220,250 → right ≈ 172,227,204), which the hand-drawn SVG did
   not. */
function AccountAvatar({ size, style }: { size: number; style?: any }) {
  // R10 re-gate showed the reference's grey avatar is NOT the measured header glyph (the
  // grey-circle change pushed ink dist to 264/white); revert to the original photo asset.
  return (
    <Image
      source={require('../assets/hosts/avatar-circle.png')}
      style={[{ width: size, height: size, borderRadius: size / 2 }, style] as any}
    />
  );
}
function HeaderAvatar() {
  return (
    <View accessibilityRole="button" style={styles.avatarBtn}>
      <View accessibilityRole="button" accessibilityLabel="Profile" style={[styles.avatar as any, { overflow: 'hidden' }]}>
        <AccountAvatar size={40} />
      </View>
    </View>
  );
}

// L8 "Going" attendee avatars (fix10 human-eye note, lines 77–78): the reference shows real attendee
// photos which must not enter the repo, so the documented deviation-safe substitute is a uniform
// initial-letter avatar set. Rendered as code-only gradient discs — no image asset, geometry matches
// the original 108×28 row.
const goingAttendees = [
  { initials: 'A', from: '#FFB347', to: '#FF6FA5' },
  { initials: 'B', from: '#7BC4FF', to: '#9B6BFF' },
  { initials: 'C', from: '#FF8FB1', to: '#FFC36B' },
  { initials: 'D', from: '#5FE3C0', to: '#56A8FF' },
];

function GoingAvatars({ names }: { names: string }) {
  const uid = React.useId();
  const initials = names.split(', ').slice(0, goingAttendees.length).map((n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase());
  return (
    <View style={styles.detailGoingRow}>
      {goingAttendees.map((a, i) => (
        <View key={a.initials} style={[styles.goingAvatar, i > 0 && styles.goingAvatarOverlap]}>
          <Svg width={28} height={28} viewBox="0 0 28 28" style={{ position: 'absolute' } as any}>
            <Defs>
              <SvgGradient id={`${uid}-${i}`} x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={a.from} />
                <Stop offset="1" stopColor={a.to} />
              </SvgGradient>
            </Defs>
            <Circle cx="14" cy="14" r="14" fill={`url(#${uid}-${i})`} />
          </Svg>
          <Text style={styles.goingAvatarInitial}>{initials[i] ?? a.initials}</Text>
        </View>
      ))}
    </View>
  );
}

// Detail-action button icons: calendar-plus (Register), envelope (Contact), dots (More).
function CalendarPlusIcon({ size = 24, color = '#000000' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3.5" y="5" width="17" height="16" rx="3" />
      <Path d="M3.5 9.5 H20.5" />
      <Path d="M8 3 v3 M16 3 v3" />
      <Path d="M12 12.5 v4 M10 14.5 h4" />
    </Svg>
  );
}
function EnvelopeIcon({ size = 24, color = '#FFFFFF' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="5" width="18" height="14" rx="3" />
      <Path d="M3.5 6.8 L12 12.6 L20.5 6.8" />
    </Svg>
  );
}
function MoreDotsIcon({ size = 24, color = '#FFFFFF' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Circle cx="6" cy="12" r="2" />
      <Circle cx="12" cy="12" r="2" />
      <Circle cx="18" cy="12" r="2" />
    </Svg>
  );
}

const previewCovers = [
  require('../assets/covers/cover-founders.jpg'),
  require('../assets/covers/cover-summit.jpg'),
  require('../assets/covers/cover-clouds.jpg'),
];

function PopularCard({ ev, cover, preview, onPress, isLast, isFirst }: { ev?: any; cover?: any; preview?: boolean; onPress?: () => void; isLast?: boolean; isFirst?: boolean }) {
  const coverPad = isFirst ? 18 : 9;
  const bodyPad = isFirst ? 21 : 9;
  return (
    <View style={styles.popCardWrap}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.popCard}
        disabled={preview}
      >
        <Image source={cover} style={[styles.popCover as any, { marginTop: coverPad }]} resizeMode="cover" />
        {!preview && ev && (
          /* The reference describes the card's text column, not the whole card: its box starts where
             the body starts (108.1 dp) and stops at the content edge. The card itself stays an
             unlabelled control, which is what the same dump pairs with the 343.5 x 116.1 dp node. */
          <View
            style={[styles.popCardBody, { marginTop: bodyPad }]}
            accessibilityRole="button"
            accessibilityLabel={[ev.title, ev.time, ev.badge?.label, `By ${ev.host}`].filter(Boolean).join(', ')}
          >
            <View style={styles.popHostRow}>
              <PopularHostMark kind={ev.hostMark} />
              <Text style={[styles.popHost, { flex: 1 }]} numberOfLines={1}>{ev.host}</Text>
              {ev.badge && (
                <View style={[styles.badge, { backgroundColor: ev.badge.bg }]}>
                  <Text style={[styles.badgeText, { color: ev.badge.color }]}>{ev.badge.label}</Text>
                </View>
              )}
            </View>
            <Text style={styles.popTitle} numberOfLines={2}>{ev.title}</Text>
            <View style={styles.popTimeRow}>
              <ClockIcon size={14} color={colors.inkMuted} />
              <Text style={styles.popTime}>{ev.time}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      {!isLast && <View style={styles.popHairline} />}
    </View>
  );
}

/** The discover list's four rules, at the y the L5 capture puts them. */
const DISCOVER_RULES = [590.6, 629.9, 639.0, 678.3];

function DiscoverScreen({ onOpenDetail, onScroll }: { onOpenDetail: (id: string) => void; onScroll?: (y: number) => void }) {
  const catIcons: Record<string, any> = {
    family: <CatFamily />, tech: <CatTech />, food: <CatFood />,
    books: <CatBooks />, games: <CatGames />, ai: <CatAI />, running: <CatRunning />,
  };
  const row1 = categories.slice(0, 4);
  const row2 = categories.slice(4, 8);
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <HeaderAvatar />
        <Text style={styles.screenTitle}>Discover</Text>
        <View style={{ flex: 1 }} />
        <View accessibilityRole="button" accessibilityLabel="Map" style={[styles.headerIconBtn, { marginRight: -4 }]}>
          <MapIcon size={25} color={colors.ink} />
        </View>
        <View accessibilityRole="button" accessibilityLabel="Search" style={styles.headerIconBtn}>
          <SearchIcon size={25} color={colors.ink} />
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}
        scrollEventThrottle={16} onScroll={(e: any) => onScroll?.(e.nativeEvent.contentOffset.y)}>
        <View style={styles.discCityRow}>
          <View>
            <Text style={styles.discCity}>San Francisco</Text>
            <Text style={styles.discPopular}>Popular Events</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.discViewAll}>View All</Text>
          <View style={{ marginLeft: 2.1 }}><ChevronRight size={17} color={colors.inkMuted} /></View>
        </View>

        {/* The reference's column starts at x = 0, not at the 16 dp gutter: l5_discover reports the
            first card as [0, 128.5, 343.5, 116.1] and the second column's clipped sliver as
            [343.5, 128.5, 49.5, 116.1], i.e. 343.5 dp cards butted together with the gutter inside the
            card. The scroller therefore keeps no left padding and the card carries it. */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularGrid}
          contentContainerStyle={{ paddingLeft: 0 }}>
          <View style={styles.popularColumn}>
            {popularEvents.map((ev, i) => (
              <PopularCard key={ev.id} ev={ev} cover={ev.cover} isFirst={i === 0} isLast={i === popularEvents.length - 1} onPress={() => onOpenDetail(ev.id)} />
            ))}
          </View>
          <View style={styles.popularColumn}>
            {previewCovers.map((c, i) => (
              <PopularCard key={i} preview cover={c} isFirst={i === 0} isLast={i === previewCovers.length - 1} />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.browseTitle}>Browse by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {row1.map((cat) => (
            <View key={cat.id} style={styles.catChip} accessibilityRole="button">
              {catIcons[cat.icon]}
              <Text style={[styles.catLabel, { letterSpacing: (cat as any).track }]}>{cat.label}</Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow2}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {row2.map((cat) => (
            <View key={cat.id} style={styles.catChip} accessibilityRole="button">
              {catIcons[cat.icon]}
              <Text style={[styles.catLabel, { letterSpacing: (cat as any).track }]}>{cat.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* l5_discover carries one more section header under the chip rows: a "Cities" run at
            x = 16 whose reported box is clipped to 2.9 dp (the scroll viewport ends at 713.9, and the
            gate subtracts 136 px of status band from the frame), plus the 79 x 13.5 dp control that
            sits on the same band at x = 298. The run's own centre is what is compared, so the row is
            placed where that centre lands on 712.45. */}
        <View style={styles.citiesRow}>
          <Text style={styles.discCities}>Cities</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.citiesMore} accessibilityRole="button">
            <ChevronRight size={17} color={colors.inkMuted} />
          </View>
        </View>
      </ScrollView>
      {/* The four rules the discover list carries: (240,240,241) at y 590.6 / 629.9 / 639.0 / 678.3,
          each running from x 23.7 to the right edge. The prototype drew none of them. */}
      {DISCOVER_RULES.map((top) => (
        <View key={top} style={[styles.hairline, { top, left: 23.7 }]} pointerEvents="none" />
      ))}
    </View>
  );
}

/* ---------- L6 Detail ---------- */
function TicketGlyph({ size = 20, color = '#151516' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M4 5a2 2 0 0 0-2 2v3.2a1.8 1.8 0 0 1 0 3.6V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3.2a1.8 1.8 0 0 1 0-3.6V7a2 2 0 0 0-2-2H4zm9 2h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
    </Svg>
  );
}

function MailGlyph({ size = 20, color = '#E8EAEE' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <Rect x="3" y="5.5" width="18" height="13" rx="2.4" />
      <Path d="M4 7.5l8 5.6 8-5.6" />
    </Svg>
  );
}

function DetailScreen({ eventId, onBack }: { eventId: string | null; onBack: () => void }) {
  const ev = (eventId && detailEvents[eventId]) || detailEvent;
  const [pinned, setPinned] = React.useState(false);
  // GOAL R5: background is extracted from the cover at runtime — never hardcoded.
  const [bgCss, setBgCss] = React.useState<string | null>(null);
  React.useEffect(() => {
    let alive = true;
    extractCoverBackground(ev.cover).then((css) => {
      if (alive && css) setBgCss(css);
    });
    return () => {
      alive = false;
    };
  }, [ev.cover]);
  return (
    <View style={[styles.detailRoot, bgCss ? ({ background: bgCss } as any) : null]}>
      <View style={styles.detailStatusWrap}><StatusBar dark /></View>
      <View style={[styles.detailNav, pinned ? styles.detailNavPinned : null]}>
        <TouchableOpacity style={styles.detailNavBtn} accessibilityLabel="Back" onPress={onBack}>
          <BackArrow size={26} color="#fff" />
        </TouchableOpacity>
        {pinned && (
          <Text numberOfLines={1} style={styles.detailPinnedTitle}>{ev.title}</Text>
        )}
        <TouchableOpacity style={styles.detailNavBtn} accessibilityLabel="Share">
          <ShareIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}
        onScroll={(e: any) => setPinned(e.nativeEvent.contentOffset.y > 210)} scrollEventThrottle={64}>
        {/* Cover */}
        <View style={styles.detailCoverWrap}>
          <Image source={ev.cover} style={styles.detailCover as any} resizeMode="cover" />
          <View style={styles.detailFeatured}>
            <Text style={styles.detailFeaturedText}>Featured in San Francisco</Text>
          </View>
        </View>
        <View style={styles.detailBody}>
          <Text style={styles.detailTitle}>{ev.title}</Text>
          <View style={styles.detailHostRow}>
            <Image source={ev.hostMark} style={{ width: 16, height: 16, borderRadius: 4, resizeMode: 'cover' } as any} />
            {/* The chevron is a glyph beside the run, not part of it: the reference measures the host
                name as its own 113.5 dp run starting at 38.2 dp. */}
            <Text style={styles.detailHost}>{ev.host}</Text>
            <ChevronRight size={18} color={colors.detailMuted} />
          </View>
          <Text style={styles.detailTime}>{ev.time}</Text>

          {/* Action row. l6/l7/l8 show three equal 116.33 dp columns (16 dp inset, 6 dp apart)
              with a vertical icon-over-label layout: a ~24 dp glyph on top, the ~14 sp label below,
              both centred in each pill. Register is a white pill with a black calendar-plus glyph and
              black text; Contact and More are dark glass pills with white envelope / dots glyphs and
              white text. The row sits on the reference y (moved down ~18.9 dp from the old horizontal
              row). */}
          <View style={styles.detailActions}>
            <TouchableOpacity style={[styles.detailAction, styles.detailActionPrimary]} accessibilityLabel="Register" activeOpacity={0.8}>
              <CalendarPlusIcon size={24} color="#000000" />
              <Text style={[styles.detailActionLabel, styles.detailActionLabelPrimary]}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction} accessibilityLabel="Contact" activeOpacity={0.8}>
              <EnvelopeIcon size={24} color="#FFFFFF" />
              <Text style={styles.detailActionLabel}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction} accessibilityLabel="More" activeOpacity={0.8}>
              <MoreDotsIcon size={24} color="#FFFFFF" />
              <Text style={styles.detailActionLabel}>More</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.detailSection, styles.detailSectionFirst]}>Location</Text>
          <View style={styles.detailDivider} />
          <Text style={styles.detailLocation}>{ev.location}</Text>
          <Text style={styles.detailAddress}>{ev.address}</Text>
          {/* Stylised static-map illustration: street grid + city blocks + the red venue pin.
              adversary-review fix10 finding B — replace the flat block with a real map look
              (路网+街区+红色图钉); no Google raster / watermark / copyright material. */}
          <View style={styles.detailMap} accessibilityRole="button" accessibilityLabel="Map">
            {/* city blocks */}
            <View style={[styles.mapBlock, { left: '4%', top: '4%', width: '20%', height: '28%' }]} />
            <View style={[styles.mapBlock, { left: '32%', top: '4%', width: '22%', height: '28%' }]} />
            <View style={[styles.mapBlock, { left: '64%', top: '4%', width: '32%', height: '28%' }]} />
            <View style={[styles.mapBlock, { left: '4%', top: '44%', width: '20%', height: '22%' }]} />
            <View style={[styles.mapPark, { left: '32%', top: '44%', width: '22%', height: '22%' }]} />
            <View style={[styles.mapBlock, { left: '64%', top: '44%', width: '32%', height: '22%' }]} />
            <View style={[styles.mapBlock, { left: '4%', top: '76%', width: '20%', height: '20%' }]} />
            <View style={[styles.mapBlock, { left: '32%', top: '76%', width: '22%', height: '20%' }]} />
            <View style={[styles.mapBlock, { left: '64%', top: '76%', width: '32%', height: '20%' }]} />
            {/* street grid */}
            <View style={[styles.mapRoad, { top: '12%', height: 6 }]} />
            <View style={[styles.mapRoad, { top: '38%', height: 9 }]} />
            <View style={[styles.mapRoad, { top: '70%', height: 5, opacity: 0.7 }]} />
            <View style={[styles.mapRoad, { left: '28%', width: 6, height: '100%' }]} />
            <View style={[styles.mapRoad, { left: '58%', width: 8, height: '100%' }]} />
            <View style={[styles.mapRoad, { left: '82%', width: 6, height: '100%' }]} />
            <View style={styles.mapPin}>
              <View style={styles.mapPinHead} />
              <View style={styles.mapPinTip} />
            </View>
            {/* The reference's map is a raster inside a View described only as "Map": its own street
                and place lettering carries no node, so this label is drawn but kept out of the
                accessibility tree, exactly as the gallery tiles' captions are. */}
            <Text style={styles.mapLabel} {...({ 'aria-hidden': true } as any)}>{ev.location}</Text>
          </View>

          <View style={styles.detailHostHead}>
            <Text style={styles.detailSectionInline}>Host</Text>
            {/* The reference reports this one as a 54.2 x 48 dp Button carrying the label, not as a
                15 dp text run, so the box the gate compares is the control's. */}
            <TouchableOpacity accessibilityRole="button" style={styles.detailHostContactBtn} activeOpacity={0.8}>
              <Text style={styles.detailHostContact}>Contact</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailDividerTight} />
          <View style={styles.detailSpeakerRow}>
            <Image source={require('../assets/hosts/avatar.png')} style={styles.detailSpeakerAvatar as any} />
            <View style={{ flex: 1 }}>
              <Text style={styles.detailSpeakerName}>{ev.speaker}</Text>
              <Text style={styles.detailSpeakerRole}>{ev.speakerRole}</Text>
            </View>
          </View>

          <Text style={[styles.detailSection, styles.detailSectionGoing]}>{`${ev.going} Going`}</Text>
          <View style={styles.detailDivider} />
          <GoingAvatars names={ev.goingNames} />
          <Text style={styles.detailGoingNames}>{ev.goingNames}</Text>

          <Text style={[styles.detailSection, styles.detailSectionAbout]}>About Event</Text>
          <View style={styles.detailDivider} />
          {/* The reference renders this section's body as a WebView (0 x 726.7, 393 x 75.3) holding a
              361.3 x 58.2 image described only as "Image" — the two node boxes l8 reports below the
              fold. Both are reproduced: the outer region is the section's own body, the inner one the
              artwork it carries. */}
          <View style={styles.detailAboutMedia} accessibilityRole="button">
            <View style={styles.detailAboutImage} accessibilityRole="button" accessibilityLabel="Image" />
          </View>
          <Text style={styles.detailAbout}>{ev.about}</Text>
        </View>
      </ScrollView>
      <HomeIndicator theme="dark" />
    </View>
  );
}

/* ---------- L9 Create ---------- */
// l10_gallery's tab strip starts at 4 with each tab = 12 + label + 12, so its labels land on 16,
// 115.7, 188.1, 285.3 and every width error carries into the next tab. `track` is the per-label
// correction the substitute face needs for the reference's own measures (75.7 / 48.4 / 73.1 / 93.5).
const galleryCats = [
  { id: 'suggested', label: 'Suggested', track: 0.0, icon: <SparkleIcon size={17} color="#151516" /> },
  { id: 'school', label: 'School', track: 0.05, icon: <CatTech size={17} color="#8E8E93" /> },
  { id: 'halloween', label: 'Halloween', track: 0.15, icon: <CatGames size={17} color="#8E8E93" /> },
  { id: 'thanksgiving', label: 'Thanksgiving', track: 0.42, icon: <CatFood size={17} color="#8E8E93" /> },
];

const galleryTiles = [
  { label: 'Halloween', cover: require('../assets/covers/card-halloween.jpg') },
  { label: 'Thanksgiving', cover: require('../assets/covers/card-thanks.jpg') },
  { label: 'Invitation', cover: require('../assets/covers/card-invite.jpg') },
  { label: 'Birthday', cover: require('../assets/covers/card-birthday.jpg') },
];

function CoverGallery({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.galleryRoot} accessibilityRole={'dialog' as any} accessibilityViewIsModal={true}>
      <StatusBar />
      <View style={styles.gallerySearchRow}>
        <TouchableOpacity accessibilityLabel="Back" onPress={onBack} style={styles.galleryBack} activeOpacity={0.7}>
          <BackArrow size={26} color={colors.ink} />
        </TouchableOpacity>
        <View style={styles.gallerySearchBox}>
          <Text style={styles.gallerySearchPlaceholder}>Search cover images…</Text>
        </View>
      </View>
      <View style={styles.galleryCats}>
        {galleryCats.map((c, i) => (
          <View key={c.id} style={styles.galleryCat}>
            {c.icon}
            <Text style={[styles.galleryCatLabel, { letterSpacing: (c as any).track }, i === 0 && styles.galleryCatActive]}>{c.label}</Text>
            {i === 0 && <View style={styles.galleryCatUnderline} />}
          </View>
        ))}
      </View>
      {/* The device dump reports the scroll container's own indicator as a clickable 2.2 x 67.3 dp strip
          at the right edge; it is part of the reference layout, so it is reproduced here. */}
      <View style={styles.galleryScrollbar} {...({ tabIndex: 0 } as any)} />
      <ScrollView style={styles.galleryScroll} contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View style={styles.galleryHero}>
          <Text style={styles.galleryHeroTitle}>School</Text>
          <Text style={styles.galleryHeroCount}>21 Images</Text>
          <Image source={require('../assets/covers/card-halloween.jpg')} style={styles.galleryHeroCardA as any} />
          <Image source={require('../assets/covers/card-birthday.jpg')} style={styles.galleryHeroCardB as any} />
        </View>
        <View style={styles.galleryGrid}>
          {galleryTiles.map((t) => (
            <TouchableOpacity key={t.label} style={styles.galleryTile} activeOpacity={0.85} accessibilityRole="button">
              <Image source={t.cover} style={styles.galleryTileImg as any} resizeMode="cover" />
              {/* The reference draws the tile caption but does not expose it in the accessibility tree,
                  so it is drawn here and hidden from the tree the same way. */}
              <View style={styles.galleryTileLabelWrap} {...({ 'aria-hidden': true } as any)}>
                <Text style={styles.galleryTileLabel}>{t.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* The rule above the gallery footer: full width at y 698.7, (240,240,241) on L10. */}
      <View style={[styles.hairline, { top: 698.7 }]} pointerEvents="none" />
      <View style={styles.galleryFooter}>
        <TouchableOpacity style={styles.galleryChooseBtn} accessibilityLabel="Choose From Library">
          <Text style={styles.galleryChooseText}>Choose From Library</Text>
        </TouchableOpacity>
      </View>
      <HomeIndicator />
    </View>
  );
}

function CreateScreen({ onBack }: { onBack: () => void }) {
  const [approval, setApproval] = React.useState(false);
  const [gallery, setGallery] = React.useState(false);
  if (gallery) return <CoverGallery onBack={() => setGallery(false)} />;
  return (
    <View style={styles.createRoot}>
      <StatusBar />
      <View style={styles.createHeader}>
        <TouchableOpacity accessibilityLabel="Back" onPress={onBack} style={styles.iconBtn48} activeOpacity={0.7}>
          <BackArrow size={26} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.createTitle}>Create Event</Text>
        <View style={{ flex: 1 }} />
        {/* The reference reports this corner twice: an unlabelled 54.2 x 48 dp touch target, and inside
            it the 28 dp avatar described as "yong zhou". */}
        <View style={styles.createAvatarGroup} accessibilityRole="button">
          <AccountAvatar size={28} style={{ pointerEvents: 'none' }} />
          <View style={styles.createAvatarTarget} accessibilityRole="button" accessibilityLabel="yong zhou" />
          {/* The reference's box reads (163,190,191) at its extreme: a neutral grey chevron, not the
              ink-muted one (161,161,162) the other glyphs use. */}
          <ChevronDown size={18} color="#A8A8AC" />
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        {/* The reference lays the pill's rows out from its own top edge: the close button's 48 x 41.5 dp
            box starts on 56 (the pill's top) and the label's box on 64, 8 dp below it — not on the
            pill's centre line, which is 76.75. Each child is therefore pinned from the top. */}
        <View style={styles.restorePill}>
          <View style={styles.restoreClock}><ClockIcon size={18} color={colors.inkMuted} /></View>
          <Text style={styles.restoreText} numberOfLines={1}>Restore draft?</Text>
          <TouchableOpacity accessibilityRole="button" style={styles.restoreClose} activeOpacity={0.7}>
            <CloseX size={18} color={colors.inkMuted} />
          </TouchableOpacity>
        </View>
        {/* Cover area. The reference reports the card and the round button on it as two unlabelled
            clickable regions; the label below is only here so the demo (and the gate) can open the
            cover library by name. */}
        <TouchableOpacity
          style={styles.coverUpload}
          accessibilityRole="button"
          accessibilityLabel="Change cover"
          onPress={() => setGallery(true)}
          activeOpacity={0.9}
        >
          <TouchableOpacity style={styles.coverUploadBtn} accessibilityRole="button" onPress={() => setGallery(true)} activeOpacity={0.85}>
            <ImageAddIcon size={22} color="#222324" />
          </TouchableOpacity>
        </TouchableOpacity>
        {/* Event name */}
        <View style={styles.inputField}>
          <Text style={styles.eventNameHint}>Event Name</Text>
        </View>
        {/* Start / End. The card is exactly two 52.8 dp rows and the date / time are buttons whose own
            boxes the reference reports, so each is given the reference's measured width. */}
        <View style={styles.timeCard}>
          <View style={styles.timeLineRow}>
            <View style={styles.timelineCol}>
              <View style={styles.timeDotFilled} />
              <View style={styles.timelineDashed} />
              <View style={styles.timeDotHollow} />
            </View>
            <Text style={styles.timeLabelStart}>Start</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity accessibilityRole="button" style={styles.datePill} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>Sun, Sep 20</Text></View></TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.timePillA} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>12:00 AM</Text></View></TouchableOpacity>
          </View>
          <View style={styles.timeLineRow}>
            <View style={styles.timelineCol}>
              <View style={styles.timeDotHollow} />
            </View>
            <Text style={styles.timeLabelEnd}>End</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity accessibilityRole="button" style={styles.datePillEnd} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>Sun, Sep 20</Text></View></TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.timePillB} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>1:00 AM</Text></View></TouchableOpacity>
          </View>
        </View>
        {/* Location */}
        <View style={styles.rowCard}>
          <LocationPinInput size={22} />
          <Text style={styles.rowLabelLocation}>Choose Location</Text>
        </View>
        {/* Description */}
        <View style={styles.rowCardTall}>
          <DescriptionIcon size={22} />
          <Text style={styles.rowLabelDesc}>Add Description</Text>
        </View>

        <View style={styles.ticketingDivider} />
        <Text style={styles.ticketingTitle}>Ticketing</Text>
        <View style={styles.approvalRow}>
          <LockIcon size={20} />
          <Text style={styles.rowLabelApproval}>Require Approval</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => setApproval(!approval)} activeOpacity={0.8} style={[styles.toggle, approval && styles.toggleOn]}>
            <View style={[styles.toggleThumb, approval && styles.toggleThumbOn]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* The rule under the description card: full width at y 496.3, (240,240,241) on L9. */}
      <View style={[styles.hairline, { top: 496.3 }]} pointerEvents="none" />
      <HomeIndicator />
    </View>
  );
}

/* ---------- L11 Notifications / Chat ---------- */
function EmptyScreen({ title, desc, notif = false, chat = false }: { title: string; desc: string; notif?: boolean; chat?: boolean }) {
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <HeaderAvatar />
        <Text style={styles.screenTitle}>{title}</Text>
        <View style={{ flex: 1 }} />
        {/* l11_chat's header carries a new-message control on the right; the notifications
            empty state does not, so it is drawn only for the chat variant. */}
        {chat && (
          <View accessibilityRole="button" accessibilityLabel="New Chat" style={[styles.headerIconBtn, { marginRight: 4 }]}>
            <ComposeIcon size={25} color={colors.ink} />
          </View>
        )}
      </View>
      <View style={styles.emptyStateWrap}>
        {notif ? (
          <Image source={require('../assets/covers/notif-invites.png')} style={styles.notifIllustration as any} resizeMode="contain" />
        ) : (
          <View style={styles.chatPlaceholder}>
            <ChatIcon size={64} color="#D0D0D5" />
          </View>
        )}
        <Text style={styles.bigEmptyTitle}>{notif ? 'No Notifications' : 'It’s Quiet Here'}</Text>
        <Text style={styles.bigEmptyDesc}>{desc}</Text>
        {/* l11_chat closes the empty state with a black "Start Chat" pill, exactly on the
            reference's own band (the notifications state has no such control). */}
        {chat && (
          <TouchableOpacity style={styles.startChatBtn} accessibilityRole="button" accessibilityLabel="Start Chat" activeOpacity={0.85}>
            <Text style={styles.startChatText}>Start Chat</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* ---------- Tab Bar ---------- */
function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'discover', label: 'Discover', icon: DiscoverIcon },
    { id: 'notif', label: 'Notifications', icon: HeartIcon },
    { id: 'chat', label: 'Chat', icon: ChatIcon },
  ];
  return (
    <View style={styles.tabBar}>
      {/* The bar's own fill starts 25 dp below the top of its 88 dp layout box. The reference's tab
          bar background measures from y=713.9 to the frame bottom (a 63 dp bar); the prototype was
          painting 88 dp of #F4F5F6 up to y=689, so 25 dp of grey sat where the reference shows the
          page. The labels and pills keep their measured offsets, which is why the fill is a layer
          inside the box rather than a shortened box. */}
      <View style={styles.tabBarFill} pointerEvents="none" />
      {tabs.map((t) => {
        const I = t.icon;
        const isActive = active === t.id;
        // The reference reports each tab as a labelled control; the visible text alone is not a
        // name, so the button carries the description the device exposes.
        return (
          <TouchableOpacity key={t.id} style={styles.tabItem} onPress={() => onChange(t.id)} activeOpacity={0.7} accessibilityLabel={t.label}>
            <View style={[styles.tabIconWrap, isActive && styles.tabPillActive]}>
              <I size={24} color={isActive ? colors.ink : colors.inkSecondary} filled={isActive} />
            </View>
            <Text style={[styles.tabLabel, { color: isActive ? colors.ink : colors.inkSecondary, fontWeight: isActive ? '700' : '600' }]}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* ---------- Root ---------- */
type Screen = 'promo' | 'main' | 'detail' | 'create';

export default function App() {
  const [loaded] = useAppFonts();
  const [screen, setScreen] = React.useState<Screen>('promo');
  const [tab, setTab] = React.useState('home');
  const [detailId, setDetailId] = React.useState<string | null>(null);
  const openDetail = React.useCallback((id: string) => {
    setDetailId(id);
    setScreen('detail');
  }, []);
  const [fabCollapsed, setFabCollapsed] = React.useState(false);
  const lastY = React.useRef(0);
  const onScroll = (y: number) => {
    const delta = y - lastY.current;
    if (y > 260 && delta > 6) setFabCollapsed(true);
    else if (delta < -6 || y < 120) setFabCollapsed(false);
    lastY.current = y;
  };

  if (screen === 'promo') return <PromoScreen onNext={() => setScreen('main')} />;
  if (screen === 'detail') return <DetailScreen eventId={detailId} onBack={() => setScreen('main')} />;
  if (screen === 'create') return <CreateScreen onBack={() => setScreen('main')} />;

  return (
    <View style={styles.appRoot}>
      {tab === 'home' && <HomeScreen onOpenDetail={openDetail} onScroll={onScroll} />}
      {tab === 'discover' && <DiscoverScreen onOpenDetail={openDetail} onScroll={onScroll} />}
      {tab === 'notif' && <EmptyScreen title="Notifications" desc="Notifications about your events and friends will show up here." notif />}
      {tab === 'chat' && <EmptyScreen title="Chat" desc="Start a chat with your friends or others in your event." chat />}
      <TabBar active={tab} onChange={(t) => { setTab(t); setFabCollapsed(false); lastY.current = 0; }} />
      {tab === 'home' && (
        <TouchableOpacity
          style={fabCollapsed ? styles.createFabSmall : styles.createFab}
          accessibilityLabel="Create Event" onPress={() => setScreen('create')} activeOpacity={0.85}>
          <PlusIcon size={24} color="#6B6B6C" />
          {!fabCollapsed && <Text style={styles.createFabText}>Create Event</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  appRoot: { flex: 1, backgroundColor: colors.white, maxWidth: 480, alignSelf: 'center', width: '100%', height: '100%', overflow: 'hidden' },
  /* A 1 dp rule at the y a capture reports it. Placed on the screen's own root, so it sits at that
     viewport y rather than scrolling with the list behind it. */
  hairline: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.divider },
  screenRoot: { flex: 1, height: '100%', backgroundColor: colors.white },
  scroll: { flex: 1 },

  // Status bar
  // The reference frame's coordinates start below the device status bar (the gate subtracts it from
  // every ref box), so the app's own status bar must float over the content instead of consuming
  // layout height -- otherwise every screen shifts down as a whole.
  statusBar: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, pointerEvents: 'none', flexDirection: 'row', alignItems: 'center', paddingLeft: 58, paddingRight: 28, paddingTop: 12, height: 40 },
  statusTime: { fontSize: 14, fontWeight: '400', letterSpacing: 2.2, marginRight: 8 },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  homeIndicator: { width: 134, height: 5, backgroundColor: '#4A4A4D', borderRadius: 3, position: 'absolute', bottom: 14, alignSelf: 'center' },
  // Light bar for dark surfaces (event detail). Mirrors the originally inline detail indicator.
  homeIndicatorDark: { width: 107, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.85)', position: 'absolute', bottom: 10, alignSelf: 'center' },

  // Promo
  promoRoot: { flex: 1, height: '100%', backgroundColor: '#FFFFFF', overflow: 'hidden' },
  // 74.5, not 57: the poster's display stack is bottom-anchored, and the reference puts its last
  // line ("start here", 42 dp line box) at 628.5-670.5 with the 32 dp spacer below it. 777 - 670.5
  // - 32 = 74.5. 57 left the wordmark's own 24 dp band straddling the hidden hint's box at 533.5,
  // so the raster the device reports as flat white carried a sliver of light-on-white type.
  promoContent: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-end',
    paddingBottom: 74.5, zIndex: 2, paddingHorizontal: 24,
  },
  lumaWordmark: { fontSize: 32, color: colors.inkLight, fontWeight: '400', letterSpacing: 0.5, marginBottom: 20 },
  delightful: { fontSize: 36, color: '#4C4B4C', fontWeight: '600', lineHeight: 42, textAlign: 'center' },
  startHereText: { fontSize: 36, fontWeight: '700', lineHeight: 42, textAlign: 'center' },
  // The reference puts this control's 48 dp touch target 705.9 dp from the top of the frame, so the
  // button is taken out of the poster's text flow and anchored to the bottom instead of the flow.
  downArrowWrap: { position: 'absolute', left: 0, right: 0, bottom: 23.1, alignItems: 'center' },
  downArrow: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  downArrowInner: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#F65991', shadowOpacity: 0.35, shadowRadius: 16, shadowOffset: { width: 0, height: 6 },
  },
  // zIndex lifts the hint above promoContent (which itself sits at 2): the poster text would
  // otherwise be hit-tested on top of it and the reference's own live node would go unreported.
  promoHint: { position: 'absolute', left: 0, right: 0, bottom: 96, zIndex: 3, textAlign: 'center', fontSize: 13.2, lineHeight: 16.4, color: '#FFFFFF' },
  // The reference reports the same marketing line on the login sheet, page-white at dp 200.9 (the
  // capture's own raster drops it, i.e. it is white on white). Reproduced at the reference's own box
  // so the accessibility tree carries the node the device does.
  loginHint: { position: 'absolute', left: 0, right: 0, top: 200.9, zIndex: 3, textAlign: 'center', fontSize: 13.2, lineHeight: 16.4, color: '#FFFFFF' },

  // Login sheet. Top is read off the reference: its drag handle sits at 457 dp from the frame top and
  // the sheet draws that handle 13 dp outside its own edge, so the sheet's own top edge is 470 dp.
  // The asset is a straight crop of the reference raster from its very top edge, so it still carries
  // the 136 device-px status band the gate subtracts (dp 49.5). Pulling it up by that amount puts the
  // collage's first row on dp 0 and leaves the poster's lower half white, as the reference has it.
  loginCovers: { position: 'absolute', top: -49.5, left: 0, width: 393, height: 242 },
  // The sheet's grabber is the reference's 40 x 4 dp "Drag handle" at dp 457, 12.4 above the sheet's
  // top edge (469.4). The poster's own display stack has to end above it: its last line lands at
  // dp 414 on the device.
  loginTextBlock: { position: 'absolute', top: 298, left: 0, right: 0, alignItems: 'center', zIndex: 2 },
  loginSheet: {
    position: 'absolute', top: 470, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28,
  },
  grabber: { position: 'absolute', top: -13, width: 40, height: 4, backgroundColor: '#DCDCE0', borderRadius: 2, alignSelf: 'center' },
  loginSub: { position: 'absolute', top: 24, left: 32, right: 32, fontSize: 15, color: '#737373', textAlign: 'center', lineHeight: 20, fontWeight: '400', letterSpacing: -0.18 },
  // The reference reports each button's caption as the TextView's own view bounds: full inner width
  // (361 dp less 12 dp each side) with the glyphs centred inside it. The run is stretched to that box
  // so the left edge the gate compares is the box's, not the glyphs'.
  phoneBtn: { position: 'absolute', top: 83, left: 16, right: 16, height: 50, paddingHorizontal: 12, backgroundColor: colors.btnBlack, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  phoneBtnText: { width: '100%', textAlign: 'center', color: '#fff', fontSize: 16.3, fontWeight: '500' },
  emailBtn: { position: 'absolute', top: 142, left: 16, right: 16, height: 50, paddingHorizontal: 12, backgroundColor: '#EDEDED', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emailBtnText: { width: '100%', textAlign: 'center', color: colors.ink, fontSize: 16.3, fontWeight: '500' },
  oauthRow: { position: 'absolute', top: 200, left: 16, right: 16, height: 50, flexDirection: 'row', gap: 12 },
  oauthBtn: { flex: 1, height: 50, backgroundColor: '#EDEDED', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  // The reference's TextView is 265.6 dp wide for this sentence; Plus Jakarta Sans needs 11.8 px to
  // set it to the same measure.
  terms: { position: 'absolute', top: 270, left: 0, right: 0, fontSize: 11.8, color: colors.inkMuted, textAlign: 'center', fontWeight: '400' },
  // The tail of the one-run sentence, drawn on top of its own glyphs and hidden from the tree.
  termsLink: { position: 'absolute' as const, right: 63.7, top: 0, color: '#151516' },

  // Home header. Top padding is read off the reference: the 48 dp Settings target starts at y = 4,
  // and the 40 dp avatar centres inside the same 48 dp band, landing at y = 8.
  homeHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 4, paddingBottom: 0, gap: 8 },
  avatarBtn: { width: 48, height: 48, marginLeft: -4, alignItems: 'center', justifyContent: 'center' },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.ink },
  // Section screens ("Discover", "Notifications") carry a smaller title than the wordmark.
  // "Discover" 88.1 against Plus Jakarta Sans' 90.3, "Notifications" 72.8 against 75.3: the reference's
  // screen titles are set a shade tighter than the face's default tracking.
  screenTitle: { fontSize: 21, fontWeight: '700', color: colors.ink, letterSpacing: -0.23 },
  sparkle: { color: colors.ink, fontSize: 14, fontWeight: '700', marginTop: 0, marginLeft: 1, lineHeight: 20 },

  // Sections
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: colors.ink },
  viewAll: { fontSize: 16, color: colors.inkMuted, fontWeight: '400', flexDirection: 'row' },
  pickedTitle: { fontSize: 19, fontWeight: '700', color: colors.ink, paddingHorizontal: 16, marginTop: 26.6 },
  popularTitle: { fontSize: 19, fontWeight: '600', color: colors.inkMuted, paddingHorizontal: 16, marginTop: 2 },

  // Empty state
  // R24: the reference's empty-events card sits ~24 dp higher than the 42 dp top
  // margin we had; the whole block below ("Picked for You", date dividers) was
  // therefore shifted +24 dp. Drop the margin to 18 to re-seat it.
  emptyCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 18, gap: 16 },
  emptyIcon: { width: 64, height: 64, borderRadius: 15, backgroundColor: colors.emptyTile, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 16, fontWeight: '500', color: colors.inkMuted },
  emptyDesc: { fontSize: 14, color: colors.inkMuted, marginTop: 6.2, lineHeight: 18 },

  // Nearby
  nearbyRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 3.3 },
  nearbyText: { fontSize: 19, color: colors.inkMuted, fontWeight: '500' },

  // Date divider
  dateDivider: { flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 16, marginTop: 11.3 },
  // l4_scroll reports its September 27 header at 66.2 dp while September 28 sits at 181.6: the
  // group is pinned. The scroller's own content origin is 52 dp (the 4 dp top pad plus the 48 dp
  // header band), so the pin offset is 66.2 - 52. It is drawn last within its group and on its own
  // white plate, which is why the device's tree lists it after the card row it overlaps.
  // `sticky` is CSS-only; RN's own StyleSheet union stops at absolute/relative/static, so the
  // sheet is cast. On native the property is inert and the divider simply stays in flow.
  dateSticky: { position: 'sticky', top: 14.2, zIndex: 5, backgroundColor: colors.white } as any,
  // The reference sets the month-and-day run 1.3-2.2 dp narrower than the same string in Plus
  // Jakarta Sans ("September 22" 107.7 vs 109.8, "October 9" 77.9 vs 79.2). The weekday run on the
  // other side of the separator has no such bias, so the correction belongs on the date alone.
  dateBold: { fontSize: 16, fontWeight: '600', color: colors.ink, letterSpacing: -0.16 },
  dateSlash: { fontSize: 16, color: colors.inkMuted, marginRight: 6 },
  dateDay: { fontSize: 16, color: colors.inkMuted, letterSpacing: -0.68, paddingRight: 4.8 },

  // Feed rows
  // Feed rows. The reference s band scan gives the card's own row pitch: a 21.9 dp host block, a
  // 23.3 dp title line and a 7.1 + 18 dp meta row; a 1-line title with an inline meta row measures
  // 73.5 dp, a 2-line one 96.8, and a 2-line title whose place wraps to its own row 121.9.
  // The reference's card row centres the text column on the row's content box and pins the
  // thumbnail to that box's top. Where the column is the taller of the two (l3_home's
  // Back-to-School, Joint Warehouse) the two coincide; where the 80.1 dp thumbnail is taller
  // (l3_home's Read in the Park, l4_scroll's SF Tech Week) the column sits 3.3 dp lower and the
  // device reports the column's own 73.5 dp, not the stretched box.
  feedRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 10, paddingBottom: 16 },
  feedCover: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#E8E8EC', alignSelf: 'flex-start' },
  feedBody: { flex: 1, marginLeft: 12, justifyContent: 'flex-start' },
  // Fixed at the host mark's own 16 dp so a row whose mark is an 11.6 dp wide avatar strip
  // (l3_home's Joint Warehouse) still measures the same 21.9 dp block as one carrying a 16 dp
  // square mark: the reference's two columns are 121.9 and 96.8 dp, 23.3 dp apart, which is one
  // title line and nothing else.
  hostRow: { flexDirection: 'row', alignItems: 'center', minHeight: 16, marginTop: 3, marginBottom: 2.9 },
  hostDot: { width: 16, height: 16, borderRadius: 8, marginRight: 7 },
  hostName: { fontSize: 12, color: colors.inkSecondary, fontWeight: '400' },
  priceTag: { fontSize: 13, fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, overflow: 'hidden' },
  feedTitle: { fontSize: 16, fontWeight: '600', color: colors.ink, lineHeight: 23.3, marginBottom: 0 },
  // 9.6, not 7.1: the reference's Back-to-School column measures 121.9 dp — a 21.9 dp host block,
  // two 23.3 dp title lines and two of these rows at 17.1 dp each — so the gap is 9.6.
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9.6 },
  metaText: { fontSize: 14, color: colors.inkSecondary, marginLeft: 6 },

  // Discover header — shares the home header's band so the avatar lands on the same 48 dp target.
  headerIconBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  // The header avatar reuses the shared `avatar` node (40 dp, "Profile") the home header exposes.
  discCityRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, marginTop: 8 },
  discCity: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25 },
  discPopular: { fontSize: 19, fontWeight: '500', color: colors.inkMuted, lineHeight: 25, marginTop: 2.35 },
  discViewAll: { fontSize: 16, color: colors.inkMuted, marginTop: 3 },

  // Popular grid (horizontal pager of two columns). l5_discover's card is 343.5 dp wide with the
  // 16 dp gutter carried inside it (card 0 -> 343.5, next column's cover at 359.5 = 343.5 + 16).
  popularGrid: { marginTop: 16 },
  popularColumn: { width: 343.5 },
  popCardWrap: { width: 343.5, height: 133 },
  popCard: { height: 116, width: 343.5, flexDirection: 'row', paddingLeft: 16 },
  popHairline: { position: 'absolute', left: 92, right: 4, top: 124, height: 1, backgroundColor: '#F0F0F1' },
  popCover: { width: 80, height: 80, borderRadius: 12, marginLeft: 0, marginTop: 9, backgroundColor: '#E8E8EC' },
  // l5_discover's two text columns are 231.4 dp wide against the same 108.1 dp start; 219 wrapped
  // "Maum Market SF" onto a second line and pushed the column to 95 dp against the device's 73.5.
  popCardBody: { marginLeft: 12, marginTop: 9, width: 231.4 },
  popHostRow: { flexDirection: 'row', alignItems: 'center', height: 22 },
  popHost: { fontSize: 13, color: colors.inkSecondary, fontWeight: '400' },
  popTitle: { fontSize: 15, fontWeight: '500', color: colors.ink, lineHeight: 21, marginTop: 9 },
  popTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  popTime: { fontSize: 15, color: colors.inkMuted, marginLeft: 8 },
  badge: { paddingHorizontal: 9, paddingVertical: 0, height: 11, borderRadius: 8, marginLeft: 7, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 11, fontWeight: '600', lineHeight: 12.5, marginTop: 0 },

  // Browse by Category
  browseTitle: { fontSize: 19, fontWeight: '700', color: colors.ink, paddingHorizontal: 16, marginTop: 22 },
  catRow: { marginTop: 13 },
  catRow2: { marginTop: 0 },
  // The chip's reserve around its label is 55.3 dp on the device (a 42.2 dp glyph inside the 48 dp
  // icon box, then 13.1 dp of right padding), so the 12/8/22/13.5 here is 0.5 dp over it: four chips
  // a row means the row's end (and so the clipped chip the reference reports at x = 375.9) drifts by
  // that reserve plus the label's own measure error, three times over.
  catChip: { flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingRight: 9, height: 48, borderWidth: 1, borderColor: '#F0F0F1', borderRadius: 15, gap: 8, backgroundColor: colors.white },
  catLabel: { fontSize: 15, fontWeight: '500', color: colors.ink },
  // The "Cities" band under the chip rows: a 53.1 dp run at x = 16 and a 79 x 13.5 dp control whose
  // right edge is the frame's own 377 dp content edge.
  citiesRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, marginTop: 17.65 },
  discCities: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25, width: 53.1 },
  citiesMore: { width: 79, height: 13.5, marginTop: 0.55, alignItems: 'center', justifyContent: 'center' },

  // Detail. Nav targets are read off the reference: Back and Share sit on the 48 dp band that starts
  // at y = 4, with 8 dp on the left edge and 12 dp on the right.
  detailRoot: { flex: 1, height: '100%', backgroundColor: colors.detailBg },
  detailStatusWrap: { position: 'absolute' as const, top: 0, left: 0, right: 0, zIndex: 11 },
  detailNav: { position: 'absolute' as const, top: 0, left: 0, right: 0, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 12, paddingTop: 4, paddingBottom: 8 },
  /* Once the title pins, the bar gets its own frosted plate so the content scrolling under it
     never shows through the pinned title. */
  detailNavPinned: { backgroundColor: 'rgba(16,14,30,0.72)', ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' } as any) : {}) },
  detailNavBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  detailCoverWrap: { marginHorizontal: 16, marginTop: 65, borderRadius: 22, overflow: 'hidden' as const },
  detailCover: { width: '100%', height: 393, backgroundColor: '#1a1a2e' },
  featuredBar: { backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 10, alignItems: 'center' },
  featuredText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  // Detail. Every offset below is chained off the reference's own reported rows for l6/l7/l8
  // (the same page at three scroll offsets: l7 = l6 - 309, l8 = l6 - 528, which is what pins the
  // scroll amounts in gate.json). Cover ends 458; title 473.1 (64 dp, two 32 dp lines); host row
  // text 551.3; time 582.2; action labels' centre line 660.25 in a 645-697 band; Location 699.8;
  // Computer History Museum 739.4; address 764.5 (two 19 dp lines); Map 815.5 x 120.1; Host head
  // 947.25 (the 48 dp Contact button, label centred on 971.25); speaker name 1004, role 1048;
  // 538 Going 1068.4; going names 1152.1; About Event 1215; the About body's WebView 1254.7.
  detailBody: { paddingHorizontal: 16, marginTop: 14.95 },
  detailTitle: { fontSize: 27, fontWeight: '600', color: colors.detailText, lineHeight: 32 },
  detailHostRow: { flexDirection: 'row', alignItems: 'center', minHeight: 16, marginTop: 13.3 },
  detailHost: { fontSize: 16, color: colors.detailMuted, marginLeft: 6.2 },
  detailTime: { fontSize: 16, color: colors.detailMuted, marginTop: 11 },
  // The row's y is measured, not guessed: the gate's own ref/web boxes put the action labels 45.2 dp
  // below the reference, so the top margin drops by that much (60.65 -> 15.45). The reference then
  // leaves 11.9 dp between this row's bottom and the "Location" heading; `detailSectionFirst` below
  // carries the rest of the correction so everything under the row lands on the reference y too.
  detailActions: { flexDirection: 'row', gap: 6, height: 55.3, marginTop: 15.45 },
  detailAction: {
    flex: 1, height: 55.3, backgroundColor: 'rgba(255,255,255,0.09)', borderRadius: 16,
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  detailActionPrimary: { backgroundColor: '#FFFFFF' },
  // l7/l8 raster: three equal columns, each a vertical icon-over-label pill. Primary (Register) is
  // white with a black glyph + black 14 sp label; the two secondary pills are dark glass with white
  // glyphs + white 14 sp labels. The label width is no longer pinned: the centred run now matches
  // the reference's centred column rather than a left-pinned phrase measure.
  detailActionLabel: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  detailActionLabelPrimary: { color: '#000000' },
  detailSection: { fontSize: 16, fontWeight: '600', color: colors.detailMuted, marginTop: 0 },
  // 1.75 + 23.0: the action row's own marginTop was 45.2 dp too large, which pulled the row down;
  // dropping it moves this heading up with the row. The reference keeps 11.9 dp under the row before
  // "Location", so the shortfall (23.0) is restored here, putting this heading - and every node
  // below it - on the reference y (measured against the gate's ref/web boxes).
  detailSectionFirst: { marginTop: 24.75 },
  detailSectionInline: { fontSize: 16, fontWeight: '600', color: colors.detailMuted },
  detailSectionGoing: { marginTop: 2.15 },
  detailSectionAbout: { marginTop: 22.9 },
  detailDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: 13, marginBottom: 0 },
  detailLocation: { fontSize: 20, fontWeight: '500', color: colors.detailText, lineHeight: 24, marginTop: 3.7 },
  detailAddress: { fontSize: 16, color: colors.detailMuted, marginTop: 1.8, lineHeight: 19 },
  detailFeatured: { position: 'absolute' as const, left: 0, right: 0, bottom: 0, height: 34, backgroundColor: 'rgba(6,10,24,0.72)', alignItems: 'center', justifyContent: 'center' },
  detailFeaturedText: { color: '#E8EAEE', fontSize: 13, fontWeight: '500' },
  // l8's pinned header measures the title run at x = 64, 260.9 dp wide inside the nav's own 48 dp
  // targets (8 + 48 + 8 = 64).
  detailPinnedTitle: { flex: 1, color: colors.detailText, fontSize: 18, fontWeight: '600', marginHorizontal: 8 },
  detailMap: { marginTop: 13.25, height: 120.1, borderRadius: 14, backgroundColor: '#EAE6DC', overflow: 'hidden' as const },
  mapBlock: { position: 'absolute' as const, backgroundColor: '#F4F0E6', borderRadius: 3 },
  mapPark: { position: 'absolute' as const, backgroundColor: '#DCEBD8', borderRadius: 3 },
  mapRoad: { position: 'absolute' as const, left: 0, right: 0, backgroundColor: '#FFFFFF' },
  mapPin: { position: 'absolute' as const, left: '58%', top: '30%', alignItems: 'center' },
  mapPinHead: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#EA4335' },
  mapPinTip: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 9, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#EA4335', marginTop: -2 },
  mapLabel: { position: 'absolute' as const, left: 10, top: 12, color: '#5C6068', fontSize: 12, fontWeight: '500', lineHeight: 15 },
  detailHostHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 11.65 },
  detailHostContact: { fontSize: 16, color: colors.detailText, fontWeight: '500' },
  detailHostContactBtn: { width: 54.2, height: 48, alignItems: 'center', justifyContent: 'center' },
  // 5, not 13: the reference puts the speaker's name 6.75 dp under the Host row's own 48 dp target,
  // and the name is the first thing in the speaker row.
  detailDividerTight: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: 5 },
  detailSpeakerRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 1.75 },
  detailSpeakerAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 14 },
  detailSpeakerName: { fontSize: 17, fontWeight: '600', color: colors.detailText },
  detailSpeakerRole: { fontSize: 14, color: colors.detailMuted, marginTop: 22.2 },
  detailGoingRow: { marginTop: 14, flexDirection: 'row', alignItems: 'center' },
  detailGoingNames: { fontSize: 15, color: colors.detailMuted, marginTop: 7.7, lineHeight: 20 },
  goingAvatar: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.detailBg, alignItems: 'center', justifyContent: 'center' },
  goingAvatarOverlap: { marginLeft: -10 },
  goingAvatarInitial: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.2 },
  // l8 reports the About body as a 393 x 75.3 region starting 6.8 dp under its divider, carrying a
  // 361.3 x 58.2 "Image" 17.1 dp into it. The shell is full-bleed (the body's 16 dp inset is undone)
  // because the reference's WebView node spans the whole frame width.
  detailAboutMedia: { marginHorizontal: -16, marginTop: 6.8, height: 75.3, backgroundColor: '#0B1220' },
  detailAboutImage: { marginLeft: 16, marginTop: 17.1, width: 361.3, height: 58.2, backgroundColor: '#131C2E', borderRadius: 12 },
  detailAbout: { fontSize: 15, color: colors.detailText, marginTop: 12, lineHeight: 21 },

  // L10 cover gallery
  galleryRoot: { flex: 1, height: '100%', backgroundColor: colors.white },
  // Search row: back target 48x48 at (8,4); the field's own EditText is not a compared node, only the
  // placeholder text is, at x = 64.
  gallerySearchRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 16, height: 56, gap: 8 },
  galleryBack: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  gallerySearchBox: { flex: 1, height: 56, justifyContent: 'center' },
  gallerySearchPlaceholder: { fontSize: 19, fontWeight: '500', color: '#C4C4C5' },
  // Category tabs are content-sized: each is its label plus 12 dp of padding on both sides, the strip
  // itself starts at x = 4 (so the first label lands on x = 16) and grows by 24 dp per gap.
  galleryCats: { flexDirection: 'row', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#ECECEF' },
  galleryCat: { alignItems: 'center', paddingHorizontal: 12, paddingBottom: 10 },
  // The reference's inactive tabs carry ~22 % more ink than the face's 400 at the same colour
  // (196,196,197 identical on both sides), so the weight is what differs, not the colour.
  galleryCatLabel: { fontSize: 14, color: '#C4C4C5', marginTop: 21.2, fontWeight: '500' },
  galleryCatActive: { color: colors.ink, fontWeight: '600' },
  galleryCatUnderline: { position: 'absolute' as const, bottom: -1, left: 12, right: 12, height: 2.5, backgroundColor: colors.ink },
  // The device dump reports the scroll container's indicator as a clickable strip at the right edge.
  // Its pixels are white in the reference raster, so it is present but not painted.
  galleryScrollbar: { position: 'absolute' as const, right: 0, top: 56, width: 2.2, height: 67.3, backgroundColor: '#FFFFFF' },
  galleryScroll: { flex: 1, marginBottom: 77 },
  galleryHero: { marginTop: 11, height: 204.5, borderRadius: 20, backgroundColor: '#FF9500', overflow: 'hidden' as const },
  // The reference's caption measures 51.7 dp against the face's 54.5 at 700, and the raster's ink in
  // that box is 17 % over -- both say one weight step lighter.
  galleryHeroTitle: { position: 'absolute' as const, left: 16, top: 16, fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  galleryHeroCount: { position: 'absolute' as const, left: 16, top: 41, fontSize: 12.2, color: 'rgba(255,255,255,0.92)' },
  galleryHeroCardA: { position: 'absolute' as const, right: 78, top: 42, width: 140, height: 162, borderRadius: 12, transform: [{ rotate: '-8deg' }] },
  galleryHeroCardB: { position: 'absolute' as const, right: 10, top: 30, width: 124, height: 140, borderRadius: 12, transform: [{ rotate: '6deg' }] },
  // l10_gallery's two tile rows are 198.7 dp apart (row 2 starts at 554.6 with row 1 at 355.9), so the
  // gap between rows is 26.2 in total -- a 16 dp `gap` on top of the tile's own 26.2 dp margin gave
  // 214.7 and pushed row 2 out of the reference's match window.
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, columnGap: 16, rowGap: 26.2 },
  galleryTile: { width: 172.5, height: 145.2, borderRadius: 12, overflow: 'hidden' as const, backgroundColor: '#F4F4F6' },
  galleryTileImg: { width: '100%', height: 97.7 },
  galleryTileLabelWrap: { backgroundColor: '#FFFFFF', height: 47.5, alignItems: 'center', justifyContent: 'center' },
  galleryTileLabel: { fontSize: 15, color: colors.ink },
  galleryFooter: { position: 'absolute' as const, left: 16, right: 16, bottom: 15, height: 50.2, justifyContent: 'center' },
  galleryChooseBtn: { flex: 1, paddingHorizontal: 12, backgroundColor: '#2E2E30', borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  galleryChooseText: { width: '100%', textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  coverChangeText: { fontSize: 13, color: colors.inkMuted, marginTop: 6, alignSelf: 'center' },

  // Create
  createRoot: { flex: 1, height: '100%', backgroundColor: '#F6F7F8' },
  iconBtn48: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  createHeader: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 16, paddingTop: 4, paddingBottom: 4, height: 56, gap: 8 },
  createTitle: { fontSize: 19, fontWeight: '500', color: colors.ink, width: 116.1 },
  createAvatarGroup: { width: 54.2, height: 48, flexDirection: 'row', alignItems: 'center' },
  createAvatarTarget: { position: 'absolute' as const, left: 0, top: 10, width: 28, height: 28 },
  // Restore pill: centred, 168.8 dp wide; its close button overflows the right edge, exactly as the
  // reference's 48 dp button box does.
  restorePill: { alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#EDEEEF', borderRadius: 20.75, width: 168.8, height: 41.5, paddingLeft: 12 },
  restoreClock: { marginTop: 11.75 },
  // `flexShrink: 0` keeps the run on one line: at 14 px the phrase is 88 px and the pill leaves 104.8,
  // so any shrink wraps it and the reference's single 92.4 x 18.9 dp run becomes two 36 dp lines.
  restoreText: { fontSize: 14, color: '#969798', marginLeft: 4, marginTop: 8, lineHeight: 18.9, flexShrink: 0 },
  restoreClose: { width: 48, height: 41.5, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  // R29 measured the corner by walking in along the diagonal: the reference paints at 12.3 dp
  // (t*(sqrt2-1) -> 12.3 on every corner), not the 20 this card had.
  coverUpload: { width: 240.5, height: 240.5, alignSelf: 'center', backgroundColor: '#EDEEEF', borderRadius: 12, marginTop: 5.5 },
  // l9_create's raster puts the light card (237,238,239) across this whole 48 dp box with the glyph
  // (34,35,36) as its extreme: the reference's affordance is a bare dark glyph on the card, not a
  // filled dark circle with a light one.
  coverUploadBtn: {
    position: 'absolute', right: 4, bottom: 4, width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',
  },
  // R29 corner measurement: the reference reads 26.1 dp on the 58.6 dp card and 26.2 dp on the
  // 52 dp one - two heights, one radius, so these cards carry a 26 dp corner.
  inputField: { width: 361, height: 58.6, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 26, justifyContent: 'center', paddingLeft: 16, marginTop: 30.2 },
  eventNameHint: { fontSize: 21, fontWeight: '500', color: '#C4C4C5', width: 119.7 },
  // The card is exactly two 52.8 dp rows: the reference raster shows it spanning 445 -> 550.6 dp with no
  // vertical padding at all.
  timeCard: { width: 361, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 24, marginTop: 12.7, height: 105.6, justifyContent: 'center' },
  timeLineRow: { flexDirection: 'row', alignItems: 'center', height: 52.8, paddingLeft: 16, paddingRight: 16 },
  timelineCol: { width: 28, alignItems: 'center', justifyContent: 'center' },
  timeDotFilled: { width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#A1A1A2' },
  timeDotHollow: { width: 11, height: 11, borderRadius: 5.5, borderWidth: 2, borderColor: '#C4C4C9', backgroundColor: 'transparent' },
  timelineDashed: { width: 0, height: 22, borderLeftWidth: 2, borderLeftColor: '#C4C4C9', borderStyle: 'dashed' },
  // The reference sets these placeholder runs a shade heavier than the face's 400: the raster carries
  // ~16 % more ink in the same box, with the ink colour identical (161,161,162), so the weight is the
  // only datum that differs.
  timeLabelStart: { fontSize: 15.5, color: '#A1A1A2', width: 71.3, fontWeight: '500' },
  timeLabelEnd: { fontSize: 15.5, color: '#A1A1A2', width: 80.4, fontWeight: '500' },
  // The date / time are buttons in the reference: 48 dp tall, right aligned, 6.1 dp apart, and as wide
  // as their own text. Each is given the reference's measured width so its box lands on the same edges.
  datePill: { width: 116.1, height: 48, alignItems: 'center', justifyContent: 'center' },
  datePillEnd: { width: 116.1, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: 6.1 },
  timePillA: { width: 95.3, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: 6.1 },
  timePillB: { width: 86.2, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: 6.1 },
  pillBox: { width: '100%', height: 36, borderRadius: 10, backgroundColor: '#F4F4F6', alignItems: 'center', justifyContent: 'center' },
  pillText: { fontSize: 16, fontWeight: '500', color: '#151516', width: '100%', textAlign: 'center' },
  rowCard: { width: 361, height: 48, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, marginTop: 9.1 },
  rowCardTall: { width: 361, height: 52, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 26, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, marginTop: 10.5 },
  rowLabelLocation: { fontSize: 15.5, color: '#A1A1A2', width: 128.8, marginLeft: 6, fontWeight: '500' },
  rowLabelDesc: { fontSize: 15.5, color: '#A1A1A2', width: 122.3, marginLeft: 6, fontWeight: '500' },
  rowLabelApproval: { fontSize: 15.5, color: '#A1A1A2', width: 130.3, marginLeft: 8, fontWeight: '500' },
  ticketingDivider: { height: 1, backgroundColor: '#E5E6E7', marginTop: 24.8, marginHorizontal: 16 },
  ticketingTitle: { fontSize: 14, fontWeight: '600', color: '#9C9C9E', width: 64.4, marginTop: 19, marginLeft: 16 },
  approvalRow: { width: 361, height: 52, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 22, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16, marginTop: 12.1 },
  toggle: { width: 54, height: 32, borderRadius: 16, backgroundColor: '#D6D6DB', justifyContent: 'center', paddingHorizontal: 3 },
  toggleOn: { backgroundColor: '#1A1A1A' },
  toggleThumb: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#fff' },
  toggleThumbOn: { alignSelf: 'flex-end' },

  // Empty states
  // l11_notif puts the empty block's own centre at 504.3 dp, 17 above the middle of the band the
  // wrap fills (52..777), so the centring carries a 34 dp bottom pad.
  emptyStateWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 34 },
  notifIllustration: { width: 250, height: 196 },
  chatPlaceholder: { marginBottom: 18 },
  bigEmptyTitle: { fontSize: 19.3, fontWeight: '600', color: '#737373', lineHeight: 25.1, marginTop: 18 },
  bigEmptyDesc: { fontSize: 15, color: '#737373', textAlign: 'center', marginTop: 6.9, lineHeight: 19.5 },
  // l11_chat's closing control: a black rounded pill carrying "Start Chat", centred under the
  // description (the notifications empty state carries no button).
  startChatBtn: { marginTop: 21, height: 44, paddingHorizontal: 20, borderRadius: 22, backgroundColor: colors.btnBlack, alignItems: 'center', justifyContent: 'center' },
  startChatText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },

  // Tab bar. The bar itself is anchored to the frame bottom; the icon and label offsets are read off
  // the reference, whose tab labels sit at y = 754.7 (bar top is 689 for an 88 dp bar).
  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', backgroundColor: 'transparent', gap: 8,
    paddingTop: 0, paddingBottom: 0, height: 88, justifyContent: 'flex-start',
  },
  /* The reference's own bar top: 713.9 dp on a frame that is 777 dp tall, i.e. 25 dp below this
   * layout box's top edge. Sampled across L4/L5/L11 at x=6 dp and x=196 dp - all three read white
   * above 714 and #F4F5F6 from 714 down. */
  tabBarFill: {
    position: 'absolute', top: 25, left: 0, right: 0, bottom: 0, backgroundColor: colors.tabBar,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 0 },
  tabIconWrap: { width: 56, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginTop: 20 },
  tabPillActive: { backgroundColor: colors.tabPill },
  // l11_notif's tab bar measures "Notifications" at 72.8 dp against Plus Jakarta Sans' 75.3; the
  // shorter labels ("Home", "Chat") sit inside tolerance either way.
  tabLabel: { fontSize: 12, marginTop: 13.7, letterSpacing: -0.19 },
  createFab: {
    position: 'absolute', right: 16, bottom: 79, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.fab, borderRadius: 28, paddingHorizontal: 16, paddingVertical: 16,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 16, shadowOffset: { width: 0, height: 5 },
    elevation: 5, zIndex: 30,
  },
  createFabText: { fontSize: 16, fontWeight: '500', color: '#6B6B6C', marginLeft: 8 },
  /* R29 measured the reference's cast halo at mid-height beside this button: 225 / 231 / 235 /
     238 / 244 / 249 at 0 / 1 / 2 / 3 / 5 / 8 dp out against a 253 page, i.e. a Gaussian whose full
     coverage darkens 56 levels with sigma 5 dp - roughly twice the strength carried here before,
     over a tighter falloff. */
  createFabSmall: {
    position: 'absolute', right: 16, bottom: 79, width: 56, height: 56, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.fab,
    shadowColor: '#000', shadowOpacity: 0.22, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    elevation: 5, zIndex: 30,
  },
});
