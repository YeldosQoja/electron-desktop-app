import { Segment, Wheel } from '@/features/randomizer';
import { useRef, useState } from 'react';

const values = [
  'better luck next time',
  'won 70',
  'won 10',
  'better luck next time',
  'won 2',
  'won uber pass',
  'better luck next time',
  'won a voucher',
];

const colors = [
  '#EE4040',
  '#F0CF50',
  '#815CD1',
  '#3DA5E0',
  '#34A24F',
  '#F9AA1F',
  '#EC3F3F',
  '#FF9000',
];

const freeSpinGifts = [
  ['test1', 'red'],
  ['test2', 'black'],
  ['test3', '#808080'],
  ['test4', 'blue'],
  ['test5', 'gray'],
  ['test6', 'blue'],
];

export default function Randomizer() {
  const [segments, setSegments] = useState<Segment[]>(
    values.map((v, i) => ({ value: v, color: colors[i] })),
  );

  const onFinished = (winner: string) => {
    console.log(winner);
  };

  const ref = useRef(null);

  return (
    <div className="flex h-dvh justify-center items-center">
      <Wheel
        segments={segments.map((s) => s.value)}
        segColors={segments.map((s) => s.color)}
        winningSegment="won 10"
        onFinished={onFinished}
        isOnlyOnce={false}
        size={300}
        fontFamily="Arial"
      />
    </div>
  );
}
