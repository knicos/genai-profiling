import { dumpUserData } from '@genaipg/views/Teacher/userState';
import { saveZipFile } from '@knicos/genai-base/util/zip';

export async function saveFile() {
    return saveZipFile(dumpUserData(), 'classData');
}
