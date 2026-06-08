import SearchHistory from "./SearchHistory";
import StreamingService from "./StreamingService";
import { TemplateData } from "./types";

interface Props {
    template: TemplateData;
}

export default function Template({ template }: Props) {
    switch (template.type) {
        case 'streaming':
            return <StreamingService {...template} />;
        case 'searches':
            return <SearchHistory searches={template.searches}/>;
        default:
            return null;
    }
}