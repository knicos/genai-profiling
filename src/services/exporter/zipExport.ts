import { dumpUserData } from '@genaipg/views/Teacher/userState';
import { saveZipFile } from '@genai-fi/base/util/zip';

export async function saveFile() {
    return saveZipFile(dumpUserData(), 'classData');
}
