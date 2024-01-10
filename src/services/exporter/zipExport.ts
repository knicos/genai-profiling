import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { dumpUserData } from '@genaipg/views/Teacher/userState';

async function generateBlob() {
    const zip = new JSZip();

    const dump = dumpUserData();

    zip.file('logs.json', JSON.stringify(dump.logs, undefined, 4));
    zip.file('responses.json', JSON.stringify(dump.responses, undefined, 4));

    const blob = await zip.generateAsync({ type: 'blob' });
    return blob;
}

export async function saveFile() {
    const blob = await generateBlob();
    saveAs(blob, 'classData.zip');
    return blob;
}
