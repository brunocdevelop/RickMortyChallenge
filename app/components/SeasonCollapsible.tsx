import { FC, useEffect, useState } from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import Animated, {
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"

import { Episode } from "types/episode"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import EpisodeCard from "./EpisodeCard"

interface SeasonCollapsibleProps {
  seasonNumber: number
  episodes: Episode[]
  onPressEpisode: (episodeId: number) => void
  index: number
}

export const SeasonCollapsible: FC<SeasonCollapsibleProps> = ({
  seasonNumber,
  episodes,
  onPressEpisode,
  index,
}) => {
  const { themed } = useAppTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)

  const animatedHeight = useSharedValue(0)

  useEffect(() => {
    if (isExpanded) {
      animatedHeight.value = withSpring(contentHeight, { mass: 0.8, stiffness: 120, damping: 15 })
    } else {
      animatedHeight.value = withTiming(0, { duration: 200 })
    }
  }, [isExpanded, contentHeight, animatedHeight])

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }))

  const enteringAnimation = (index: number) =>
    FadeInLeft.delay(index * 80)
      .springify()
      .mass(0.6)
      .stiffness(120)
      .damping(14)

  const episodeList = episodes.map((item) => (
    <EpisodeCard key={item.id} item={item} onPress={onPressEpisode} />
  ))

  return (
    <Animated.View style={themed($container)} entering={enteringAnimation(index)}>
      <TouchableOpacity
        style={themed($header)}
        onPress={() => setIsExpanded((prev) => !prev)}
        activeOpacity={0.7}
      >
        <Text
          style={themed($seasonLabel)}
          tx="seasonCollapsible:seasonTitle"
          txOptions={{ number: seasonNumber }}
          preset="bold"
        />
        <View style={themed($badge)}>
          <Text style={themed($badgeText)} text={String(episodes.length)} />
        </View>
        <Text style={themed($chevron)} text={isExpanded ? "▲" : "▼"} />
      </TouchableOpacity>

      <Animated.View style={[themed($revealContainer), animatedHeightStyle]}>
        <View
          style={themed($episodeList)}
          onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        >
          {episodeList}
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.separator,
  marginBottom: spacing.sm,
  overflow: "hidden",
})

const $header: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.md,
  backgroundColor: colors.background,
})

const $seasonLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  fontSize: 15,
  color: colors.text,
})

const $badge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.tint,
  borderRadius: 10,
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  marginRight: spacing.sm,
  minWidth: 24,
  alignItems: "center",
})

const $badgeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
  fontSize: 11,
  fontWeight: "700",
})

const $chevron: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 10,
})

const $episodeList: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  paddingHorizontal: spacing.sm,
  paddingBottom: spacing.sm,
  gap: spacing.xs,
})

const $revealContainer: ThemedStyle<ViewStyle> = () => ({
  overflow: "hidden",
})
