import { SlideMeta } from './types';

interface Props {
    meta: SlideMeta;
}

export default function Slide({ meta }: Props) {
    console.log(meta);
    return null;
}
