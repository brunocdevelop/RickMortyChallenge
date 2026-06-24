import { FC } from "react"
import {
  ActivityIndicator,
  Image,
  FlatList,
  TextStyle,
  View,
  ViewStyle,
  ImageStyle,
} from "react-native"

import { Screen } from "@/components/Screen"
import { SeasonCollapsible } from "@/components/SeasonCollapsible"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useEpisodes } from "@/utils/useEpisodes"

interface EpisodeListProps extends AppStackScreenProps<"EpisodeList"> {}

const portalGun = require("@assets/images/portal-gun-pixel.png")

export const EpisodeListScreen: FC<EpisodeListProps> = function EpisodeListScreen(props) {
  const { themed } = useAppTheme()
  const { navigation } = props

  const { seasons, isLoading, error } = useEpisodes()

  function handlePressEpisode(episodeId: number) {
    navigation.navigate("Episode", { id: episodeId })
  }

  if (isLoading || error) {
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={$centered}>
          {isLoading ? <ActivityIndicator size="large" /> : <Text text={error!} />}
        </View>
      </Screen>
    )
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1} safeAreaEdges={["top"]}>
      <Image style={themed($portalGun)} source={portalGun} resizeMode="contain" />
      <Text
        testID="welcome-heading"
        style={themed($titleHeading)}
        tx="homeScreen:episodes"
        preset="heading"
      />
      <FlatList
        data={seasons}
        keyExtractor={(item) => String(item.number)}
        contentContainerStyle={themed($listContent)}
        renderItem={({ item: season, index }) => (
          <SeasonCollapsible
            index={index}
            seasonNumber={season.number}
            episodes={season.episodes}
            onPressEpisode={handlePressEpisode}
          />
        )}
      />
    </Screen>
  )
}

const $centered: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $listContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  gap: spacing.sm,
})

const $portalGun: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 40,
  width: "100%",
  marginTop: spacing.xl,
  marginBottom: spacing.md,
})

const $titleHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  alignSelf: "center",
})
