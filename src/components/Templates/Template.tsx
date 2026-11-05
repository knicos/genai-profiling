import Commented from "./Commented";
import { MemoryMap } from "./MemoryMap";
import Post from "./Post";
import SearchHistory from "./SearchHistory";
import ShortVideo from "./ShortVideo";
import Story from "./Story";
import StreamingService from "./StreamingService";
import { memory, TemplateData } from "./types";
import WatchHistory from "./WatchHistory";

interface Props {
    template: TemplateData;
    editable?: boolean;
    onMemoriesChange?: (memories: memory[]) => void;
}

export default function Template({ template, editable, onMemoriesChange }: Props) {
    switch (template.type) {
        case 'streaming':
            return <StreamingService {...template} />;
        case 'searches':
            return <SearchHistory searches={template.searches}/>;
        
        case 'memoryMap':
            return <MemoryMap  {...template} editable={editable} onMemoriesChange={onMemoriesChange} />;
        case 'post':
            return <Post {...template}/>
        case 'shortVideo':
            return <ShortVideo {...template}/>
        case 'story':
            return <Story {...template}/>
        case "comments":
            return <Commented {...template} />
        case 'watchHistory':
            return <WatchHistory {...template} />
        default:
            return null;
    }
}