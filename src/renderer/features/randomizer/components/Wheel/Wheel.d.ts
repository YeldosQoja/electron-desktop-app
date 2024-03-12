interface Props {
    segments: string[];
    segColors: string[];
    winningSegment: string;
    onFinished: (segment: string) => void;
    onRotate?: () => void;
    onRotateFinish?: () => void;
    primaryColor?: string;
    strokeColor?: string;
    contrastColor?: string;
    buttonText?: string;
    isOnlyOnce?: boolean;
    size?: number;
    upDuration?: number;
    downDuration?: number;
    fontFamily?: string;
    width?: number;
    height?: number;
}

export const Wheel: React.FC<Props>;