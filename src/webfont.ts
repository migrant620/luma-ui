import { useFonts } from 'expo-font'

// Plus Jakarta Sans (SIL OFL 1.1) is the open-source metric substitute for the app's
// bundled Google Sans (proprietary, not redistributed). It is also the face DESIGN.md
// declares for the type scale; the earlier registration used Manrope, which is ~5% narrow
// and ~20% lighter in glyph coverage at the same size, so every heading and body run landed
// outside the 5.2 ink-amount band while its ink colour still matched. Measured against the
// reference frames at the same px size, Plus Jakarta Sans reproduces both the run width and
// the coverage: "September 22" 16/600 -> width x1.010, coverage x1.004; "Nearby" 19/500 ->
// x1.006 / x0.946; "No Upcoming Events" 16/500 -> x1.014 / x0.923.
export function useAppFonts() {
  return useFonts({
    PlusJakartaSans: require('../assets/fonts/PlusJakartaSans-VF.ttf'),
    'Inter-Regular': require('../assets/fonts/Roboto_400Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Roboto_500Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Roboto_700Bold.ttf'),
  })
}
