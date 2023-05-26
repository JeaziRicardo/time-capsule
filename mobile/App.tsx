import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'

import {
  useFonts,
  Roboto_400Regular as robotoRegular,
  Roboto_700Bold as robotoBold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold as baiJamjureeBold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import { styled } from 'nativewind'

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    robotoRegular,
    robotoBold,
    baiJamjureeBold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
