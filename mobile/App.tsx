import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

import {
  useFonts,
  Roboto_400Regular as robotoRegular,
  Roboto_700Bold as robotoBold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold as baiJamjureeBold } from '@expo-google-fonts/bai-jamjuree'

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
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Text className="font-title text-4xl text-zinc-50">Hello Word!</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
