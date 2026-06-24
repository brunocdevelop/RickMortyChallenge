import { FC } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { Character } from "types/character"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useEpisode } from "@/utils/useEpisode"
import { useHeader } from "@/utils/useHeader"

interface EpisodeScreenProps extends AppStackScreenProps<"Episode"> {}

export const EpisodeScreen: FC<EpisodeScreenProps> = function EpisodeScreen(_props) {
  const { themed } = useAppTheme()
  const { navigation, route } = _props
  const { id } = route.params

  useHeader({ leftIcon: "back", onLeftPress: () => navigation.goBack() }, [navigation])

  const { episode, characters, isLoading, error } = useEpisode(id)

  if (isLoading) {
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={$centered}>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    )
  }

  if (error || !episode) {
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={$centered}>
          <Text text={error ?? "Episode not found."} />
        </View>
      </Screen>
    )
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={themed($listContent)}
        ListHeaderComponent={
          <View style={themed($header)}>
            <Text
              style={themed($episodeCode)}
              tx="episodeCard:seasonEpisodeCode"
              txOptions={{ season: episode.season, episode: episode.episode }}
            />
            <Text text={episode.name} preset="heading" style={themed($episodeName)} />
            <Text text={episode.air_date} style={themed($airDate)} />
            <Text text="Characters" preset="bold" style={themed($sectionTitle)} />
          </View>
        }
        renderItem={({ item }) => (
          <View style={themed($characterCard)}>
            <Image source={{ uri: item.image }} style={$characterImage} />
            <View style={$characterInfo}>
              <Text text={item.name} preset="bold" style={themed($characterName)} />
              <View style={$statusRow}>
                <View style={[$statusDot, { backgroundColor: statusColor(item.status) }]} />
                <Text
                  text={item.status === "unknown" ? "Unknown" : item.status}
                  style={themed($statusText)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </Screen>
  )
}

function statusColor(status: Character["status"]): string {
  switch (status) {
    case "Alive":
      return "#4CAF50"
    case "Dead":
      return "#F44336"
    default:
      return "#9E9E9E"
  }
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

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  gap: spacing.xxs,
})

const $episodeCode: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
  fontSize: 12,
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: 1,
})

const $episodeName: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xxs,
})

const $airDate: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 13,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  fontSize: 18,
})

const $characterCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.background,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.separator,
  overflow: "hidden",
  gap: spacing.sm,
})

const $characterImage: ImageStyle = {
  width: 72,
  height: 72,
}

const $characterInfo: ViewStyle = {
  flex: 1,
  gap: 4,
}

const $characterName: ThemedStyle<TextStyle> = () => ({
  fontSize: 15,
})

const $statusRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

const $statusDot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
}

const $statusText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 13,
})
