import { FC } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"

import { Episode } from "types/episode"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

interface EpisodeCardProps {
  item: Episode
  onPress: (id: number) => void
}

export const EpisodeCard: FC<EpisodeCardProps> = function EpisodeCard({ item, onPress }) {
  const { themed } = useAppTheme()

  return (
    <TouchableOpacity style={themed($card)} onPress={() => onPress(item.id)} activeOpacity={0.7}>
      <Text style={themed($episodeCode)} text={item.episodeCode} />
      <Text style={themed($episodeName)} text={item.name} preset="bold" />
      <Text style={themed($airDate)} text={item.air_date} />
    </TouchableOpacity>
  )
}

export default EpisodeCard

const $card: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderRadius: 12,
  padding: spacing.md,
  borderWidth: 1,
  borderColor: colors.separator,
})

const $episodeCode: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  fontSize: 12,
  fontWeight: "600",
  marginBottom: spacing.xxs,
  textTransform: "uppercase",
  letterSpacing: 1,
})

const $episodeName: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 16,
  marginBottom: spacing.xxs,
})

const $airDate: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 13,
})
