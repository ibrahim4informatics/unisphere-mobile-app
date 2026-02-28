import { View } from "react-native";

interface Props {
    spaceX?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl",
    spaceY?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}

export default function Spacer({ spaceX = "none", spaceY = "none" }: Props) {

    const heightMap = {
        none: "h-0",
        xs: "h-1",
        sm: "h-2",
        md: "h-4",
        lg: "h-6",
        xl: "h-8",
        "2xl": "h-10",
        "3xl": "h-12",
    };


     const widthMap = {
        none: "h-0",
        xs: "h-1",
        sm: "h-2",
        md: "h-4",
        lg: "h-6",
        xl: "h-8",
        "2xl": "h-10",
        "3xl": "h-12",
    };

    return <View className={`${heightMap[spaceY]} ${widthMap[spaceX]}`} />

}